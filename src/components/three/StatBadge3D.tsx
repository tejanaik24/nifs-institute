"use client";

import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Environment } from "@react-three/drei";
import * as THREE from "three";

// ────────────────────────────────────────────────────────────────────────
// 2D FALLBACK COMPONENT
// ────────────────────────────────────────────────────────────────────────
export function StatBadge3DFallback({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-md text-center max-w-[340px] mx-auto w-full aspect-square relative select-none">
      {/* Decorative industrial border inside */}
      <div className="relative border border-dashed border-white/20 p-6 w-full h-full flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-white/5 to-white/0">
        
        {/* Top-left diagonal stripe indicator in CSS */}
        <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden rounded-tl-lg pointer-events-none">
          <div 
            className="absolute top-[-8px] left-[-24px] w-16 h-6 rotate-45 flex flex-col justify-around py-[2px] opacity-75"
            style={{
              background: "repeating-linear-gradient(45deg, #fc8010, #fc8010 6px, #111111 6px, #111111 12px)"
            }}
          />
        </div>
        
        {/* Corner rivets simulation */}
        <span className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-white/30 border border-white/10 shadow-inner" />
        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-white/30 border border-white/10 shadow-inner" />
        <span className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-white/30 border border-white/10 shadow-inner" />
        <span className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-white/30 border border-white/10 shadow-inner" />
        
        {/* Numeral Stat */}
        <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white italic drop-shadow-md">
          {value}
        </span>
        
        {/* Decorative divider line */}
        <div className="h-[1.5px] w-16 bg-gradient-to-r from-transparent via-white/35 to-transparent my-3.5" />
        
        {/* Label */}
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase leading-snug max-w-[180px]">
          {label}
        </span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 3D BADGE GEOMETRY AND SCENE SUB-COMPONENT
// ────────────────────────────────────────────────────────────────────────
interface BadgeSceneProps {
  value: string;
  label: string;
  prefersReducedMotion: boolean;
  blueprintTexture: THREE.CanvasTexture | null;
  hazardTexture: THREE.CanvasTexture | null;
}

function BadgeScene({
  value,
  label,
  prefersReducedMotion,
  blueprintTexture,
  hazardTexture,
}: BadgeSceneProps) {
  const spinGroupRef = useRef<THREE.Group>(null);
  const tiltGroupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Update mouse position for parallax
  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  useFrame((state, delta) => {
    if (prefersReducedMotion) {
      if (spinGroupRef.current) {
        // Freeze at a nice angled isometric view to show off PBR metal and 3D bevels
        spinGroupRef.current.rotation.set(0.18, 0.28, 0);
      }
      if (tiltGroupRef.current) {
        tiltGroupRef.current.rotation.set(0, 0, 0);
      }
      return;
    }

    // Slow continuous idle rotation (~8s per revolution = delta * 0.78 rads, let's do ~12s for ultra-restrained look = 0.52 rads)
    if (spinGroupRef.current) {
      spinGroupRef.current.rotation.y += delta * 0.35;
    }

    // Subtle cursor-linked parallax tilt
    if (tiltGroupRef.current) {
      const targetX = mouse.current.x * 0.18;
      const targetY = mouse.current.y * 0.12;
      tiltGroupRef.current.rotation.x = THREE.MathUtils.lerp(tiltGroupRef.current.rotation.x, targetY, 0.08);
      tiltGroupRef.current.rotation.y = THREE.MathUtils.lerp(tiltGroupRef.current.rotation.y, targetX, 0.08);
    }
  });

  // Base steel plate dimensions
  const width = 3.2;
  const height = 2.2;
  const radius = 0.25;

  // Define rounded rect shape for extrusion
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    
    s.moveTo(x + radius, y);
    s.lineTo(x + width - radius, y);
    s.quadraticCurveTo(x + width, y, x + width, y + radius);
    s.lineTo(x + width, y + height - radius);
    s.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    s.lineTo(x + radius, y + height);
    s.quadraticCurveTo(x, y + height, x, y + height - radius);
    s.lineTo(x, y + radius);
    s.quadraticCurveTo(x, y, x + radius, y);
    
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 4,
  }), []);

  return (
    <group ref={spinGroupRef}>
      <group ref={tiltGroupRef}>
        
        {/* 1. MAIN STEEL PLATE */}
        <mesh position={[0, 0, -0.06]}>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial
            color="#a0a5ad"
            roughness={0.28}
            metalness={0.88}
            map={blueprintTexture || undefined}
            bumpMap={blueprintTexture || undefined}
            bumpScale={0.015}
          />
        </mesh>

        {/* 2. CORNER RIVETS / BOLTS (4 corners) */}
        {/* Top Left */}
        <mesh position={[-1.35, 0.85, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
          <meshStandardMaterial color="#7a7e85" roughness={0.4} metalness={0.9} />
        </mesh>
        {/* Top Right */}
        <mesh position={[1.35, 0.85, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
          <meshStandardMaterial color="#7a7e85" roughness={0.4} metalness={0.9} />
        </mesh>
        {/* Bottom Left */}
        <mesh position={[-1.35, -0.85, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
          <meshStandardMaterial color="#7a7e85" roughness={0.4} metalness={0.9} />
        </mesh>
        {/* Bottom Right */}
        <mesh position={[1.35, -0.85, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
          <meshStandardMaterial color="#7a7e85" roughness={0.4} metalness={0.9} />
        </mesh>

        {/* 3. DIAGONAL HAZARD STRIPE CORNER TRIM (Top-Left Corner) */}
        <mesh position={[-1.15, 0.65, 0.085]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.9, 0.14, 0.015]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.3}
            map={hazardTexture || undefined}
          />
        </mesh>

        {/* 4. TECHNICAL DIVIDER LINE */}
        <mesh position={[0, -0.05, 0.075]}>
          <boxGeometry args={[2.0, 0.015, 0.01]} />
          <meshStandardMaterial color="#fc8010" roughness={0.2} metalness={0.5} emissive="#fc8010" emissiveIntensity={0.2} />
        </mesh>

        {/* 5. NUMERAL VALUE (Embossed Warm Steel Text) */}
        <Text
          fontSize={0.56}
          color="#f1f3f5"
          anchorX="center"
          anchorY="middle"
          position={[0, 0.38, 0.08]}
          fontWeight="bold"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_y.woff"
        >
          {value}
          <meshStandardMaterial
            color="#eaecef"
            metalness={0.82}
            roughness={0.2}
          />
        </Text>

        {/* 6. LABEL TEXT (Engraved Dark Text) */}
        <Text
          fontSize={0.16}
          color="#d0d4dc"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.42, 0.08]}
          fontWeight="bold"
          letterSpacing={0.15}
          maxWidth={2.6}
          textAlign="center"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_y.woff"
        >
          {label.toUpperCase()}
          <meshStandardMaterial
            color="#cfd4dc"
            metalness={0.7}
            roughness={0.3}
          />
        </Text>

      </group>
    </group>
  );
}

// ────────────────────────────────────────────────────────────────────────
// MAIN EXPORT COMPONENT
// ────────────────────────────────────────────────────────────────────────
type StatBadge3DProps = {
  value: string;
  label: string;
};

export function StatBadge3D({ value, label }: StatBadge3DProps) {
  const [mounted, setMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect WebGL support
    try {
      const canvas = document.createElement("canvas");
      const supportsWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGLSupported(supportsWebGL);
    } catch (e) {
      setWebGLSupported(false);
    }

    // Detect prefers-reduced-motion media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  // ── DYNAMIC CANVAS TEXTURE GENERATION ──

  // Blueprint grid texture
  const blueprintTexture = useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Dark grey industrial plate base
    ctx.fillStyle = "#1e2226";
    ctx.fillRect(0, 0, 512, 512);

    // 1. Draw subtle grid lines
    ctx.strokeStyle = "#2c3138";
    ctx.lineWidth = 1;
    const gridSize = 32;
    for (let i = 0; i <= 512; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
    }

    // 2. Technical blueprint markings
    ctx.strokeStyle = "#383f47";
    ctx.lineWidth = 1.5;

    // Center circular guidelines
    ctx.beginPath();
    ctx.arc(256, 256, 160, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(256, 256, 80, 0, Math.PI * 2);
    ctx.stroke();

    // Corner L-brackets
    const margin = 24;
    const bracketSize = 40;
    
    // Top-left
    ctx.beginPath();
    ctx.moveTo(margin + bracketSize, margin);
    ctx.lineTo(margin, margin);
    ctx.lineTo(margin, margin + bracketSize);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(512 - margin - bracketSize, margin);
    ctx.lineTo(512 - margin, margin);
    ctx.lineTo(512 - margin, margin + bracketSize);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(margin + bracketSize, 512 - margin);
    ctx.lineTo(margin, 512 - margin);
    ctx.lineTo(margin, 512 - margin - bracketSize);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(512 - margin - bracketSize, 512 - margin);
    ctx.lineTo(512 - margin, 512 - margin);
    ctx.lineTo(512 - margin, 512 - margin - bracketSize);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Hazard Stripe Texture
  const hazardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Fill Hi-Vis Orange (#FC8010)
    ctx.fillStyle = "#FC8010";
    ctx.fillRect(0, 0, 256, 64);

    // Draw diagonal black stripes
    ctx.fillStyle = "#111111";
    const stripeWidth = 20;
    for (let i = -64; i < 256; i += stripeWidth * 2) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + stripeWidth, 0);
      ctx.lineTo(i + stripeWidth - 28, 64);
      ctx.lineTo(i - 28, 64);
      ctx.closePath();
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Pre-flight SSR or WebGL support checks
  if (!mounted || !webGLSupported) {
    return <StatBadge3DFallback value={value} label={label} />;
  }

  return (
    <div className="w-full max-w-[380px] aspect-square relative select-none mx-auto flex items-center justify-center">
      <Suspense fallback={<StatBadge3DFallback value={value} label={label} />}>
        <div className="w-full h-full absolute inset-0">
          <Canvas
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [0, 0, 3.8], fov: 45 }}
          >
            {/* Lights */}
            <ambientLight intensity={0.5} />
            {/* Key white light from top-left */}
            <directionalLight position={[-4, 5, 4]} intensity={2.0} color="#ffffff" />
            {/* Orange Rim Light from bottom-right for brand matching & dimensionality */}
            <directionalLight position={[4, -5, 2]} intensity={2.5} color="#FC8010" />
            {/* Front soft fill light */}
            <pointLight position={[0, 0, 3]} intensity={0.7} color="#ffffff" />

            <Float
              speed={prefersReducedMotion ? 0 : 1.2}
              rotationIntensity={prefersReducedMotion ? 0 : 0.12}
              floatIntensity={prefersReducedMotion ? 0 : 0.08}
              floatingRange={[-0.05, 0.05]}
            >
              <BadgeScene
                value={value}
                label={label}
                prefersReducedMotion={prefersReducedMotion}
                blueprintTexture={blueprintTexture}
                hazardTexture={hazardTexture}
              />
            </Float>
            <Environment preset="studio" />
          </Canvas>
        </div>
      </Suspense>
    </div>
  );
}
