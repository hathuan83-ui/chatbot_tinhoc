import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const SYSTEM_PROMPT =
  "Bạn là Trợ lí AI hỗ trợ học sinh học Tin học 10. Hãy trả lời bằng tiếng Việt, rõ ràng, ngắn gọn, dễ hiểu, đúng kiến thức phổ thông. Khi giải bài Python, hãy giải thích từng bước, đưa ví dụ và nhắc lỗi thường gặp nếu cần.";

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    server: "running",
    hasApiKey: Boolean(apiKey),
    provider: "gemini",
    model: MODEL_NAME
  });
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = (req.body?.message || "").trim();

    if (!userMessage) {
      return res.status(400).json({ reply: "Bạn hãy nhập câu hỏi trước khi gửi." });
    }

    if (!ai) {
      return res.status(500).json({
        reply: "Máy chủ chưa có Gemini API key. Hãy thêm GEMINI_API_KEY trong Render > Environment."
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.5,
        maxOutputTokens: 700
      }
    });

    const reply =
      response?.text?.trim() ||
      response?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim() ||
      "AI chưa tạo được câu trả lời.";

    return res.json({ reply });
  } catch (error) {
    console.error("Lỗi /chat:", error);

    const status = error?.status || error?.code;
    const rawMessage = error?.message || "";
    let message = "Không kết nối được tới Gemini. Hãy xem Logs trên Render để kiểm tra chi tiết.";

    if (status === 400 || /API key not valid/i.test(rawMessage)) {
      message = "Gemini API key không hợp lệ. Hãy kiểm tra lại GEMINI_API_KEY.";
    } else if (status === 403) {
      message = "API key chưa được cấp quyền hoặc dự án Google chưa bật Gemini API.";
    } else if (status === 429 || /quota/i.test(rawMessage)) {
      message = "Tài khoản Gemini đang vượt giới hạn tạm thời. Hãy thử lại sau ít phút.";
    }

    return res.status(500).json({ reply: message });
  }
});

app.listen(PORT, () => {
  console.log(`Server Gemini đang chạy tại cổng ${PORT}`);
});
