import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M21.44 11.05l-9.19-9.19a1.5 1.5 0 00-2.12 0L1.13 11.05a1.5 1.5 0 000 2.12l9.19 9.19a1.5 1.5 0 002.12 0l9.19-9.19a1.5 1.5 0 000-2.12zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.44 11.05l-9.19-9.19a1.5 1.5 0 00-2.12 0L1.13 11.05a1.5 1.5 0 000 2.12l9.19 9.19a1.5 1.5 0 002.12 0l9.19-9.19a1.5 1.5 0 000-2.12z"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </svg>
      <span className="font-headline text-2xl font-bold text-foreground">
        Voyato
      </span>
    </div>
  );
}