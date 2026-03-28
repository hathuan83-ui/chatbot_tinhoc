import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

const apiKey = process.env.OPENAI_API_KEY;
const client = apiKey ? new OpenAI({ apiKey }) : null;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    server: "running",
    hasApiKey: Boolean(apiKey)
  });
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = (req.body?.message || "").trim();

    if (!userMessage) {
      return res.status(400).json({ reply: "Bạn hãy nhập câu hỏi trước khi gửi." });
    }

    if (!client) {
      return res.status(500).json({
        reply: "Máy chủ chưa có API key. Hãy thêm OPENAI_API_KEY trong Render > Environment."
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "developer",
          content:
            "Bạn là Trợ lí AI hỗ trợ học sinh học Tin học 10. Trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu, đúng kiến thức phổ thông. Khi gặp bài Python, hãy giải thích từng bước và đưa ví dụ rõ ràng."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.5,
      max_tokens: 700
    });

    const reply = response.choices?.[0]?.message?.content?.trim() || "AI chưa tạo được câu trả lời.";
    return res.json({ reply });
  } catch (error) {
    console.error("Lỗi /chat:", error);

    const message = error?.status === 401
      ? "API key không hợp lệ hoặc đã hết hiệu lực."
      : error?.status === 429
      ? "Tài khoản API đang vượt giới hạn hoặc hết quota."
      : "Không kết nối được tới dịch vụ AI. Hãy xem Logs trên Render để kiểm tra chi tiết.";

    return res.status(500).json({ reply: message });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});
