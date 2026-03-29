import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

const PORT = process.env.PORT || 10000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const syllabus = {
  "10": {
    title: "Tin học 10",
    summary:
      "Trọng tâm gồm thông tin và xử lí thông tin, vai trò thiết bị thông minh, sử dụng thiết bị số, mạng máy tính, an toàn trên không gian mạng, khai thác tài nguyên Internet, bản quyền số, thiết kế đồ họa, Python, biến, lệnh vào ra, if, for, while, danh sách, xâu kí tự, hàm, tham số, phạm vi biến, nhận biết lỗi, kiểm thử và gỡ lỗi, thực hành viết chương trình, hướng nghiệp thiết kế đồ họa và phát triển phần mềm.",
    units: [
      "Bài 1. Thông tin và xử lí thông tin",
      "Bài 2. Vai trò của thiết bị thông minh và tin học đối với xã hội",
      "Bài 7. Thực hành sử dụng thiết bị số thông dụng",
      "Bài 8. Mạng máy tính trong cuộc sống hiện đại",
      "Bài 9. An toàn trên không gian mạng",
      "Bài 10. Thực hành khai thác tài nguyên trên Internet",
      "Bài 11. Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền",
      "Bài 12. Phần mềm thiết kế đồ họa",
      "Bài 13. Bổ sung các đối tượng đồ họa",
      "Bài 14. Làm việc với đối tượng đường và văn bản",
      "Bài 15. Hoàn thiện hình ảnh đồ họa",
      "Bài 16. Ngôn ngữ lập trình bậc cao và Python",
      "Bài 17. Biến và lệnh gán",
      "Bài 18. Các lệnh vào ra đơn giản",
      "Bài 19. Câu lệnh rẽ nhánh if",
      "Bài 20. Câu lệnh lặp For",
      "Bài 21. Câu lệnh lặp While",
      "Bài 22. Kiểu dữ liệu danh sách",
      "Bài 23. Một số lệnh làm việc với dữ liệu danh sách",
      "Bài 24. Xâu kí tự",
      "Bài 25. Một số lệnh làm việc với xâu kí tự",
      "Bài 26. Hàm trong Python",
      "Bài 27. Tham số của hàm",
      "Bài 28. Phạm vi của biến",
      "Bài 29. Nhận biết lỗi chương trình",
      "Bài 30. Kiểm thử và gỡ lỗi chương trình",
      "Bài 31. Thực hành viết chương trình đơn giản",
      "Bài 32. Ôn tập lập trình Python",
      "Bài 33. Nghề thiết kế đồ họa máy tính",
      "Bài 34. Nghề phát triển phần mềm"
    ]
  },
  "11": {
    title: "Tin học 11",
    summary:
      "Trọng tâm gồm hệ điều hành, thực hành sử dụng hệ điều hành, phần mềm nguồn mở, bên trong máy tính, kết nối máy tính với thiết bị số, lưu trữ và chia sẻ tệp tin trên Internet, tìm kiếm thông tin, thư điện tử và mạng xã hội, giao tiếp an toàn trên Internet, lưu trữ dữ liệu và khai thác thông tin, cơ sở dữ liệu, hệ quản trị cơ sở dữ liệu, cơ sở dữ liệu quan hệ, SQL, bảo mật hệ cơ sở dữ liệu, quản trị cơ sở dữ liệu, thực hành tạo và khai thác cơ sở dữ liệu, chỉnh sửa ảnh, tạo ảnh động, làm phim và thực hành tạo phim hoạt hình.",
    units: [
      "Bài 1. Hệ điều hành",
      "Bài 2. Thực hành sử dụng hệ điều hành",
      "Bài 3. Phần mềm nguồn mở và phần mềm chạy trên Internet",
      "Bài 4. Bên trong máy tính",
      "Bài 5. Kết nối máy tính với các thiết bị số",
      "Bài 6. Lưu trữ và chia sẻ tệp tin trên Internet",
      "Bài 7. Thực hành tìm kiếm thông tin trên Internet",
      "Bài 8. Thực hành nâng cao sử dụng thư điện tử và mạng xã hội",
      "Bài 9. Giao tiếp an toàn trên Internet",
      "Bài 10. Lưu trữ dữ liệu và khai thác thông tin phục vụ quản lí",
      "Bài 11. Cơ sở dữ liệu",
      "Bài 12. Hệ quản trị cơ sở dữ liệu và hệ cơ sở dữ liệu",
      "Bài 13. Cơ sở dữ liệu quan hệ",
      "Bài 14. SQL – Ngôn ngữ truy vấn có cấu trúc",
      "Bài 15. Bảo mật và an toàn hệ cơ sở dữ liệu",
      "Bài 16. Công việc quản trị cơ sở dữ liệu",
      "Bài 17. Quản trị CSDL trên máy tính",
      "Bài 18. Thực hành xác định cấu trúc bảng và các trường khóa",
      "Bài 19. Thực hành tạo lập CSDL và các bảng đơn giản",
      "Bài 20. Thực hành tạo lập các bảng có khóa ngoài",
      "Bài 21. Thực hành cập nhật và truy xuất dữ liệu các bảng đơn giản",
      "Bài 22. Thực hành cập nhật bảng dữ liệu có tham chiếu",
      "Bài 23. Thực hành truy xuất dữ liệu qua liên kết các bảng",
      "Bài 24. Thực hành sao lưu dữ liệu",
      "Bài 25. Phần mềm chỉnh sửa ảnh",
      "Bài 26. Công cụ chọn và công cụ tinh chỉnh màu sắc",
      "Bài 27. Công cụ vẽ và một số ứng dụng",
      "Bài 28. Tạo ảnh động",
      "Bài 29. Khám phá phần mềm làm phim",
      "Bài 30. Biên tập phim",
      "Bài 31. Thực hành tạo phim hoạt hình"
    ]
  },
  "12": {
    title: "Tin học 12",
    summary:
      "Trọng tâm gồm trí tuệ nhân tạo, thiết bị mạng, giao thức mạng, chia sẻ tài nguyên trên mạng, giao tiếp và ứng xử trong không gian mạng, HTML, CSS, thiết kế và xây dựng trang web, biểu mẫu, đa phương tiện, thực hành tổng hợp, kết nối thiết bị số, ứng dụng tin học và hướng nghiệp.",
    units: [
      "Bài 1. Làm quen với Trí tuệ nhân tạo",
      "Bài 2. Trí tuệ nhân tạo trong khoa học và đời sống",
      "Bài 3. Một số thiết bị mạng thông dụng",
      "Bài 4. Giao thức mạng",
      "Bài 5. Thực hành chia sẻ tài nguyên trên mạng",
      "Bài 6. Giao tiếp và ứng xử trong không gian mạng",
      "Bài 7. HTML và cấu trúc trang web",
      "Bài 8. Định dạng văn bản",
      "Bài 9. Tạo danh sách, bảng",
      "Bài 10. Tạo liên kết",
      "Bài 11. Chèn tệp tin đa phương tiện và khung nội tuyến vào trang web",
      "Bài 12. Tạo biểu mẫu",
      "Bài 13. Khái niệm, vai trò của CSS",
      "Bài 14. Định dạng văn bản bằng CSS",
      "Bài 15. Tạo màu cho chữ và nền",
      "Bài 16. Định dạng khung",
      "Bài 17. Các mức ưu tiên của bộ chọn",
      "Bài 18. Thực hành tổng hợp thiết kế trang web",
      "Bài 22. Thực hành kết nối các thiết bị số",
      "Bài 23. Chuẩn bị xây dựng trang web",
      "Bài 24. Xây dựng phần đầu trang web",
      "Bài 25. Xây dựng phần thân và chân trang web",
      "Bài 26. Liên kết và thanh điều hướng",
      "Bài 27. Biểu mẫu trên trang web",
      "Bài 28. Thực hành tổng hợp",
      "Bài 19. Dịch vụ sửa chữa và bảo trì máy tính",
      "Bài 20. Nhóm nghề quản trị thuộc ngành Công nghệ thông tin",
      "Bài 21. Hội thảo hướng nghiệp"
    ]
  }
};

