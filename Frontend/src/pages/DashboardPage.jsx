import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ArticleCard from "../components/ArticleCard";
import api from "../services/api";
import useAuthStore from "../store/authStore";

function DashboardPage() {
  const { user } = useAuthStore();
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const query = user?.role === "ADMIN" ? "?includeDeleted=true" : "?mine=true";
      const response = await api.get(`/articles${query}`);
      setArticles(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (articleId) => {
    try {
      await api.delete(`/articles/${articleId}`);
      toast.success("Article deleted");
      fetchArticles();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleRestore = async (articleId) => {
    try {
      await api.patch(`/articles/${articleId}/restore`);
      toast.success("Article restored");
      fetchArticles();
    } catch (error) {
      toast.error(error.response?.data?.message || "Restore failed");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-slate-300">
            {user?.role === "ADMIN"
              ? "Manage all articles and restore deleted content."
              : "Manage the articles you have published."}
          </p>
        </div>
        <Link
          to="/create-article"
          className="warm-button rounded-full px-5 py-3 font-semibold transition"
        >
          New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
          No articles to manage yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              actions={
                <>
                  <Link
                    to={`/edit-article/${article._id}`}
                    className="ghost-button rounded-full px-4 py-2 text-sm text-slate-100 transition hover:border-amber-300/40 hover:text-amber-200"
                  >
                    Edit
                  </Link>
                  {!article.isDeleted ? (
                    <button
                      type="button"
                      onClick={() => handleDelete(article._id)}
                      className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                    >
                      Soft Delete
                    </button>
                  ) : null}
                  {user?.role === "ADMIN" && article.isDeleted ? (
                    <button
                      type="button"
                      onClick={() => handleRestore(article._id)}
                      className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                    >
                      Restore
                    </button>
                  ) : null}
                </>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DashboardPage;
