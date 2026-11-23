"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";

// Carrega o react-confetti só no cliente e fora do bundle inicial.
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToResize(callback) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function subscribeToReducedMotion(callback) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

const getServerSnapshot = () => null;

export default function Confetti() {
  const [done, setDone] = useState(false);

  const width = useSyncExternalStore(
    subscribeToResize,
    () => window.innerWidth,
    getServerSnapshot,
  );
  const height = useSyncExternalStore(
    subscribeToResize,
    () => window.innerHeight,
    getServerSnapshot,
  );
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    getServerSnapshot,
  );

  if (done || prefersReducedMotion !== false || width === null) return null;

  return (
    <ReactConfetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      onConfettiComplete={() => setDone(true)}
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    />
  );
}
