/**
 * Scroll-linked panel arrival for .article-body
 * — zooms up into place as you scroll (not a one-shot on enter).
 * Motion CDN when available; CSS view() timelines handle most modern browsers
 * (see theme.css). This script is a fallback + progressive enhancement.
 */
const reduce =
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const supportsViewTimeline =
  typeof CSS !== "undefined" &&
  typeof CSS.supports === "function" &&
  CSS.supports("animation-timeline", "view()");

if (reduce || supportsViewTimeline) {
  /* CSS handles scroll-linked motion, or user asked for none */
} else {
  try {
    const { animate, scroll } = await import(
      "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm"
    );

    document.querySelectorAll(".article-body").forEach((element) => {
      element.style.transformOrigin = "center top";

      scroll(
        animate(
          element,
          {
            opacity: [0.15, 1],
            transform: [
              "scale(0.88) translateY(5.5rem)",
              "scale(1) translateY(0)",
            ],
          },
          { ease: "linear" },
        ),
        {
          target: element,
          /* start when panel top hits viewport bottom → settle when top is ~1/4 down */
          offset: ["start end", "start 25%"],
        },
      );
    });
  } catch {
    /* leave static */
  }
}
