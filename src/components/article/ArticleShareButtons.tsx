"use client";

import { useState } from "react";
import LinkedInMark from "@/components/LinkedInMark";

const LINKEDIN_COMPANY = "https://www.linkedin.com/showcase/hrmatics/posts/";

function linkedInShareHref(pageUrl: string) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
}

export default function ArticleShareButtons({
  url,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can fail on insecure contexts; ignore.
    }
  }

  return (
    <div className="art-share" role="group" aria-label="Share this article">
      <button
        type="button"
        className="art-share-btn art-share-copy"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Copied" : "Copy link"}
      >
        {copied ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M10 14a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 5.93"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 10a5 5 0 0 0-7.07 0L4.81 12.12a5 5 0 0 0 7.07 7.07L13 18.07"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <a
        className="art-share-btn art-share-native"
        href={linkedInShareHref(url)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="18" cy="5" r="2.4" fill="currentColor" />
          <circle cx="6" cy="12" r="2.4" fill="currentColor" />
          <circle cx="18" cy="19" r="2.4" fill="currentColor" />
          <path
            d="M8.1 10.9l7.8-4.3M8.1 13.1l7.8 4.3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </a>

      <a
        className="art-share-btn art-share-li"
        href={LINKEDIN_COMPANY}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="HRmatics on LinkedIn"
        title="HRmatics on LinkedIn"
      >
        <LinkedInMark size={20} />
      </a>
    </div>
  );
}
