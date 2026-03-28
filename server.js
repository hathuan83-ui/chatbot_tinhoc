const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Trang chủ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API chat mẫu
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    if (!userMessage.trim()) {
      return res.json({ reply: "Bạn hãy nhập câu hỏi." });
    }

    // Trả lời tạm thời
    res.json({
      reply: "Bạn vừa hỏi: " + userMessage
    });
  } catch (error) {
    console.error("Lỗi /chat:", error);
    res.status(500).json({
      reply: "Có lỗi xảy ra ở máy chủ."
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
