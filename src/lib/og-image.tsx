import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "HRmatics";

const INK = "#1f1725";
const PAPER = "#faf7f4";
const SIGNAL = "#ee6a4d";

function fit(text: string, max: number): string {
  const value = text.replace(/\s+/g, " ").trim();
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  const breakAt = cut.lastIndexOf(" ");
  const core = (breakAt > 24 ? cut.slice(0, breakAt) : cut).replace(
    /[\s,.;:!?-]+$/g,
    "",
  );
  return `${core}…`;
}

/** Ask Pexels for a wide file. LinkedIn ignores images under 1200px. */
export function enlargeCoverUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "images.pexels.com") {
      parsed.searchParams.set("auto", "compress");
      parsed.searchParams.set("cs", "tinysrgb");
      parsed.searchParams.delete("dpr");
      parsed.searchParams.delete("h");
      parsed.searchParams.set("w", "1600");
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}

export async function coverDataUrl(
  url: string | null | undefined,
): Promise<string | null> {
  const src = enlargeCoverUrl(url);
  if (!src) return null;
  try {
    const res = await fetch(src, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const type = (res.headers.get("content-type") || "image/jpeg")
      .split(";")[0]
      .trim();
    if (!type.startsWith("image/")) return null;
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length < 800 || bytes.length > 4_500_000) return null;
    return `data:${type};base64,${bytes.toString("base64")}`;
  } catch {
    return null;
  }
}

export function renderShareImage(input: {
  title: string;
  dek?: string | null;
  kicker?: string | null;
  photo?: string | null;
}) {
  const title = fit(input.title || "HRmatics", 92);
  const dek = input.dek ? fit(input.dek, 140) : "";
  const kicker = fit(input.kicker || "The People Operations Brief", 42);
  const titleSize = title.length > 64 ? 42 : 52;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          color: PAPER,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: input.photo ? 680 : 1200,
            height: "100%",
            padding: "56px 60px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 22,
              letterSpacing: 3,
              color: SIGNAL,
              fontWeight: 700,
            }}
          >
            HRMATICS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 1.5,
                color: SIGNAL,
                marginBottom: 18,
              }}
            >
              {kicker.toUpperCase()}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: titleSize,
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: -0.5,
              }}
            >
              {title}
            </div>
            {dek ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 22,
                  fontSize: 24,
                  lineHeight: 1.35,
                  color: "#d9d0c8",
                }}
              >
                {dek}
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#b7aea6" }}>
            hrmatics.net
          </div>
        </div>
        {input.photo ? (
          <img
            src={input.photo}
            alt=""
            width={520}
            height={630}
            style={{ objectFit: "cover", width: 520, height: 630 }}
          />
        ) : null}
      </div>
    ),
    { ...OG_SIZE },
  );
}
