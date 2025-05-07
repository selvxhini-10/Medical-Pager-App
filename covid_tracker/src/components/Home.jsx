import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrbitControls } from "@react-three/drei";
import { Float } from '@react-three/drei';

import { Canvas } from "@react-three/fiber";
import Background from './Background';
import { Airplane } from './Airplane';

const Home = () => {

  function GradientBackground() {
    return (
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[100, 100]} />
        <shaderMaterial
          attach="material"
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              gl_FragColor = vec4(mix(vec3(0.8, 0.9, 1.0), vec3(1.0, 0.8, 0.8), vUv.y), 1.0);
            }
          `}
        />
      </mesh>
    );
  }

  
  const navigate = useNavigate();

  return (
    <>
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 className='text-5xl text-red font-bold underline'>Welcome to the Chat App</h1>
      <button onClick={() => navigate('/auth')}>Sign In / Sign Up</button>
    </div>
    <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
  <OrbitControls />
  <GradientBackground />
  <Float floatIntensity={2} speed={2}>
    <Airplane rotation-y={[-.2, 0.2, 0.2]} position-y={0.1}/>
  </Float>
</Canvas>

    </>
  );
};

export default Home;
