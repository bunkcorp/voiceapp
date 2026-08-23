"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

const NEAR_EDGE_PX = 96;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useStickyThreadScroll(
  resetKey: string | number | null,
  contentEpoch = 0
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const followBottomRef = useRef(true);
  const [showJumpTop, setShowJumpTop] = useState(false);
  const [showJumpBottom, setShowJumpBottom] = useState(false);

  const syncMetrics = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }

    const overflow = el.scrollHeight - el.clientHeight > 8;
    const atTop = el.scrollTop <= NEAR_EDGE_PX;
    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight <= NEAR_EDGE_PX;

    followBottomRef.current = atBottom;
    setShowJumpTop(overflow && !atTop);
    setShowJumpBottom(overflow && !atBottom);
  }, []);

  const pinToBottomIfFollowing = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !followBottomRef.current) {
      return;
    }
    el.scrollTop = el.scrollHeight;
  }, []);

  const forceToBottom = useCallback(() => {
    followBottomRef.current = true;
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const el = scrollRef.current;
      if (!el) {
        return;
      }
      followBottomRef.current = true;
      el.scrollTo({
        top: el.scrollHeight,
        behavior: prefersReducedMotion() ? "auto" : behavior,
      });
      requestAnimationFrame(syncMetrics);
    },
    [syncMetrics]
  );

  const scrollToTop = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const el = scrollRef.current;
      if (!el) {
        return;
      }
      followBottomRef.current = false;
      el.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : behavior,
      });
      requestAnimationFrame(syncMetrics);
    },
    [syncMetrics]
  );

  useLayoutEffect(() => {
    followBottomRef.current = true;
    forceToBottom();
    const frame = requestAnimationFrame(() => {
      forceToBottom();
      syncMetrics();
    });
    return () => cancelAnimationFrame(frame);
  }, [forceToBottom, resetKey, syncMetrics]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }

    const onScroll = () => {
      syncMetrics();
    };

    const onContentChange = () => {
      pinToBottomIfFollowing();
      syncMetrics();
    };

    const observer = new ResizeObserver(onContentChange);
    observer.observe(el);
    const inner = el.firstElementChild;
    if (inner) {
      observer.observe(inner);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onContentChange);
    onContentChange();

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onContentChange);
    };
  }, [contentEpoch, pinToBottomIfFollowing, resetKey, syncMetrics]);

  return {
    scrollRef,
    showJumpTop,
    showJumpBottom,
    scrollToTop,
    scrollToBottom,
    followLatest: pinToBottomIfFollowing,
  };
}
