# VATM — Hệ thống theo dõi tờ trình, giấy phép và báo cáo xuất cảnh Đảng viên

Ứng dụng web (PWA) dùng **chung một mã nguồn** trên **điện thoại** và **máy tính**.

## Liên kết

| Mục | Đường dẫn |
|-----|-----------|
| **Ứng dụng (GitHub Pages)** | https://natuquy-creator.github.io/vatm-hoso-xuatcanh/ |
| **Mã nguồn** | https://github.com/natuquy-creator/vatm-hoso-xuatcanh |

## Cài đặt như app điện thoại

1. Mở link ứng dụng bằng **Chrome** (Android) hoặc **Safari** (iPhone).
2. **Android:** menu ⋮ → **Thêm vào màn hình chính** / **Cài đặt ứng dụng**.
3. **iPhone:** nút Chia sẻ → **Thêm vào Màn hình chính**.
4. Mở icon **VATM Hồ sơ** như app độc lập (toàn màn hình, không thanh địa chỉ).

Trên **PC**: mở link trên trình duyệt; có thể *Cài đặt ứng dụng* (Chrome → biểu tượng cài đặt trên thanh địa chỉ).

## Tài khoản demo

| Vai trò | Tên đăng nhập | Mật khẩu |
|---------|---------------|----------|
| Quản trị | `admin` | `123` |
| Đảng viên | `01.0029381` | `123` |

## Tính năng

- Theo dõi hồ sơ xuất cảnh, tờ trình / giấy phép, báo cáo sau chuyến đi
- Phân quyền Admin / Đảng viên
- Thống kê theo đơn vị, chi bộ
- Xuất Excel, Word, in danh sách / báo cáo
- Đồng bộ đa thiết bị qua Firebase Realtime Database (nếu đã cấu hình)
- Giao diện responsive + PWA (mobile & PC)

## Cấu trúc mã nguồn

```
├── index.html      # Ứng dụng đầy đủ (UI + logic)
├── manifest.json   # Cấu hình PWA
├── sw.js           # Service Worker (cache offline shell)
├── icons/          # Icon app
└── README.md
```

Cùng một `index.html` chạy trên mọi thiết bị — không tách app native riêng.

## Bật GitHub Pages (nếu chưa bật)

1. Vào **Settings → Pages** của repository.
2. **Source:** Deploy from branch `main`, thư mục `/ (root)`.
3. Sau vài phút truy cập: `https://natuquy-creator.github.io/vatm-hoso-xuatcanh/`

## Ghi chú bảo mật

- Đây là ứng dụng phía trình duyệt; mật khẩu được băm phía client (SHA-256).
- Khi dùng thật: cấu hình Firebase Rules chặt, đổi mật khẩu mặc định, hạn chế quyền đọc/ghi công khai.
