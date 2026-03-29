# Trợ lí AI môn Tin học THPT - Kết nối tri thức

## Cách chạy trên Render

1. Upload toàn bộ file này lên GitHub.
2. Tạo Web Service trên Render từ repo GitHub.
3. Trong Environment của Render, thêm biến:
   - `GEMINI_API_KEY` = khóa Gemini của bạn
4. Deploy lại service.

## Cấu trúc file

- `index.html`: giao diện người dùng
- `server.js`: backend Express gọi Gemini API
- `package.json`: cấu hình Node.js
- `render.yaml`: gợi ý cấu hình Render
- `.gitignore`: bỏ qua file không cần thiết
