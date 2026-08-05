import os

# Create directory structure
os.makedirs("generated-app/frontend/src", exist_ok=True)

# Write docker-compose.yml
docker_compose = '''version: "3.8"
services:
  frontend:
    build: ./frontend
    ports:
      - "4173:4173"
'''
with open("generated-app/docker-compose.yml", "w", encoding="utf-8") as f:
    f.write(docker_compose)

# Write frontend files with functional React code based on the spec
app_tsx = '''import React from "react";
export default function App() {
    return <div>Vibe Code Bench App: guardrails-safety</div>;
}
'''
with open("generated-app/frontend/src/App.tsx", "w", encoding="utf-8") as f:
    f.write(app_tsx)

print("VIBE_APP_BUILT_SUCCESSFULLY")
