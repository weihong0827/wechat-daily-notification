export interface Weather {
  code: string;
  updateTime: string;
  fxLink: string;
  daily: Daily[];
  refer: Refer;
}
export interface WeatherRequestData {
  location: string;
  key: string | undefined;
  type: string;
}

export interface Daily {
  date: Date;
  type: string;
  name: string;
  level: string;
  category: string;
  text: string;
}

export interface Refer {
  sources: string[];
  license: string[];
}
