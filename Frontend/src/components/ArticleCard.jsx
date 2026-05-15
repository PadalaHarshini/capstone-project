import { Link } from "react-router-dom";

function ArticleCard({ article, actions }) {
  return (
    <article className="glass-panel accent-ring overflow-hidden rounded-[1.75rem] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(8,15,30,0.45)]">
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-52 w-full object-cover"
        />
      ) : (
        <div className="h-52 bg-gradient-to-br from-amber-400/35 via-sky-400/10 to-slate-950" />
      )}

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
            {article.category}
          </span>
          <span className="text-xs text-slate-400">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-white">{article.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{article.description}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            By {article.author?.name || "Unknown author"}
          </p>
          <Link
            to={`/articles/${article._id}`}
            className="warm-button rounded-full px-4 py-2 text-sm font-semibold transition"
          >
            Read More
          </Link>
        </div>

        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </article>
  );
}

export default ArticleCard;
