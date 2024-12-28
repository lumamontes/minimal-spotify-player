"use client";

import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { selectedPresetAtom } from "@/utils/atoms";
import { gradients } from "@/constants/presets";


export function AudioVisualizer() {
  const [selectedPreset] = useAtom(selectedPresetAtom);

  const colors = gradients.find((preset) => preset.name === selectedPreset)?.colors || gradients[0].colors;
  const color = useMotionValue(colors[0]);
  const backgroundImage =  useMotionTemplate` radial-gradient(125% 125% at 50% 0%, #00000026 50%, ${color} )`;

  useEffect(() => {
      animate(color, colors, {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
      });
    }, [selectedPreset, colors]);

  return (
    <motion.div
        className={`relative flex h-screen w-screen flex-col justify-center 
    `}
        style={{
          backgroundImage: backgroundImage,
          backgroundBlendMode: "overlay",
        }}
      >
       <Suspense fallback={null}>
        <Canvas className="absolute inset-0 -z-10">
          <Stars radius={70} depth={50} count={2000} factor={4} saturation={40} fade />
          <OrbitControls autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
    </motion.div>
  );
}
