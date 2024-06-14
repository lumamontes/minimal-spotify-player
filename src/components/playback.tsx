// app/components/ClientComponent.js
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useAtom } from "jotai";
import { trackDataAtom } from "@/utils/atoms";
import { SpotifyPlayer, SpotifyTrack } from "@/types/spotify";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./menu-toggle";

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
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [statePlayer, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [current_track, setTrack] = useState<SpotifyTrack | null>(null);

  const [trackData, setTrackData] = useAtom(trackDataAtom);

  function togglePlay() {
    if (is_paused) {
      statePlayer?.resume();
    } else {
      statePlayer?.pause();
    }
  }

  function nextTrack() {
    statePlayer?.nextTrack();
  }

  function previousTrack() {
    statePlayer?.previousTrack();
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);
    globalThis.window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Audio Visualizer ‍💫",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });
      setPlayer(player);
      // Add other player event listeners and methods here
      player.addListener("ready", ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state: any) => {
        if (!state) {
          return;
        }

        console.log("state", state);
        setTrack(state.track_window.current_track);

        console.log("track", state.track_window.current_track.id);
        setTrackData({
          isPaused: state.paused,
          timestamp: state.timestamp,
          id: state.track_window.current_track.id,
        });
        setPaused(state.paused);

        player.addListener("player_state_changed", (state: any) => {
          if (!state) {
            return;
          }
          setTrack(state.track_window.current_track);
          setPaused(state.paused);
          setTrackData({
            id: state.track_window.current_track.id,
            timestamp: state.timestamp,
            isPaused: state.paused,
          });

          player.getCurrentState().then((state: any) => {
            console.log("current state", state);
            if (!state) {
              setActive(false);
            } else {
              setActive(true);
            }
          });
        });
      });

      player.connect();
    };
  }, [accessToken]);

  if (!statePlayer) {
    return (
      <p className="container bg-muted text-center py-6 rounded">
        Connecting to Spotify...
      </p>
    );
  } else if (!is_active) {
    return (
      <p className="container bg-muted text-center py-6 rounded">
        Instance not active. Transfer your playback using your Spotify app
      </p>
    );
  } else {
    return (
      <motion.nav
        className="flex flex-col container bg-muted py-2 gap-2 rounded"
        initial={true}
        animate={isPlayerOpen ? "open" : "closed"}
        custom={100}
        ref={containerRef}
        variants={playerContainer}
      >
        <motion.div className="background" variants={sidebar} />
        <motion.div variants={variants} className="flex flex-col gap-2">
          {current_track && current_track.album.images[0].url ? (
            <img
              src={current_track.album.images[0].url}
              width={200}
              height={200}
              className="rounded"
              alt="Album cover"
            />
          ) : null}
          <div>
            <p className="text-foreground">{current_track?.name}</p>
            <p className="text-foreground text-sm">
              {current_track?.album.name}
            </p>
            <p className="text-foreground font-semibold text-sm">
              {current_track?.artists[0].name}
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
                {is_paused ? <Play size={24} /> : <Pause size={24} />}
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
        <MenuToggle toggle={() => togglePlayerOpen()} />
      </motion.nav>
    );
  }
}
