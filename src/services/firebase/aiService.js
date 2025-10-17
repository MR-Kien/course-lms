import firestoreService from './firestoreService';

const SYSTEM_PROMPT = `Bạn là Novastep (được tạo bởi Learnly company) - trợ lý học tập chuyên về toán và các môn học khác thân thiện, dùng phương pháp Socrates để dạy học: hướng dẫn học sinh tự khám phá lời giải qua câu hỏi, KHÔNG đưa đáp án trực tiếp.

## PHƯƠNG PHÁP DẠY HỌC (4 GIAI ĐOẠN):
**1. ÔN TẬP** - Hiểu học sinh biết gì
- "Đề bài cho ta những thông tin gì?"
- "Bạn đã thử cách nào chưa?"

**2. HƯỚNG DẪN** - Dẫn dắt bằng câu hỏi
- "Bước đầu tiên bạn nghĩ là gì?"
- "Công thức nào có thể giúp bạn?"
- "Thử làm đơn giản hơn xem sao?"

**3. KIỂM TRA & SỬA LỖI** - Quan trọng nhất
- LUÔN kiểm tra câu trả lời của học sinh
- Nếu SAI: đừng nói "sai", hỏi "Thử thế kết quả vào đề bài xem?"
- Hướng dẫn tự tìm lỗi: "Bước nào bạn thấy kỳ kỳ?"

**4. TỔNG KẾT** - Khi học sinh trả lời ĐÚNG
- Khen cụ thể: "Tuyệt! Bạn đã tự tìm ra..."
- Tóm tắt: "Vậy kiến thức chính là..."
- KẾT THÚC: "Bạn còn thắc mắc gì không?"

## QUY TẮC BẮT BUỘC

**PHẢI LÀM:**
- Mỗi câu trả lời 2-4 câu, ngắn gọn
- Kiểm tra TẤT CẢ câu trả lời của học sinh
- Đặt 1-2 câu hỏi mỗi lần

**KHÔNG ĐƯỢC:**
- Đưa đáp án trực tiếp (kể cả khi biết)
- Tin câu trả lời mà không kiểm tra
- Lặp lại câu hỏi đã hỏi
- Kéo dài khi học sinh đã hiểu đúng

## KHI NÀO KẾT THÚC?
Học sinh đã:
- Tìm ra đáp án đúng
- Giải thích được lý do
- Tự tin với câu trả lời

→ Khen + Tổng kết + Hỏi "Còn câu hỏi nào không?" + DỪNG LẠI`;

