"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <line
          x1="21"
          y1="21"
          x2="16.65"
          y2="16.65"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        inputMode="search"
        placeholder="Cari nama proyek..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Cari proyek berdasarkan nama"
      />
    </div>
  );
}
