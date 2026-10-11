import { getArticleBySlug } from "@/lib/articles";
import {
  OG_ALT,
  OG_CONTENT_TYPE,
  OG_SIZE,
  coverDataUrl,
  renderShareImage,
} from "@/lib/og-image";

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
  const article = await getArticleBySlug(slug);
  const photo = await coverDataUrl(article?.cover_image_url);

  return renderShareImage({
    title: article?.title ?? "HRmatics",
    dek: article?.dek,
    kicker: article?.topic?.name ?? "The Brief",
    photo,
  });
}
