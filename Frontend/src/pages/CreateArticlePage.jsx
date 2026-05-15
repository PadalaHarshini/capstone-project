import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ArticleForm from "../components/ArticleForm";
import api from "../services/api";

const initialForm = {
  title: "",
  description: "",
  content: "",
  imageUrl: "",
  category: ""
};

function CreateArticlePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/articles", form);
      toast.success("Article created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create article");
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Create Article</h1>
        <p className="mt-2 text-slate-300">Draft and publish a new story for your readers.</p>
      </div>
      <ArticleForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Publish Article"
      />
    </section>
  );
}

export default CreateArticlePage;
