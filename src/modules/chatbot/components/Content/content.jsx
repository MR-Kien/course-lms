import { Link2, Image, Send } from "lucide-react";

export default function Content() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-[1236px] mx-auto">
        <div className="border border-black/30 rounded-xl p-6 md:p-10 bg-white">
          {/* Question Section */}
          <div className="mb-6">
            <h2 className="text-[25px] font-normal mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Câu hỏi</h2>
            <p className="text-[15px] text-black">x^2=36</p>
          </div>

          {/* Solution Section */}
          <div className="mb-6">
            <h2 className="text-[25px] font-normal mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Giải Pháp</h2>
            <div className="border border-black/20 rounded-xl p-4 md:p-6">
              <p className="font-medium mb-3">Giải phương trình</p>
              <div className="text-base leading-relaxed space-y-2">
                <p>
                  Để giải phương trình bậc hai đơn giản này, chúng ta cần tìm giá trị của *x* sao cho *x* bình phương bằng 36.
                </p>
                <p>Phương trình đã cho là:</p>
                <p className="font-medium">x² = 36</p>
                <p>Để tìm *x*, ta lấy căn bậc hai của cả hai vế:</p>
                <div className="flex items-center gap-2 my-2">
                  <svg width="31" height="15" viewBox="0 0 31 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75 15C7.51182 15 7.27998 14.935 7.08891 14.8146C6.89783 14.6941 6.75772 14.5248 6.68936 14.3316L3.60486 5.625H1.10714C0.81351 5.625 0.531904 5.52623 0.324275 5.35041C0.116645 5.1746 0 4.93614 0 4.6875C0 4.43886 0.116645 4.2004 0.324275 4.02459C0.531904 3.84877 0.81351 3.75 1.10714 3.75H4.42857C4.66676 3.74999 4.89859 3.81502 5.08967 3.93543C5.28074 4.05585 5.42086 4.22523 5.48921 4.41844L7.57175 10.2947L9.98864 0.741563C10.0416 0.531679 10.178 0.34354 10.3751 0.208573C10.5722 0.0736057 10.818 -1.81021e-05 11.0714 3.33853e-09H29.8929C30.1865 3.33853e-09 30.4681 0.0987722 30.6757 0.274588C30.8834 0.450403 31 0.68886 31 0.9375C31 1.18614 30.8834 1.4246 30.6757 1.60041C30.4681 1.77623 30.1865 1.875 29.8929 1.875H11.9671L8.83278 14.2584C8.78157 14.4622 8.65169 14.6457 8.46364 14.7799C8.27559 14.9142 8.04008 14.9916 7.79429 15H7.75Z" fill="currentColor"/>
                  </svg>
                  <span>x² = </span>
                  <svg width="31" height="15" viewBox="0 0 31 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75 15C7.51182 15 7.27998 14.935 7.08891 14.8146C6.89783 14.6942 6.75772 14.5248 6.68936 14.3316L3.60486 5.625H1.10714C0.81351 5.625 0.531904 5.52623 0.324275 5.35041C0.116645 5.1746 0 4.93614 0 4.6875C0 4.43886 0.116645 4.2004 0.324275 4.02459C0.531904 3.84877 0.81351 3.75 1.10714 3.75H4.42857C4.66676 3.74999 4.89859 3.81502 5.08967 3.93543C5.28074 4.05585 5.42086 4.22523 5.48921 4.41844L7.57175 10.2947L9.98864 0.741563C10.0416 0.531679 10.178 0.34354 10.3751 0.208573C10.5722 0.0736057 10.818 -1.81021e-05 11.0714 3.33853e-09H29.8929C30.1865 3.33853e-09 30.4681 0.0987722 30.6757 0.274588C30.8834 0.450403 31 0.68886 31 0.9375C31 1.18614 30.8834 1.4246 30.6757 1.60041C30.4681 1.77623 30.1865 1.875 29.8929 1.875H11.9671L8.83279 14.2584C8.78157 14.4622 8.65169 14.6457 8.46364 14.7799C8.27559 14.9142 8.04008 14.9916 7.79429 15H7.75Z" fill="currentColor"/>
                  </svg>
                  <span>36</span>
                </div>
                <p>Vì Vậy,</p>
                <p className="font-medium">x = ±6</p>
                <p>Do đó, *x* có hai giá trị: 6 và -6.</p>
              </div>
            </div>
          </div>

          {/* Key Concepts Section */}
          <div className="mb-6">
            <div className="border border-black/20 rounded-xl p-4 md:p-6">
              <h3 className="text-xl font-normal mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Khái niệm chính</h3>
              <ol className="space-y-3 text-base">
                <li>1. Hiểu khái niệm</li>
                <li>2. Hiểu quá trình giải</li>
                <li>3. Các dạng bài tập tương tự</li>
              </ol>
            </div>
          </div>

          {/* Input Section */}
          <div className="mb-4">
            <div className="border border-black/50 rounded-xl p-6 bg-white flex items-center gap-4">
              <button className="text-black/50 hover:text-black transition-colors">
                <Link2 className="w-[30px] h-[30px]" />
              </button>
              <button className="text-black/50 hover:text-black transition-colors">
                <Image className="w-[30px] h-[30px]" />
              </button>
              <input
                type="text"
                placeholder="Nhập câu hỏi bổ sung"
                className="flex-1 text-xl outline-none placeholder:text-black/50 bg-transparent"
              />
              <button className="text-black/30 hover:text-black transition-colors">
                <Send className="w-[30px] h-[30px]" />
              </button>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-sm text-black/50 text-center md:text-left">
            LearnlyAI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng
          </p>
        </div>
      </div>
    </div>
  );
}
