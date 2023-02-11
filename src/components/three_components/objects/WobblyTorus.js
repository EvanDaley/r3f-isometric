/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, MeshDistortMaterial } from '@react-three/drei'
import { useEffect } from 'react';

export default function WobblyTorus(props) {
  const group = useRef()
  const randomRotationOffset = Math.random() * 180

  useEffect(() => {
    group.current.position.x = props.animationOffset ? props.animationOffset[0] : 0
    group.current.position.z = props.animationOffset ? props.animationOffset[2] : 0
    group.current.rotation.x = randomRotationOffset
    group.current.rotation.y = randomRotationOffset
    group.current.rotation.z = randomRotationOffset
  });

  useFrame(({ clock }) => {
    const t = (1 + Math.sin(clock.getElapsedTime() * 1.5)) / 2
    group.current.position.y = (t / 3) + props.animationOffset ? props.animationOffset[1] : 0
    group.current.rotation.x = group.current.rotation.z += 0.009
  })


  return (
    <group  {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        ref={group}
      >
        <torusKnotBufferGeometry args={[.5, 0.25, 128, 32]} />
        <MeshDistortMaterial
          color={props.color}
          smoothShading

          roughness={0}
          metalness={1}

          distort={.1}
          speed={1}
        />
      </mesh>
    </group>
  )
}
