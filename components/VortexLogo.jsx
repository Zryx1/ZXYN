export default function VortexLogo() {
  return (
    <div className="logo">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" width="30" height="30">
          <circle cx="20" cy="20" r="17" stroke="var(--purple-2)" strokeWidth="2" fill="none" opacity="0.5" />
          <path
            d="M20 5 C10 5 5 12 5 20 C5 28 12 34 20 30 C26 27 22 20 16 20"
            stroke="var(--purple-1)"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="logo-text">
        Vortex<span className="logo-accent">Project</span>
      </span>
    </div>
  );
}
