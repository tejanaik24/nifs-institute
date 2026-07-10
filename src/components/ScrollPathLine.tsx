"use client";

import { useEffect, useState, useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export function ScrollPathLine() {
  const [docHeight, setDocHeight] = useState(1000);
  const [docWidth, setDocWidth] = useState(1200);
  const [pathData, setPathData] = useState("");
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  // Monitor document dimensions on load and resize
  useEffect(() => {
    const handleResize = () => {
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight
      );
      const width = window.innerWidth;
      setDocHeight(height);
      setDocWidth(width);

      // Generate wavy cubic bezier S-curve snake path
      const segmentHeight = 800;
      const numSegments = Math.ceil(height / segmentHeight);
      let d = `M ${width / 2} 0`;

      for (let i = 0; i < numSegments; i++) {
        const startY = i * segmentHeight;
        const endY = Math.min((i + 1) * segmentHeight, height);
        const actualSegmentHeight = endY - startY;

        const controlY1 = startY + actualSegmentHeight / 3;
        const controlY2 = startY + (2 * actualSegmentHeight) / 3;

        // Alternate left / right for S-curve snake effect
        const side = i % 2 === 0 ? 1 : -1;
        const amplitude = Math.min(width * 0.35, 450);
        const controlX1 = width / 2 + amplitude * side;
        const controlX2 = width / 2 - amplitude * side;

        d += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${width / 2} ${endY}`;
      }
      setPathData(d);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timeout = setTimeout(handleResize, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  // Measure path length after path is rendered
  useEffect(() => {
    if (pathRef.current && pathData) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathData]);

  // Framer Motion scroll progress → smooth spring
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.2,
    stiffness: 80,
  });

  const cometLength = 180;
  const dashOffset = useTransform(
    smoothProgress,
    [0, 1],
    [pathLength + cometLength, 0]
  );

  if (!pathData) return null;

  return (
    <svg
      className="absolute top-0 left-0 w-full pointer-events-none z-0"
      style={{ height: docHeight }}
      viewBox={`0 0 ${docWidth} ${docHeight}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="cometGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Low-opacity road/track behind the comet */}
      <path
        d={pathData}
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle orange ambient glow track */}
      <path
        d={pathData}
        stroke="rgba(255, 69, 0, 0.025)"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cometGlow)"
      />

      {/* Comet traveler — #FF4500, scroll-driven */}
      <motion.path
        ref={pathRef}
        d={pathData}
        stroke="#FF4500"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cometGlow)"
        style={{
          strokeDasharray: `${cometLength} ${pathLength + cometLength}`,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  );
}

export default ScrollPathLine;
