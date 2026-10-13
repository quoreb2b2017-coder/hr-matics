import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import LinkedInMark from "@/components/LinkedInMark";
import CookiePreferencesTrigger from "@/components/CookiePreferencesTrigger";
import { getNavTopics } from "@/lib/topic-config";
import { LINKEDIN_PAGE } from "@/lib/site";

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
                className="social-linkedin"
                href={LINKEDIN_PAGE}
                aria-label="HRmatics on LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedInMark size={22} />
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
              <Link href="/privacy">Privacy</Link>
              <Link href="/privacy#cookies">Cookies</Link>
              <CookiePreferencesTrigger className="foot-cookie-prefs" />
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <span className="legal">
            © {year} HRmatics. Independent publication.{" "}
            <Link href="/privacy">Privacy</Link>
            {" · "}
            <Link href="/about#standards">Terms</Link>
            {" · "}
            <CookiePreferencesTrigger className="foot-cookie-prefs" />
          </span>
          <span className="pubnote">Published by Quore B2B Marketing.</span>
        </div>
      </div>
    </footer>
  );
}
