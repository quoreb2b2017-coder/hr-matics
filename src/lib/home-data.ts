import { getNavTopics } from "@/lib/topic-config";
import { getLatestArticlesPublic } from "@/lib/articles";
import { articlesToStories, type TopicStory } from "@/lib/topic-stories";
import type { TopicConfig } from "@/lib/topic-config";

export type HomeTopicSection = {
  config: TopicConfig;
  stories: TopicStory[];
};

export type HomePageData = {
  lead: TopicStory | null;
  latestStories: TopicStory[];
  briefStories: TopicStory[];
  topicSections: HomeTopicSection[];
};

/** Organize homepage stories: hero + latest grid + per-topic sections. */
export async function getHomePageData(): Promise<HomePageData> {
  const navTopics = getNavTopics().filter((t) => t.slug !== "playbooks");

  // Public client + slim columns (no body_json) — keeps ISR fast
  const allArticles = await getLatestArticlesPublic(40);
  const allStories = articlesToStories(allArticles);

  const byTopic = new Map<string, TopicStory[]>();
  for (const story of allStories) {
    const slug = story.topicSlug ?? "";
    if (!slug) continue;
    const arr = byTopic.get(slug) ?? [];
    arr.push(story);
    byTopic.set(slug, arr);
  }

  const topicSections: HomeTopicSection[] = navTopics
    .map((config) => ({
      config,
      stories: (byTopic.get(config.slug) ?? []).slice(0, 3),
    }))
    .filter((s) => s.stories.length > 0);

  const lead = allStories[0] ?? null;
  const latestStories = allStories.slice(lead ? 1 : 0, 13);

  const briefStories = topicSections
    .map((s) => s.stories[0])
    .filter((s): s is TopicStory => Boolean(s));

  return { lead, latestStories, briefStories, topicSections };
}
