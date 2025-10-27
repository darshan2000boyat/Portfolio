import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/character.glb");
  const modelRef = useRef(null);

  const headBone = scene.getObjectByName("Head") || scene.getObjectByName("head");
  const leftHand = scene.getObjectByName("LeftHand") || scene.getObjectByName("lefthand");
  const rightHand = scene.getObjectByName("RightHand") || scene.getObjectByName("righthand");
  const leftShoulder = scene.getObjectByName("LeftShoulder") || scene.getObjectByName("leftshoulder");
  const rightShoulder = scene.getObjectByName("RightShoulder") || scene.getObjectByName("rightshoulder");
  const leftArm = scene.getObjectByName("LeftArm") || scene.getObjectByName("leftarm");
  const rightArm = scene.getObjectByName("RightArm") || scene.getObjectByName("rightarm");
  const leftForeArm = scene.getObjectByName("LeftForeArm") || scene.getObjectByName("leftforearm");
  const rightForeArm = scene.getObjectByName("RightForeArm") || scene.getObjectByName("rightforearm");

  // 🧠 Head follows the mouse (natural)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!headBone) return;

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

      gsap.to(headBone.rotation, {
        x: mouseY * 0.2,
        y: mouseX * 0.3,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [headBone]);

  // 🫱 Gentle breathing-like motion for arms and shoulders
  useEffect(() => {
    if (leftShoulder && rightShoulder && leftArm && rightArm && leftForeArm && rightForeArm) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, ease: "power1.inOut" });

      tl.to(
        [
          leftShoulder.rotation,
          leftArm.rotation,
          leftForeArm.rotation,
          rightShoulder.rotation,
          rightArm.rotation,
          rightForeArm.rotation,
        ],
        {
          x: "+=0.05", // subtle up/down movement
          y: "+=0.03",
          z: "+=0.02",
          duration: 3,
          stagger: { each: 0.1 },
        }
      );
    }
  }, [leftShoulder, rightShoulder, leftArm, rightArm, leftForeArm, rightForeArm]);

  // 🖐️ Subtle hand idle motion
  useEffect(() => {
    if (leftHand && rightHand) {
      gsap.to([leftHand.rotation, rightHand.rotation], {
        x: "+=0.1",
        y: "+=0.05",
        z: "+=0.05",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [leftHand, rightHand]);

  return <primitive ref={modelRef} object={scene} scale={2} />;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-4"></div>
        <p>Loading 3D Model...</p>
      </div>
    </Html>
  );
}

export default function Character3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        dpr={[1, 2]}
        className="rounded-lg"
        shadows
      >
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 3]} intensity={2} color="#a855f7" />

        <Suspense fallback={<Loader />}>
          <Environment preset="city" />
          <mesh position={[0, -2.3, -1]}>
            <Model />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
