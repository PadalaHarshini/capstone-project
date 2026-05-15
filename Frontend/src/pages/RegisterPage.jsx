import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, stopLoading } = useAuthStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await register(form);
      toast.success(`Account created for ${user.name}`);
      navigate("/articles");
    } catch (error) {
      stopLoading();
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="glass-panel-strong mx-auto max-w-xl rounded-[2rem] p-8">
      <h1 className="text-3xl font-bold text-white">Register</h1>
      <p className="mt-2 text-slate-300">Create a reader or author account to get started.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
          required
        />
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
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
        >
          <option value="USER">USER</option>
          <option value="AUTHOR">AUTHOR</option>
        </select>
        <button
          type="submit"
          className="warm-button w-full rounded-full px-6 py-3 font-semibold transition"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-amber-300 hover:text-amber-200">
          Login here
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;
