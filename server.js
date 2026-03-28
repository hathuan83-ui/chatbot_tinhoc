import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const apiKey = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `Bạn là “Trợ lí AI hỗ trợ học sinh học Tin học 10” dành cho học sinh THPT Việt Nam.

Mục tiêu:
- Giải thích dễ hiểu, đúng trọng tâm, thân thiện.
- Ưu tiên nội dung phù hợp học sinh lớp 10.
- Hỗ trợ kiến thức Tin học 10, đặc biệt: thuật toán, lập trình Python cơ bản, dữ liệu, mạng máy tính, an toàn số, trí tuệ nhân tạo cơ bản và ứng dụng CNTT trong học tập.
- Khi học sinh hỏi bài tập, hãy hướng dẫn từng bước, không chỉ cho đáp án ngay.
- Khi hỏi code Python, hãy:
  1) giải thích đề,
  2) nêu ý tưởng,
  3) đưa mã,
  4) giải thích từng phần,
  5) cho ví dụ chạy thử.
- Nếu câu hỏi ngoài phạm vi Tin học 10, vẫn trả lời ngắn gọn nhưng nhắc đây là trợ lí học tập Tin học 10.
- Luôn trả lời bằng tiếng Việt rõ ràng, dùng tiêu đề nhỏ khi cần.
- Không bịa đặt. Nếu không chắc, nói rõ và đề xuất cách kiểm tra lại.

Phong cách:
- Tích cực, khích lệ.
- Trình bày đẹp, dễ chép vào vở.
- Với câu trả lời dài, chia mục rõ ràng.
`;

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && typeof item.role === 'string' && typeof item.text === 'string')
    .slice(-10)
    .map((item) => ({
      role: item.role === 'model' ? 'model' : 'user',
      text: item.text.trim().slice(0, 4000)
    }));
}

function buildContents(history, message) {
  const items = [];

  for (const turn of history) {
    items.push({
      role: turn.role,
      parts: [{ text: turn.text }]
    });
  }

  items.push({
    role: 'user',
    parts: [{ text: message }]
  });

  return items;
}

app.post('/chat', async (req, res) => {
  try {
    const message = (req.body?.message || '').trim();
    const history = sanitizeHistory(req.body?.history);

    if (!message) {
      return res.status(400).json({ reply: 'Bạn chưa nhập câu hỏi.' });
    }

    if (!apiKey || !ai) {
      return res.status(500).json({
        reply: 'Chưa cấu hình GEMINI_API_KEY. Hãy thêm biến môi trường GEMINI_API_KEY rồi chạy lại.'
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: buildContents(history, message),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 1200
      }
    });

    const reply = response.text?.trim() || 'Mình chưa tạo được phản hồi phù hợp. Bạn hãy hỏi lại ngắn gọn hơn nhé.';
    return res.json({ reply });
  } catch (error) {
    console.error('Lỗi /chat:', error);
    return res.status(500).json({
      reply: 'Máy chủ đang gặp lỗi khi kết nối AI. Hãy kiểm tra GEMINI_API_KEY hoặc thử lại sau.'
    });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
