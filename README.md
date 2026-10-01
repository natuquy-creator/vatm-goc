# VATM Web App — GitHub Pages + Firebase

## Trạng thái
Gói này chứa giao diện tĩnh. Chưa kết nối Firebase vì cấu hình trong `index.html` còn là placeholder. Chưa triển khai trực tuyến.

## 1. Tạo Firebase
1. Tạo project tại https://console.firebase.google.com/ và đăng ký Web App.
2. Bật Firebase Authentication (khuyến nghị Email/Password).
3. Tạo Realtime Database. Chọn vị trí phù hợp.
4. Sao chép cấu hình web (`apiKey`, `authDomain`, `databaseURL`, `projectId`, `appId`) vào đối tượng `FIREBASE_CONFIG` trong `index.html`. Các giá trị cấu hình web không phải mật khẩu quản trị; bảo mật dữ liệu phải do Authentication và Database Rules đảm nhiệm.
5. Không bật quyền đọc/ghi công khai. `database.rules.json` đi kèm đang khóa toàn bộ truy cập để tránh lộ dữ liệu khi chưa thiết kế xong phân quyền.

## 2. Lưu ý bảo mật quan trọng trước khi mở cho thành viên
Phiên bản hiện tại ghi snapshot toàn bộ dữ liệu tại `vatmSharedWorkspace` từ trình duyệt. Nếu chỉ đặt `.read`/`.write` cho mọi người đã đăng nhập thì bất kỳ tài khoản đăng nhập nào cũng có thể sửa dữ liệu của người khác. Không triển khai quy tắc đó với dữ liệu thật. Cần chuyển sang cấu trúc dữ liệu theo UID, xác thực Admin bằng Firebase Custom Claims hoặc backend tin cậy, và giới hạn quyền đọc/ghi từng nhánh. Cơ chế đăng nhập/role phía client hiện tại không đủ để bảo vệ dữ liệu.

## 3. Đưa giao diện lên GitHub Pages
1. Tạo repository GitHub, ví dụ `vatm-portal`.
2. Tải `index.html`, `.nojekyll`, `README.md` lên thư mục gốc repository.
3. Vào **Settings → Pages**.
4. Chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, rồi Save.
5. Sau khi GitHub hoàn tất triển khai, link sẽ có dạng `https://TEN-GITHUB.github.io/vatm-portal/`.

GitHub Pages chỉ host giao diện. Firebase là dịch vụ dữ liệu/xác thực riêng; phải cấu hình xong và kiểm thử quyền Admin/User trước khi chia sẻ link cho thành viên.
