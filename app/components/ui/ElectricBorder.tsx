"use client";

import React, {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
} from "react";

type ElectricBorderProps = PropsWithChildren<{
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}>;

export default function ElectricBorder({
  children,
  color = "#5227FF",
  speed = 1,
  chaos = 1,
  thickness = 2,
  className,
  style,
}: ElectricBorderProps) {
  const rawId = useId().replace(/[:]/g, "");
  const filterId = `electric-border-${rawId}`;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const strokeRef = useRef<HTMLDivElement | null>(null);

  const updateAnimation = () => {
    const svg = svgRef.current;
    const host = containerRef.current;
    if (!svg || !host) return;

    const width = host.clientWidth;
    const height = host.clientHeight;

    const dyAnims = Array.from(
      svg.querySelectorAll<SVGAnimateElement>(
        'feOffset > animate[attributeName="dy"]'
      )
    );
    const dxAnims = Array.from(
      svg.querySelectorAll<SVGAnimateElement>(
        'feOffset > animate[attributeName="dx"]'
      )
    );

    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute("values", `${height}; 0`);
      dyAnims[1].setAttribute("values", `0; -${height}`);
    }

    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute("values", `${width}; 0`);
      dxAnims[1].setAttribute("values", `0; -${width}`);
    }

    const dur = 6 / speed;
    [...dxAnims, ...dyAnims].forEach((a) => a.setAttribute("dur", `${dur}s`));

    const disp = svg.querySelector("feDisplacementMap");
    if (disp) disp.setAttribute("scale", String(30 * chaos));

    if (strokeRef.current)
      strokeRef.current.style.filter = `url(#${filterId})`;
  };

  useLayoutEffect(() => {
    updateAnimation();
  }, []);

  useEffect(() => {
    updateAnimation();
  }, [speed, chaos]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => updateAnimation());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-visible isolate rounded-xl ${className || ""}`}
      style={{
        ...style,
        position: "relative",
        ["--electric-color" as any]: color,
        ["--electric-width" as any]: `${thickness}px`,
      }}
    >
      {/* Hidden SVG for procedural turbulence */}
      <svg
        ref={svgRef}
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] w-2.5 h-2.5 opacity-[0.001]"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-200%"
            y="-200%"
            width="500%"
            height="500%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              seed="1"
              result="noise1"
            />
            <feOffset in="noise1" dx="0" dy="0" result="offset1">
              <animate
                attributeName="dy"
                values="700;0"
                dur="6s"
                repeatCount="indefinite"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              seed="1"
              result="noise2"
            />
            <feOffset in="noise2" dx="0" dy="0" result="offset2">
              <animate
                attributeName="dy"
                values="0;-700"
                dur="6s"
                repeatCount="indefinite"
              />
            </feOffset>

            <feDisplacementMap
              in="SourceGraphic"
              in2="offset1"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Border + glows */}
      <div className="absolute inset-0 pointer-events-none rounded-xl z-10">
        <div
          ref={strokeRef}
          className="absolute inset-0 rounded-xl"
          style={{
            border: `var(--electric-width) solid var(--electric-color)`,
          }}
        />
        <div
          className="absolute inset-0 rounded-xl opacity-50 blur-sm"
          style={{
            border: `var(--electric-width) solid var(--electric-color)`,
          }}
        />
        <div
          className="absolute inset-0 rounded-xl opacity-40 blur-xl"
          style={{
            border: `var(--electric-width) solid var(--electric-color)`,
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 rounded-xl">{children}</div>
    </div>
  );
}
