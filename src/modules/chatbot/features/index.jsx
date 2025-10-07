import { useState } from "react";
import { ENDPOINTS } from "../../../routes/endPoints";
import { Link , useNavigate } from "react-router-dom";
import {
  Menu,
  Settings,
  MessageSquare,
  HelpCircle,
  BookOpen,
  BarChart3,
  User,
  Users,
  LogOut,
  ChevronDown,
  Send,
  Link as LinkIcon,
  Image,
  ChevronLeft,
  GraduationCap
} from "lucide-react";

function SidebarContent({ collapsed }) {
  const conversations = [
    {
      title: "Giải phương trình bậc hai",
      preview: "Để giải phương trình bậc hai...",
    },
    {
      title: "Thì quá khứ đơn và thì hiện tại...",
      preview: "Cách sử dụng thì quá khứ...",
    },
    {
      title: "Định luật Ôm là gì?",
      preview: "Định luật Ôm mô tả mối quan hệ...",
    },
    { title: "x^2=36", 
      preview: "Để giải phương trình bậc hai đơn giản ..." },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center gap-3 border-b border-slate-800">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <Link to={ENDPOINTS.INDEX}>
            <GraduationCap strokeWidth={2.67} className="w-6 h-6 text-white" />
          </Link>
        </div>
        {!collapsed && <span className="text-xl font-semibold">Learnly</span>}
      </div>

      <div className="p-4">
        <button className="w-full flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-[10px] transition-colors">
          <MessageSquare className="w-5 h-5" />
          {!collapsed && <span>Cuộc thảo chuyện mới</span>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {!collapsed && (
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
            Hôm Nay
          </h3>
        )}
        <div className="space-y-2">
          {conversations.map((conv, idx) => (
            <div
              key={idx}
              className="p-3 rounded-[10px] hover:bg-slate-800 cursor-pointer transition-colors"
              title={conv.title}
            >
              {!collapsed ? (
                <>
                  <h4 className="text-sm font-medium line-clamp-1">
                    {conv.title}
                  </h4>
                  {conv.preview && (
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                      {conv.preview}
                    </p>
                  )}
                </>
              ) : (
                <MessageSquare className="w-5 h-5" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 p-4 space-y-2">
        {[
          { icon: HelpCircle, label: "Trang chủ" },
          { icon: BookOpen, label: "Tìm kiếm" },
          { icon: Users, label: "Liên hệ" },
          { icon: BarChart3, label: "Trợ giúp" },
          { icon: Settings, label: "Cài đặt", muted: true },
        ].map((item, i) => (
          <button
            key={i}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-[10px] transition-colors hover:bg-slate-800 ${
              item.muted ? "text-white/50" : ""
            }`}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile slide-in
  const navigate = useNavigate();
  const subjects = [
    { name: "Toán học", icon: "📐", color: "bg-orange-100 text-orange-700" },
    { name: "Tiếng Anh", icon: "📖", color: "bg-purple-100 text-purple-700" },
    { name: "Vật lý", icon: "⚛️", color: "bg-blue-100 text-blue-700" },
    { name: "Hóa học", icon: "🧪", color: "bg-green-100 text-green-700" },
    { name: "Ngữ Văn", icon: "📚", color: "bg-yellow-100 text-yellow-700" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar (collapsible) */}
      <aside
        className={`hidden lg:block bg-slate-900 text-white transition-[width] duration-300 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <SidebarContent collapsed={isCollapsed} />
      </aside>

      {/* Mobile Sidebar (slide-in) */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute -right-10 top-4">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 rounded-[10px] bg-slate-900 text-white shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent collapsed={false} />
      </aside>
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle menu"
              onClick={() =>
                window.innerWidth < 1024
                  ? setIsMobileOpen(true)
                  : setIsCollapsed((v) => !v)
              }
              className="p-2 hover:bg-gray-100 rounded-[10px]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <Link
                to={ENDPOINTS.USER.COURSES}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Quay lại
              </Link>
            </div>
          </div>

          {/* User Profile with Popup */}
          <div className="relative">
            <button
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-[10px] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Bùi Minh Hiếu</span>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  BM
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isPopupOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      BM
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Bùi Minh Hiếu</h4>
                      <p className="text-xs text-gray-500">Hạng cấp</p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  {[
                    { icon: User, label: "Trang cá nhân" },
                    { icon: Users, label: "Liên hệ của tôi" },
                    { icon: BookOpen, label: "Hỗ trợ dữ liệu" },
                    { icon: HelpCircle, label: "Trợ giúp & hỗ trợ" },
                    { icon: Settings, label: "Cài đặt" },
                    { icon: BarChart3, label: "Hoạt động" },
                  ].map((it, i) => (
                    <button
                      key={i}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      <it.icon className="w-4 h-4" />
                      {it.label}
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-blue-700 bg-opacity-90 rounded-xl flex items-center justify-center">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 6.25L21.0167 18.3604C20.8128 18.9802 20.4662 19.5435 20.0049 20.0049C19.5435 20.4662 18.9802 20.8128 18.3604 21.0167L6.25 25L18.3604 28.9833C18.9802 29.1872 19.5435 29.5338 20.0049 29.9951C20.4662 30.4565 20.8128 31.0198 21.0167 31.6396L25 43.75L28.9833 31.6396C29.1872 31.0198 29.5338 30.4565 29.9951 29.9951C30.4565 29.5338 31.0198 29.1872 31.6396 28.9833L43.75 25L31.6396 21.0167C31.0198 20.8128 30.4565 20.4662 29.9951 20.0049C29.5338 19.5435 29.1872 18.9802 28.9833 18.3604L25 6.25Z"
                    stroke="white"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.418 6.25V14.5833"
                    stroke="white"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M39.582 35.4167V43.7501"
                    stroke="white"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.25 10.4167H14.5833"
                    stroke="white"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35.418 39.5833H43.7513"
                    stroke="white"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-4">
              Xin chào! Tôi có thể giúp gì cho bạn?
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Hỏi tôi bất cứ điều gì về các môn học. Tôi có thể giải thích khái
              niệm, giải bài tập,
              <br />
              tạo câu hỏi thực hành và nhiều hơn nữa
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Giải trích khái niệm này cho tôi"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Send className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tạo bài tập thực hành"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Send className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Kiểm tra bài làm của tôi"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Send className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tạo đề bài học hay"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Send className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Môn học của bạn
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    name: "Toán học",
                    icon: "📐",
                    color: "bg-orange-100 text-orange-700",
                  },
                  {
                    name: "Tiếng Anh",
                    icon: "📖",
                    color: "bg-purple-100 text-purple-700",
                  },
                  {
                    name: "Vật lý",
                    icon: "⚛️",
                    color: "bg-blue-100 text-blue-700",
                  },
                  {
                    name: "Hóa học",
                    icon: "🧪",
                    color: "bg-green-100 text-green-700",
                  },
                  {
                    name: "Ngữ Văn",
                    icon: "📚",
                    color: "bg-yellow-100 text-yellow-700",
                  },
                ].map((subject, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded-[10px] font-medium text-sm ${subject.color} hover:opacity-80 transition-opacity`}
                  >
                    <span className="mr-2">{subject.icon}</span>
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
              <button className="p-2 hover:bg-gray-200 rounded-[10px] transition-colors">
                <LinkIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-[10px] transition-colors">
                <Image className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="text"
                placeholder="Nhập bất cứ điều gì hoặc kéo và thả tệp của bạn"
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              <button className="p-2 hover:bg-gray-200 rounded-[10px] transition-colors">
                <Send className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              Learnly có thể mắc lỗi. Hãy kiểm tra những thông tin quan trọng
            </p>
          </div>
        </div>
      </div>

      {/* Click outside to close popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
}
