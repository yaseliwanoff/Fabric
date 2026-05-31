type ScrollListener = () => void;

const listeners = new Set<ScrollListener>();

let syncedScrollY: number | null = null;

export function getScrollY(): number {
  if (syncedScrollY !== null) {
    return syncedScrollY;
  }

  if (typeof window === "undefined") {
    return 0;
  }

  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function setScrollY(value: number): void {
  syncedScrollY = value;
}

export function subscribeToScroll(listener: ScrollListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitScroll(): void {
  listeners.forEach((listener) => listener());
}
