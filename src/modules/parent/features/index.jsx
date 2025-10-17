import React, { useState, useEffect, useCallback } from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  Star,
  Calendar,
  BarChart3,
  Target,
  CheckCircle,
  PlayCircle,
  FileText,
  Trophy,
  Medal,
  ChevronRight,
  Eye,
  UserCheck
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import courseService from '../../../services/firebase/courseService';
import ParentCourseList from '../components/CourseList';
import ParentCourseDetail from '../components/CourseDetail';
import ParentProgressTracking from '../components/ProgressTracking';
import ParentAchievements from '../components/Achievements';

const ParentDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'courses', 'course-detail'
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [children, setChildren] = useState([]);
  const [loadingChildren, setLoadingChildren] = useState(true);
  const [selectedChild, setSelectedChild] = useState(null);
  const [childCourses, setChildCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [childAchievements, setChildAchievements] = useState([]);
  const [loadingAchievements, setLoadingAchievements] = useState(false);

  // Mock data for children (trong thực tế sẽ fetch từ API)
  const mockChildren = [
    {
      id: 'child_1',
      name: 'Nguyễn Văn A',
      age: 8,
      grade: 'Lớp 3',
      avatar: '',
      enrolledCourses: 3,
      completedCourses: 1,
      totalStudyTime: 45, // phút
      averageRating: 4.5
    },
    {
      id: 'child_2', 
      name: 'Nguyễn Thị B',
      age: 10,
      grade: 'Lớp 5',
      avatar: '',
      enrolledCourses: 2,
      completedCourses: 0,
      totalStudyTime: 30,
      averageRating: 4.2
    }
  ];

  // Load children data
  const loadChildren = useCallback(async () => {
    try {
      setLoadingChildren(true);
      // Mock API call - trong thực tế sẽ fetch từ parent service
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChildren(mockChildren);
      if (mockChildren.length > 0) {
        setSelectedChild(mockChildren[0]);
      }
    } catch (error) {
      console.error('Error loading children:', error);
      toast.error('Không thể tải thông tin con cái');
    } finally {
      setLoadingChildren(false);
    }
  }, []);

  // Load child courses
  const loadChildCourses = useCallback(async (childId) => {
    if (!childId) return;
    
    try {
      setLoadingCourses(true);
      const result = await courseService.getEnrolledCourses(childId);
      if (result.success) {
        setChildCourses(result.courses || []);
      }
    } catch (error) {
      console.error('Error loading child courses:', error);
      toast.error('Không thể tải khóa học của con');
    } finally {
      setLoadingCourses(false);
    }
  }, []);

  // Load child achievements
  const loadChildAchievements = useCallback(async (childId) => {
    if (!childId) return;
    
    try {
      setLoadingAchievements(true);
      const result = await courseService.getStudentAchievements(childId);
      if (result.success) {
        setChildAchievements(result.achievements || []);
      }
    } catch (error) {
      console.error('Error loading child achievements:', error);
      toast.error('Không thể tải thành tích của con');
    } finally {
      setLoadingAchievements(false);
    }
  }, []);

  useEffect(() => {
    loadChildren();
  }, [loadChildren]);

  useEffect(() => {
    if (selectedChild) {
      loadChildCourses(selectedChild.id);
      loadChildAchievements(selectedChild.id);
    }
  }, [selectedChild, loadChildCourses, loadChildAchievements]);

  // Navigation handlers
  const handleViewCourses = () => {
    setCurrentView('courses');
    setActiveTab('courses');
  };

  const handleViewCourseDetail = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-detail');
  };

  const handleBackToCourses = () => {
    setCurrentView('courses');
    setSelectedCourseId(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCourseId(null);
    setActiveTab('overview');
  };

  // Calculate stats
  const stats = {
    totalChildren: children.length,
    totalEnrolledCourses: children.reduce((sum, child) => sum + child.enrolledCourses, 0),
    totalCompletedCourses: children.reduce((sum, child) => sum + child.completedCourses, 0),
    totalStudyTime: children.reduce((sum, child) => sum + child.totalStudyTime, 0),
    averageRating: children.length > 0 ? 
      (children.reduce((sum, child) => sum + child.averageRating, 0) / children.length).toFixed(1) : 0
  };

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
    { id: 'courses', label: 'Khóa học', icon: BookOpen },
    { id: 'progress', label: 'Tiến độ', icon: TrendingUp },
    { id: 'achievements', label: 'Thành tích', icon: Award }
  ];

  // Render different views
  if (currentView === 'courses') {
    return (
      <ParentCourseList 
        selectedChild={selectedChild}
        onBack={handleBackToDashboard}
        onCourseClick={handleViewCourseDetail}
      />
    );
  }

  if (currentView === 'course-detail') {
    return (
      <ParentCourseDetail 
        selectedChild={selectedChild}
        onBack={handleBackToCourses}
      />
    );
  }

  if (currentView === 'progress-tracking') {
    return (
      <ParentProgressTracking 
        selectedChild={selectedChild}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'achievements-view') {
    return (
      <ParentAchievements 
        selectedChild={selectedChild}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Phụ huynh</h1>
              <p className="text-sm text-gray-600">Theo dõi việc học tập của con cái</p>
            </div>
            
            {/* Children Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Con:</span>
              <select 
                value={selectedChild?.id || ''} 
                onChange={(e) => {
                  const child = children.find(c => c.id === e.target.value);
                  setSelectedChild(child);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.grade})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tổng số con</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalChildren}</p>
                  </div>
                </div>
              </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Khóa học đã đăng ký</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEnrolledCourses}</p>
                  </div>
                </div>
              </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Khóa học hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCompletedCourses}</p>
                  </div>
                </div>
              </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Thời gian học (phút)</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudyTime}</p>
              </div>
            </div>
                </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đánh giá trung bình</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
            </div>
                        </div>
                      </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
                      </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {loadingChildren ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Đang tải thông tin...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Children Overview */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin con cái</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {children.map(child => (
                          <div key={child.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <UserCheck className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{child.name}</h4>
                                  <p className="text-sm text-gray-600">{child.grade}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{child.averageRating}</span>
                </div>
              </div>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4 text-gray-400" />
                                <span>{child.enrolledCourses} khóa</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-gray-400" />
                                <span>{child.completedCourses} hoàn thành</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{child.totalStudyTime} phút</span>
                </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                                <span>{Math.round((child.completedCourses / child.enrolledCourses) * 100) || 0}%</span>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-3">
                          {selectedChild && (
                            <>
                              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedChild.name} đã hoàn thành khóa học "Toán lớp 3"
                                  </p>
                                  <p className="text-xs text-gray-500">2 giờ trước</p>
            </div>
          </div>
                              
                              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <PlayCircle className="w-4 h-4 text-blue-600" />
                    </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedChild.name} bắt đầu học bài mới "Phép cộng"
                                  </p>
                                  <p className="text-xs text-gray-500">1 ngày trước</p>
                    </div>
                  </div>
                  
                              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                  <Award className="w-4 h-4 text-yellow-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedChild.name} nhận được chứng chỉ hoàn thành
                                  </p>
                                  <p className="text-xs text-gray-500">3 ngày trước</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                    </div>
                    </div>
                  </>
                )}
                    </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Khóa học của {selectedChild?.name} ({childCourses.length})
                  </h3>
                  <button
                    onClick={handleViewCourses}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    Xem tất cả khóa học
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                {loadingCourses ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Đang tải khóa học...</p>
                    </div>
                  </div>
                ) : childCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {childCourses.map(course => (
                      <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{course.duration} phút</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BookOpen className="w-4 h-4" />
                                  <span>{course.totalLessons || 0} bài học</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{course.averageRating || 5}</span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Tiến độ</span>
                              <span className="font-medium">{course.progress || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress || 0}%` }}
                              ></div>
                    </div>
                  </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              {Array.isArray(course.completedLessons) ? course.completedLessons.length : (course.completedLessons || 0)}/{course.totalLessons || 0} bài học
                            </div>
                            <button 
                              onClick={() => handleViewCourseDetail(course.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                      Xem chi tiết
                    </button>
                          </div>
                  </div>
                </div>
              ))}
            </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có khóa học</h3>
                    <p className="text-gray-600">Con bạn chưa đăng ký khóa học nào</p>
                  </div>
                )}
          </div>
        )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Tiến độ học tập</h3>
                  <button
                    onClick={() => setCurrentView('progress-tracking')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    Xem chi tiết
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Biểu đồ tiến độ</h3>
                    <p className="text-gray-600 mb-4">Xem chi tiết tiến độ học tập của con</p>
                    <button
                      onClick={() => setCurrentView('progress-tracking')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Xem báo cáo chi tiết
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Thành tích của {selectedChild?.name}</h3>
                  <button
                    onClick={() => setCurrentView('achievements-view')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    Xem tất cả
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                {loadingAchievements ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Đang tải thành tích...</p>
                    </div>
                  </div>
                ) : childAchievements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {childAchievements.map((achievement, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            {achievement.type === 'course_completion' ? (
                              <Trophy className="w-6 h-6 text-white" />
                            ) : (
                              <Medal className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>

                        <div className="text-sm text-gray-500">
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(achievement.earnedAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span>{achievement.courseTitle}</span>
                </div>
              </div>
            </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có thành tích</h3>
                    <p className="text-gray-600">Con bạn chưa có thành tích nào</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;