import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <p>Tidak ada proyek yang cocok.</p>
        <span>Coba kata kunci lain atau pilih kategori berbeda.</span>
      </div>
    );
  }

  return (
    <section className="grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
