declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      APPID: string;
      SECRET: string;
      WEATHER_KEY: string;
      ENGLISH_KEY: string;
      ZODIAC_KEY: string;
      USER: string;
      TEMPLATE_ID: string;
    }
  }
}
export { };
