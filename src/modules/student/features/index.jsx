import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../routes/endPoints";
import { 
  GraduationCapIcon, 
  BookOpen, 
  Trophy, 
  BarChart3, 
  Settings,
  LogOut,
  Bell,
  Play,
  Clock,
  Star,
  MessageCircle,
  Crown,
  Target,
  Calendar,
  Award,
  User,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { USER_ROLES, SUBSCRIPTION_TYPES } from "../../../services/firebase";

const StudentDashboard = () => {
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

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [logout]);

  // Mock data
  const stats = {
    coursesCompleted: 8,
    totalPoints: 1250,
    streakDays: 15,
    averageScore: 85
  };

  const enrolledCourses = [
    {
      id: 1,
      title: "Toán học lớp 6",
      teacher: "Cô Nguyễn Thị A",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      rating: 4.9,
      thumbnail: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Math"
    },
    {
      id: 2,
      title: "Tiếng Anh lớp 6",
      teacher: "Thầy Trần Văn B",
      progress: 60,
      totalLessons: 25,
      completedLessons: 15,
      rating: 4.7,
      thumbnail: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=English"
    },
    {
      id: 3,
      title: "Khoa học lớp 6",
      teacher: "Cô Lê Thị C",
      progress: 40,
      totalLessons: 18,
      completedLessons: 7,
      rating: 4.8,
      thumbnail: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Science"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Học sinh chăm chỉ",
      description: "Hoàn thành 5 bài học liên tiếp",
      icon: Trophy,
      earned: true,
      date: "2024-01-10"
    },
    {
      id: 2,
      title: "Thiên tài toán học",
      description: "Đạt điểm tối đa trong bài kiểm tra toán",
      icon: Award,
      earned: true,
      date: "2024-01-08"
    },
    {
      id: 3,
      title: "Nhà vô địch",
      description: "Xếp hạng #1 trong lớp",
      icon: Crown,
      earned: false,
      date: null
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "lesson_completed",
      title: "Hoàn thành bài học: Phép cộng phân số",
      course: "Toán học lớp 6",
      points: 50,
      time: "2 giờ trước"
    },
    {
      id: 2,
      type: "quiz_completed",
      title: "Hoàn thành bài kiểm tra: Từ vựng tiếng Anh",
      course: "Tiếng Anh lớp 6",
      points: 80,
      time: "1 ngày trước"
    },
    {
      id: 3,
      type: "achievement_earned",
      title: "Nhận được thành tích: Học sinh chăm chỉ",
      course: null,
      points: 100,
      time: "2 ngày trước"
    }
  ];

  // Redirect if not student
  useEffect(() => {
    if (role && role !== USER_ROLES.STUDENT) {
      // Redirect to appropriate dashboard based on role
      switch (role) {
        case USER_ROLES.ADMIN:
          navigate(ENDPOINTS.ADMIN.DASHBOARD);
          break;
        case USER_ROLES.PARENT:
          navigate(ENDPOINTS.PARENT.DASHBOARD);
          break;
        default:
          navigate(ENDPOINTS.INDEX);
          break;
      }
    }
  }, [role, navigate]);

  // Show loading while role is being determined
  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Don't render if not a student (will redirect via useEffect)
  if (role !== USER_ROLES.STUDENT) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <GraduationCapIcon className="w-9 h-9 text-blue-600" strokeWidth={2.67} />
                <h1 className="text-2xl font-bold text-black">Learnly Student</h1>
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
                      {userData?.displayName?.charAt(0) || "S"}
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-gray-700 font-medium">{userData?.displayName || "Học sinh"}</span>
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
                             onClick={handleLogout}
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
              { id: "courses", label: "Khóa học", icon: BookOpen },
              { id: "achievements", label: "Thành tích", icon: Trophy },
              { id: "chatbot", label: "AI Chatbot", icon: MessageCircle }
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
                      Chào mừng trở lại, {userData?.displayName || "Học sinh"}! 👋
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
                    Hôm nay bạn muốn học gì? Hãy tiếp tục hành trình học tập của mình!
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Khóa học hoàn thành</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.coursesCompleted}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Điểm số</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalPoints}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ngày liên tiếp</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.streakDays}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Điểm TB</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.averageScore}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {activity.type === "lesson_completed" && <BookOpen className="w-5 h-5 text-blue-600" />}
                          {activity.type === "quiz_completed" && <Target className="w-5 h-5 text-green-600" />}
                          {activity.type === "achievement_earned" && <Trophy className="w-5 h-5 text-yellow-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          {activity.course && (
                            <p className="text-sm text-gray-600">{activity.course}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">+{activity.points} điểm</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6">
            {/* Courses Header */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Khóa học của tôi</h3>
                <p className="text-sm text-gray-600">Tiếp tục học tập và phát triển kỹ năng</p>
              </div>
              <button 
                onClick={() => navigate(ENDPOINTS.LANDING.COURSES)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <BookOpen className="w-4 h-4" />
                Xem tất cả khóa học
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">Giảng viên: {course.teacher}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tiến độ:</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{course.completedLessons}/{course.totalLessons} bài học</span>
                        <span>{Math.round(course.totalLessons * (100 - course.progress) / 100)} bài còn lại</span>
                      </div>
                    </div>
                    
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                      <Play className="w-4 h-4" />
                      Tiếp tục học
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Thành tích của tôi</h3>
                <p className="text-sm text-gray-600">Khám phá và đạt được các thành tích mới</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`bg-white rounded-lg shadow p-6 ${
                  achievement.earned ? 'ring-2 ring-yellow-400' : 'opacity-60'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      <achievement.icon className={`w-6 h-6 ${
                        achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  
                  {achievement.earned ? (
                    <div className="text-sm text-green-600 font-medium">
                      ✓ Đã đạt được - {new Date(achievement.date).toLocaleDateString('vi-VN')}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Chưa đạt được
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chatbot" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Chatbot</h3>
              <p className="text-gray-600 mb-6">
                Hỏi đáp với AI để được hỗ trợ học tập 24/7
              </p>
              <button 
                onClick={() => navigate(ENDPOINTS.SHARED.CHATBOT)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Bắt đầu chat với AI
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;
