"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Carrega o react-confetti só no cliente e fora do bundle inicial.
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [size, setSize] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [done]);

  if (done || !size) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      recycle={false}
      numberOfPieces={500}
      onConfettiComplete={() => setDone(true)}
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    />
  );
}
