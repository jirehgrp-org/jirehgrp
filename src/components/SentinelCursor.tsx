// @/components/SentinelCursor.tsx

"use client";
import { useEffect, useRef } from "react";

export default function SentinelCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element &&
      el.closest("a, button, input, textarea, select, [data-cursor]");

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) ring.classList.add("is-active");
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) ring.classList.remove("is-active");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="sentinel" ref={dotRef} />
      <div id="sentinel-ring" ref={ringRef} />
    </>
  );
}