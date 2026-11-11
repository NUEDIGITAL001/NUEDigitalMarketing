import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";

const base =
  "ui-text inline-flex items-center justify-center gap-3 rounded-xs transition-[background-color,color,border-color,transform] duration-(--dur-micro) ease-(--ease-out-expo) select-none";

const variants: Record<Variant, string> = {
  primary:
    "sheen bg-teal text-obsidian px-6 py-3.5 font-semibold hover:bg-ice active:translate-y-px",
  secondary:
    "border border-titanium/60 text-white px-6 py-3.5 hover:border-teal hover:text-ice active:translate-y-px",
  text: "text-white underline-offset-8 decoration-teal hover:underline px-0 py-1",
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 20 12"
      className="h-3 w-5 transition-transform duration-(--dur-micro) ease-(--ease-out-expo) group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  track,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  /** label recorded on the cta_click event */
  track?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children">) {
  return (
    <Link
      href={href}
      className={`group ${base} ${variants[variant]} ${className}`}
      data-cta={track}
      {...rest}
    >
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  arrow = false,
  className = "",
  ...rest
}: { children: ReactNode; variant?: Variant; arrow?: boolean } & ComponentProps<"button">) {
  return (
    <button className={`group ${base} ${variants[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
