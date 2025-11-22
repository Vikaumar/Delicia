// src/components/ScrollToTopButton.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1

  const btnRef = useRef(null);
  const ringRef = useRef(null);
  const arrowRef = useRef(null);

  // SVG circle math
  const R = 18;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docHeight =
        Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) -
        window.innerHeight;
      const pct = docHeight > 0 ? Math.min(1, scrolled / docHeight) : 0;
      setProgress(pct);
      setVisible(scrolled > 150); // show after 150px
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate progress ring when `progress` changes
  useEffect(() => {
    if (!ringRef.current) return;
    const toOffset = C * (1 - progress);
    // smooth tween the stroke-dashoffset
    gsap.to(ringRef.current, {
      duration: 0.45,
      ease: "power1.out",
      attr: { "stroke-dashoffset": toOffset },
    });
  }, [progress]);

  // Entrance animation when button mounts (i.e., when visible becomes true)
  useEffect(() => {
    if (!visible || !btnRef.current) return;
    const el = btnRef.current;
    gsap.fromTo(
      el,
      { y: 18, scale: 0.82, autoAlpha: 0 },
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.7,
        ease: "back.out(1.6)",
      }
    );
  }, [visible]);

  // Hover animations using GSAP for a springy feel
  const handleMouseEnter = () => {
    if (!btnRef.current) return;
    gsap.killTweensOf(btnRef.current);
    gsap.to(btnRef.current, { duration: 0.24, scale: 1.08, ease: "power2.out" });
    if (arrowRef.current) gsap.to(arrowRef.current, { duration: 0.28, y: -4, ease: "power2.out" });
  };
  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { duration: 0.34, scale: 1, ease: "elastic.out(1, 0.6)" });
    if (arrowRef.current) gsap.to(arrowRef.current, { duration: 0.4, y: 0, ease: "elastic.out(1, 0.6)" });
  };

  const scrollToTop = () => {
    // smooth GSAP scroll with easing
    gsap.to(window, { duration: 0.8, ease: "power2.inOut", scrollTo: { y: 0 } });
  };

  if (!visible) return null;

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Scroll to top"
      title="Back to top"
      style={{
        position: "fixed",
        right: 20,
        bottom: 98,
        zIndex: 9999,
        width: 56,
        height: 56,
        borderRadius: "999px",
        background: "#fff",
        boxShadow: "0 8px 20px rgba(15,23,42,0.12)",
        border: "1px solid rgba(15,23,42,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: 0,
        overflow: "visible",
        // start slightly hidden (GSAP entrance will handle)
        opacity: 1,
        transformOrigin: "center center",
      }}
    >
      {/* Progress ring (behind icon). rotated so 0% is at top */}
      <svg
        ref={ringRef}
        viewBox="0 0 48 48"
        width="56"
        height="56"
        style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          stroke="#f3f4f6"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          ref={ringRef}
          cx="24"
          cy="24"
          r={R}
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          style={{ transition: "none" /* GSAP handles tweening */ }}
        />
      </svg>

      {/* Arrow icon */}
      <svg
        ref={arrowRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        style={{
          position: "relative",
          zIndex: 2,
          color: "#111827",
          display: "block",
          pointerEvents: "none",
        }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="16" x2="12" y2="8" />
        <polyline points="8,12 12,8 16,12" />
      </svg>
    </button>
  );
}
