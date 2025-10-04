import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

// interface UserData {
//   hoTen: string;
//   tenDangNhap: string;
//   ngaySinh: string;
//   dienThoai: string;
//   email: string;
//   diaChi: string;
//   loaiTaiKhoan: string;
//   khoi: string;
//   truongHoc: string;
//   quan: string;
//   tinhThanhPho: string;
// }

export default function Profile() {
  const navigate = useNavigate();
  
  const userData = {
    hoTen: "Bùi Minh Hiếu",
    tenDangNhap: "Híu Bùi",
    ngaySinh: "--/--/----",
    dienThoai: "0783624814",
    email: "hieubmse184406@fpt.edu.vn",
    diaChi: "289 Nguyễn Sơn",
    loaiTaiKhoan: "Học sinh",
    khoi: "9",
    truongHoc: "Trường THCS Đồng Khởi",
    quan: "Quận Tân Phú",
    tinhThanhPho: "TP Hồ Chí Minh",
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl border border-black/50 shadow-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-blue-600">Thông tin cá nhân</h2>
        <button
          onClick={() => navigate("/profile/edit")}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-black/50 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg">Cập nhật</span>
          <Pencil className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
        <div>
          <p className="text-sm text-black/50">Họ tên:</p>
          <p className="text-base font-bold text-black">{userData.hoTen}</p>
        </div>

        <div>
          <p className="text-sm text-black/50">Ngày Sinh:</p>
          <p className="text-base font-bold text-black">{userData.ngaySinh}</p>
        </div>

        <div>
          <p className="text-sm text-black/50">Tên đăng nhập:</p>
          <p className="text-base font-bold text-black">{userData.tenDangNhap}</p>
        </div>

        <div>
          <p className="text-sm text-black/50">Điện thoại:</p>
          <p className="text-base font-bold text-black">{userData.dienThoai}</p>
        </div>

        <div>
          <p className="text-sm text-black/50">Loại tài khoản:</p>
          <p className="text-base font-bold text-black">{userData.loaiTaiKhoan}</p>
        </div>

        <div>
          <p className="text-sm text-black/50">Email</p>
          <p className="text-base font-bold text-black">{userData.email}</p>
        </div>

        <div>
          <p className="text-sm text-black/50">Khối:</p>
          <p className="text-base font-bold text-black">{userData.khoi}</p>
        </div>

        <div>
          <p className="text-sm text-black/50">Địa chỉ:</p>
          <p className="text-base font-bold text-black">{userData.diaChi}</p>
        </div>

        <div>
          <p className="text-sm text-black/50">Trường học:</p>
          <p className="text-base font-bold text-black">{userData.truongHoc}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-black/50">Quận:</p>
          <p className="text-base font-bold text-black">{userData.quan}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-black/50">Tỉnh/Thành Phố:</p>
          <p className="text-base font-bold text-black">{userData.tinhThanhPho}</p>
        </div>
      </div>
    </div>
  );
}
