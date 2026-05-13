import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero3D
 * ------
 * Subtle, premium WebGL backdrop for the hero. A volumetric grid of points
 * drifts on a slow, self-contained loop — independent of scroll position
 * and pointer activity. The scene runs the same regardless of what the
 * user is doing on the page; it's purely ambient atmosphere.
 *
 * Performance:
 *  - One BufferGeometry + PointsMaterial.
 *  - No per-frame allocations in the render loop.
 *  - DPR clamped to 1.5 to keep mobile/lower-end GPUs at 60fps.
 *
 * Mobile / reduced motion: parent decides not to mount this; this component
 * just assumes "render".
 */

function PointField() {
  const ref = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Build the point cloud once. 3D Halton-ish-sequence-via-random for
  // a non-grid, evenly-distributed feel.
  const { positions, scales } = useMemo(() => {
    const COUNT = 1400;
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // Box of width 18, height 10, depth 12 — wider than tall to match a hero.
      positions[i * 3 + 0] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      scales[i] = Math.random() * 0.9 + 0.1; // distance falloff baked in
    }
    return { positions, scales };
  }, []);

  // Pure ambient motion — no cursor, no scroll input. The field gently
  // breathes on its own timeline.
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Slow autonomous sway, sine-based so it never feels mechanical.
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.12;
      groupRef.current.rotation.x = Math.cos(t * 0.06) * 0.06;
    }
    if (ref.current) {
      ref.current.rotation.y += dt * 0.018;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-scale"
            args={[scales, 1]}
            count={scales.length}
            array={scales}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#071B46"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>

      {/* A small accent layer of brighter blue points, fewer in count. */}
      <Accents />
    </group>
  );
}

function Accents() {
  const positions = useMemo(() => {
    const COUNT = 80;
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y -= dt * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#1E63FF"
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      className="hero3d__canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Pointer events disabled at both the DOM and R3F level — the hero
      // background is purely ambient and must never react to interactions
      // anywhere on the page.
      eventSource={undefined}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <PointField />
      </Suspense>
    </Canvas>
  );
}
