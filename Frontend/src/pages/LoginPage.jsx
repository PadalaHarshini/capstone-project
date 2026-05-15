import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, stopLoading } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await login(form);
      toast.success(`Welcome back, ${user.name}`);
      const redirectPath = location.state?.from?.pathname || "/articles";
      navigate(redirectPath);
    } catch (error) {
      stopLoading();
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="glass-panel-strong mx-auto max-w-xl rounded-[2rem] p-8">
      <h1 className="text-3xl font-bold text-white">Login</h1>
      <p className="mt-2 text-slate-300">Access your account to continue reading or publishing.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
          required
        />
        <button
          type="submit"
          className="warm-button w-full rounded-full px-6 py-3 font-semibold transition"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-amber-300 hover:text-amber-200">
          Register here
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