function buildSystemPrompt({
  schoolLevel,
  userType,
  mode,
  topic,
  period,
  extra,
  templateText,
  message
}) {
  const gradeData = syllabus[schoolLevel] || syllabus["10"];
  const audienceText =
    userType === "teacher"
      ? "Người dùng là giáo viên, cần câu trả lời chuẩn sư phạm, rõ bố cục, dùng được ngay."
      : "Người dùng là học sinh, cần câu trả lời dễ hiểu, có ví dụ, ngắn gọn vừa đủ.";

  const modeGuide = {
    chat: "Giải thích kiến thức, bám đúng bài học, có ví dụ minh họa, dùng ngôn ngữ phù hợp THPT.",
    test: "Tạo đề kiểm tra hoàn chỉnh, có cấu trúc rõ ràng, có thể gồm trắc nghiệm/tự luận, có đáp án nếu phù hợp.",
    lesson: "Soạn giáo án hoặc kế hoạch bài dạy, có mục tiêu, thiết bị, tiến trình dạy học, hoạt động học tập.",
    quiz: "Tạo câu hỏi trắc nghiệm bám bài học, có đáp án, nên có lời giải hoặc giải thích ngắn.",
    matrix: "Tạo ma trận đề và bảng đặc tả theo chủ đề, mức độ nhận thức, số câu, số điểm.",
    code: "Phân tích lỗi code, chỉ rõ nguyên nhân, sửa lại hoàn chỉnh, giải thích cách sửa."
  };

  return `
Bạn là Trợ lí AI hỗ trợ dạy và học môn Tin học THPT theo sách Kết nối tri thức.

Nguyên tắc:
- Chỉ trả lời bằng tiếng Việt.
- Bám đúng khối lớp được chọn.
- Không dùng nội dung ngoài chương trình khi không cần.
- Nếu người dùng dán mẫu, phải ưu tiên theo mẫu.
- Nếu là giáo viên, trình bày chuẩn, đẹp, đủ mục, dùng được ngay.
- Nếu là học sinh, giải thích dễ hiểu, có ví dụ, không quá dài.
- Nếu tạo đề, giáo án, ma trận, trắc nghiệm thì phải có tiêu đề và phân mục rõ ràng.

Dữ liệu khối lớp:
- Khối lớp: ${schoolLevel}
- Tên khối: ${gradeData.title}
- Nội dung trọng tâm: ${gradeData.summary}
- Các bài/chủ đề chính: ${gradeData.units.join("; ")}

Thông tin phiên làm việc:
- Đối tượng: ${userType}
- Hướng trả lời: ${audienceText}
- Chế độ: ${mode}
- Yêu cầu theo chế độ: ${modeGuide[mode] || modeGuide.chat}
- Chủ đề người dùng nhập: ${topic || "Chưa ghi rõ"}
- Thời lượng / ghi chú: ${period || "Không ghi"}
- Yêu cầu bổ sung: ${extra || "Không có"}
- Mẫu người dùng cung cấp:
${templateText || "Không có mẫu"}

Yêu cầu hiện tại:
${message}
`.trim();
}

