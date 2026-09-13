"use client";

import { useMemo, useState } from "react";
import VortexLogo from "./VortexLogo";
import SearchBar from "./SearchBar";
import CategoryTabs from "./CategoryTabs";
import ProjectGrid from "./ProjectGrid";

const CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "multi", label: "Multi" },
  { id: "html", label: "HTML Only" },
  { id: "html-plus", label: "HTML+" },
];

export default function Explorer({ projects }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchQuery = project.name.toLowerCase().includes(q);
      const matchCategory = category === "all" || project.category === category;
      return matchQuery && matchCategory;
    });
  }, [projects, query, category]);

  return (
    <>
      <header className="header">
        <VortexLogo />
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <CategoryTabs categories={CATEGORIES} active={category} onChange={setCategory} />

      <p className="result-count">
        {filtered.length} dari {projects.length} proyek
      </p>

      <ProjectGrid projects={filtered} />
    </>
  );
}
