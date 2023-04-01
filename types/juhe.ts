export interface EnglishResponse {
  reason: string;
  result: Result;
  error_code: number;
}
export interface ZodiacResponse {
  date: number;
  name: string;
  QFriend: string;
  color: string;
  datetime: string;
  health: string;
  love: string;
  work: string;
  money: string;
  number: number;
  summary: string;
  all: string;
  resultcode: string;
  error_code: number;
}

export interface Result {
  id: number;
  content: string;
  note: string;
  source: string;
  date: Date;
}
