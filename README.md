# Capstone Blog Project

This project is a full-stack blog application with:

- `Frontend/`: React + Vite client
- `Backend/`: Express + MongoDB API

Users can register, log in, read articles, and add comments. Authors and admins can create and manage articles.

## Project Structure

```text
capstone-project/
|-- Backend/
|-- Frontend/
|-- README.md
```

## Features

- User registration and login
- Role-based access for users, authors, and admins
- Article listing and article details pages
- Create, edit, delete, and restore article flows
- Comment system for logged-in users

## Getting Started

## 1. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` using `.env.example` as a guide.

Required values typically include:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`

Start the backend:

```bash
npm run dev
```

## 2. Frontend setup

```bash
cd Frontend
npm install
```

Optional environment variable:

- `VITE_API_URL`

If `VITE_API_URL` is not set, the frontend uses the deployed API URL already configured in the app.

Start the frontend:

```bash
npm run dev
```

## Default local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Notes

- The `Read More` article link opens the article details page.
- Comments can be added only by logged-in users.
- Backend uses MongoDB through Mongoose.

