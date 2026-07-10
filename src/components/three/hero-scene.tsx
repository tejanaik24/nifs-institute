"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Responsive ember/particle field for the background — the "advanced 3D" layer
 * that responds to scroll depth and mouse position.
 */
function Embers() {
  const count = 350;
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    
    // Animate individual particles drifting upwards
    for (let i = 0; i < count; i++) {
      const y = posAttr.getY(i);
      // Speed up particle flow slightly when scrolling fast
      const speed = 0.35 + Math.min(Math.abs(state.clock.getElapsedTime() % 1), 0.5);
      const newY = y + delta * speed;
      posAttr.setY(i, newY > 4 ? -4 : newY);
    }
    posAttr.needsUpdate = true;
    
    // Rotate the particle cloud
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      scrollY * 0.0001,
      0.05
    );

    // Camera scroll tracking & mouse parallax
    const targetX = mouse.current.x * 0.8;
    const targetY = -scrollY * 0.0012 + mouse.current.y * 0.5;
    const targetZ = 5 + scrollY * 0.001;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, -scrollY * 0.001, 0);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#DC1711"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.7} />
      <Embers />
    </Canvas>
  );
}

