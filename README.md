# Task Management System

A full-stack task management system built with modern technologies.

---

## Tech Stack

### Frontend

- Next.js 16.1
- React 19
- TypeScript
- Tailwind CSS 4
- Ant Design

### Backend

- FastAPI
- MySQL (ORM-based)

### Infrastructure

- Docker
- Docker Compose

---

## Prerequisites (Ubuntu)

sudo snap install docker
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo apt install mysql-server

## Bring up server

docker compose up --build

## Stop server

docker compose down

## Build issues

docker compose build --no-cache

### Backend

http://localhost:8000

### Frontend

http://localhost:3000
