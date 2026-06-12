import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function MountainLayer({ color, z, y, scale, speed }: { color: string; z: number; y: number; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-4, -1.2);
    s.lineTo(-3.15, 0.1);
    s.lineTo(-2.3, -0.35);
    s.lineTo(-1.25, 0.85);
    s.lineTo(-0.15, -0.25);
    s.lineTo(0.9, 0.55);
    s.lineTo(1.7, -0.18);
    s.lineTo(2.65, 0.7);
    s.lineTo(4, -1.2);
    s.lineTo(-4, -1.2);
    return s;
  }, []);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(clock.elapsedTime * 0.2 + z) * 0.035 + pointer.x * speed;
    ref.current.rotation.z = pointer.x * 0.01;
  });
  return (
    <mesh ref={ref} position={[0, y, z]} scale={[scale, scale, 1]}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(160 * 3);
    for (let i = 0; i < 160; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 7;
      values[i * 3 + 1] = (Math.random() - 0.5) * 4;
      values[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return values;
  }, []);
  useFrame(({ clock, pointer }) => {
    if (!points.current) return;
    points.current.rotation.y = pointer.x * 0.05;
    points.current.position.y = Math.sin(clock.elapsedTime * 0.35) * 0.04;
  });
  return (
    <points ref={points}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.025} color="#f4efe3" transparent opacity={0.72} />
    </points>
  );
}

export default function DepthScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 43 }} dpr={[1, 1.6]} gl={{ antialias: true, powerPreference: 'low-power', alpha: true }}>
      <ambientLight intensity={1.7} />
      <directionalLight position={[2, 3, 4]} intensity={1.2} color="#fff6dc" />
      <MountainLayer color="#d9e4df" z={-1.5} y={-0.35} scale={1.35} speed={0.03} />
      <MountainLayer color="#9fbfba" z={-0.6} y={-0.75} scale={1.28} speed={0.055} />
      <MountainLayer color="#24514b" z={0.1} y={-1.05} scale={1.22} speed={0.08} />
      <Particles />
    </Canvas>
  );
}
