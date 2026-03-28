# Trợ lí AI hỗ trợ học Tin học 10 - bản Gemini

## 1) File cần có
- `server.js`
- `index.html`
- `style.css`
- `script.js`
- `package.json`
- `.env.example`

## 2) Chạy trên máy
```bash
npm install
cp .env.example .env
# sửa GEMINI_API_KEY trong .env
npm start
```

## 3) Deploy trên Render
- New Web Service
- Chọn repo GitHub
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - `GEMINI_API_KEY` = khóa API Gemini của bạn
  - `GEMINI_MODEL` = `gemini-2.0-flash` (không bắt buộc)

## 4) Kiểm tra nhanh
- Vào `/health`
- Nếu thấy `hasApiKey: true` và `provider: gemini` là server đã nhận key.

## 5) Lỗi thường gặp
- `Gemini API key không hợp lệ` → key sai.
- `chưa được cấp quyền` → key hoặc dự án Google chưa bật Gemini API.
- `vượt giới hạn tạm thời` → chờ một lúc rồi thử lại.
