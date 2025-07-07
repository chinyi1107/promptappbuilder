// src/app/api/gpt-prompt-app-builder/route.ts
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 請記得設定 .env.local
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const result = chatResponse.choices[0]?.message?.content;
    return NextResponse.json({ result });
  } catch (err) {
    console.error("GPT Error:", err);
    return NextResponse.json({ error: "GPT request failed" }, { status: 500 });
  }
}
