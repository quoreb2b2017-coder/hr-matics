import { getTopicConfig } from "@/lib/topic-config";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from "@/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const revalidate = 300;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getTopicConfig(slug);

  return renderShareImage({
    title: config?.title ?? "HRmatics",
    dek: config?.description,
    kicker: config?.kicker ?? "Topic",
  });
}
