# AppChat

Ứng dụng chat (Frontend) - ReactJS + TypeScript + Bootstrap.

## Chạy project

```
npm install
npm run dev
```

## Cấu trúc thư mục

```
src/
  route/        Router, Layout, trang lỗi
  pages/        Các trang: Login, Register, Chat
  components/   Các thành phần dùng trong trang
  service/      Kết nối socket (ChatSocket.ts)
  context/      Quản lý dữ liệu: AuthContext, ChatContext
  hooks/        Hook dùng chung: useConnected
```
