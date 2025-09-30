import { ArrowLeft, Bell, GraduationCap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-300/50 bg-white h-[88px] flex items-center px-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          <span className="text-xl font-medium">Quay lại</span>
        </button>

        <div className="w-px h-9 bg-gray-300/30 mx-4"></div>

        <div className="flex items-center gap-3">
          <GraduationCap className="w-9 h-9 text-blue-600" strokeWidth={2.67} />
          <h1 className="text-2xl font-bold text-black">Learnly</h1>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Bell className="w-6 h-6 text-black" />
        <div className="flex items-center gap-3 bg-gray-200/95 rounded-full px-4 py-2 shadow-lg">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" strokeWidth={2.17} />
          </div>
          <span className="text-xl font-medium text-black">Bùi Minh Hiếu</span>
        </div>
      </div>
    </header>
  );
}
