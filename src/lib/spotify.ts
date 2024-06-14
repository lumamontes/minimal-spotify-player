type Bar = {
    start: number;
    duration: number;
    confidence: number;
  };
  
  type Beat = {
    start: number;
    duration: number;
    confidence: number;
  };
  
  type Section = {
    start: number;
    duration: number;
    confidence: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
  };
  
  type Segment = {
    start: number;
    duration: number;
    confidence: number;
    loudness_start: number;
    loudness_max_time: number;
    loudness_max: number;
    loudness_end: number;
    pitches: number[];
    timbre: number[];
  };
  
  type Tatum = {
    start: number;
    duration: number;
    confidence: number;
  };
  
  type Response = {
    meta: {
      analyzer_version: string;
      platform: string;
      detailed_status: string;
      status_code: number;
      timestamp: number;
      analysis_time: number;
    };
    bars: Bar[];
    beats: Beat[];
    sections: Section[];
    segments: Segment[];
    tatums: Tatum[];
    track: {
      num_samples: number;
      duration: number;
      sample_md5: string;
      offset_seconds: number;
      window_seconds: number;
      analysis_sample_rate: number;
      analysis_channels: number;
      end_of_fade_in: number;
      start_of_fade_out: number;
      loudness: number;
      tempo: number;
      tempo_confidence: number;
      time_signature: number;
      time_signature_confidence: number;
      key: number;
    };
  };
  



export const fetchAudioAnalysis = (trackId: string, accessToken: string) : Promise<Response> => {
  console.log("fetching audio analysis");
  console.log('trackId', trackId)
  console.log('accessToken', accessToken)
   return fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
    headers: {
        Authorization: "Bearer " + accessToken,
    },
    })
    .then((response) => {
        if (response.status === 200) {
        return response.json();
        } else {
          console.log(response);
        throw new Error("Failed to retrieve audio analysis");
        }
    })
    .catch((error) => {
        console.error("Error retrieving audio analysis:", error);
    });
};
