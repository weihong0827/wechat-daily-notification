import { Result } from "./juhe";
import { DateType } from "./wechat";
import { ZodiacResponse } from "./juhe";
export interface RequiredData {
  token: string;
  weather: string;
  dateObject: DateType;
  englishQuote: Result;
  zodiacResult: ZodiacResponse;
}
