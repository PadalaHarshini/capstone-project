import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="glass-panel-strong rounded-[2rem] p-10 text-center">
      <h1 className="text-5xl font-bold text-white">404</h1>
      <p className="mt-4 text-slate-300">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="warm-button mt-6 inline-flex rounded-full px-6 py-3 font-semibold transition"
      >
        Back Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
