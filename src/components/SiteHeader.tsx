import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import BrandLogo from "@/components/BrandLogo";
import MobileNav from "@/components/MobileNav";
import HeaderSpacer from "@/components/HeaderSpacer";
import FlagTicker from "@/components/FlagTicker";
import SubscribeButton from "@/components/SubscribeButton";
import { getNavTopics } from "@/lib/topic-config";

function todayLabel() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());
}

export default function SiteHeader({
  currentTopicSlug,
}: {
  currentTopicSlug?: string;
} = {}) {
  const navTopics = getNavTopics();

  return (
    <>
      <div className="flag">
        <div className="wrap flag-inner">
          <span className="flag-date">{todayLabel()}</span>
          <div className="flag-ticker">
            <span className="ticker-label">
              <span className="pulse live" aria-hidden>
                <span />
                <span />
                <span />
                <span />
              </span>
              Live
            </span>
            <FlagTicker />
          </div>
          <SubscribeButton className="flag-cta">Get the brief →</SubscribeButton>
        </div>
      </div>

      <header className="site-header mast">
        <div className="wrap mast-inner">
          <BrandLogo />
          <nav className="topics-nav" aria-label="Topics">
            {navTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topic/${topic.slug}`}
                className={
                  currentTopicSlug === topic.slug
                    ? "topic-link active"
                    : "topic-link"
                }
              >
                {topic.navLabel}
              </Link>
            ))}
          </nav>
          <div className="mast-actions">
            <SearchBar />
            <SubscribeButton className="btn-sub desktop-only" />
            <MobileNav currentTopicSlug={currentTopicSlug} />
          </div>
        </div>
      </header>
      <HeaderSpacer />
    </>
  );
}
