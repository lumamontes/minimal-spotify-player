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
  
  type AudioAnalysis = {
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
  
//this file will contain audio processing functions

//responsible for receiving the audio analysis data from the spotify api

//and returning the data in a format that can be used by the visualizer


//the first function in be responsive for analysing the beats to return the metronome value, so i can use it to set the bpm of the visualizer

export const getMetronome = (beats: Beat[]) => {
    //the metronome value will be the average duration of the beats
    const metronome = beats.reduce((acc, beat) => acc + beat.duration, 0) / beats.length;
    console.log(metronome);
    return metronome;
}
//the second function will be responsible for analyzing the segments to return the waveform data
//using the loudness values of the segments to create the waveform
//we can set a value threshold to determine the amplitude of the waveform
//like from 0 to 1, 0 being the lowest amplitude and 1 being the highest amplitude
export const getWaveform = (segments: Segment[]): number[] => {
    const loudnessValues = segments.map(segment => segment.loudness_max);
    const min = Math.min(...loudnessValues);
    const max = Math.max(...loudnessValues);

    return loudnessValues.map(value => (value - min) / (max - min));
}
//this function will take the audio analysis data and return an array of objects that represent the audio data


