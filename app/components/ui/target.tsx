"use client";

import {
  useRef,
  useState,
  useEffect,
  ReactNode,
  HTMLAttributes,
} from "react";

interface TargetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  radius?: number;
  glowColor?: string;
  opacity?: number;
}

export default function Target({
  children,
  radius = 200,
  glowColor = "rgba(0, 255, 200, 0.35)",
  opacity = 0.45,
  ...props
}: TargetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const leave = () => {
      setCoords({ x: -9999, y: -9999 });
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl" {...props}>
      {/* spotlight */}
      <div
        className="pointer-events-none absolute rounded-full blur-[80px]"
        style={{
          width: radius,
          height: radius,
          left: coords.x - radius / 2,
          top: coords.y - radius / 2,
          background: glowColor,
          opacity,
          transition: "opacity 0.25s ease",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
