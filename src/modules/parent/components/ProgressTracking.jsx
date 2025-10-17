import React, { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  BookOpen, 
  Target,
  CheckCircle,
  PlayCircle,
  BarChart3,
  LineChart,
  PieChart,
  ArrowLeft,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { toast } from 'react-toastify';
import courseService from '../../../services/firebase/courseService';

const ParentProgressTracking = ({ selectedChild, onBack }) => {
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'year'
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Load progress data
  const loadProgressData = useCallback(async () => {
    if (!selectedChild?.id) return;
    
    try {
      setLoading(true);
      
      // Load enrolled courses
      const coursesResult = await courseService.getEnrolledCourses(selectedChild.id);
      if (coursesResult.success) {
        setCourses(coursesResult.courses || []);
      }
      
      // Mock progress data (trong thực tế sẽ fetch từ analytics service)
      const mockProgressData = {
        overallProgress: 75,
        weeklyProgress: [
          { day: 'T2', lessons: 3, time: 45, score: 85 },
          { day: 'T3', lessons: 2, time: 30, score: 90 },
          { day: 'T4', lessons: 4, time: 60, score: 78 },
          { day: 'T5', lessons: 1, time: 20, score: 95 },
          { day: 'T6', lessons: 3, time: 50, score: 88 },
          { day: 'T7', lessons: 2, time: 35, score: 82 },
          { day: 'CN', lessons: 1, time: 25, score: 90 }
        ],
        monthlyProgress: [
          { week: 'Tuần 1', progress: 20, lessons: 8, time: 120 },
          { week: 'Tuần 2', progress: 45, lessons: 12, time: 180 },
          { week: 'Tuần 3', progress: 65, lessons: 15, time: 225 },
          { week: 'Tuần 4', progress: 75, lessons: 18, time: 270 }
        ],
        courseProgress: [
          { courseId: 'course_1', title: 'Toán lớp 3', progress: 80, lessons: 12, completed: 10 },
          { courseId: 'course_2', title: 'Tiếng Việt lớp 3', progress: 60, lessons: 8, completed: 5 },
          { courseId: 'course_3', title: 'Khoa học lớp 3', progress: 90, lessons: 6, completed: 6 }
        ],
        achievements: [
          { type: 'streak', title: 'Chuỗi học tập', value: '7 ngày', icon: '🔥' },
          { type: 'time', title: 'Thời gian học', value: '15 giờ', icon: '⏰' },
          { type: 'lessons', title: 'Bài học hoàn thành', value: '25 bài', icon: '📚' },
          { type: 'score', title: 'Điểm trung bình', value: '8.5/10', icon: '⭐' }
        ]
      };
      
      setProgressData(mockProgressData);
    } catch (error) {
      console.error('Error loading progress data:', error);
      toast.error('Không thể tải dữ liệu tiến độ');
    } finally {
      setLoading(false);
    }
  }, [selectedChild?.id]);

  useEffect(() => {
    loadProgressData();
  }, [loadProgressData]);

  // Get progress color
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600 bg-green-100';
    if (progress >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu tiến độ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 transition"
                title="Quay lại"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Theo dõi tiến độ học tập</h1>
                <p className="text-sm text-gray-600">Con: {selectedChild?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Time Range Selector */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
                <option value="year">Năm nay</option>
              </select>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <RefreshCw className="w-4 h-4" />
                Làm mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {progressData?.achievements?.map((achievement, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{achievement.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{achievement.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tiến độ tuần</h3>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Biểu đồ cột</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {progressData?.weeklyProgress?.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <BookOpen className="w-4 h-4" />
                      <span>{day.lessons} bài</span>
                      <Clock className="w-4 h-4" />
                      <span>{day.time} phút</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(day.score)}`}>
                      {day.score}%
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${day.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Progress Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tiến độ tháng</h3>
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Biểu đồ đường</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {progressData?.monthlyProgress?.map((week, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium text-gray-600">{week.week}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <BookOpen className="w-4 h-4" />
                      <span>{week.lessons} bài</span>
                      <Clock className="w-4 h-4" />
                      <span>{week.time} phút</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded text-sm font-medium ${getProgressColor(week.progress)}`}>
                      {week.progress}%
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${week.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tiến độ theo khóa học</h3>
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Tổng quan</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {progressData?.courseProgress?.map((course, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.completed}/{course.lessons} bài học hoàn thành</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(course.progress)}`}>
                      {course.progress}%
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Chuỗi học tập</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-sm text-gray-600">7 ngày liên tiếp</span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < 7 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Hoàn thành bài học "Phép cộng có nhớ"
                </p>
                <p className="text-xs text-gray-500">2 giờ trước • Điểm: 95%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <PlayCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Bắt đầu học bài "Phép trừ có nhớ"
                </p>
                <p className="text-xs text-gray-500">1 ngày trước</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Hoàn thành bài thi "Kiểm tra giữa kỳ"
                </p>
                <p className="text-xs text-gray-500">3 ngày trước • Điểm: 88/100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProgressTracking;
