"use client";

export function openSubscribeModal() {
  window.dispatchEvent(new CustomEvent("hrmatics:open-modal"));
}

export default function SubscribeButton({
  className,
  children = "Subscribe",
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openSubscribeModal();
      }}
    >
      {children}
    </button>
  );
}
