"use client"

import type React from "react"

import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Sphere, Stars } from "@react-three/drei"
import { useRef, Suspense, useState, useEffect } from "react"
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
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial map={earthTexture} metalness={0.1} roughness={0.7} />
      </Sphere>
      <Sphere ref={cloudsRef} args={[2.02, 64, 64]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} depthWrite={false} />
      </Sphere>
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
      <Sphere args={[2.4, 32, 32]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

function FallbackEarth() {
  const earthRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group>
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial color="#1e40af" metalness={0.3} roughness={0.7} />
      </Sphere>
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

function EarthWithFallback() {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return <FallbackEarth />
  }

  return (
    <Suspense fallback={<FallbackEarth />}>
      <ErrorBoundaryWrapper onError={() => setHasError(true)}>
        <Earth />
      </ErrorBoundaryWrapper>
    </Suspense>
  )
}

function ErrorBoundaryWrapper({ children, onError }: { children: React.ReactNode; onError: () => void }) {
  useEffect(() => {
    const handleError = () => onError()
    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [onError])

  return <>{children}</>
}

export function EarthGlobe() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="pointer-events-none fixed inset-0 h-screen w-screen z-0 bg-gradient-to-b from-background to-background/80" />
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 h-screen w-screen z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
        fallback={<div className="h-full w-full bg-background" />}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2} color="#fff5e6" />
        <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#60a5fa" />
        <pointLight position={[10, 0, 0]} intensity={0.5} color="#fef3c7" />
        <Stars radius={100} depth={50} count={1000} factor={3} saturation={0} fade speed={0.5} />
        <EarthWithFallback />
      </Canvas>
    </div>
  )
}
