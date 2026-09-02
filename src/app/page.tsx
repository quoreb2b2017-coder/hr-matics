import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HomeHero from "@/components/home/HomeHero";
import HomeBrief from "@/components/home/HomeBrief";
import HomeLatestGrid from "@/components/home/HomeLatestGrid";
import HomeTopicSection from "@/components/home/HomeTopicSection";
import { getHomePageData } from "@/lib/home-data";

export const revalidate = 300;

export default async function Page() {
  const { lead, latestStories, briefStories, topicSections } =
    await getHomePageData();

  const hasContent = Boolean(lead);

  return (
    <>
      <SiteHeader />
      <main className="home-main">
        {lead ? (
          <HomeHero lead={lead} />
        ) : (
          <section className="hr-hero hr-hero--empty">
            <div className="wrap">
              <span className="kicker">HRmatics</span>
              <h1>People operations intelligence, published daily</h1>
              <p className="hr-hero-dek">
                Generate your first story from the admin panel — one topic at a
                time with research, full articles, and cover images.
              </p>
              <Link href="/admin/articles/new#generate" className="hr-hero-cta">
                Generate content
              </Link>
            </div>
          </section>
        )}

        <HomeLatestGrid stories={latestStories} />

        <HomeBrief stories={briefStories} />

        {hasContent && topicSections.length > 0 && (
          <div className="hr-desks">
            {topicSections.map((section) => (
              <HomeTopicSection
                key={section.config.slug}
                config={section.config}
                stories={section.stories}
              />
            ))}
          </div>
        )}

        <section className="hr-news" id="nl">
          <div className="wrap">
            <div className="hr-news-grid">
              <div className="hr-news-copy">
                <span className="kicker">Newsletter</span>
                <h2>The daily brief for HR leaders</h2>
                <p>
                  Compliance, talent, rewards, HR tech, and culture — one email,
                  every weekday.
                </p>
              </div>
              <div className="hr-news-form-wrap">
                <form className="hr-news-form js-fake-subscribe" data-source="home">
                  <input
                    type="email"
                    name="email"
                    placeholder="Work email"
                    aria-label="Work email"
                    required
                  />
                  <button type="submit">Subscribe</button>
                </form>
                <p className="hr-news-note">Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
