use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{delete, get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::sync::Arc;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
struct Item {
    id: i32,
    name: String,
    description: Option<String>,
    created_at: chrono::DateTime<chrono::Utc>,
    updated_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Deserialize)]
struct CreateItem {
    name: String,
    description: Option<String>,
}

type AppState = Arc<PgPool>;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    dotenvy::dotenv().ok();

    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://postgres:postgres@localhost:5432/app".to_string());

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create pool");

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    let state = Arc::new(pool);

    let app = Router::new()
        .route("/health", get(health_check))
        .route("/items", get(list_items))
        .route("/items", post(create_item))
        .route("/items/:id", get(get_item))
        .route("/items/:id", delete(delete_item))
        .with_state(state);

    let port = std::env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{}", port))
        .await
        .unwrap();

    tracing::info!("Listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn health_check() -> impl IntoResponse {
    Json(serde_json::json!({"status": "healthy"}))
}

async fn list_items(State(pool): State<AppState>) -> impl IntoResponse {
    let items = sqlx::query_as::<_, Item>("SELECT * FROM items ORDER BY id")
        .fetch_all(pool.as_ref())
        .await
        .unwrap_or_default();

    Json(items)
}

async fn create_item(
    State(pool): State<AppState>,
    Json(payload): Json<CreateItem>,
) -> impl IntoResponse {
    let item = sqlx::query_as::<_, Item>(
        "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
    )
    .bind(&payload.name)
    .bind(&payload.description)
    .fetch_one(pool.as_ref())
    .await;

    match item {
        Ok(item) => (StatusCode::CREATED, Json(item)).into_response(),
        Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
    }
}

async fn get_item(State(pool): State<AppState>, Path(id): Path<i32>) -> impl IntoResponse {
    let item = sqlx::query_as::<_, Item>("SELECT * FROM items WHERE id = $1")
        .bind(id)
        .fetch_optional(pool.as_ref())
        .await;

    match item {
        Ok(Some(item)) => Json(item).into_response(),
        Ok(None) => StatusCode::NOT_FOUND.into_response(),
        Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
    }
}

async fn delete_item(State(pool): State<AppState>, Path(id): Path<i32>) -> impl IntoResponse {
    let result = sqlx::query("DELETE FROM items WHERE id = $1")
        .bind(id)
        .execute(pool.as_ref())
        .await;

    match result {
        Ok(_) => Json(serde_json::json!({"status": "deleted"})).into_response(),
        Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
    }
}
