# Trợ lí AI môn Tin học THPT – Kết nối tri thức

## Cách chạy trên Render

1. Upload toàn bộ file lên GitHub.
2. Tạo Web Service trên Render.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Trong Environment thêm:
   - `GEMINI_API_KEY` = API key của bạn
   - `GEMINI_MODEL` = tùy chọn, có thể để trống

## Bản sửa cuối

- Ưu tiên dùng `gemini-2.5-flash`
- Nếu lỗi quota hoặc model không dùng được, server sẽ thử tiếp `gemini-1.5-flash`
- Nếu cả hai đều hết quota, giao diện sẽ báo rõ để bạn đổi project hoặc bật billing

## Lưu ý

Nếu gặp lỗi 429 quota exceeded thì đó là lỗi quota của Google AI Studio / Gemini API, không phải lỗi giao diện.
