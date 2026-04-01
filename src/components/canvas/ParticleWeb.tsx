"use client"; // Required because Canvas and animations run in the browser

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse for the parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 1.3;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * -0.85;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate particles, colors, and geometry completely in JS to avoid TypeScript JSX errors
  const { pointsGeo, lineGeo } = useMemo(() => {
    const N = 2400;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const clrs = [
      [0, 0.83, 1],    // --el
      [0.67, 1, 0.18], // --lime
      [1, 0.34, 0.13], // --org
      [1, 0.85, 0.3],  // --gold
    ];

    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 13;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = clrs[Math.floor(Math.random() * clrs.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }

    // 1. Create the points geometry
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(col, 3));

    // 2. Connect some particles with lines
    const linePositions = [];
    for (let i = 0; i < 70; i++) {
      linePositions.push(
        pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
        pos[(i + 2) * 3], pos[(i + 2) * 3 + 1], pos[(i + 2) * 3 + 2]
      );
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

    return { pointsGeo: pointsGeometry, lineGeo: lineGeometry };
  }, []);

  // The Animation Loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current && linesRef.current) {
      // Rotation + Mouse Parallax
      pointsRef.current.rotation.y = t * 0.1 + mouse.current.x * 0.28;
      pointsRef.current.rotation.x = t * 0.04 + mouse.current.y * 0.28;
      linesRef.current.rotation.y = t * 0.1 + mouse.current.x * 0.28;
      linesRef.current.rotation.x = t * 0.04 + mouse.current.y * 0.28;
      
      // Pulsing opacity
      (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.42 + Math.sin(t * 1.4) * 0.13;
    }
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeo}>
        <pointsMaterial size={0.026} vertexColors transparent opacity={0.5} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.055} />
      </lineSegments>
    </group>
  );
}

export default function ParticleWeb() {
  return (
    <div className="absolute inset-0 z-0 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)}>
        <Particles />
      </Canvas>
    </div>
  );
}