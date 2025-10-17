import React, { useState, useEffect, useCallback } from 'react';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Mail, 
  Bell, 
  Database, 
  Server, 
  Key, 
  Globe, 
  Users, 
  BookOpen, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  Minus
} from 'lucide-react';
import { toast } from 'react-toastify';

const AdminSystemSettings = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Learnly LMS',
      siteDescription: 'Nền tảng học tập trực tuyến',
      siteUrl: 'https://learnly.com',
      adminEmail: 'admin@learnly.com',
      supportEmail: 'support@learnly.com',
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      maintenanceMode: false
    },
    security: {
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      passwordRequireNumber: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enableTwoFactor: false,
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
      maxFileSize: 10
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      adminNotifications: true,
      userNotifications: true,
      systemAlerts: true
    },
    payment: {
      enablePayments: true,
      currency: 'VND',
      paymentMethods: ['bank_transfer', 'momo', 'zalopay'],
      taxRate: 10,
      refundPolicy: '7 days',
      subscriptionPlans: {
        free: { price: 0, duration: 0, features: ['basic_courses'] },
        premium: { price: 299000, duration: 30, features: ['all_courses', 'certificates'] },
        pro: { price: 599000, duration: 30, features: ['all_courses', 'certificates', 'priority_support'] }
      }
    },
    storage: {
      maxStoragePerUser: 1000, // MB
      enableCloudStorage: true,
      cloudProvider: 'cloudinary',
      backupFrequency: 'daily',
      retentionPeriod: 30 // days
    }
  });

  const [showPasswords, setShowPasswords] = useState({});

  const tabs = [
    { id: 'general', label: 'Tổng quan', icon: Settings },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'payment', label: 'Thanh toán', icon: DollarSign },
    { id: 'storage', label: 'Lưu trữ', icon: Database },
    { id: 'maintenance', label: 'Bảo trì', icon: Server }
  ];

  // Load settings
  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      // In real implementation, this would fetch from Firebase/API
      // For now, we'll use the default settings
      toast.success('Đã tải cài đặt hệ thống');
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Không thể tải cài đặt hệ thống');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Save settings
  const handleSaveSettings = useCallback(async () => {
    try {
      setSaving(true);
      // In real implementation, this would save to Firebase/API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Đã lưu cài đặt hệ thống');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Không thể lưu cài đặt hệ thống');
    } finally {
      setSaving(false);
    }
  }, [settings]);

  // Update setting
  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = (key) => {
    setShowPasswords(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // System maintenance actions
  const handleMaintenanceAction = async (action) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      switch (action) {
        case 'backup':
          toast.success('Đã tạo backup hệ thống');
          break;
        case 'clear_cache':
          toast.success('Đã xóa cache hệ thống');
          break;
        case 'optimize_db':
          toast.success('Đã tối ưu hóa database');
          break;
        case 'restart_services':
          toast.success('Đã khởi động lại các dịch vụ');
          break;
        default:
          toast.success('Thao tác đã hoàn thành');
      }
    } catch (error) {
      console.error('Error performing maintenance:', error);
      toast.error('Có lỗi xảy ra khi thực hiện thao tác');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải cài đặt hệ thống...</p>
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
                <h1 className="text-xl font-semibold text-gray-900">Cài đặt hệ thống</h1>
                <p className="text-sm text-gray-600">Quản lý cấu hình và bảo trì hệ thống</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Settings Tabs */}
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
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ bản</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên trang web</label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL trang web</label>
                  <input
                    type="url"
                    value={settings.general.siteUrl}
                    onChange={(e) => updateSetting('general', 'siteUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email admin</label>
                  <input
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => updateSetting('general', 'adminEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email hỗ trợ</label>
                  <input
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => updateSetting('general', 'supportEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => updateSetting('general', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => updateSetting('general', 'maintenanceMode', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Chế độ bảo trì</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">Kích hoạt chế độ bảo trì sẽ ngăn người dùng truy cập trang web</p>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cài đặt bảo mật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Độ dài mật khẩu tối thiểu</label>
                  <input
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian timeout phiên (phút)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số lần đăng nhập sai tối đa</label>
                  <input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kích thước file tối đa (MB)</label>
                  <input
                    type="number"
                    value={settings.security.maxFileSize}
                    onChange={(e) => updateSetting('security', 'maxFileSize', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordRequireSpecial}
                    onChange={(e) => updateSetting('security', 'passwordRequireSpecial', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yêu cầu ký tự đặc biệt trong mật khẩu</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordRequireNumber}
                    onChange={(e) => updateSetting('security', 'passwordRequireNumber', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yêu cầu số trong mật khẩu</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.enableTwoFactor}
                    onChange={(e) => updateSetting('security', 'enableTwoFactor', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Bật xác thực 2 yếu tố</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Payment Settings */}
        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cài đặt thanh toán</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiền tệ</label>
                  <select
                    value={settings.payment.currency}
                    onChange={(e) => updateSetting('payment', 'currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="VND">VND</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thuế suất (%)</label>
                  <input
                    type="number"
                    value={settings.payment.taxRate}
                    onChange={(e) => updateSetting('payment', 'taxRate', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chính sách hoàn tiền</label>
                  <input
                    type="text"
                    value={settings.payment.refundPolicy}
                    onChange={(e) => updateSetting('payment', 'refundPolicy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.payment.enablePayments}
                    onChange={(e) => updateSetting('payment', 'enablePayments', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Bật tính năng thanh toán</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Settings */}
        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bảo trì hệ thống</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleMaintenanceAction('backup')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <Download className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Tạo backup</p>
                    <p className="text-sm text-gray-600">Sao lưu dữ liệu hệ thống</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleMaintenanceAction('clear_cache')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <Trash2 className="w-6 h-6 text-orange-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Xóa cache</p>
                    <p className="text-sm text-gray-600">Làm sạch cache hệ thống</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleMaintenanceAction('optimize_db')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <Database className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Tối ưu database</p>
                    <p className="text-sm text-gray-600">Tối ưu hóa cơ sở dữ liệu</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleMaintenanceAction('restart_services')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Khởi động lại dịch vụ</p>
                    <p className="text-sm text-gray-600">Restart các dịch vụ hệ thống</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSystemSettings;
