import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  variant?: "default" | "onDark";
  showWordmark?: boolean;
  className?: string;
};

export default function BrandLogo({
  href = "/",
  variant = "default",
  showWordmark = true,
  className = "",
}: BrandLogoProps) {
  const onDark = variant === "onDark";

  return (
    <Link
      href={href}
      className={`brand ${onDark ? "brand--dark" : ""} ${className}`.trim()}
      aria-label="HRmatics home"
    >
      <span className="mark" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </span>
      {showWordmark && (
        <span className="name">
          HR<em>matics</em>
        </span>
      )}
    </Link>
  );
}
