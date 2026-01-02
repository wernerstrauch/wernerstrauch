/**
 * Scroll-triggered animations using IntersectionObserver
 * Adds 'is-visible' class to elements when they enter the viewport
 */

const ANIMATION_CLASSES = [
  "animate-on-scroll",
  "fade-up",
  "scale-up",
  "slide-left",
  "slide-right",
  "blur-in",
  "stagger-children",
];

const SELECTOR = ANIMATION_CLASSES.map((cls) => `.${cls}`).join(", ");

function initAnimations() {
  const animatedElements = document.querySelectorAll(SELECTOR);

  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Once visible, stop observing
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}

// Re-init on Astro page transitions
document.addEventListener("astro:after-swap", initAnimations);

export { initAnimations };
