#!/bin/bash
set -e

# CodingBench Deployment Script

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

usage() {
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  fly       Deploy to Fly.io"
    echo "  docker    Build and run with Docker Compose"
    echo "  build     Build all packages"
    echo ""
    echo "Examples:"
    echo "  $0 fly              # Deploy leaderboard to Fly.io"
    echo "  $0 docker           # Run production stack locally"
    echo "  $0 docker --detach  # Run in background"
}

build_all() {
    echo "Building all packages..."
    cd "$ROOT_DIR"
    npm run build
}

deploy_fly() {
    echo "Deploying to Fly.io..."
    cd "$ROOT_DIR/packages/leaderboard"

    if ! command -v fly &> /dev/null; then
        echo "Error: flyctl not installed. Install from https://fly.io/docs/hands-on/install-flyctl/"
        exit 1
    fi

    fly deploy
}

deploy_docker() {
    echo "Building and starting Docker containers..."
    cd "$ROOT_DIR"

    if [ "$1" == "--detach" ] || [ "$1" == "-d" ]; then
        docker compose -f docker-compose.prod.yaml up --build -d
        echo ""
        echo "Services running:"
        echo "  - Leaderboard API: http://localhost:3001"
        echo "  - Dashboard: http://localhost:3000"
    else
        docker compose -f docker-compose.prod.yaml up --build
    fi
}

case "$1" in
    fly)
        deploy_fly
        ;;
    docker)
        deploy_docker "$2"
        ;;
    build)
        build_all
        ;;
    *)
        usage
        exit 1
        ;;
esac
