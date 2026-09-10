"use client";

// Ported from IFESM's originkit gravitygallery component — drops a set of
// logo images into a Matter.js physics world (gravity, walls, mouse drag /
// hover-repel). See ifesm-website-repo for the original.
import { useEffect, useRef } from "react";
// @ts-ignore — matter-js may not ship bundled type declarations
import Matter from "matter-js";

const M: any = Matter;

function makeWalls(
  bounding: { width: number; height: number },
  world: any,
  opts: { top: boolean; bottom: boolean; left: boolean; right: boolean },
) {
  const { width: w, height: h } = bounding;
  const t = 200;
  const walls: any[] = [];
  if (opts.top)
    walls.push(M.Bodies.rectangle(w / 2, -t / 2, w + 2 * t, t, { isStatic: true }));
  if (opts.bottom)
    walls.push(M.Bodies.rectangle(w / 2, h + t / 2, w + 2 * t, t, { isStatic: true }));
  if (opts.left)
    walls.push(M.Bodies.rectangle(-t / 2, h / 2, t, h + 2 * t, { isStatic: true }));
  if (opts.right)
    walls.push(M.Bodies.rectangle(w + t / 2, h / 2, t, h + 2 * t, { isStatic: true }));
  M.Composite.add(world, walls);
}

export type PhysicsImage = { src: string; alt?: string };

export function GravityLogoPhysics({
  images,
  size = 110,
  ringColor = "var(--color-primary)",
}: {
  images: PhysicsImage[];
  size?: number;
  ringColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const n = Math.max(1, Math.min(40, images.length));
    const engine = M.Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 1 },
      positionIterations: 10,
      velocityIterations: 8,
    });

    const bounding = container.getBoundingClientRect();
    makeWalls(bounding, engine.world, { top: false, bottom: true, left: true, right: true });

    const mouse = M.Mouse.create(container);
    const mouseConstraint = M.MouseConstraint.create(engine, {
      mouse,
      constraint: { angularStiffness: 0, stiffness: 0.991 },
    });
    M.Composite.add(engine.world, mouseConstraint);
    const el = mouseConstraint.mouse.element;
    el.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    el.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
    const onLeave = () => mouseConstraint?.mouse?.mouseup(new Event("mouseup"));
    container.addEventListener("mouseleave", onLeave);

    const bodyOpts = { friction: 0.3, frictionAir: 0.02 };
    const made: any[] = [];
    for (let i = 0; i < n; i++) {
      const x = ((i + 0.5) / n) * bounding.width;
      const y = -size;
      made.push(M.Bodies.circle(x, y, size / 2, bodyOpts));
    }

    const els = Array.from(container.querySelectorAll<HTMLElement>("[data-physics-body]"));

    const revealed = new Array(n).fill(false);
    let revealedCount = 0;
    const startTime = performance.now();
    const dropStagger = 160;
    const hoverForce = 0.003;
    const hoverRadius = size * 1.5;

    const update = () => {
      rafRef.current = requestAnimationFrame(update);

      const dueCount = Math.min(
        n,
        Math.floor((performance.now() - startTime) / dropStagger) + 1,
      );
      while (revealedCount < dueCount) {
        M.Composite.add(engine.world, made[revealedCount]);
        revealed[revealedCount] = true;
        revealedCount++;
      }

      const mp = mouseConstraint.mouse.position;
      for (let i = 0; i < made.length; i++) {
        if (!revealed[i]) continue;
        const body = made[i];
        const dx = body.position.x - mp.x;
        const dy = body.position.y - mp.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.01 && dist < hoverRadius) {
          const mag = hoverForce * body.mass * (1 - dist / hoverRadius);
          M.Body.applyForce(body, body.position, { x: (dx / dist) * mag, y: (dy / dist) * mag });
        }
      }

      M.Engine.update(engine);

      const maxSpeed = size;
      const maxY = bounding.height + size * 4;
      const minY = -size * 3;
      for (let i = 0; i < made.length; i++) {
        if (!revealed[i]) continue;
        const body = made[i];
        const { x: vx, y: vy } = body.velocity;
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed > maxSpeed) {
          const s = maxSpeed / speed;
          M.Body.setVelocity(body, { x: vx * s, y: vy * s });
        }
        if (body.position.y > maxY || body.position.y < minY) {
          M.Body.setPosition(body, {
            x: Math.min(Math.max(body.position.x, size / 2), bounding.width - size / 2),
            y: bounding.height - size / 2,
          });
          M.Body.setVelocity(body, { x: 0, y: 0 });
        }
      }

      for (let i = 0; i < made.length; i++) {
        const el = els[i];
        if (!el) continue;
        const { position, angle } = made[i];
        el.style.visibility = "visible";
        el.style.left = `${position.x}px`;
        el.style.top = `${position.y}px`;
        el.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
      }
    };
    update();

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mouseleave", onLeave);
      M.World.clear(engine.world, false);
      M.Engine.clear(engine);
    };
  }, [images, size]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden" draggable={false}>
      {images.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          data-physics-body=""
          draggable={false}
          className="absolute flex cursor-grab items-center justify-center overflow-hidden rounded-full bg-white invisible"
          style={{
            width: size,
            height: size,
            border: `2px solid ${ringColor}`,
            padding: size * 0.16,
            boxShadow: "0 2px 14px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.07)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt ?? ""}
            draggable={false}
            className="h-full w-full object-contain pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
}
