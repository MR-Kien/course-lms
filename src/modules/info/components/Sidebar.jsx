import { Lock, GraduationCap, Share2, QrCode, Gift, LogOut } from "lucide-react";

// interface SidebarProps {
//   activeItem?: string;
// }

export default function Sidebar() {
  const menuItems = [
    { id: "profile", label: "Thông tin cá nhân", icon: "user", active: true },
    { id: "password", label: "Đổi mật khẩu", icon: Lock },
    { id: "courses", label: "Khóa học của bạn", icon: GraduationCap },
    { id: "link", label: "Liên kết tài khoản", icon: Share2 },
    { id: "activation", label: "Nhập mã kích hoạt", icon: QrCode },
    { id: "referral", label: "Mã giới thiệu", icon: Gift },
    { id: "logout", label: "Đăng xuất", icon: LogOut },
  ];

  return (
    <div className="w-full md:w-64 bg-white rounded-2xl border border-black/50 shadow-xl p-4 h-fit">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-3">
          <svg className="w-7 h-7" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5846 22.75V20.5833C20.5846 19.4341 20.1281 18.3319 19.3154 17.5192C18.5028 16.7065 17.4006 16.25 16.2513 16.25H9.7513C8.60203 16.25 7.49983 16.7065 6.68717 17.5192C5.87451 18.3319 5.41797 19.4341 5.41797 20.5833V22.75" stroke="white" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.0013 11.9167C15.3945 11.9167 17.3346 9.97657 17.3346 7.58333C17.3346 5.1901 15.3945 3.25 13.0013 3.25C10.6081 3.25 8.66797 5.1901 8.66797 7.58333C8.66797 9.97657 10.6081 11.9167 13.0013 11.9167Z" stroke="white" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-black mb-1">Bùi Minh Hiếu</h3>
        <p className="text-sm text-black/50">Khối 9</p>
        <button className="mt-3 px-6 py-1.5 bg-blue-600/30 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-600/40 transition-colors">
          Cập nhật avatar
        </button>
      </div>

      <div className="border-t border-black pt-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === "profile"; // Example active item
          
          return (
            <button
              key={item.id}
              className={(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
                isActive 
                  ? "bg-purple-200/70 text-black font-bold" 
                  : "text-black hover:bg-gray-100"
              )}
            >
              {item.id === "profile" && (
                <svg className="w-6 h-6" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.9862 32.2551C23.7093 32.2551 29.9723 26.1527 29.9723 18.6275C29.9723 11.1024 23.7093 5 15.9862 5C8.26298 5 2 11.1024 2 18.6275C2 26.1527 8.26298 32.2551 15.9862 32.2551Z" fill="#2563EB"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.9936 12.1337H16.0905C18.222 12.1944 19.9313 14.1836 19.9313 16.6313C19.9313 19.079 18.222 21.0749 16.0905 21.1288H15.9867C13.5576 21.1288 12.049 18.8025 12.049 16.6245C12.049 14.1768 13.7583 12.1809 15.8898 12.127H15.9936V12.1337ZM7.39844 29.1934C7.39844 29.1934 10.2843 23.6439 12.3742 22.6999C14.0836 21.9312 17.9105 21.9312 19.613 22.6999C21.7029 23.6372 24.5887 29.1934 24.5887 29.1934C21.7445 31.4523 18.1597 32.0457 16.4711 32.2008V32.2547C16.4711 32.2547 16.2981 32.2547 15.9936 32.2345C15.6891 32.2547 15.5161 32.2547 15.5161 32.2547V32.2008C13.8275 32.0457 10.2427 31.4523 7.39844 29.1934Z" fill="#E6E6E6"/>
                </svg>
              )}
              {typeof Icon === "function" && <Icon className="w-5 h-5" />}
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
