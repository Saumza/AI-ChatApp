# AI Chat Application

A production-oriented full-stack AI chat platform featuring real-time streaming responses, JWT authentication, email verification, conversation persistence, Dockerized deployment, Nginx reverse proxying, and Google Cloud Platform hosting.

---

## Features

### Authentication & Security

* User Registration & Login
* JWT Authentication
* Refresh Token Rotation
* Protected Routes
* Email Verification
* Forgot Password & Password Reset
* Secure Cookie-Based Authentication
* Authentication Middleware

### AI Chat

* Real-Time Streaming Responses
* Stop Response Generation
* Conversation-Based Chat System
* Automatic Conversation Title Generation
* Persistent Chat History
* Markdown Rendering Support
* Code Block Rendering
* Multi-Provider AI Architecture

### User Experience

* Responsive Chat Interface
* Dynamic Conversation Sidebar
* Auto Scroll to Latest Message
* Loading States
* Error Handling
* Optimistic UI Updates

### Infrastructure & Deployment

* Dockerized Frontend
* Dockerized Backend
* Docker Compose Multi-Service Setup
* Nginx Reverse Proxy
* Google Cloud Platform Deployment
* Environment Variable Configuration
* Production-Ready Architecture

---

# Tech Stack

## Frontend

* React
* Redux Toolkit
* TanStack Query
* React Hook Form
* Tailwind CSS
* Axios
* React Router

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Nodemailer

## AI Providers

* Google Gemini
* OpenAI (Architecture Ready)
* Anthropic Claude (Architecture Ready)

## Infrastructure

* Docker
* Docker Compose
* Nginx
* Google Cloud Platform (GCP)

---

# System Architecture

```text
Client (React)
        │
        ▼
     Nginx
        │
        ▼
 Express API Server
        │
        ├── Authentication Service
        ├── Conversation Service
        ├── Chat Streaming Service
        │
        ▼
     MongoDB
        │
        ▼
  AI Provider Layer
        │
        |
        │
   Google Gemma
```

---

# Production Deployment Architecture

```text
Internet
    │
    ▼
Nginx Reverse Proxy
    │
    ├── Frontend (React)
    │
    └── Backend (Express)
            │
            ├── MongoDB
            │
            └── AI Providers
                ├── Gemini
                ├── OpenAI
                ├── Claude
                └── DeepSeek
```

---

# Authentication Flow

```text
User Login
    │
    ▼
Access Token Generated
    │
    ▼
Protected API Access
    │
    ▼
Access Token Expired
    │
    ▼
Refresh Token Endpoint
    │
    ▼
New Access Token Issued
```

---

# Streaming Architecture

```text
User Message
      │
      ▼
Frontend Request
      │
      ▼
Chat Controller
      │
      ▼
AI Provider Stream
      │
      ▼
Server-Sent Events
      │
      ▼
Frontend Stream Parser
      │
      ▼
Live UI Updates
```

---

# Database Design

## Conversations Collection

```javascript
{
  _id,
  userId,
  title,
  model,
  systemPrompt,
  createdAt,
  updatedAt
}
```

## Chats Collection

```javascript
{
  _id,
  conversationId,
  role,
  content,
  createdAt
}
```

---

# Project Structure

```text
client/
│
├── components/
├── hooks/
├── pages/
├── services/
├── stores/
├── routes/
└── utils/

server/
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── providers/
├── utils/
└── config/
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd ai-chat-app
```

---

# Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
PORT=

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLIENT_URL=

EMAIL_USER=
EMAIL_PASSWORD=

GEMINI_API_KEY=

```

Start Backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# Docker Setup

## Build Containers

```bash
docker-compose build
```

## Start Services

```bash
docker-compose up
```

## Detached Mode

```bash
docker-compose up -d
```

## Stop Services

```bash
docker-compose down
```

---

# Containerized Architecture

```text
Docker Compose
│
├── Frontend Container
│
├── Backend Container
│
├── MongoDB Container
│
└── Nginx Container
```

---

# Key Design Decisions

### Service Layer Pattern

Business logic is separated from controllers through dedicated service layers.

### Provider Abstraction Layer

Supports multiple AI providers through a unified interface.

### Conversation-Based Data Model

Chats are grouped under conversations for efficient retrieval and scalability.

### Streaming Responses

Responses are streamed token-by-token to provide a real-time user experience.

### Refresh Token Rotation

Authentication uses short-lived access tokens and long-lived refresh tokens for improved security.

### Containerized Deployment

Docker and Docker Compose provide environment consistency and simplified deployment.

### Reverse Proxy Architecture

Nginx handles request routing and acts as a reverse proxy between clients and backend services.

---

# Future Improvements

* Redis Integration
* Rate Limiting
* AI Provider Failover
* Conversation Search
* Usage Analytics Dashboard
* Horizontal Scaling with Multiple Node Instances
* SSL Termination using Nginx
* Background Job Processing
* Monitoring & Observability
* Distributed Caching

---

# Technical Highlights

* Full-Stack Application Development
* JWT Authentication & Authorization
* Refresh Token Rotation
* Email Verification System
* Password Reset Workflow
* Real-Time AI Streaming
* Multi-Provider AI Integration
* MongoDB Data Modeling
* Docker Containerization
* Docker Compose Orchestration
* Nginx Reverse Proxy
* Google Cloud Deployment
* System Design & Scalable Architecture

---

# License

This project is intended for educational, learning, and portfolio purposes.
