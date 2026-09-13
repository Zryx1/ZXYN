const CATEGORY_LABELS = {
  python: "Python",
  javascript: "JavaScript",
  multi: "Multi",
  html: "HTML Only",
  "html-plus": "HTML+",
};

export default function ProjectCard({ project }) {
  return (
    <a
      className="card"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-thumb">
        <img src={project.thumbnail} alt={project.name} loading="lazy" />
      </div>
      <div className="card-body">
        <h3>{project.name}</h3>
        <span className={`badge badge-${project.category}`}>
          {CATEGORY_LABELS[project.category] ?? project.category}
        </span>
      </div>
    </a>
  );
}
