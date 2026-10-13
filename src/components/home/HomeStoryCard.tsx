import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import { formatPublishDate } from "@/lib/format-date";
import { storyHref } from "@/lib/story-link";
import type { TopicStory } from "@/lib/topic-stories";

export default function HomeStoryCard({ story }: { story: TopicStory }) {
  const href = storyHref(story);

  return (
    <article className="hr-story">
      <Link href={href} className="hr-story-media" aria-label={story.title}>
        <CoverImage
          src={story.coverImageUrl}
          alt={story.coverImageAlt}
          seed={story.slug}
          label={story.category}
          sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
        />
      </Link>
      <div className="hr-story-copy">
        <span className="hr-story-meta">
          {story.topicName} · {story.readMinutes} min
          {story.publishedAt ? (
            <>
              {" "}
              ·{" "}
              <time dateTime={story.publishedAt}>
                {formatPublishDate(story.publishedAt)}
              </time>
            </>
          ) : null}
        </span>
        <h3>
          <Link href={href}>{story.title}</Link>
        </h3>
        <p>{story.dek}</p>
      </div>
    </article>
  );
}