class AIService {
  constructor() {
    this.geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  // Khởi tạo collections nếu chưa tồn tại
  async initializeCollections() {
    try {
      // Tạo một document dummy để khởi tạo collection
      const dummyChatData = {
        userId: 'dummy',
        title: 'Dummy Chat',
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 0
      };

      const dummyMessageData = {
        chatId: 'dummy',
        role: 'user',
        content: 'Dummy message',
        timestamp: new Date(),
        createdAt: new Date()
      };

      // Tạo collections bằng cách thêm và xóa document dummy
      await firestoreService.createDocument('chat_sessions', dummyChatData, 'dummy_chat');
      await firestoreService.createDocument('chat_messages', dummyMessageData, 'dummy_message');
      
      // Xóa document dummy
      await firestoreService.deleteDocument('chat_sessions', 'dummy_chat');
      await firestoreService.deleteDocument('chat_messages', 'dummy_message');
      
      console.log('Collections initialized successfully');
    } catch (error) {
      console.error('Error initializing collections:', error);
    }
  }

  // Gọi Gemini API
  async callGeminiAPI(messages) {
    try {
      if (!this.geminiApiKey) {
        throw new Error('Gemini API key not found');
      }

      // Format messages for Gemini API
      const contents = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(`${this.geminiApiUrl}?key=${this.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return {
          success: true,
          content: data.candidates[0].content.parts[0].text
        };
      } else {
        throw new Error('Invalid response from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Gửi tin nhắn và nhận phản hồi
  async sendMessage(chatId, userMessage, messageHistory = []) {
    try {
      // Tạo messages array với system prompt
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messageHistory,
        { role: 'user', content: userMessage }
      ];

      // Gọi Gemini API
      const result = await this.callGeminiAPI(messages);
      
      if (result.success) {
        // Lưu tin nhắn vào database
        await this.saveMessage(chatId, 'user', userMessage);
        await this.saveMessage(chatId, 'assistant', result.content);
        
        // Cập nhật messageCount trong chat session
        await this.updateMessageCount(chatId, 2); // +2 vì có user message và assistant message
        
        return {
          success: true,
          content: result.content
        };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lưu tin nhắn vào Firestore
  async saveMessage(chatId, role, content) {
    try {
      const messageData = {
        chatId,
        role, // 'user' hoặc 'assistant'
        content,
        timestamp: new Date(),
        createdAt: new Date()
      };

      return await firestoreService.createDocument('chat_messages', messageData);
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }

  // Tạo chat session mới
  async createChatSession(userId, title = 'Cuộc trò chuyện mới') {
    try {
      const chatData = {
        userId,
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 0
      };

      return await firestoreService.createDocument('chat_sessions', chatData);
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  }

  // Lấy danh sách chat sessions của user
  async getUserChatSessions(userId) {
    try {
      const result = await firestoreService.getCollection('chat_sessions', {
        where: [
          { field: 'userId', operator: '==', value: userId }
        ],
        orderBy: [
          { field: 'updatedAt', direction: 'desc' }
        ]
      });
      
      return {
        success: true,
        sessions: result || []
      };
    } catch (error) {
      console.error('Error getting user chat sessions:', error);
      
      // Nếu collection chưa tồn tại, khởi tạo và thử lại
      if (error.message.includes('Điều kiện tiên quyết') || error.message.includes('precondition')) {
        try {
          await this.initializeCollections();
          // Thử lại sau khi khởi tạo
          const retryResult = await firestoreService.getCollection('chat_sessions', {
            where: [
              { field: 'userId', operator: '==', value: userId }
            ],
            orderBy: [
              { field: 'updatedAt', direction: 'desc' }
            ]
          });
          
          return {
            success: true,
            sessions: retryResult || []
          };
        } catch (retryError) {
          console.error('Error after initialization:', retryError);
          return {
            success: true,
            sessions: []
          };
        }
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lấy tin nhắn của một chat session
  async getChatMessages(chatId) {
    try {
      const result = await firestoreService.getCollection('chat_messages', {
        where: [
          { field: 'chatId', operator: '==', value: chatId }
        ],
        orderBy: [
          { field: 'timestamp', direction: 'asc' }
        ]
      });
      
      return {
        success: true,
        messages: result || []
      };
    } catch (error) {
      console.error('Error getting chat messages:', error);
      
      // Nếu collection chưa tồn tại, trả về array rỗng
      if (error.message.includes('Điều kiện tiên quyết') || error.message.includes('precondition')) {
        return {
          success: true,
          messages: []
        };
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Xóa chat session
  async deleteChatSession(chatId) {
    try {
      // Xóa tất cả tin nhắn trong chat
      const messagesResult = await firestoreService.getCollection('chat_messages', {
        where: [
          { field: 'chatId', operator: '==', value: chatId }
        ]
      });
      
      for (const message of messagesResult) {
        await firestoreService.deleteDocument('chat_messages', message.id);
      }

      // Xóa chat session
      await firestoreService.deleteDocument('chat_sessions', chatId);
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting chat session:', error);
      
      // Nếu collection chưa tồn tại, vẫn coi là thành công
      if (error.message.includes('Điều kiện tiên quyết') || error.message.includes('precondition')) {
        return { success: true };
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Cập nhật messageCount của chat session
  async updateMessageCount(chatId, increment = 1) {
    try {
      // Lấy chat session hiện tại để có messageCount
      const chatSession = await firestoreService.getDocument('chat_sessions', chatId);
      const currentCount = chatSession?.messageCount || 0;
      
      await firestoreService.updateDocument('chat_sessions', chatId, {
        messageCount: currentCount + increment,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating message count:', error);
      // Không throw error vì đây không phải critical operation
    }
  }

  // Cập nhật title của chat session
  async updateChatTitle(chatId, title) {
    try {
      await firestoreService.updateDocument('chat_sessions', chatId, {
        title,
        updatedAt: new Date()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error updating chat title:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new AIService();
