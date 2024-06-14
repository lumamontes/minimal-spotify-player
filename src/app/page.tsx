"use client";
import { UserAuthForm } from "@/components/user-auth-form";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useEffect } from "react";

const COLORS = ["#171717", "#8b5cf6", "#d97706", "#fecaca", "#3b82f6"];

export default function LoginPage() {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate` radial-gradient(125% 125% at 50% 0%, #00000026 50%, ${color} )`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  return (
    <div
      className="flex h-screen w-screen flex-col justify-center relative"
      style={{
        backgroundImage: `url("/hero.png")`,
        backgroundPosition: -750,
      }}
    >
      <motion.div
        className={`relative flex h-screen w-screen flex-col justify-center 
    `}
        style={{
          backgroundImage: backgroundImage,
          backgroundBlendMode: "soft-light",
        }}
      >
        <div className="flex w-full flex-col space-y-6 sm:w-[350px] sm:ml-40 mx-auto">
          <h1 className="text-8xl  tracking-tight">Audio Visualizer</h1>
          <div className="text-sm text-muted-foreground">
            <UserAuthForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
