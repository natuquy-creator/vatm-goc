# VATM — Hồ sơ xuất cảnh Đảng viên

Ứng dụng theo dõi **tờ trình · giấy phép · báo cáo xuất cảnh** đảng viên  
**Đảng bộ Tổng công ty Quản lý bay Việt Nam (VATM)**

> **Giữ nguyên logo VATM** và **toàn bộ logic/mã nguồn** ứng dụng.  
> Một codebase chạy **Web / PWA** và **Android APK** (Capacitor).

---

## Logo VATM

Icon app dùng **đúng logo SVG** trong giao diện (vòng tròn xanh, sóng radar, máy bay, sao):

- `icons/icon-192.png`, `icons/icon-512.png` — icon launcher (nền đỏ Đảng + logo VATM)
- `icons/icon-192.svg` — logo gốc trong suốt
- `resources/icon.png` — nguồn sinh icon Android adaptive

Logo trong `index.html` (header, màn đăng nhập) **không chỉnh sửa**.

---

## Tính năng (logic giữ nguyên + bổ sung giao việc)

- Đăng nhập / QR, phân quyền Admin & User  
- Hồ sơ xuất cảnh, thống kê đơn vị, xuất Word/PDF, Import Excel  
- **Giao việc** (Admin): đính kèm công văn đơn vị  
- **Nộp báo cáo công việc** (User) + Admin thấy hoàn thành ngay  
- Thông báo toast / chuông / push trình duyệt  
- Đồng bộ Firebase Realtime Database  

---

## Cấu trúc

```
vatm-hoso-xuat-canh/
├── index.html                 # Mã nguồn chính (không tách logic)
├── www/                       # Bản đóng gói cho APK (đồng bộ từ gốc)
├── icons/                     # Logo VATM (PNG/SVG)
├── resources/icon.png         # Icon build Android
├── manifest.json · sw.js      # PWA
├── capacitor.config.json      # appId: vn.vatm.hoso
├── package.json
└── scripts/sync-www.js
```

---

## Chạy Web

```bash
npm run serve
# http://localhost:5173
```

Hoặc: `python3 -m http.server 5173`

---

## Build Android APK

### Yêu cầu
- Node.js 18+  
- [Android Studio](https://developer.android.com/studio) (SDK 34, JDK 17)  

### Các bước

```bash
# 1. Cài dependency
npm install

# 2. Đồng bộ mã + logo vào www/
npm run build:www

# 3. Thêm project Android (chỉ lần đầu)
npx cap add android

# 4. (Tuỳ chọn) sinh icon launcher từ logo VATM
npm run assets

# 5. Đồng bộ Capacitor
npx cap sync android

# 6. Mở Android Studio → Build → Build APK(s) / Generate Signed Bundle
npx cap open android
```

**Gộp nhanh:** `npm run android`

| Mục | Giá trị |
|-----|---------|
| Application ID | `vn.vatm.hoso` |
| Tên hiển thị | VATM Hồ sơ |
| webDir | `www` |
| Theme | Đỏ Đảng `#b91c1c` |

Sau mỗi lần sửa `index.html`:

```bash
npm run build:www && npx cap sync android
```

---

## Đẩy GitHub

```bash
git init
git add .
git commit -m "VATM Ho so xuat canh — Web + Android APK, logo VATM goc"
git branch -M main
git remote add origin https://github.com/<USER>/<REPO>.git
git push -u origin main
```

---

## Lưu ý

- **Không đổi** cấu trúc hàm nghiệp vụ hồ sơ / đăng nhập / Firebase trong `index.html`  
- APK dùng cùng `index.html` qua WebView; class `is-app` bật UI mobile  
- Cấu hình Firebase: chỉnh `firebaseConfig` trong `index.html` theo project đơn vị  

---

## Thư mục `android/` — mã nguồn APK (Capacitor)

Đã kèm sẵn project Android để đẩy GitHub:

| Mục | Giá trị |
|-----|---------|
| applicationId | `vn.vatm.hoso` |
| MainActivity | `vn.vatm.hoso.MainActivity` |
| Tên app | VATM Hồ sơ |
| Icon | Logo VATM (mipmap) |
| WebView content | `android/app/src/main/assets/public/` ← đồng bộ từ `www/` |

### Cập nhật GitHub

```bash
git add .
git commit -m "Android Capacitor project — VATM Ho so (logo VATM)"
git push
```

### Build APK (máy có Android Studio)

```bash
npm install
npm run build:www
# copy lại assets nếu cần:
cp -a www/. android/app/src/main/assets/public/
npx cap sync android   # nếu đã cài @capacitor/cli
npx cap open android
```

Android Studio → **Build > Build APK(s)**.
