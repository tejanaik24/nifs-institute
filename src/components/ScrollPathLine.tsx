"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COMET_LENGTH = 160;

function docRect(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const scrollY = window.scrollY;
  return {
    left: r.left,
    right: r.right,
    top: r.top + scrollY,
    bottom: r.bottom + scrollY,
    width: r.width,
  };
}

export function ScrollPathLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const trackCasingRef = useRef<SVGPathElement>(null);
  const trackPathRef = useRef<SVGPathElement>(null);
  const travelerPathRef = useRef<SVGPathElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    const trackCasing = trackCasingRef.current;
    const trackPath = trackPathRef.current;
    const travelerPath = travelerPathRef.current;
    if (!svg || !group || !trackCasing || !trackPath || !travelerPath) return;

    let totalPathLength = 0;
    let scrollTriggerInstance: ScrollTrigger | undefined;
    let lengthForY: (targetY: number) => number = () => 0;
    const posState = { pos: 0 };

    const setDashOffset = (pos: number) => {
      travelerPath.style.strokeDashoffset = String(totalPathLength - pos);
    };

    const followScroll = () => {
      group.setAttribute("transform", `translate(0 ${-window.scrollY})`);
    };

    const build = () => {
      const baseR = window.innerWidth < 768 ? 60 : 100;
      const cornerRadius = (rect: { width: number; top: number; bottom: number }) =>
        Math.max(12, Math.min(baseR, rect.width / 2 - 4, (rect.bottom - rect.top) / 2 - 4));
      const docWidth = window.innerWidth;

      svg.setAttribute("viewBox", `0 0 ${docWidth} ${window.innerHeight}`);

      const logoEl = document.querySelector<HTMLElement>(
        '[data-path-logo="true"]'
      );
      const logoRect = logoEl?.getBoundingClientRect();
      const logoX = logoRect ? logoRect.left + logoRect.width / 2 : 24;
      const logoY = logoRect ? logoRect.top + logoRect.height / 2 : 24;

      const targets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-path-target="true"]')
      )
        .map((el) => docRect(el))
        .sort((a, b) => a.top - b.top);

      if (targets.length === 0) {
        trackCasing.setAttribute("d", "");
        trackPath.setAttribute("d", "");
        travelerPath.setAttribute("d", "");
        totalPathLength = 0;
        return;
      }

      const hasDistinctHero = targets.length >= 2;
      const first = targets[0];
      const last = targets[targets.length - 1];
      const middle = hasDistinctHero ? targets.slice(1, -1) : [];

      const bracketWrap = (
        rect: { left: number; right: number; top: number; bottom: number; width: number },
        spineX: number
      ) => {
        const r = cornerRadius(rect);
        const insideRect = spineX > rect.left && spineX < rect.right;
        const onRight = insideRect
          ? rect.right - spineX < spineX - rect.left
          : rect.left + rect.width / 2 > spineX;
        const connectX = insideRect ? (onRight ? rect.right : rect.left) : spineX;

        let chunk = ` L ${spineX} ${rect.top}`;
        if (connectX !== spineX) {
          chunk += ` L ${connectX} ${rect.top}`;
        }
        if (onRight) {
          chunk += ` L ${rect.right - r} ${rect.top}`;
          chunk += ` Q ${rect.right} ${rect.top} ${rect.right} ${rect.top + r}`;
          chunk += ` L ${rect.right} ${rect.bottom - r}`;
          chunk += ` Q ${rect.right} ${rect.bottom} ${rect.right - r} ${rect.bottom}`;
          chunk += ` L ${connectX} ${rect.bottom}`;
        } else {
          chunk += ` L ${rect.left + r} ${rect.top}`;
          chunk += ` Q ${rect.left} ${rect.top} ${rect.left} ${rect.top + r}`;
          chunk += ` L ${rect.left} ${rect.bottom - r}`;
          chunk += ` Q ${rect.left} ${rect.bottom} ${rect.left + r} ${rect.bottom}`;
          chunk += ` L ${connectX} ${rect.bottom}`;
        }
        if (connectX !== spineX) {
          chunk += ` L ${spineX} ${rect.bottom}`;
        }
        return chunk;
      };

      let d: string;
      let spineX: number;

      if (hasDistinctHero) {
        const hero = first;
        const heroR = cornerRadius(hero);
        spineX = Math.min(
          Math.max(hero.left + hero.width / 2, heroR + 4),
          docWidth - heroR - 4
        );

        d = `M ${logoX} ${logoY}`;
        d += ` L ${hero.left} ${logoY}`;
        d += ` L ${hero.left} ${hero.top}`;
        d += ` L ${hero.right - heroR} ${hero.top}`;
        d += ` Q ${hero.right} ${hero.top} ${hero.right} ${hero.top + heroR}`;
        d += ` L ${hero.right} ${hero.bottom - heroR}`;
        d += ` Q ${hero.right} ${hero.bottom} ${hero.right - heroR} ${hero.bottom}`;
        d += ` L ${spineX} ${hero.bottom}`;
      } else {
        const r = cornerRadius(first);
        spineX = Math.min(Math.max(logoX, r + 4), docWidth - r - 4);
        d = `M ${logoX} ${logoY}`;
        d += ` L ${spineX} ${logoY}`;
      }

      for (const rect of middle) {
        d += bracketWrap(rect, spineX);
      }

      if (!hasDistinctHero) {
        d += bracketWrap(first, spineX);
      }

      d += ` L ${spineX} ${last.top}`;
      d += ` L ${spineX} ${last.top + (last.bottom - last.top) / 2}`;

      trackCasing.setAttribute("d", d);
      trackPath.setAttribute("d", d);
      travelerPath.setAttribute("d", d);
      totalPathLength = trackPath.getTotalLength();

      const sampleCount = 300;
      const samples: { len: number; y: number }[] = [];
      for (let i = 0; i <= sampleCount; i++) {
        const len = (totalPathLength * i) / sampleCount;
        samples.push({ len, y: trackPath.getPointAtLength(len).y });
      }
      lengthForY = (targetY: number) => {
        let result = 0;
        for (const s of samples) {
          if (s.y <= targetY) result = s.len;
          else break;
        }
        return result;
      };

      travelerPath.style.strokeDasharray = `${COMET_LENGTH} ${totalPathLength}`;
      followScroll();
      posState.pos = 0;
      setDashOffset(0);

      scrollTriggerInstance?.kill();
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: () => {
          followScroll();
          const targetY = window.scrollY + window.innerHeight * 0.5;
          const targetPos = lengthForY(targetY);

          // Find stretch target elements
          const stretchEl = document.querySelector<HTMLElement>('[data-path-stretch="true"]');
          let startLen = 0;
          let endLen = 0;

          if (stretchEl) {
            const stretchRect = stretchEl.getBoundingClientRect();
            const scrollY = window.scrollY;
            const stretchTop = stretchRect.top + scrollY;
            const stretchBottom = stretchRect.bottom + scrollY;
            startLen = lengthForY(stretchTop);
            endLen = lengthForY(stretchBottom);
          }

          gsap.to(posState, {
            pos: targetPos,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => {
              let currentCometLength = COMET_LENGTH;
              const p = posState.pos;

              if (stretchEl && startLen > 0 && endLen > startLen) {
                if (p >= startLen && p <= endLen) {
                  currentCometLength = Math.max(COMET_LENGTH, p - startLen);
                } else if (p > endLen) {
                  const shrinkProgress = Math.min(1, (p - endLen) / 300);
                  const maxLength = endLen - startLen;
                  currentCometLength = maxLength + (COMET_LENGTH - maxLength) * shrinkProgress;
                }
              }

              travelerPath.style.strokeDasharray = `${currentCometLength} ${totalPathLength}`;
              setDashOffset(p);
            },
          });
        },
      });
    };

    let resizeTimeout: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        build();
        ScrollTrigger.refresh();
      }, 150);
    };

    build();
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
      scrollTriggerInstance?.kill();
      gsap.killTweensOf(posState);
    };
  }, [pathname]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <defs>
        <filter id="cometGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g ref={groupRef}>
        <path
          ref={trackCasingRef}
          fill="none"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth={12}
          strokeLinecap="round"
        />
        <path
          ref={trackPathRef}
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          ref={travelerPathRef}
          fill="none"
          stroke="#ff2222"
          strokeWidth={7}
          strokeLinecap="round"
          filter="url(#cometGlow)"
        />
      </g>
    </svg>
  );
}
