import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ArticleCard from "../components/ArticleCard";
import api from "../services/api";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get("/articles");
        setArticles(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p className="text-slate-300">Loading articles...</p>;
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Articles</h1>
        <p className="mt-2 text-slate-300">Browse the latest published stories from our authors.</p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
          No published articles yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ArticlesPage;
