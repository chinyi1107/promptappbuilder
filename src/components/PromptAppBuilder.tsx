"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import { motion } from "framer-motion";
import "@/app/globals.css";

export default function PromptAppBuilder() {
  const [stage, setStage] = useState(1);
  const [goal, setGoal] = useState("");
  const [users, setUsers] = useState("");
  const [functions, setFunctions] = useState("");
  const [tone, setTone] = useState("溫暖");
  const [color, setColor] = useState("粉橘");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (stage === 3) {
      setLoading(true);
      try {
        const prompt = `請根據以下資訊，幫我規劃一個 App 的初始架構：\n\n🎯 目標：${goal}\n👥 使用者：${users}\n🧩 功能：${functions}\n🎨 語氣風格：${tone}\n🎨 顏色風格：${color}\n\n請產出一段簡單的功能架構描述，包含頁面列表與功能模組，並附加風格建議。`;

        const response = await fetch("/api/gpt-prompt-app-builder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        setOutput(data.result || "⚠️ 無法取得回應");
      } catch (err) {
        setOutput("❌ 發生錯誤，請稍後再試。");
      } finally {
        setLoading(false);
        setStage(stage + 1);
      }
    } else {
      setStage(stage + 1);
    }
  };

  const renderStyleSuggestion = () => (
    <div className="p-4 border rounded bg-orange-50 text-sm space-y-1">
      <p className="font-semibold">🎨 Vibe 樣式建議：</p>
      <ul className="list-disc list-inside">
        <li>語氣風格：{tone}</li>
        <li>顏色風格：{color}</li>
        <li>
          動效建議：
          {tone === "溫暖"
            ? "使用淡入淡出與柔和滑動"
            : tone === "冷靜"
            ? "使用簡潔淡入與固定呈現"
            : "使用彈跳或動態旋轉效果"}
        </li>
        <li>
          字體建議：
          {tone === "溫暖"
            ? "圓潤手寫風格"
            : tone === "冷靜"
            ? "現代幾何無襯線體"
            : "活潑 Comic 或 Pop 字體"}
        </li>
      </ul>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">🧩 Prompt App Builder</h1>

      <Card className="shadow-md">
        <CardContent className="space-y-4 p-4">
          {stage === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="font-medium">1️⃣ 請描述你想建立的 App 是什麼？</p>
              <Textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="例如：幫助我追蹤每日任務並根據情緒推薦任務順序"
              />
              <Button onClick={handleNext}>下一步</Button>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <p className="font-medium">2️⃣ 誰會使用這個 App？</p>
              <Input
                value={users}
                onChange={(e) => setUsers(e.target.value)}
                placeholder="例如：我自己，或是習慣拖延的人"
              />
              <p className="font-medium pt-2">🎨 選擇語氣風格：</p>
              <Select value={tone} onValueChange={setTone}>
                <SelectItem value="溫暖">溫暖</SelectItem>
                <SelectItem value="冷靜">冷靜</SelectItem>
                <SelectItem value="活潑">活潑</SelectItem>
              </Select>
              <p className="font-medium pt-2">🎨 選擇顏色風格：</p>
              <Select value={color} onValueChange={setColor}>
                <SelectItem value="粉橘">粉橘</SelectItem>
                <SelectItem value="冷藍">冷藍</SelectItem>
                <SelectItem value="亮黃">亮黃</SelectItem>
              </Select>
              <Button onClick={handleNext} className="mt-4">
                下一步
              </Button>
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="space-y-2">3️⃣ 希望有哪些功能？</p>
              <Textarea
                value={functions}
                onChange={(e) => setFunctions(e.target.value)}
                placeholder="例如：任務列表、情緒輸入、推薦任務按鈕"
              />
              <Button onClick={handleNext} className="mt-2" disabled={loading}>
                {loading ? "產生中..." : "產生初步架構"}
              </Button>
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <p className="font-medium">📦 初步規劃結果如下：</p>
              <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
                {output}
              </pre>
              {renderStyleSuggestion()}
              <Button variant="outline" onClick={() => setStage(1)}>
                重新開始
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
