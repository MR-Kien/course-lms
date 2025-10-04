import { Home, BookOpen, MessageSquare, Gift, Newspaper, ArrowLeft, Calculator, Languages, Atom, MapPin, FileText, Clock, Wrench, TrendingUp, Clock3, Target, BarChart3 } from 'lucide-react';

export default function Index() {
  const subjects = [
    { name: 'Toán học', lessons: '12 chủ đề', icon: Calculator, color: 'bg-blue-500' },
    { name: 'Tiếng Anh', lessons: '10 chủ đề', icon: Languages, color: 'bg-emerald-500' },
    { name: 'Khoa học', lessons: '8 chủ đề', icon: Atom, color: 'bg-purple-500' },
    { name: 'Vật lý', lessons: '8 chủ đề', icon: Atom, color: 'bg-orange-500' },
    { name: 'Địa lý', lessons: '7 chủ đề', icon: MapPin, color: 'bg-teal-500' },
    { name: 'Tin học', lessons: '9 chủ đề', icon: FileText, color: 'bg-pink-500' },
    { name: 'Lịch sử', lessons: '6 chủ đề', icon: Clock, color: 'bg-indigo-500' },
    { name: 'Công nghệ', lessons: '6 chủ đề', icon: Wrench, color: 'bg-red-500' },
  ];

  const lessons = [
    { id: 1, title: 'Giải thích về so sánh số', duration: '15 phút', status: 'completed', image: 'https://api.builder.io/api/v1/image/assets/TEMP/avatar1?width=60' },
    { id: 2, title: 'So sánh số nguyên', duration: '20 phút', status: 'completed', image: 'https://api.builder.io/api/v1/image/assets/TEMP/avatar2?width=60' },
    { id: 3, title: 'So sánh phân số', duration: '25 phút', status: 'premium', image: 'https://api.builder.io/api/v1/image/assets/TEMP/avatar3?width=60' },
    { id: 4, title: 'Bài tập thực hành', duration: '30 phút', status: 'locked', image: 'https://api.builder.io/api/v1/image/assets/TEMP/avatar4?width=60' },
  ];

  const activities = [
    { title: 'So sánh kích th...', time: '5chu đề', progress: 75, type: 'exam' },
    { title: 'Phép cộng và p...', time: '4chu đề', progress: 100, type: 'practice' },
    { title: 'Hình học kh...', time: '6 chu đề', progress: 25, type: 'lesson' },
    { title: 'Phương trình...', time: '7 chu đề', progress: 0, type: 'exam' },
    { title: 'Đại số cơ bản', time: '3 chu đề', progress: 50, type: 'lesson' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Learnly</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại</span>
                </button>
                <a href="#" className="text-gray-900 font-medium">Khóa học</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Chat với AI</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Phần thưởng</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Tin tức</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Nâng cấp
              </button>
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                NN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Chào mừng bạn trở lại, Na Na!</h1>
              <p className="text-blue-100">Hãy tiếp tục hành trình học tập của bạn</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">50%</div>
                <div className="text-sm text-blue-100">Tần độ đăng nhập</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1/5</div>
                <div className="text-sm text-blue-100">Chu kỳ ôn tập</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm text-blue-100">Điểm trung bình</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm">Bài học hôm nay</div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm">Streak học tập</div>
                    <div className="text-2xl font-bold text-gray-900">3 ngày</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm">Điểm thưởng</div>
                    <div className="text-2xl font-bold text-gray-900">1,250</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm">Thời gian học</div>
                    <div className="text-2xl font-bold text-gray-900">2.5h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Môn học</h3>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <button
                    key={subject.name}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center`}>
                      <subject.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{subject.name}</div>
                      <div className="text-sm text-gray-500">{subject.lessons}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Selector */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Khối lớp</h3>
              <div className="grid grid-cols-4 gap-2">
                {[6, 7, 8, 9].map((grade) => (
                  <button
                    key={grade}
                    className={`py-2 px-3 rounded-lg font-medium transition-colors ${
                      grade === 8
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Lớp {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Tips */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Chủ đề học tập</h3>
              <div className="space-y-3">
                {activities.map((activity, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                          <div className="text-xs text-gray-500">{activity.time} • kiểm tra</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${activity.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                          style={{ width: `${activity.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{activity.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Current Course Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">So sánh kích thước và vị trí</h2>
                  <p className="text-blue-100">Khám phá và nắm vững kiến thức cơ bản</p>
                </div>
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  Đang học
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">Bài học</span>
                  </div>
                  <div className="text-2xl font-bold">2/4</div>
                  <div className="text-sm text-blue-100">Hoàn thành</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Thời gian</span>
                  </div>
                  <div className="text-2xl font-bold">2-3h</div>
                  <div className="text-sm text-blue-100">Ước tính</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm">Điểm số</span>
                  </div>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm text-blue-100">Trung bình</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Tiến độ tổng</span>
                  <span className="font-medium">50%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>

            {/* Lessons Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">▶ Bài học</h3>
                <span className="text-sm text-gray-500">4 bài học</span>
              </div>
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      {lesson.id}
                    </div>
                    <img src={lesson.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                      <p className="text-sm text-gray-500">{lesson.duration}</p>
                    </div>
                    {lesson.status === 'completed' && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                        Hoàn thành
                      </span>
                    )}
                    {lesson.status === 'premium' && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                        Premium
                      </span>
                    )}
                    {lesson.status === 'locked' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Bắt đầu
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Practice & Test Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">📝 Bài kiểm tra & Luyện tập</h3>
                <span className="text-sm text-gray-500">4 bài kiểm tra</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">Kiểm tra cơ bản</h4>
                      <p className="text-sm text-gray-500">10 câu hỏi</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">✓</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                    Bắt đầu kiểm tra
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">Kiểm tra nâng cao</h4>
                      <p className="text-sm text-gray-500">15 câu hỏi</p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed font-medium">
                    Cần nâng cấp để thử cấp
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">Đề thi thử</h4>
                      <p className="text-sm text-gray-500">20 câu hỏi</p>
                      <p className="text-xs text-gray-400 mt-1">45 phút</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">10h</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed font-medium">
                    Cần nâng cấp để thử cấp
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">Luyện tập hàng ngày</h4>
                      <p className="text-sm text-gray-500">5 câu hỏi</p>
                      <p className="text-xs text-emerald-600 mt-1">10 phút • Điều cạnh nhất: 92%</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">Mới</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
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
