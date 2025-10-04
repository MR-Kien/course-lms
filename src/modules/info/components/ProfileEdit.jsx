import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// interface UserData {
//   hoTen: string;
//   ngaySinh: string;
//   dienThoai: string;
//   email: string;
//   diaChi: string;
//   truongHoc: string;
//   quan: string;
//   tinhThanhPho: string;
// }

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    hoTen: "Bùi Minh Hiếu",
    ngaySinh: "20 - 07 - 2004",
    dienThoai: "0783624814",
    email: "hieubmse184406@fpt.edu.vn",
    diaChi: "289 Nguyễn Sơn",
    truongHoc: "Trường THCS Đồng Khởi",
    quan: "Quận Tân Phú",
    tinhThanhPho: "TP Hồ Chí Minh",
  });

  const handleUpdate = () => {
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <Sidebar activeItem="profile" />
          
          <div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-300 shadow-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={handleCancel}
                className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-base font-medium">Quay lại</span>
              </button>
            </div>

            <h2 className="text-xl font-bold text-center mb-8">Cập nhật thông tin cá nhân</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ tên</label>
                <Input
                  value={editData.hoTen}
                  onChange={(e) => setEditData({ ...editData, hoTen: e.target.value })}
                  className="h-11 border-gray-300 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ngày sinh</label>
                <Input
                  value={editData.ngaySinh}
                  onChange={(e) => setEditData({ ...editData, ngaySinh: e.target.value })}
                  placeholder="DD - MM - YYYY"
                  className="h-11 border-gray-300 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Trường học</label>
                <Input
                  value={editData.truongHoc}
                  onChange={(e) => setEditData({ ...editData, truongHoc: e.target.value })}
                  className="h-11 border-gray-300 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Điện thoại</label>
                <Input
                  value={editData.dienThoai}
                  onChange={(e) => setEditData({ ...editData, dienThoai: e.target.value })}
                  className="h-11 border-gray-300 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quận/Huyện</label>
                <Input
                  value={editData.quan}
                  onChange={(e) => setEditData({ ...editData, quan: e.target.value })}
                  className="h-11 border-gray-300 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <Input
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="h-11 border-gray-300 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tỉnh/Thành Phố</label>
                <Input
                  value={editData.tinhThanhPho}
                  onChange={(e) => setEditData({ ...editData, tinhThanhPho: e.target.value })}
                  className="h-11 border-gray-300 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ</label>
                <Input
                  value={editData.diaChi}
                  onChange={(e) => setEditData({ ...editData, diaChi: e.target.value })}
                  className="h-11 border-gray-300 bg-blue-50"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Button
                onClick={handleUpdate}
                className="px-10 py-5 bg-blue-400 hover:bg-blue-500 text-white text-base rounded-full shadow-md"
              >
                Cập nhật thông tin
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="px-10 py-5 text-base rounded-full border-gray-400 hover:bg-gray-50"
              >
                Hủy bỏ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
