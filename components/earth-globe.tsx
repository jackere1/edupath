"use client"

import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Sphere, Stars } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import { TextureLoader } from "three"

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)

  const earthTexture = useLoader(TextureLoader, "/assets/3d/texture_earth.jpg")

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.06
    }
  })

  return (
    <group>
      {/* Main Earth with texture */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial map={earthTexture} metalness={0.1} roughness={0.7} />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[2.02, 64, 64]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} depthWrite={false} />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[2.4, 32, 32]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

export function EarthGlobe() {
  return (
    <div className="pointer-events-none fixed inset-0 h-screen w-screen z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2} color="#fff5e6" />
        <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#60a5fa" />
        <pointLight position={[10, 0, 0]} intensity={0.5} color="#fef3c7" />

        {/* Subtle stars in background */}
        <Stars radius={100} depth={50} count={1000} factor={3} saturation={0} fade speed={0.5} />

        <Earth />
      </Canvas>
    </div>
  )
}
