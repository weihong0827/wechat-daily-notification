import { NextResponse } from "next/server";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const echostr = searchParams.get("echostr");
  return NextResponse.json(echostr, {
    status: 200,
  });
}
