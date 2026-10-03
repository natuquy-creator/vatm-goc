# VATM — Hồ sơ xuất nhập cảnh Đảng viên (Web + APK Android)

## Cấu trúc
- `www/` — toàn bộ giao diện web (`index.html`, `manifest.json`, `sw.js`, `icons/`). Sửa giao diện chỉ cần sửa `www/index.html`.
- `assets/` — logo VATM gốc. Biểu tượng app và màn hình khởi động Android được workflow tự tạo từ `www/icons/icon-512.png`.
- `capacitor.config.json`, `package.json` — cấu hình đóng gói app Android (Capacitor).
- `.github/workflows/build-apk.yml` — tự động build file APK trên GitHub.

## Tạo file APK trên GitHub
1. Tạo repository mới trên GitHub (ví dụ `vatm-app`), rồi tải **toàn bộ nội dung bên trong thư mục đã giải nén** lên (kể cả thư mục ẩn `.github`). Khi vào repository phải thấy ngay `www`, `assets`, `package.json`, `capacitor.config.json` và `.github` ở ngoài cùng.
2. Vào tab **Actions** → chọn **Build Android APK** → **Run workflow** (hoặc cứ push lên nhánh `main` là tự chạy).
3. Chờ khoảng 5–10 phút. Khi chạy xong, mở lần chạy đó → mục **Artifacts** → tải **VATM-HoSo-APK** (giải nén ra `app-debug.apk`).
4. Chép file `app-debug.apk` sang điện thoại Android, mở lên và cài đặt (cho phép "Cài ứng dụng từ nguồn không xác định" nếu máy hỏi).

## Ghi chú
- App cần Internet: giao diện dùng thư viện từ CDN và đồng bộ dữ liệu qua Firebase như bản web.
- Quét mã QR đăng nhập cần cấp quyền Camera lần đầu mở.
- File APK này là bản debug, đủ để cài trực tiếp. Muốn đưa lên Google Play cần ký bản release.
- Mỗi lần sửa `www/index.html` và push lên GitHub, workflow sẽ build lại APK mới.

## Nếu build bị lỗi
Mở lần chạy bị đỏ trong tab **Actions** → bấm vào bước có dấu ✗ → chép phần chữ lỗi để được hỗ trợ.
