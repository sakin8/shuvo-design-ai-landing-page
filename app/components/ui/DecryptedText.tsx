"use client";

import { useEffect, useState, useRef, HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface DecryptedTextProps
  extends Omit<HTMLMotionProps<"span">, "onDrag" | "drag"> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "both";
}

const styles = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute" as const,
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

export default function DecryptedText({
  text,
  speed = 100,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [hasAnimated, setHasAnimated] = useState(false);

  const containerRef = useRef<HTMLSpanElement>(null);

  // 🔥 Scramble on hover / view
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let currentIteration = 0;

    const getNextIndex = (revealed: Set<number>) => {
      switch (revealDirection) {
        case "start":
          return revealed.size;

        case "end":
          return text.length - 1 - revealed.size;

        case "center": {
          const mid = Math.floor(text.length / 2);
          const offset = Math.floor(revealed.size / 2);
          const idx =
            revealed.size % 2 === 0 ? mid + offset : mid - offset - 1;
          return revealed.has(idx) ? revealed.size : idx;
        }
      }
      return revealed.size;
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
      : characters.split("");

    const scramble = (original: string, revealed: Set<number>) => {
      if (useOriginalCharsOnly) {
        const positions = original.split("").map((char, i) => ({
          char,
          space: char === " ",
          revealed: revealed.has(i),
        }));

        const pool = positions
          .filter((p) => !p.space && !p.revealed)
          .map((p) => p.char);

        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }

        let idx = 0;
        return positions
          .map((p) => (p.space ? " " : p.revealed ? p.char : pool[idx++]))
          .join("");
      }

      return original
        .split("")
        .map((char, i) =>
          char === " " || revealed.has(i)
            ? char
            : availableChars[Math.floor(Math.random() * availableChars.length)]
        )
        .join("");
    };

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices((prev) => {
          if (sequential) {
            if (prev.size < text.length) {
              const next = getNextIndex(prev);
              const updated = new Set(prev);
              updated.add(next);
              setDisplayText(scramble(text, updated));
              return updated;
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              return prev;
            }
          }

          setDisplayText(scramble(text, prev));
          currentIteration++;

          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            setIsScrambling(false);
            setDisplayText(text);
          }
          return prev;
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => clearInterval(interval);
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
  ]);

  // 🔥 Trigger animation on view
  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "both") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated) {
            setIsHovering(true);
            setHasAnimated(true);
          }
        }
      },
      { threshold: 0.1 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [animateOn, hasAnimated]);

  // hover triggers
  const hoverProps =
    animateOn === "hover" || animateOn === "both"
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  return (
    <motion.span
      ref={containerRef}
      className={parentClassName}
      style={styles.wrapper}
      {...hoverProps}
      {...props}
    >
      <span style={styles.srOnly}>{displayText}</span>

      <span aria-hidden="true">
        {displayText.split("").map((char, i) => {
          const revealed =
            revealedIndices.has(i) || !isScrambling || !isHovering;

          return (
            <span key={i} className={revealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
