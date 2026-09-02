import HomeStoryCard from "@/components/home/HomeStoryCard";
import type { TopicStory } from "@/lib/topic-stories";

export default function HomeLatestGrid({
  stories,
}: {
  stories: TopicStory[];
}) {
  if (stories.length === 0) return null;

  return (
    <section className="hr-latest">
      <div className="wrap">
        <header className="hr-latest-head">
          <span className="hr-latest-label">Latest</span>
          <h2>More from the desk</h2>
        </header>
        <div className="hr-story-grid">
          {stories.map((story) => (
            <HomeStoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
