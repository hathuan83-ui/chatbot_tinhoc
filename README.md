# Trợ lí AI hỗ trợ học Tin học 10

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
# sửa OPENAI_API_KEY trong .env
npm start
```

## 3) Deploy trên Render
- New Web Service
- Chọn repo GitHub
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - `OPENAI_API_KEY` = khóa API của bạn
  - `PORT` = `10000` (không bắt buộc, Render tự cấp cũng được)

## 4) Kiểm tra nhanh
- Vào `/health`
- Nếu thấy `hasApiKey: true` là server đã nhận key.

## 5) Lỗi thường gặp
- `API key không hợp lệ` → key sai hoặc hết hiệu lực.
- `vượt giới hạn hoặc hết quota` → tài khoản API không còn quota.
- Trang mở được nhưng chat lỗi → thường do chưa thêm biến môi trường trên Render.
