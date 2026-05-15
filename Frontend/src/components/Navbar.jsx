import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm transition ${
    isActive
      ? "bg-amber-400 text-slate-950 shadow-[0_10px_24px_rgba(245,158,11,0.25)]"
      : "text-slate-200 hover:bg-white/10"
  }`;

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold tracking-wide text-amber-300">
          Blog-App
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/articles" className={navLinkClass}>
            Articles
          </NavLink>

          {user && (user.role === "AUTHOR" || user.role === "ADMIN") ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/create-article" className={navLinkClass}>
                Create
              </NavLink>
            </>
          ) : null}

          {user ? (
            <>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
                {user.name} ({user.role})
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
