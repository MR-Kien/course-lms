// import { Card, CardContent } from "../../../components/ui/card";
// import { Badge } from "../../../components/ui/badge";
// import { Button } from "../../../components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Clock, 
  Trophy,  
  Play,
  ChevronRight,
  Award,
  Calculator,
  Globe,
  Beaker,
  BookText,
  MapPin,
  Computer,
  History,
  Wrench
} from "lucide-react";
// import { CardContent } from "../../landing/components/Card";
// import { Button } from "antd";
// import { Avatar } from "../../landing/components/Avatar";

export default function Index() {
  const subjects = [
    { id: 1, name: "Toán học", icon: Calculator, color: "bg-blue-500", lessons: "12 bài" },
    { id: 2, name: "Tiếng Anh", icon: Globe, color: "bg-green-500", lessons: "18 bài" },
    { id: 3, name: "Khoa học", icon: Beaker, color: "bg-purple-500", lessons: "8 bài" },
    { id: 4, name: "Văn học", icon: BookText, color: "bg-orange-500", lessons: "9 bài" },
    { id: 5, name: "Địa lý", icon: MapPin, color: "bg-teal-500", lessons: "7 bài" },
    { id: 6, name: "Tin học", icon: Computer, color: "bg-pink-500", lessons: "6 bài" },
    { id: 7, name: "Lịch sử", icon: History, color: "bg-indigo-500", lessons: "5 bài" },
    { id: 8, name: "Công nghệ", icon: Wrench, color: "bg-red-500", lessons: "4 bài" }
  ];

  const lessons = [
    {
      id: 1,
      title: "Giải thiếu về so sánh số",
      duration: "15 phút",
      status: "completed",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      title: "So sánh số nguyên",
      duration: "20 phút", 
      status: "completed",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      title: "So sánh phân số",
      duration: "25 phút",
      status: "premium",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332446c?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      title: "Bài tập thực hành",
      duration: "30 phút",
      status: "locked",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const practiceTests = [
    {
      id: 1,
      title: "Kiểm tra cơ bản",
      questions: "10 câu hỏi",
      status: "available",
      difficulty: "Dễ"
    },
    {
      id: 2,
      title: "Kiểm tra nâng cao",
      questions: "15 câu hỏi", 
      status: "premium",
      difficulty: "Khó"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Learnly</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button className="text-gray-600 hover:text-gray-900 font-medium">Quay lại</button>
              <button className="text-gray-600 hover:text-gray-900 font-medium">Khóa học</button>
              <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Chat với AI</button>
              <button className="text-gray-600 hover:text-gray-900 font-medium">Phần thưởng</button>
              <button className="text-gray-600 hover:text-gray-900 font-medium">Tin tức</button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
              Nâng cấp
            </button>
            <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="PN" />
            <span className="hidden md:block text-sm font-medium text-gray-700">Phạm Nguyễn Na Na</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Chào mừng bạn trở lại, Na Na!</h1>
              <p className="text-blue-100">Hãy tiếp tục hành trình học tập của bạn</p>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold">50%</div>
                <div className="text-sm text-blue-100">Tiến độ đang học</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1/5</div>
                <div className="text-sm text-blue-100">Chủ đề hoàn thành</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm text-blue-100">Điểm trung bình</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Subjects */}
          <div className="lg:col-span-1 space-y-6">
            {/* Today's Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-4 text-center rounded-lg border bg-white shadow-sm">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-xs text-gray-600">Bài học hôm nay</div>
                </div>
              
              <div className="p-4 text-center rounded-lg border bg-white shadow-sm">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">1,250</div>
                  <div className="text-xs text-gray-600">Điểm thưởng</div>
                </div>
              
              <div className="p-4 text-center rounded-lg border bg-white shadow-sm">
                  <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">2.5h</div>
                  <div className="text-xs text-gray-600">Thời gian học</div>
                </div>
            </div>

            {/* Subjects */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Môn học</h2>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div key={subject.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer ">
                    <div className="p-0">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center`}>
                          <subject.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{subject.name}</div>
                          <div className="text-sm text-gray-600">{subject.lessons}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade Levels */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Khối lớp</h2>
              <div className="flex flex-wrap gap-2">
                {/* {["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"].map((grade, index) => (
                  <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium
                    key={grade} 
                    variant={index === 2 ? "default" : "secondary"}
                    className={`px-3 py-1 ${index === 2 ? "bg-blue-600 text-white" : ""}`}
                  >
                    {grade}
                  </span>
                ))} */}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Current Progress */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">So sánh kích thước và vị trí</h3>
                    <p className="text-gray-600">Khám phá và nắm vững kiến thức cơ bản</p>
                  </div>
                  <div className="bg-purple-100 text-purple-700 px-3 py-1">
                    Đang học
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">2/4</div>
                    <div className="text-sm text-gray-600">Hoàn thành</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">2-3h</div>
                    <div className="text-sm text-gray-600">Thời gian</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
                    <div className="text-sm text-gray-600">Hoàn thành</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Tiến độ tổng</span>
                    <span>50%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-600 rounded-full" style={{width: "50%"}}></div>
                    </div>
                </div>
            </div>

            {/* Lessons */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Bài học
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  4 bài học
                </button>
              </div>

              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-semibold text-gray-600">
                            {index + 1}
                          </div>
                        </div>
                        
                        <img className="w-10 h-10 rounded-full" src={lesson.image} alt="T" />

                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                          <p className="text-sm text-gray-600">{lesson.duration}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {lesson.status === "completed" && (
                            <div className="bg-green-100 text-green-700">Hoàn thành</div>
                          )}
                          {lesson.status === "premium" && (
                            <div className="bg-yellow-100 text-yellow-700">Premium</div>
                          )}
                          {lesson.status === "locked" && (
                            <button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Bắt đầu
                            </button>
                          )}
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Tests */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Bài kiểm tra & Luyện tập
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  4 bài kiểm tra
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {practiceTests.map((test) => (
                  <div key={test.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{test.title}</h3>
                        <div 
                          variant={test.difficulty === "Dễ" ? "secondary" : "default"}
                          className={test.difficulty === "Khó" ? "bg-red-100 text-red-700" : ""}
                        >
                          {test.difficulty}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{test.questions}</p>
                      
                      <button 
                        className={`w-full ${
                          test.status === "premium" 
                            ? "bg-yellow-600 hover:bg-yellow-700" 
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {test.status === "premium" ? "Cần đăng cấp để làm bài" : "Bắt đầu kiểm tra"}
                      </button>
                  </div>
                ))}

                {/* Daily Practice & Exercise Cards */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Đề thi thử</h3>
                      <div className="bg-blue-100 text-blue-700">Miễn phí</div>
                    </div>
                    <p className="text-gray-600 mb-4">30 câu hỏi</p>
                    <button className="w-full bg-gray-600 hover:bg-gray-700">
                      Cần đăng cấp để làm bài
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Luyện tập hàng ngày</h3>
                      <div className="bg-green-100 text-green-700">Mới</div>
                    </div>
                    <p className="text-gray-600 mb-4">5 phút</p>
                    <button className="w-full bg-green-600 hover:bg-green-700">
                      Bắt đầu kiểm tra
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
