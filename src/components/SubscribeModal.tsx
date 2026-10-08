"use client";

import { useEffect, useState } from "react";
import { SUBSCRIBED_KEY, submitSubscribe } from "@/lib/subscribe-client";

function PulseIcon({ live = false }: { live?: boolean }) {
  return (
    <span className={`pulse${live ? " live" : ""}`} aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export default function SubscribeModal() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("Get the resource");
  const [description, setDescription] = useState(
    "Tell us where to send it. You will also get The Brief, our weekday newsletter for HR leaders.",
  );

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ title?: string }>).detail;
      if (detail?.title) {
        setTitle(detail.title);
        setDescription(
          "Tell us where to send it. You will also get The Brief, our weekday newsletter for HR leaders.",
        );
      } else {
        setTitle("Sign up for The Brief");
        setDescription(
          "The weekday newsletter HR leaders read before the first meeting. Free.",
        );
      }
      setError(null);
      setOpen(true);
    };

    window.addEventListener("hrmatics:open-modal", onOpen);
    return () => window.removeEventListener("hrmatics:open-modal", onOpen);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid work email.");
      return;
    }

    setPending(true);
    setError(null);
    try {
      await submitSubscribe({ email, source: "navbar" });
      try {
        window.localStorage.setItem(SUBSCRIBED_KEY, "1");
      } catch {
        // ignore
      }
      form.reset();
      setOpen(false);
      window.dispatchEvent(
        new CustomEvent("hrmatics:toast", {
          detail: { message: "You're subscribed. Watch your inbox for The Brief." },
        }),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not subscribe. Try again.");
    } finally {
      setPending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="modal-scrim open"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="modal-brand" aria-hidden>
          <PulseIcon />
        </div>
        <span className="kicker">HRmatics</span>
        <h3 id="modalTitle">{title}</h3>
        <p>{description}</p>
        <form className="modal-form" onSubmit={submit}>
          <input
            type="email"
            name="email"
            placeholder="Work email"
            aria-label="Work email"
            required
            autoComplete="email"
            autoFocus
            disabled={pending}
          />
          <button className="modal-submit" type="submit" disabled={pending}>
            {pending ? "Saving…" : "Subscribe free"}
          </button>
          {error && (
            <p className="modal-error" role="alert">
              {error}
            </p>
          )}
          <p className="modal-fine">
            Free. Unsubscribe anytime. We only send the weekday brief.
          </p>
        </form>
      </div>
    </div>
  );
}

export function Toast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ message: string }>).detail;
      setMessage(detail.message);
      setVisible(true);
      window.setTimeout(() => setVisible(false), 3400);
    };

    window.addEventListener("hrmatics:toast", handler);
    return () => window.removeEventListener("hrmatics:toast", handler);
  }, []);

  return visible ? (
    <div className="toast show" role="status">
      <PulseIcon /> <span>{message}</span>
    </div>
  ) : null;
}
