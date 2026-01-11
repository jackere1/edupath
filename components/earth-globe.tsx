"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Stars } from "@react-three/drei"
import { useRef, useState, useEffect, useMemo } from "react"
import * as THREE from "three"

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)

  // Create procedural earth colors
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        // Simple noise function
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }
        
        float fbm(vec2 p) {
          float f = 0.0;
          f += 0.5 * noise(p); p *= 2.02;
          f += 0.25 * noise(p); p *= 2.03;
          f += 0.125 * noise(p); p *= 2.01;
          f += 0.0625 * noise(p);
          return f;
        }
        
        void main() {
          vec2 uv = vUv * 6.0;
          float n = fbm(uv);
          
          // Ocean color (deep blue to teal)
          vec3 ocean = mix(vec3(0.02, 0.08, 0.2), vec3(0.05, 0.15, 0.25), n);
          
          // Land color (green to brown)
          vec3 land = mix(vec3(0.1, 0.3, 0.1), vec3(0.25, 0.2, 0.1), noise(uv * 2.0));
          
          // Mix based on noise threshold (creates continents)
          float landMask = smoothstep(0.4, 0.5, fbm(uv * 1.5 + 0.5));
          vec3 surface = mix(ocean, land, landMask);
          
          // Add polar ice caps
          float polar = smoothstep(0.7, 0.95, abs(vUv.y - 0.5) * 2.0);
          surface = mix(surface, vec3(0.9, 0.95, 1.0), polar * 0.8);
          
          // Simple lighting based on normal
          float light = dot(vNormal, normalize(vec3(1.0, 0.5, 1.0))) * 0.5 + 0.5;
          surface *= light * 1.2;
          
          gl_FragColor = vec4(surface, 1.0);
        }
      `,
    })
  }, [])

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
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>
      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[2.02, 64, 64]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.12} depthWrite={false} />
      </Sphere>
      {/* Atmosphere glow */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>
      <Sphere args={[2.3, 32, 32]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
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
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#fff5e6" />
        <directionalLight position={[-5, -2, -5]} intensity={0.2} color="#14b8a6" />
        <Stars radius={100} depth={50} count={800} factor={3} saturation={0} fade speed={0.3} />
        <Earth />
      </Canvas>
    </div>
  )
}
