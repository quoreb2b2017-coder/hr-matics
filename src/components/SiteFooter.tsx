import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { getNavTopics } from "@/lib/topic-config";

export default function SiteFooter() {
  const navTopics = getNavTopics();
  const year = new Date().getFullYear();

  return (
    <footer className="hr-foot">
      <div className="wrap">
        <div className="foot-cta">
          <div className="foot-cta-copy">
            <span className="foot-cta-label">Stay ahead</span>
            <h3>The weekday brief for HR leaders</h3>
            <p>Compliance, talent, rewards, tech, and culture — one email.</p>
          </div>
          <form className="foot-cta-form js-fake-subscribe" data-source="footer">
            <input
              type="email"
              name="email"
              placeholder="Work email"
              aria-label="Work email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="foot-top">
          <div className="foot-brand">
            <BrandLogo />
            <p>
              Intelligence and playbooks for the people who run people
              operations. Independent reporting for HR leaders.
            </p>
            <div className="socials">
              <a
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4V8zM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24H8V8z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                aria-label="X"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.9 2h3.3l-7.2 8.2L23.6 22h-6.6l-5.2-6.8L5.9 22H2.6l7.7-8.8L2 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20z" />
                </svg>
              </a>
              <a href="/sitemap.xml" aria-label="Sitemap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <circle cx="6" cy="18" r="2.2" />
                  <path d="M4 11a9 9 0 0 1 9 9h2.8A11.8 11.8 0 0 0 4 8.2V11zm0-5.6A14.6 14.6 0 0 1 18.6 20H21.4A17.4 17.4 0 0 0 4 2.6v2.8z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="foot-cols">
            <div className="foot-col">
              <h5>Desks</h5>
              {navTopics.map((topic) => (
                <Link key={topic.slug} href={`/topic/${topic.slug}`}>
                  {topic.navLabel}
                </Link>
              ))}
            </div>

            <div className="foot-col">
              <h5>Company</h5>
              <Link href="/about">About</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/about#contact">Contact</Link>
              <Link href="/about#advertise">Advertise</Link>
            </div>

            <div className="foot-col">
              <h5>Readers</h5>
              <Link href="/#nl">Newsletter</Link>
              <Link href="/topic/playbooks">Playbooks</Link>
              <Link href="/about#standards">Privacy</Link>
              <Link href="/about#standards">Terms</Link>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <span className="legal">
            © {year} HRmatics. Independent publication.{" "}
            <Link href="/about#standards">Privacy</Link>
            {" · "}
            <Link href="/about#standards">Terms</Link>
          </span>
          <span className="pubnote">A Demandmatics media property</span>
        </div>
      </div>
    </footer>
  );
}
