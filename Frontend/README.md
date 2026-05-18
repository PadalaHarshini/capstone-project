# Frontend README

This folder contains the React client for the Capstone Blog project.

## Tech Stack

- React
- Vite
- React Router
- Axios
- Zustand
- Tailwind CSS

## Main Pages

- Home page
- Articles page
- Article details page
- Login and register pages
- Dashboard for authors/admins
- Create and edit article pages

## Install

```bash
cd Frontend
npm install
```

## Environment Variable

Create `Frontend/.env` if you want to point to a custom API:

```env
VITE_API_URL=http://localhost:5000/api
```

If this variable is missing, the app falls back to the API URL defined in `src/services/api.js`.

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Important Files

- `src/App.jsx`: routes
- `src/pages/ArticlesPage.jsx`: article listing
- `src/pages/ArticleDetailsPage.jsx`: full article and comments
- `src/components/ArticleCard.jsx`: article preview card
- `src/services/api.js`: Axios instance
- `src/store/authStore.js`: auth state management

## User Flow

- Visitors can browse articles
- Clicking `Read More` opens the details page
- Logged-in users can add comments
- Authors and admins can manage articles
