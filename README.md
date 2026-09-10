# ATFace — hệ thống GitHub Pages + Supabase

## 1. Supabase
- Mở SQL Editor.
- Chạy `supabase/schema.sql`.
- Vào Authentication → Providers → Email và bật Email.
- Đăng ký tài khoản trên web.
- Lấy UUID tài khoản trong Authentication → Users.
- Chạy: `update public.profiles set role='admin' where id='UUID';`

## 2. GitHub Pages
- Mở `js/config.js`.
- Thay `YOUR_SUPABASE_URL` bằng Project URL.
- Thay `YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY` bằng public/anon key.
- Không bao giờ đưa `service_role` key lên GitHub.
- Upload toàn bộ project lên repository.
- Settings → Pages → Deploy from branch → main.

## 3. Cái gì đã chạy thật
- Đăng ký / đăng nhập Supabase Auth.
- Tự tạo profile sau đăng ký.
- User có số dư riêng.
- RLS: user chỉ đọc dữ liệu của mình.
- Phân quyền user/admin.
- Admin panel.
- Admin cộng/trừ xu bằng RPC bảo vệ ở database.
- Lịch sử giao dịch.
- Thống kê sử dụng cơ bản.

## 4. Phần tool thật
Các nút tool hiện đã có điểm kết nối nhưng chưa tự động gọi một API bên thứ ba. Muốn chức năng thực sự chạy, cần xây Edge Function/API cho từng tool và xác định API hợp pháp mà bạn có quyền sử dụng.
