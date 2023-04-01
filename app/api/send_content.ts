import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as WEATHER_TYPES from "../../types/weather";
import * as REQUESTDATA_TYPES from "../../types/requestData";
import * as WECHAT_TYPES from "../../types/wechat";
import * as JUHE_TYPES from "../../types/juhe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requireData: REQUESTDATA_TYPES.RequiredData = await getRequiredData();
  const { englishQuote, token, zodiacResult, weather, dateObject } =
    requireData;

  const url: string = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`;

  const data: WECHAT_TYPES.DailyMsgData = {
    date: {
      value: dateObject.date,
      color: "#173177",
    },
    lunarDate: {
      value: dateObject.lunarDate,
      color: "#1d1d1d",
    },
    weather: {
      value: weather,
      color: "#2fbab1",
    },
    englishQuoteContent: {
      value: englishQuote.content,
      color: "#8cffd1",
    },
    englishQuoteNote: {
      value: englishQuote.note,
      color: "#ff8585",
    },
    zodiacName: {
      value: zodiacResult.name,
      color: "#dcff85",
    },
    zodiacSummary: {
      value: zodiacResult.summary,
      color: "#d88fff",
    },
  };

  const user = "oFN3X6Im6eMbIJpPonLica4-z6yA";
  const primary_template = "e42kdzF5n0roSFfpqloj0yziUyv601-C9RTBQazy4R4";
  let response = await sendContent(data, user, primary_template, url);

  if (response.data.errcode !== 0) {
    res.status(400).json(response.data);
  }

  res.status(200).json(response.data);
}

const sendContent = async (
  data: WECHAT_TYPES.DailyMsgData,
  touser: string,
  template_id: string,
  url: string
) => {
  const requestBody: WECHAT_TYPES.templateRequestBody = {
    touser: touser,
    template_id: template_id,
    data: data,
    url: `https://wechat-official-platform.vercel.app/content/${touser}`,
  };

  const response = await axios.post<WECHAT_TYPES.templateResponse>(
    url,
    requestBody
  );
  return response;
};

const getDate: () => WECHAT_TYPES.DateType = () => {
  const time = new Date();
  const lunarDate = new Intl.DateTimeFormat("zh-u-ca-chinese", {
    dateStyle: "long",
  }).format(time);
  const date = new Intl.DateTimeFormat("zh-CN", { dateStyle: "full" }).format(
    time
  );
  return { date: date, lunarDate: lunarDate };
};

const getRequiredData: () => Promise<REQUESTDATA_TYPES.RequiredData> =
  async () => {
    const token_response: WECHAT_TYPES.ACCESS_TOKEN_RESPONSE =
      await getAccessToken();
    const token: string = token_response.access_token;
    const weatherData: WEATHER_TYPES.Weather = await getWeatherData();

    const weatherArr: string[] = weatherData.daily.map(
      (weather) => weather.name + "\n" + weather.text + "\n\n"
    );
    const weatherStr: string = weatherArr.join("");

    const date: WECHAT_TYPES.DateType = getDate();

    const englishQuote: JUHE_TYPES.Result = await getEnglishQuote();

    const zodiacResult: JUHE_TYPES.ZodiacResponse = await getZodiacTrend();

    const data = {
      token: token,
      weather: weatherStr,
      dateObject: date,
      englishQuote: englishQuote,
      zodiacResult: zodiacResult,
    };
    return data;
  };

const getWeatherData: () => Promise<WEATHER_TYPES.Weather> = async () => {
  const requestData: WEATHER_TYPES.WeatherRequestData = {
    location: "101110101",
    key: process.env.WEATHER_KEY,
    type: "1,8",
  };
  const url = `https://api.qweather.com/v7/indices/1d?location=${requestData.location}&key=${requestData.key}&type=${requestData.type}`;
  try {
    const response = await axios.get<WEATHER_TYPES.Weather>(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAccessToken: () => Promise<WECHAT_TYPES.ACCESS_TOKEN_RESPONSE> =
  async () => {
    const url: string = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${process.env.APPID}&secret=${process.env.SECRET}`;

    try {
      const response = await axios.get<WECHAT_TYPES.ACCESS_TOKEN_RESPONSE>(url);

      return response.data;
    } catch (error) {
      console.error("Error occurred while obtaining access token:", error);
      throw new Error("Failed to obtain access token");
    }
  };

const getEnglishQuote: () => Promise<JUHE_TYPES.Result> = async () => {
  const url = `http://apis.juhe.cn/fapigx/everyday/query?key=${process.env.ENGLISH_KEY}`;

  try {
    const response = await axios.get<JUHE_TYPES.EnglishResponse>(url);
    return response.data.result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getZodiacTrend: () => Promise<JUHE_TYPES.ZodiacResponse> = async () => {
  const url = `http://web.juhe.cn/constellation/getAll?key=${process.env.ZODIAC_KEY}&type=today&consName=%E7%8B%AE%E5%AD%90%E5%BA%A7`;
  try {
    const response = await axios.get<JUHE_TYPES.ZodiacResponse>(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
