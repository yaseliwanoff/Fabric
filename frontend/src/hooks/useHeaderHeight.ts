import { useEffect } from "react";

const HEADER_SELECTOR = "header";

export function useHeaderHeight() {
  useEffect(() => {
    const header = document.querySelector(HEADER_SELECTOR);
    if (!header) {
      return;
    }

    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`,
      );
    };

    setHeight();

    const observer = new ResizeObserver(setHeight);
    observer.observe(header);
    window.addEventListener("resize", setHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", setHeight);
    };
  }, []);
}
