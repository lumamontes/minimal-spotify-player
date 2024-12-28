// app/components/ClientComponent.js
"use client";

import {  useRef } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { motion, useCycle } from "framer-motion";
import { usePlayer } from "@/hooks/use-player";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      y: { stiffness: 1000 },
    },
    y: 50,
    opacity: 0,
  },
};

const playerContainer = {
  open: (height = 1000) => ({
    clipPath: `inset(${height - 120}px 10px ${height - 120}px 0px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: `inset(85% 70% 0px 15px)`,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const sidebar = {
  open: (height = 1000) => ({
    // clipPath: `inset(0px 0px 0px 0px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function Playback({ accessToken }: { accessToken: string }) {
  const [isPlayerOpen, togglePlayerOpen] = useCycle(true, false);
  const containerRef = useRef(null);

  const { 
      isActive,
      isPaused,
      currentTrack,
      nextTrack,
      previousTrack,
      togglePlay,
    } = usePlayer({accessToken});


 if (!isActive) {
    return (
      <p className="container bg-muted text-center py-6 rounded">
        Instance not active. Transfer your playback using your Spotify app
      </p>
    );
  } else {
    return (
      <motion.nav
        className="flex flex-col container justify-center items-center  py-2 gap-2 rounded"
        initial={true}
        animate={isPlayerOpen ? "open" : "closed"}
        custom={100}
        ref={containerRef}
        variants={playerContainer}
      >
        <motion.div className="background" variants={sidebar} />
        <motion.div variants={variants} className="flex flex-col bg-muted justify-center items-center gap-2 p-4 rounded">
          {currentTrack && currentTrack.album.images[0].url ? (
            <img
              src={currentTrack.album.images[0].url}
              width={200}
              height={200}
              className="rounded"
              alt="Album cover"
            />
          ) : null}
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-foreground">{currentTrack?.name}</p>
            <p className="text-foreground text-sm">
              {currentTrack?.album.name}
            </p>
            <p className="text-foreground font-semibold text-sm">
              {currentTrack?.artists[0].name}
            </p>

            <div className="flex gap-2">
              <motion.button
                className="text-foreground py-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={previousTrack}
              >
                <ArrowLeft size={24} />
              </motion.button>
              <motion.button
                className="text-foreground py-2 rounded-full"
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPaused ? <Play size={24} /> : <Pause size={24} />}
              </motion.button>

              <motion.button
                className="text-foreground py-2 rounded-full"
                onClick={nextTrack}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight size={24} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    );
  }
}
