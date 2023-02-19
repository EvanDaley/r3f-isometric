import OxygenContainer2 from '../objects/OxygenContainer2'
import Box from '../objects/Box'
import AbstractSphere from '../objects/AbstractSphere'
import { OrbitControls, Stats, Stage, Loader, PerspectiveCamera, OrthographicCamera, Environment, useTexture, Reflector } from '@react-three/drei';
import OxygenContainer3 from '../objects/OxygenContainer3'
import Robot from '../objects/Robot'


// import { Billboard, Html, OrbitControls, OrthographicCamera, Plane, Points } from "@react-three/drei"
import { Canvas, useThree } from '@react-three/fiber';
import React, { useState, useEffect, Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three'
import { MeshPhysicalMaterial } from 'three';

import { useSpring, animated } from "@react-spring/three"

const Cell = React.forwardRef(({ position, onClick }, ref) => {
  const [hovered, setHovered] = useState(false)

  return (
    <group ref={ref}>
      <mesh
        onClick={() => onClick(position)}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        position={position}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color={hovered ? "green" : "grey"} />
      </mesh>
      {/* <mesh position={position}>
        <boxGeometry args={[1, 1]} />
        <meshStandardMaterial color={"grey"} />
      </mesh> */}
    </group>
  )
})

function grid(w, h) {
  const res = []
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      res.push([x, 0, y])
    }
  }

  return res
}

const SmoothMove = ({ children, position }) => {
  const { pos } = useSpring({ pos: position })

  return (
    <>

      <animated.group position={pos}>
        {/* {children} */}

        <mesh position={[0, 1, 0]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshNormalMaterial attach="material" />
          </mesh>
      </animated.group>

                {/* <mesh position={[0, 1, 0]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshNormalMaterial attach="material" />
          </mesh> */}
    </>
  )
  // return <animated.group position={pos}>{children}</animated.group>
}

function Room() {
  const spacing = 1.1
  const cellCount = 8
  const cells = grid(cellCount, cellCount).map(([x, y, z]) => [x * spacing, y * spacing, z * spacing])

  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  const onTargetClicked = (position) => {
    console.log(position)
    // updateMyPresence({ position: [position[0], 0.5, position[2]] })
  }

  return (
    <>
      <pointLight position={[30, 0, 0]} color="blue" intensity={10} />
      <group position={[-((cellCount / 2) * spacing), 0, -((cellCount / 2) * spacing)]}>
        {cells.map((pos) => (
          <Cell onClick={onTargetClicked} key={`cell-${pos}`} position={pos} />
        ))}
        
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
          <boxBufferGeometry attach="geometry" args={[0,0,0]} />
          {/* <OxygenContainer3 position={[0, 0, 0]} rotation={[0,2,0]} scale={[.2,.2,.2]}/> */}
          <Robot position={[0, .1, 0]} rotation={[0,2,0]} scale={[.2,.2,.2]}/>

          {/* <mesh position={[0, .5, 0]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshNormalMaterial attach="material" />
          </mesh> */}

        <SmoothMove position={position}>
          {/* <AnimatedSprite src={lisa} frameCount={9} /> */}
          {/* <AsepriteTest />
          <mesh position={[0, 1, 0]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshNormalMaterial attach="material" />
          </mesh> */}

          {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}
        </SmoothMove>
        {/* <GremlinTest animation="idle" position={[6.6, 1, 5.5]} /> */}
        {/* <BardTest animation="idle" position={[1.1, 1, 5.5]} /> */}
        {/* <GremlinTest animation="boom" position={[6.6, 1, 7.7]} /> */}
        {/* <Sprite position={[1.1, 1, 2.2]} img={frog} />
          <Sprite position={[6.6, 1, 5.5]} img={frog} />
          <Sprite position={[0, 1, 5.5]} img={frog} />
          <Sprite position={[6.6, 1, 7.7]} img={frog} />
          <Sprite position={[6.6, 1, 0]} img={frog} /> */}

        {/* {others.map(({ connectionId, presence }) => {
          if (presence == null || presence.position == null) {
            return null
          }

          return (
            <SmoothMove key={`cursor-${connectionId}`} position={presence.position}>
              <Sprite img={frog} />
            </SmoothMove>
          )
        })} */}
      </group>
    </>
  );
}

export default function Scene() {
  return (
    <>
      <OrthographicCamera makeDefault position={[15, 15, 15]} zoom={80} />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Room />
      </Suspense>
      <OrbitControls minPolarAngle={Math.PI / 10} maxPolarAngle={Math.PI / 1.5} />
    </>
  );
}