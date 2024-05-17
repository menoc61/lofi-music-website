export interface IModifierBoardProps {
  seconds: number;
  minutes: number;
  hours: number;
  isRunning: boolean;
  pause: () => void;
  resume: () => void;
  setTimerHandler: (hour: number, minute: number, second: number) => void;
  setTimerStart: (timerStart: boolean) => void;
  timerStart: boolean;
  restart: any;
}
export interface VideoSource {
  [key: string]: string;
}
export interface IBackgroundNoise {
  cityTraffic: number;
  cityRain: number;
  fireplace: number;
  snow: number;
  summerStorm: number;
  fan: number;
  forestNight: number;
  wave: number;
  wind: number;
  people: number;
  river: number;
  rainForest: number;
}

export interface IAudioSetting {
  src: string;
  volume: number;
}
export type MoodMode = "sleep" | "jazzy" | "chill";
