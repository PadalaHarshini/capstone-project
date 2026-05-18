# Backend README

This folder contains the Express API for the Capstone Blog project.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication

## Main Responsibilities

- User authentication
- Role-based authorization
- Article CRUD operations
- Comment creation and retrieval

## Important Files

- `server.js`: app entry point
- `config/db.js`: MongoDB connection
- `controllers/`: business logic
- `routes/`: API endpoints
- `models/`: Mongoose schemas
- `middleware/`: auth, DB readiness, and role checks

## Install

```bash
cd Backend
npm install
```

## Environment Variables

Create `Backend/.env` and set:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

## Run

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API Base Routes

- `/api/auth`
- `/api/articles`
- `/api/comments`
- `/api/health`

## Comment Behavior

- `GET /api/comments/:articleId` returns comments for an article
- `POST /api/comments` creates a new comment for a logged-in user

