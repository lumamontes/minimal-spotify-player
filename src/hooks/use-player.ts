import { useEffect, useState } from "react";
import { trackDataAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { SpotifyPlayer, SpotifyTrack } from "@/types/spotify";

let spotifyPlayer: SpotifyPlayer | null = null; // Singleton for Spotify Player

export function usePlayer({ accessToken }: { accessToken: string }) {
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState<SpotifyTrack | null>(null);
  const [trackData, setTrackData] = useAtom(trackDataAtom);

  const togglePlay = () => {
    if (isPaused) {
      spotifyPlayer?.resume();
    } else {
      spotifyPlayer?.pause();
    }
  };

  const nextTrack = () => {
    spotifyPlayer?.nextTrack();
  };

  const previousTrack = () => {
    spotifyPlayer?.previousTrack();
  };

  useEffect(() => {
    if (spotifyPlayer) {
      console.log("Reusing existing Spotify player instance.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      globalThis.window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Spotify Player ‍💫",
          getOAuthToken: (cb) => cb(accessToken),
          volume: 0.5,
        });

        spotifyPlayer = player; // Set the singleton instance

        // Add listeners
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("player_state_changed", (state) => {
          if (!state) return;

          setTrack(state.track_window.current_track);
          setPaused(state.paused);
          setTrackData({
            isPaused: state.paused,
            timestamp: state.timestamp,
            id: state.track_window.current_track.id,
          });

          player.getCurrentState().then((state) => {
            setActive(!!state);
          });
        });

        player.connect();
      };
    };

    return () => {
      console.log("Cleanup on unmount (only runs on full reload)");
    };
  }, [accessToken, setTrackData]);

  return {
    togglePlay,
    nextTrack,
    previousTrack,
    isPaused,
    currentTrack,
    isActive,
    trackData
  };
}
