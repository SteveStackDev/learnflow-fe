import { useEffect } from "react";

export function useScrollReveal(selector = ".reveal-card, [class*='reveal-card']", deps = []) {
  useEffect(() => {
    let delay = 0;
    let timeoutId;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${delay * 100}ms`;
            entry.target.classList.add("reveal-card--visible");

            Array.from(entry.target.classList).forEach((cls) => {
              if (cls.includes("reveal-card") && !cls.includes("--visible")) {
                entry.target.classList.add(`${cls}--visible`);
              }
            });

            delay++;
            obs.unobserve(entry.target);
          }
        });

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          delay = 0;
        }, 150);
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (!el.classList.contains("reveal-card--visible")) {
          observer.observe(el);
        }
      });
    };

    // Initial check
    const timer = setTimeout(observeAll, 50);

    // MutationObserver to catch dynamically added cards after loading
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutId);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [selector, ...deps]);
}

export default useScrollReveal;
