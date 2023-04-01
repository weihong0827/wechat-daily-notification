export interface ACCESS_TOKEN_RESPONSE {
  access_token: string;
  expires_in: BigInteger;
}

export interface DataObject {
  value: string;
  color: string;
}
export interface DailyMsgData {
  date: DataObject;
  lunarDate: DataObject;
  weather: DataObject;
  englishQuoteContent: DataObject;
  englishQuoteNote: DataObject;
  zodiacName: DataObject;
  zodiacSummary: DataObject;
}

export interface DateType {
  date: string;
  lunarDate: string;
}

export interface templateRequestBody {
  touser: string;
  template_id: string;
  data: DailyMsgData;
  url: string;
}

export interface templateResponse {
  errcode: number;
  errormsg: string;
  msgid: number;
}
