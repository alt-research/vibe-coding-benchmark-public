import pytest
import httpx
from pathlib import Path

BASE_URL = "http://localhost:8000"
FIXTURES_DIR = Path(__file__).parent.parent.parent / "fixtures"


@pytest.fixture
async def client():
    async with httpx.AsyncClient(base_url=BASE_URL) as client:
        yield client


@pytest.fixture
async def uploaded_document(client):
    pdf_path = FIXTURES_DIR / "handbook.pdf"
    with open(pdf_path, "rb") as f:
        response = await client.post(
            "/documents",
            files={"file": ("handbook.pdf", f, "application/pdf")}
        )
    assert response.status_code == 200
    return response.json()["documentId"]


@pytest.mark.asyncio
async def test_health_check(client):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


@pytest.mark.asyncio
async def test_upload_pdf(client):
    pdf_path = FIXTURES_DIR / "handbook.pdf"
    with open(pdf_path, "rb") as f:
        response = await client.post(
            "/documents",
            files={"file": ("handbook.pdf", f, "application/pdf")}
        )

    assert response.status_code == 200
    data = response.json()
    assert "documentId" in data
    assert "pageCount" in data
    assert data["status"] == "processed"


@pytest.mark.asyncio
async def test_get_document_metadata(client, uploaded_document):
    response = await client.get(f"/documents/{uploaded_document}")

    assert response.status_code == 200
    data = response.json()
    assert data["documentId"] == uploaded_document
    assert "chunkCount" in data
    assert data["chunkCount"] > 0


@pytest.mark.asyncio
async def test_chat_vacation_policy(client, uploaded_document):
    response = await client.post(
        "/chat",
        json={
            "documentId": uploaded_document,
            "question": "What is the vacation policy?"
        }
    )

    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "sources" in data
    assert len(data["sources"]) > 0

    # Answer should mention vacation-related content
    answer_lower = data["answer"].lower()
    assert any(word in answer_lower for word in ["vacation", "pto", "days", "leave"])


@pytest.mark.asyncio
async def test_chat_expenses(client, uploaded_document):
    response = await client.post(
        "/chat",
        json={
            "documentId": uploaded_document,
            "question": "How do I submit expenses?"
        }
    )

    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "sources" in data

    # Answer should be grounded in document
    answer_lower = data["answer"].lower()
    assert any(word in answer_lower for word in ["expense", "submit", "receipt", "reimbursement"])


@pytest.mark.asyncio
async def test_chat_includes_sources(client, uploaded_document):
    response = await client.post(
        "/chat",
        json={
            "documentId": uploaded_document,
            "question": "What are the working hours?"
        }
    )

    assert response.status_code == 200
    data = response.json()

    # Sources should include page numbers and text excerpts
    for source in data["sources"]:
        assert "page" in source
        assert "text" in source
        assert isinstance(source["page"], int)
        assert len(source["text"]) > 0


@pytest.mark.asyncio
async def test_chat_invalid_document(client):
    response = await client.post(
        "/chat",
        json={
            "documentId": "nonexistent-id",
            "question": "What is the policy?"
        }
    )

    assert response.status_code == 404


@pytest.mark.asyncio
async def test_chat_empty_question(client, uploaded_document):
    response = await client.post(
        "/chat",
        json={
            "documentId": uploaded_document,
            "question": ""
        }
    )

    assert response.status_code == 400
