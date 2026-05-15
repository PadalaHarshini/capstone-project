import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id}`);
        const { title, description, content, imageUrl, category } = response.data;
        setForm({ title, description, content, imageUrl, category });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load article");
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.put(`/articles/${id}`, form);
      toast.success("Article updated");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update article");
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Edit Article</h1>
        <p className="mt-2 text-slate-300">Update your article details and publish changes.</p>
      </div>
      <ArticleForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </section>
  );
}

export default EditArticlePage;
