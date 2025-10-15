import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../routes/endPoints";
import { 
  GraduationCapIcon, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Bell,
  Star,
  Crown,
  User,
  ChevronDown,
  BookOpen,
  Trophy,
  MessageCircle,
  Calendar,
  TrendingUp,
  Target,
  Award,
  Clock
} from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { USER_ROLES, SUBSCRIPTION_TYPES } from "../../../services/firebase";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { userData, logout, role, subscriptionType } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock data for children
  const children = [
    {
      id: 1,
      name: "Nguyễn Minh Anh",
      grade: "Lớp 6",
      school: "THCS Nguyễn Du",
      avatar: "A",
      coursesCompleted: 5,
      totalPoints: 850,
      streakDays: 12,
      averageScore: 88,
      lastActive: "2 giờ trước"
    },
    {
      id: 2,
      name: "Nguyễn Minh Tuấn",
      grade: "Lớp 8",
      school: "THCS Lê Quý Đôn",
      avatar: "T",
      coursesCompleted: 8,
      totalPoints: 1200,
      streakDays: 18,
      averageScore: 92,
      lastActive: "30 phút trước"
    }
  ];

  const overallStats = {
    totalChildren: children.length,
    totalCoursesCompleted: children.reduce((sum, child) => sum + child.coursesCompleted, 0),
    totalPoints: children.reduce((sum, child) => sum + child.totalPoints, 0),
    averageScore: Math.round(children.reduce((sum, child) => sum + child.averageScore, 0) / children.length)
  };

  const recentActivities = [
    {
      id: 1,
      childName: "Nguyễn Minh Anh",
      action: "Hoàn thành bài kiểm tra Toán",
      score: 95,
      time: "2 giờ trước",
      type: "test"
    },
    {
      id: 2,
      childName: "Nguyễn Minh Tuấn",
      action: "Đạt thành tích 'Học sinh xuất sắc'",
      score: null,
      time: "4 giờ trước",
      type: "achievement"
    },
    {
      id: 3,
      childName: "Nguyễn Minh Anh",
      action: "Bắt đầu khóa học Tiếng Anh mới",
      score: null,
      time: "1 ngày trước",
      type: "course"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <GraduationCapIcon className="w-9 h-9 text-blue-600" strokeWidth={2.67} />
                <h1 className="text-2xl font-bold text-black">Learnly Parent</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Bell className="w-6 h-6 text-gray-600" />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition"
                >
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {userData?.displayName?.charAt(0) || "P"}
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-gray-700 font-medium">{userData?.displayName || "Phụ huynh"}</span>
                    {/* Tier Display */}
                    <div className={`flex items-center gap-1 text-xs font-semibold ${
                      subscriptionType === SUBSCRIPTION_TYPES.PREMIUM 
                        ? "text-yellow-600" 
                        : "text-gray-500"
                    }`}>
                      {subscriptionType === SUBSCRIPTION_TYPES.PREMIUM ? (
                        <>
                          <Crown className="w-3 h-3" />
                          <span>Premium</span>
                        </>
                      ) : (
                        <>
                          <Star className="w-3 h-3" />
                          <span>Free</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        navigate(ENDPOINTS.SHARED.PROFILE);
                        setIsUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" />
                      Hồ sơ cá nhân
                    </button>
                    <button
                      onClick={() => {
                        navigate(ENDPOINTS.AUTH.CHANGE_PASSWORD);
                        setIsUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4" />
                      Đổi mật khẩu
                    </button>
                    <button
                      onClick={() => {
                        navigate(ENDPOINTS.SHARED.SUBSCRIPTION);
                        setIsUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      <Crown className="w-4 h-4" />
                      Quản lý gói học
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Tổng quan", icon: BarChart3 },
              { id: "children", label: "Con của tôi", icon: Users },
              { id: "reports", label: "Báo cáo", icon: TrendingUp },
              { id: "settings", label: "Cài đặt", icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">
                      Chào mừng trở lại, {userData?.displayName || "Phụ huynh"}! 👋
                    </h2>
                    {/* Current Tier Badge */}
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      subscriptionType === SUBSCRIPTION_TYPES.PREMIUM 
                        ? "bg-yellow-400 text-yellow-900" 
                        : "bg-white/20 text-white"
                    }`}>
                      {subscriptionType === SUBSCRIPTION_TYPES.PREMIUM ? (
                        <>
                          <Crown className="w-4 h-4" />
                          <span>Premium</span>
                        </>
                      ) : (
                        <>
                          <Star className="w-4 h-4" />
                          <span>Free</span>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-blue-100">
                    Theo dõi tiến độ học tập của con bạn và hỗ trợ hành trình học tập!
                  </p>
                </div>
                
                {/* Upgrade Button for Free Users */}
                {subscriptionType === SUBSCRIPTION_TYPES.FREE && (
                  <div className="ml-6">
                    <button
                      onClick={() => navigate(ENDPOINTS.SHARED.SUBSCRIPTION)}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                      <Crown className="w-5 h-5" />
                      <span>Nâng cấp Premium</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tổng số con</p>
                    <p className="text-2xl font-semibold text-gray-900">{overallStats.totalChildren}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Khóa học hoàn thành</p>
                    <p className="text-2xl font-semibold text-gray-900">{overallStats.totalCoursesCompleted}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tổng điểm</p>
                    <p className="text-2xl font-semibold text-gray-900">{overallStats.totalPoints}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
                    <p className="text-2xl font-semibold text-gray-900">{overallStats.averageScore}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Children Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Children List */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Con của bạn</h3>
                </div>
                <div className="p-6 space-y-4">
                  {children.map((child) => (
                    <div key={child.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">{child.avatar}</span>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-900">{child.name}</h4>
                          <p className="text-sm text-gray-600">{child.grade} - {child.school}</p>
                          <p className="text-xs text-gray-500">Hoạt động cuối: {child.lastActive}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{child.totalPoints} điểm</p>
                        <p className="text-xs text-gray-500">{child.coursesCompleted} khóa học</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
                </div>
                <div className="p-6 space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'test' ? 'bg-green-100' :
                        activity.type === 'achievement' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        {activity.type === 'test' ? (
                          <BookOpen className="w-4 h-4 text-green-600" />
                        ) : activity.type === 'achievement' ? (
                          <Award className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.childName}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        {activity.score && (
                          <p className="text-xs text-green-600 font-medium">Điểm: {activity.score}</p>
                        )}
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "children" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quản lý con của bạn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <div key={child.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-semibold">{child.avatar}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{child.name}</h4>
                      <p className="text-sm text-gray-600">{child.grade}</p>
                      <p className="text-xs text-gray-500">{child.school}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Khóa học hoàn thành:</span>
                      <span className="font-medium">{child.coursesCompleted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tổng điểm:</span>
                      <span className="font-medium">{child.totalPoints}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Chuỗi ngày học:</span>
                      <span className="font-medium">{child.streakDays} ngày</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Điểm trung bình:</span>
                      <span className="font-medium text-green-600">{child.averageScore}%</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                      Xem chi tiết
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                      Báo cáo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Báo cáo học tập</h3>
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Báo cáo chi tiết</h4>
              <p className="text-gray-600 mb-4">Xem báo cáo học tập chi tiết của con bạn</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Tạo báo cáo
              </button>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Cài đặt</h3>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Thông báo</h4>
                <p className="text-sm text-gray-600 mb-3">Quản lý thông báo về tiến độ học tập của con</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Thông báo khi con hoàn thành bài học</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Thông báo khi con đạt thành tích</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" />
                    <span className="ml-2 text-sm text-gray-700">Thông báo hàng tuần</span>
                  </label>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Quyền riêng tư</h4>
                <p className="text-sm text-gray-600 mb-3">Kiểm soát thông tin được chia sẻ</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Cho phép chia sẻ tiến độ học tập</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" />
                    <span className="ml-2 text-sm text-gray-700">Cho phép chia sẻ thành tích</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
