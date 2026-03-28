import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 10000;
const apiKey = process.env.GEMINI_API_KEY;

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

function buildSystemPrompt(mode = "hoc-bai") {
  const base = `Bạn là Trợ lí AI hỗ trợ học sinh học Tin học 10 theo sách Kết nối tri thức với cuộc sống.

Yêu cầu chung:
- Trả lời bằng tiếng Việt, rõ ràng, dễ hiểu, phù hợp học sinh lớp 10.
- Bám sát kiến thức Tin học 10 chương trình phổ thông.
- Khi giải thích phải ngắn gọn, có ví dụ đơn giản.
- Không nhắc đến sản phẩm dự thi, không nói lan man.
- Nếu học sinh hỏi ngoài môn học, hãy nhẹ nhàng kéo về nội dung Tin học 10.
- Khi có thể, trình bày theo mục: Khái niệm, Cách làm, Ví dụ, Ghi nhớ.
`;

  if (mode === "trac-nghiem") {
    return base + `\nChế độ hiện tại: CÂU TRẮC NGHIỆM.
- Ưu tiên tạo câu trắc nghiệm 4 đáp án A, B, C, D.
- Sau mỗi câu, ghi rõ đáp án đúng và giải thích ngắn.
- Nếu người dùng yêu cầu nhiều câu, đánh số từng câu.
- Nội dung phải bám sát Tin học 10 sách Kết nối tri thức.`;
  }

  if (mode === "de-kiem-tra") {
    return base + `\nChế độ hiện tại: ĐỀ KIỂM TRA.
- Hãy tạo đề kiểm tra phù hợp học sinh lớp 10.
- Có thể chia thành phần trắc nghiệm và tự luận ngắn.
- Nếu người dùng không nêu thời lượng, mặc định tạo đề 15 phút hoặc 45 phút tùy ngữ cảnh.
- Cuối cùng có đáp án hoặc hướng dẫn chấm ngắn gọn.`;
  }

  return base + `\nChế độ hiện tại: HỌC BÀI.
- Tập trung giải thích lý thuyết, ví dụ, hướng dẫn học sinh luyện tập.
- Nếu phù hợp, có thể thêm 1-2 câu hỏi tự kiểm tra cuối câu trả lời.`;
}

app.post("/chat", async (req, res) => {
  try {
    const { message = "", mode = "hoc-bai" } = req.body || {};

    if (!message.trim()) {
      return res.json({ reply: "Bạn hãy nhập câu hỏi về Tin học 10 để mình hỗ trợ nhé." });
    }

    if (!apiKey) {
      return res.status(500).json({
        reply: "Chưa cấu hình GEMINI_API_KEY trên Render. Hãy vào Environment để thêm khóa API."
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `${buildSystemPrompt(mode)}\n\nCâu hỏi của học sinh: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const reply = response.text || "Mình chưa tạo được phản hồi. Bạn hãy thử hỏi lại theo cách ngắn gọn hơn nhé.";
    res.json({ reply });
  } catch (error) {
    console.error("Lỗi /chat:", error);
    res.status(500).json({
      reply: "Máy chủ đang gặp lỗi khi kết nối AI. Bạn kiểm tra lại API key hoặc thử lại sau."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
