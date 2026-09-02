"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getNavTopics } from "@/lib/topic-config";

export default function MobileNav({
  currentTopicSlug,
}: {
  currentTopicSlug?: string;
}) {
  const [open, setOpen] = useState(false);
  const navTopics = getNavTopics();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="icon-btn hamburger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      <aside
        className={`drawer${open ? " open" : ""}`}
        aria-hidden={!open}
        aria-label="Site menu"
      >
        <button
          type="button"
          className="drawer-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {navTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topic/${topic.slug}`}
            className={`drawer-link${
              currentTopicSlug === topic.slug ? " active" : ""
            }`}
            onClick={() => setOpen(false)}
          >
            {topic.navLabel}
          </Link>
        ))}
        <button
          type="button"
          className="btn-sub"
          onClick={() => {
            setOpen(false);
            window.location.href = "/#nl";
          }}
        >
          Subscribe
        </button>
      </aside>
    </div>
  );
}
