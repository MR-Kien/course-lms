# Environment Variables Template

Tạo file `.env` trong root directory với nội dung sau:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
VITE_CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# API Configuration
VITE_API_URL=http://localhost:8765/api/iam

# Development
NODE_ENV=development
VITE_APP_TITLE=Learnly LMS
VITE_APP_VERSION=1.0.0
```

## 🔧 Hướng dẫn Setup

### 1. Firebase Setup
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Vào **Project Settings** > **General** > **Your apps**
4. Thêm web app và copy config
5. Enable **Authentication** và **Firestore Database**

### 2. Cloudinary Setup
1. Truy cập [Cloudinary Console](https://cloudinary.com/console)
2. Đăng ký tài khoản miễn phí
3. Vào **Dashboard** để lấy:
   - Cloud Name
   - API Key
   - API Secret

### 3. Cài đặt Dependencies
```bash
npm install firebase cloudinary qrcode
```

### 4. Tạo file .env
Copy nội dung trên vào file `.env` và thay thế các giá trị placeholder bằng config thật của bạn.

## ⚠️ Lưu ý quan trọng

- **KHÔNG** commit file `.env` vào git
- File `.env` đã được thêm vào `.gitignore`
- Chỉ sử dụng file `.env.example` làm template
- Thay đổi tất cả các giá trị placeholder trước khi chạy ứng dụng
