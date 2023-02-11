import LowPolyJet from '../objects/LowPolyJet'
import Box from '../objects/Box'
import Geo from '../objects/Geo'
import * as THREE from 'three'

import GroundPlane1 from '../objects/GroundPlane1'
import AnimationExperiment from '../objects/AnimationExperiment'
import WobblyTorus from '../objects/WobblyTorus'
import { OrbitControls, Stats, Stage, Loader, OrthographicCamera, PerspectiveCamera, Environment, useTexture, Plane } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useControls } from "leva"

const CameraDolly = ({ isZoom }) => {
  const vec = new THREE.Vector3()

  useFrame((state) => {
    const step = 0.1
    const x = isZoom ? 0 : 5
    const y = isZoom ? 10 : 5
    const z = isZoom ? 10 : 5

    state.camera.position.lerp(vec.set(x, y, z), step)
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
  })

  return null
}

export default function Scene({ sceneIndex }) {
  const [isZoom, setZoom] = useState(false)
  const toggleZoom = () => setZoom((active) => !active)

  return (
    <>
      {/* <PerspectiveCamera makeDefault position={[0, 2, 20]} /> */}

      <OrthographicCamera makeDefault zoom={30} />
      <gridHelper args={[10, 10, `white`, `gray`]} />
      <mesh onClick={toggleZoom} position={[0, 1, 0]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
      <CameraDolly isZoom={isZoom} />

        {/* <GroundPlane1/>
        <Geo position={[0,0,0]}/> */}
        {/* <Box position={[0,0,0]}/> */}
        {/* <Box position={[0,-10,0]}/> */}
        {/* <Plane position={[0,0,0]}/> */}
        {/* <CameraDolly isZoom={isZoom} />
        <Suspense fallback={null}>
          <Environment preset={'city'} background={false} />
        </Suspense> */} 
      {/* </Stage> */}
    </>
  );
}
