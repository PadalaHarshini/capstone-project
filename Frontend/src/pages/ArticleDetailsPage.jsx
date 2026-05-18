import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import useAuthStore from "../store/authStore";

function ArticleDetailsPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    const response = await api.get(`/comments/${id}`);
    setComments(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleResponse = await api.get(`/articles/${id}`);
        await fetchComments();
        setArticle(articleResponse.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Login to add a comment");
      return;
    }

    const trimmedComment = comment.trim();

    if (!trimmedComment) {
      toast.error("Please enter a comment before submitting");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/comments", { articleId: id, comment: trimmedComment });
      setComment("");
      await fetchComments();
      toast.success("Comment added");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-slate-300">Loading article...</p>;
  }

  if (!article) {
    return <p className="text-slate-300">Article not found.</p>;
  }

  return (
    <section className="space-y-8">
      <article className="glass-panel-strong overflow-hidden rounded-[2rem]">
        {article.imageUrl ? (
          <img src={article.imageUrl} alt={article.title} className="h-80 w-full object-cover" />
        ) : null}
        <div className="space-y-5 p-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="rounded-full bg-amber-400/15 px-3 py-1 text-amber-200">
              {article.category}
            </span>
            <span>By {article.author?.name}</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl font-bold text-white">{article.title}</h1>
          <p className="text-lg leading-8 text-slate-300">{article.description}</p>
          <div className="max-w-none whitespace-pre-line text-slate-200">{article.content}</div>
        </div>
      </article>

      <section className="glass-panel rounded-[2rem] p-8">
        <h2 className="text-2xl font-semibold text-white">Comments</h2>

        <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4">
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows="4"
            placeholder={user ? "Share your thoughts..." : "Login to leave a comment"}
            disabled={!user || submitting}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={!user || submitting}
            className="warm-button rounded-full px-5 py-3 font-semibold transition"
          >
            {submitting ? "Adding Comment..." : "Add Comment"}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          {comments.length === 0 ? (
            <p className="text-slate-400">No comments yet.</p>
          ) : (
            comments.map((item) => (
              <div key={item._id} className="rounded-2xl border border-white/10 bg-slate-950/65 p-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="font-semibold text-amber-200">{item.userId?.name}</span>
                  <span>{item.userId?.role}</span>
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-3 leading-7 text-slate-200">{item.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}

export default ArticleDetailsPage;
