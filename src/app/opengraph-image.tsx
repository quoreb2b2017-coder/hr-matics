import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from "@/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const revalidate = 300;

export default function Image() {
  return renderShareImage({
    title: "The People Operations Brief",
    dek: "Compliance, talent, rewards, HR technology, and culture for the people who run people operations.",
    kicker: "HRmatics",
  });
}
