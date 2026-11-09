/**
 * The three-bar E from the logo, used as the brand's motion signature.
 * Proportions follow the logo: top and bottom bars full width in teal,
 * middle bar slightly shorter in the ink colour.
 * Bars carry data-e-bar so GSAP timelines can target them.
 */
export function EMotif({
  className,
  ink = "currentColor",
  accent = "var(--color-teal)",
  title,
}: {
  className?: string;
  ink?: string;
  accent?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 313 302"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect data-e-bar="1" x="0" y="0" width="313" height="63" fill={accent} />
      <rect data-e-bar="2" x="0" y="120" width="299" height="63" fill={ink} />
      <rect data-e-bar="3" x="0" y="239" width="313" height="63" fill={accent} />
    </svg>
  );
}