async function callGemini(prompt) {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    GEMINI_API_KEY;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${errorText}`);
  }

  const data = await response.json();
  return (
    data?.candidates?.[0]?.content?.parts?.map(part => part.text).join("\n").trim() ||
    "Không nhận được nội dung phản hồi từ Gemini."
  );
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/chat", async (req, res) => {
  try {
    const {
      message = "",
      mode = "chat",
      schoolLevel = "10",
      userType = "teacher",
      topic = "",
      period = "",
      extra = "",
      templateText = ""
    } = req.body || {};

    if (!message.trim()) {
      return res.json({
        reply: "Bạn hãy nhập yêu cầu trước khi gửi."
      });
    }

    if (!GEMINI_API_KEY) {
      return res.json({
        reply:
          "Chưa có GEMINI_API_KEY trong Render. Bạn cần vào Environment và thêm biến GEMINI_API_KEY để chạy AI thật."
      });
    }

    const prompt = buildSystemPrompt({
      schoolLevel,
      userType,
      mode,
      topic,
      period,
      extra,
      templateText,
      message
    });

    const reply = await callGemini(prompt);
    res.json({ reply });
  } catch (error) {
    console.error("Lỗi /chat:", error);
    res.status(500).json({
      reply: "Có lỗi xảy ra ở máy chủ: " + error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
