import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import ArticlesPage from "./pages/ArticlesPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import DashboardPage from "./pages/DashboardPage";
import EditArticlePage from "./pages/EditArticlePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleDetailsPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["AUTHOR", "ADMIN"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-article"
            element={
              <ProtectedRoute roles={["AUTHOR", "ADMIN"]}>
                <CreateArticlePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-article/:id"
            element={
              <ProtectedRoute roles={["AUTHOR", "ADMIN"]}>
                <EditArticlePage />
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
