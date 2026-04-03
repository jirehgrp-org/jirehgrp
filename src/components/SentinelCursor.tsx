// @/components/SentinelCursor.tsx

"use client";

import { useEffect, useRef } from "react";

export default function SentinelCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(6)";
    };

    const handleMouseLeave = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const links = Array.from(document.querySelectorAll("a, button"));

    document.addEventListener("mousemove", handleMove);
    links.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return <div id="sentinel" ref={cursorRef} />;
}