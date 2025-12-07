"use client";

import React, { useState, useEffect, useRef, ReactNode, HTMLAttributes } from "react";

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  debug?: boolean;
}

const clamp = (v: number, a = -9999, b = 9999) => Math.max(a, Math.min(b, v));

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 120,
  disabled = false,
  magnetStrength = 8,
  activeTransition = "transform 0.18s cubic-bezier(.22,.9,.36,1)",
  inactiveTransition = "transform 0.45s cubic-bezier(.22,.9,.36,1)",
  wrapperClassName = "",
  innerClassName = "",
  debug = false,
  ...props
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const magnetRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0, active: false });
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 });
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      setIsActive(false);
      posRef.current = { x: 0, y: 0 };
      return;
    }

    const el = magnetRef.current;
    if (!el) return;

    // bounding rect helper
    const getRect = () => el.getBoundingClientRect();

    // pointer handler (mouse + touch unified)
    const handlePointer = (clientX: number, clientY: number) => {
      const rect = getRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = Math.abs(centerX - clientX);
      const distY = Math.abs(centerY - clientY);

      // quick check: if pointer is inside padded region
      const inside = distX < rect.width / 2 + padding && distY < rect.height / 2 + padding;

      if (inside) {
        targetRef.current.active = true;
        targetRef.current.x = (clientX - centerX) / magnetStrength;
        targetRef.current.y = (clientY - centerY) / magnetStrength;
        if (!isActive) setIsActive(true);
      } else {
        targetRef.current.active = false;
        targetRef.current.x = 0;
        targetRef.current.y = 0;
        if (isActive) setIsActive(false);
      }
    };

    // mouse move (throttled by time)
    let lastRun = 0;
    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // throttle: 12-16ms (~60-85hz)
      if (now - lastRun < 12) return;
      lastRun = now;
      handlePointer(e.clientX, e.clientY);
    };

    const onTouch = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onLeave = () => {
      targetRef.current.active = false;
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      if (isActive) setIsActive(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("mouseenter", onMouseMove as any);
    el.addEventListener("mouseleave", onLeave as any);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouch);
      el.removeEventListener("mouseenter", onMouseMove as any);
      el.removeEventListener("mouseleave", onLeave as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [padding, disabled, magnetStrength, isActive]);

  // animation loop to interpolate toward target for smoothness
  useEffect(() => {
    const tick = () => {
      const cur = posRef.current;
      const tgt = targetRef.current;
      // lerp
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      // smoothing factor
      const smoothing = 0.18;

      const nx = lerp(cur.x, tgt.x, smoothing);
      const ny = lerp(cur.y, tgt.y, smoothing);

      // small clamp to avoid sub-pixel jitter
      posRef.current = { x: Math.abs(nx) < 0.001 ? 0 : nx, y: Math.abs(ny) < 0.001 ? 0 : ny };

      if (mountedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  // write transform to DOM via style for best perf
  useEffect(() => {
    const el = magnetRef.current;
    if (!el) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;

    const apply = () => {
      const { x, y } = posRef.current;
      inner.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      inner.style.transition = isActive ? activeTransition : inactiveTransition;
      inner.style.willChange = "transform";
    };

    // small RAF-based writer for smoother updates and to batch writes
    let rafW: number | null = null;
    const writer = () => {
      apply();
      rafW = requestAnimationFrame(writer);
    };
    rafW = requestAnimationFrame(writer);

    return () => {
      if (rafW) cancelAnimationFrame(rafW);
    };
  }, [isActive, activeTransition, inactiveTransition]);

  // debug logging optional
  useEffect(() => {
    if (!debug) return;
    const id = setInterval(() => {
      console.log("magnet pos", posRef.current, "target", targetRef.current, "active", isActive);
    }, 1000);
    return () => clearInterval(id);
  }, [debug, isActive]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block", touchAction: "none" }}
      {...props}
    >
      <div className={innerClassName} style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
};

export default Magnet;
