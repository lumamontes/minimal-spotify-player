

export interface SpotifyPlayer {
    play: () => void;
    pause: () => void;
    resume: () => void;
    nextTrack: () => void;
    previousTrack: () => void;
    skipToNextTrack: () => void;
  }

export interface SpotifyTrack {
    id: string;
    name: string;
    album: {
      name: string;
      images: { url: string }[];
    };
    artists: { name: string }[];
  }