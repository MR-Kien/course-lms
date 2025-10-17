import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Bot, 
  User,
  MessageSquare,
  MoreVertical
} from 'lucide-react';
import { toast } from 'react-toastify';
import aiService from '../../../services/firebase/aiService';
import { useAuth } from '../../../hooks/useAuth';

const ChatInterface = () => {
  const { userData } = useAuth();
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [editingTitle, setEditingTitle] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const messagesEndRef = useRef(null);

  // Load chat sessions khi component mount
  useEffect(() => {
    if (userData?.uid) {
      loadChatSessions();
    }
  }, [userData?.uid]);

  // Load messages khi chuyển chat
  useEffect(() => {
    if (currentChatId) {
      loadMessages(currentChatId);
    }
  }, [currentChatId]);

  // Auto scroll to bottom khi có tin nhắn mới
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load danh sách chat sessions
  const loadChatSessions = async () => {
    try {
      setIsLoadingSessions(true);
      const result = await aiService.getUserChatSessions(userData.uid);
      
      if (result.success) {
        setChatSessions(result.sessions);
        
        // Nếu chưa có chat nào, tạo chat mới
        if (result.sessions.length === 0) {
          await createNewChat();
        } else {
          // Chọn chat đầu tiên
          setCurrentChatId(result.sessions[0].id);
        }
      } else {
        toast.error('Không thể tải danh sách chat');
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      toast.error('Có lỗi xảy ra khi tải chat');
    } finally {
      setIsLoadingSessions(false);
    }
  };

  // Load tin nhắn của một chat
  const loadMessages = async (chatId) => {
    try {
      const result = await aiService.getChatMessages(chatId);
      
      if (result.success) {
        setMessages(result.messages);
      } else {
        toast.error('Không thể tải tin nhắn');
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Có lỗi xảy ra khi tải tin nhắn');
    }
  };

  // Tạo chat mới
  const createNewChat = async () => {
    try {
      const result = await aiService.createChatSession(userData.uid);
      
      if (result.success) {
        const newChat = {
          id: result.id,
          title: 'Cuộc trò chuyện mới',
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 0
        };
        
        setChatSessions(prev => [newChat, ...prev]);
        setCurrentChatId(result.id);
        setMessages([]);
        
        toast.success('Đã tạo chat mới');
      } else {
        toast.error('Không thể tạo chat mới');
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
      toast.error('Có lỗi xảy ra khi tạo chat');
    }
  };

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentChatId) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      // Thêm tin nhắn user vào UI ngay lập tức
      const tempUserMessage = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, tempUserMessage]);

      // Gọi AI service
      const result = await aiService.sendMessage(currentChatId, userMessage, messages);
      
      if (result.success) {
        // Thêm tin nhắn AI vào UI
        const aiMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: result.content,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);

        // Reload messages để có data chính xác từ database
        await loadMessages(currentChatId);
        
        // Reload chat sessions để cập nhật messageCount
        await loadChatSessions();
      } else {
        // Xóa tin nhắn user nếu gửi thất bại
        setMessages(prev => prev.filter(msg => msg.id !== tempUserMessage.id));
        toast.error('Không thể gửi tin nhắn: ' + result.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Có lỗi xảy ra khi gửi tin nhắn');
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa chat session
  const deleteChat = async (chatId) => {
    if (!confirm('Bạn có chắc muốn xóa cuộc trò chuyện này?')) return;

    try {
      const result = await aiService.deleteChatSession(chatId);
      
      if (result.success) {
        setChatSessions(prev => prev.filter(chat => chat.id !== chatId));
        
        if (currentChatId === chatId) {
          // Nếu đang xóa chat hiện tại, chuyển sang chat khác hoặc tạo mới
          const remainingChats = chatSessions.filter(chat => chat.id !== chatId);
          if (remainingChats.length > 0) {
            setCurrentChatId(remainingChats[0].id);
          } else {
            await createNewChat();
          }
        }
        
        toast.success('Đã xóa cuộc trò chuyện');
      } else {
        toast.error('Không thể xóa cuộc trò chuyện');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Có lỗi xảy ra khi xóa chat');
    }
  };

  // Bắt đầu chỉnh sửa title
  const startEditingTitle = (chatId, currentTitle) => {
    setEditingTitle(chatId);
    setNewTitle(currentTitle);
  };

  // Lưu title mới
  const saveTitle = async (chatId) => {
    if (!newTitle.trim()) return;

    try {
      const result = await aiService.updateChatTitle(chatId, newTitle.trim());
      
      if (result.success) {
        setChatSessions(prev => 
          prev.map(chat => 
            chat.id === chatId 
              ? { ...chat, title: newTitle.trim() }
              : chat
          )
        );
        setEditingTitle(null);
        toast.success('Đã cập nhật tiêu đề');
      } else {
        toast.error('Không thể cập nhật tiêu đề');
      }
    } catch (error) {
      console.error('Error updating title:', error);
      toast.error('Có lỗi xảy ra khi cập nhật tiêu đề');
    }
  };

  // Hủy chỉnh sửa title
  const cancelEditingTitle = () => {
    setEditingTitle(null);
    setNewTitle('');
  };

  // Handle Enter key - Tạo chat mới khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      createNewChatAndSendMessage();
    }
  };

  // Tạo chat mới và gửi tin nhắn đầu tiên
  const createNewChatAndSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      // Tạo chat session mới
      const chatResult = await aiService.createChatSession(userData.uid, userMessage.substring(0, 50) + '...');
      
      if (chatResult.success) {
        const newChat = {
          id: chatResult.id,
          title: userMessage.substring(0, 50) + '...',
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 0
        };
        
        // Thêm chat mới vào danh sách và chọn nó
        setChatSessions(prev => [newChat, ...prev]);
        setCurrentChatId(chatResult.id);
        setMessages([]);

        // Thêm tin nhắn user vào UI ngay lập tức
        const tempUserMessage = {
          id: `temp-${Date.now()}`,
          role: 'user',
          content: userMessage,
          timestamp: new Date()
        };
        setMessages([tempUserMessage]);

        // Gọi AI service để gửi tin nhắn đầu tiên
        const result = await aiService.sendMessage(chatResult.id, userMessage, []);
        
        if (result.success) {
          // Thêm tin nhắn AI vào UI
          const aiMessage = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: result.content,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiMessage]);

          // Reload messages để có data chính xác từ database
          await loadMessages(chatResult.id);
          
          // Reload chat sessions để cập nhật messageCount
          await loadChatSessions();
        } else {
          // Xóa tin nhắn user nếu gửi thất bại
          setMessages([]);
          toast.error('Không thể gửi tin nhắn: ' + result.error);
        }
      } else {
        toast.error('Không thể tạo chat mới');
      }
    } catch (error) {
      console.error('Error creating new chat and sending message:', error);
      toast.error('Có lỗi xảy ra khi tạo chat mới');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingSessions) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Chat Sessions */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={createNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Cuộc trò chuyện mới
          </button>
        </div>

        {/* Chat Sessions List */}
        <div className="flex-1 overflow-y-auto">
          {chatSessions.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                currentChatId === chat.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => setCurrentChatId(chat.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  {editingTitle === chat.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveTitle(chat.id);
                          if (e.key === 'Escape') cancelEditingTitle();
                        }}
                      />
                      <button
                        onClick={() => saveTitle(chat.id)}
                        className="p-1 text-green-600 hover:text-green-700"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEditingTitle}
                        className="p-1 text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {chat.title}
                      </h3>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {chat.messageCount} tin nhắn
                  </p>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingTitle(chat.id, chat.title);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {chatSessions.find(chat => chat.id === currentChatId)?.title || 'Chat'}
          </h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chào mừng đến với Novastep!
              </h3>
              <p className="text-gray-600 mb-4">
                Tôi sẽ giúp bạn học tập bằng phương pháp Socrates. 
              </p>
              <p className="text-sm text-gray-500">
                Nhập câu hỏi và nhấn <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> để bắt đầu cuộc trò chuyện mới!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-3xl px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString('vi-VN')}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Novastep đang suy nghĩ...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi và nhấn Enter để tạo chat mới..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={createNewChatAndSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Tạo chat mới"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
