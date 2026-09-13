"use client";

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <nav className="tabs" aria-label="Filter kategori proyek">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`tab ${active === cat.id ? "tab-active" : ""}`}
          onClick={() => onChange(cat.id)}
          aria-pressed={active === cat.id}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}
