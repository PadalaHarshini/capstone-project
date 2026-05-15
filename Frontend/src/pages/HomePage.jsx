import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] px-6 py-12 sm:px-10 sm:py-16">
      <div className="glass-panel-strong absolute inset-0 rounded-[2.25rem]" />
      <div className="absolute -left-10 top-12 h-36 w-36 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="absolute -right-6 bottom-10 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6 text-center lg:text-left">
          <span className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm uppercase tracking-[0.2em] text-amber-200">
            Welcome
          </span>
          <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
            Welcome to Blog-App
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Discover thoughtful articles, simple reading, and a clean blogging space designed
            to feel calm and modern.
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              to="/articles"
              className="warm-button rounded-full px-6 py-3 font-semibold transition"
            >
              Explore Articles
            </Link>
            <Link
              to="/register"
              className="ghost-button rounded-full px-6 py-3 font-semibold text-slate-100 transition hover:border-amber-300/40 hover:bg-white/8"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="accent-ring glass-panel rounded-[2rem] p-5">
            <div className="rounded-[1.5rem] bg-slate-950/70 p-6">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-cyan-400" />
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-200">Featured</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Read. Write. Share.</h2>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl bg-gradient-to-r from-amber-400/20 to-transparent p-4 text-slate-200">
                    Smooth reading experience
                  </div>
                  <div className="rounded-2xl bg-gradient-to-r from-cyan-400/18 to-transparent p-4 text-slate-200">
                    Beautiful article cards
                  </div>
                  <div className="rounded-2xl bg-gradient-to-r from-orange-500/18 to-transparent p-4 text-slate-200">
                    Clean author dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
