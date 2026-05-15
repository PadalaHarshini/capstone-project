function ArticleForm({ form, onChange, onSubmit, submitLabel }) {
  return (
    <form
      onSubmit={onSubmit}
      className="glass-panel-strong space-y-5 rounded-[1.75rem] p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Title</span>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Category</span>
          <input
            name="category"
            value={form.category}
            onChange={onChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
            required
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm text-slate-300">Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows="3"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
          required
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm text-slate-300">Image URL</span>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={onChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm text-slate-300">Content</span>
        <textarea
          name="content"
          value={form.content}
          onChange={onChange}
          rows="10"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-amber-400"
          required
        />
      </label>

      <button
        type="submit"
        className="warm-button rounded-full px-6 py-3 font-semibold transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default ArticleForm;
