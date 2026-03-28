# Trợ lí AI hỗ trợ học sinh học Tin học 10

Đây là bộ mã nguồn hoàn chỉnh cho sản phẩm dự thi cấp tỉnh. Giao diện được thiết kế theo phong cách hiện đại, dễ trình diễn, có backend Node.js và kết nối Gemini API.

## 1) Thành phần chính
- `public/index.html`: giao diện chính
- `public/style.css`: giao diện đẹp, responsive
- `public/script.js`: xử lý chat, câu hỏi mẫu, xuất TXT
- `server.js`: backend Express kết nối Gemini API
- `.env.example`: mẫu biến môi trường
- `package.json`: cấu hình dự án

## 2) Chạy trên máy tính
### Bước 1: cài Node.js
Cài Node.js bản 18 trở lên.

### Bước 2: cài thư viện
Mở Terminal tại thư mục dự án và chạy:
```bash
npm install
```

### Bước 3: tạo file `.env`
Sao chép file `.env.example` thành `.env` rồi dán API key:
```env
GEMINI_API_KEY=API_CUA_BAN
PORT=10000
```

### Bước 4: chạy dự án
```bash
npm start
```
Mở trình duyệt tại địa chỉ:
```bash
http://localhost:10000
```

## 3) Đưa lên Render
### Build Command
```bash
npm install
```

### Start Command
```bash
npm start
```

### Environment Variables
- `GEMINI_API_KEY` = mã API Gemini của bạn
- `PORT` = `10000` (có thể để Render tự cấp)

## 4) Điểm nổi bật khi dự thi
- Có sản phẩm chạy thật trên web
- Có AI trả lời nội dung Tin học 10
- Có giao diện hiện đại, dễ trình chiếu trước hội đồng
- Có thể mở rộng thành trợ lí học tập theo từng bài/chủ đề

## 5) Gợi ý trình bày với ban giám khảo
Bạn có thể giới thiệu ngắn gọn như sau:
> Sản phẩm là trợ lí AI hỗ trợ học sinh học Tin học 10, được xây dựng dưới dạng web chatbot. Hệ thống sử dụng giao diện thân thiện, backend Node.js và mô hình Gemini API để giải thích kiến thức, hướng dẫn làm bài tập và hỗ trợ ôn tập cho học sinh một cách trực quan, linh hoạt.
