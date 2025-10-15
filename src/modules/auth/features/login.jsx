// import robot from "../../../assets/images/robot.png";
// import { GraduationCapIcon } from "lucide-react";
// export default function LoginPage() {
//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side - Login Form */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
//         {/* Logo */}
//         <div className="flex items-center space-x-2 mb-6">
//           <GraduationCapIcon className="text-blue-600 text-4xl" />
//           <div>
//             <h1 className="text-xl font-bold">Learnly</h1>
//             <p className="text-gray-600">Chào mừng đến với Learnly</p>
//           </div>
//         </div>

//         {/* Form */}
//         <form className="w-full max-w-sm space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 mb-1">
//               Tên đăng nhập hoặc Email
//             </label>
//             <input
//               type="text"
//               placeholder="Nhập email"
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 mb-1">Mật khẩu</label>
//             <div className="relative">
//               <input
//                 type="password"
//                 placeholder="Nhập mật khẩu"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <span className="absolute right-3 top-2.5 text-gray-400 cursor-pointer">
//                 👁
//               </span>
//             </div>
//           </div>

//           {/* Remember me + Forgot password */}
//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" className="h-4 w-4" />
//               <span>Ghi nhớ đăng nhập</span>
//             </label>
//             <a href="#" className="text-blue-600 hover:underline">
//               Quên mật khẩu?
//             </a>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
//           >
//             Đăng nhập
//           </button>

//           {/* Divider */}
//           <div className="flex items-center gap-2">
//             <hr className="flex-1 border-gray-300" />
//           </div>

//           {/* Social Buttons */}
//           <button className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50">
//             <span className="text-blue-600">📘</span> Đăng nhập với Facebook
//           </button>
//           <button className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50">
//             <span className="text-red-500">🟢</span> Đăng nhập với Google
//           </button>

//           {/* Register link */}
//           <p className="text-center text-sm">
//             Bạn chưa có tài khoản?{" "}
//             <a href="#" className="text-blue-600 font-semibold hover:underline">
//               Đăng ký ngay
//             </a>
//           </p>
//         </form>
//       </div>

//       {/* Right Side - Intro */}
//       <div className="hidden md:flex w-1/2 bg-purple-200 flex-col justify-center items-center text-center p-12 rounded-l-3xl">
//         <h2 className="text-2xl font-bold text-purple-800 mb-4">
//           Thông minh - Hiệu quả - Không áp lực
//         </h2>
//         <p className="text-gray-700 mb-8 leading-relaxed">
//           Nền tảng AI giúp học sinh tự xây dựng lộ trình học tập theo năng lực,
//           giải bài tập dễ hiểu, cảnh báo quá tải và đồng hành cùng phụ huynh
//           trong suốt quá trình học.
//         </p>
//         <img
//           src={robot}
//           alt="Learnly Illustration"
//           className="w-80 rounded-lg shadow-md"
//         />
//       </div>
//     </div>
//   );
// }
import robot from "../../../assets/images/robot.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "../../../routes/endPoints";
import { GraduationCapIcon } from "lucide-react";
import { toast } from "react-toastify";
import "../styles/animated-border.css";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import { USER_ROLES } from "../../../services/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithFacebook, isLoading, error } = useAuth();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setFieldErrors({ username: "", password: "" });
    
    if (!username.trim() || !password.trim()) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const result = await login(username, password);
      if (result.success) {
        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 2000,
        });
        
        // Redirect based on user role
        const userRole = result.userData?.role;
        if (userRole === USER_ROLES.ADMIN) {
          navigate(ENDPOINTS.ADMIN.DASHBOARD);
        } else if (userRole === USER_ROLES.PARENT) {
          navigate(ENDPOINTS.PARENT.DASHBOARD);
        } else if (userRole === USER_ROLES.STUDENT) {
          // Redirect based on user role
        const userRole = result.userData?.role;
        if (userRole === USER_ROLES.ADMIN) {
          navigate(ENDPOINTS.ADMIN.DASHBOARD);
        } else if (userRole === USER_ROLES.PARENT) {
          navigate(ENDPOINTS.PARENT.DASHBOARD);
        } else {
          navigate(ENDPOINTS.STUDENT.DASHBOARD);
        }
        } else {
          // Redirect based on user role
        const userRole = result.userData?.role;
        if (userRole === USER_ROLES.ADMIN) {
          navigate(ENDPOINTS.ADMIN.DASHBOARD);
        } else if (userRole === USER_ROLES.PARENT) {
          navigate(ENDPOINTS.PARENT.DASHBOARD);
        } else {
          navigate(ENDPOINTS.STUDENT.DASHBOARD);
        } // Default to student
        }
      }
    } catch (error) {
      toast.error(error.message || "Đăng nhập thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        toast.success("Đăng nhập với Google thành công!", {
          position: "top-right",
          autoClose: 2000,
        });
        // Redirect based on user role
        const userRole = result.userData?.role;
        if (userRole === USER_ROLES.ADMIN) {
          navigate(ENDPOINTS.ADMIN.DASHBOARD);
        } else if (userRole === USER_ROLES.PARENT) {
          navigate(ENDPOINTS.PARENT.DASHBOARD);
        } else {
          navigate(ENDPOINTS.STUDENT.DASHBOARD);
        }
      }
    } catch (error) {
      toast.error(error.message || "Đăng nhập với Google thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await loginWithFacebook();
      if (result.success) {
        toast.success("Đăng nhập với Facebook thành công!", {
          position: "top-right",
          autoClose: 2000,
        });
        // Redirect based on user role
        const userRole = result.userData?.role;
        if (userRole === USER_ROLES.ADMIN) {
          navigate(ENDPOINTS.ADMIN.DASHBOARD);
        } else if (userRole === USER_ROLES.PARENT) {
          navigate(ENDPOINTS.PARENT.DASHBOARD);
        } else {
          navigate(ENDPOINTS.STUDENT.DASHBOARD);
        }
      }
    } catch (error) {
      toast.error(error.message || "Đăng nhập với Facebook thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left - Login Form */}
      <div className="w-1/2 bg-white flex flex-col px-12 relative overflow-y-auto">
        {/* Logo + Welcome - Fixed positioning */}
        <div className="sticky top-0 bg-white z-50 py-6 border-b border-gray-100">
          <div className="flex items-center justify-center gap-4">
            <Link to={ENDPOINTS.INDEX}>
              <GraduationCapIcon className="text-blue-600 text-4xl w-[50px] h-[50px]" />
            </Link>
            <h1 className="text-2xl font-bold text-blue-600 text-center">
              Chào mừng đến với Learnly
            </h1>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center py-8">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-[400px] animated-border bg-white rounded-lg p-6 shadow-md"
          >
          <h2 className="text-blue-600 text-3xl font-bold mb-2 text-center">
            Login
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Bạn vui lòng đăng nhập để tiếp tục
          </p>

          {/* Username */}
          <label htmlFor="username" className="text-sm text-gray-700">
            Tên đăng nhập hoặc Email
          </label>
          <input
            id="username"
            type="text"
            placeholder="Tên đăng nhập hoặc Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-4 py-3 mt-1 mb-1 border rounded-[10px] focus:outline-none focus:ring-2 ${
              fieldErrors.username
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#a10101]"
            }`}
          />
          {fieldErrors.username && (
            <p className="text-red-500 text-sm mb-3">{fieldErrors.username}</p>
          )}

          {/* Password */}
          <label htmlFor="password" className="text-sm text-gray-700">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 mt-1 mb-1 border rounded-[10px] pr-12 focus:outline-none focus:ring-2 ${
                fieldErrors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#a10101]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                // 👁️ Mở mắt
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                // 👁️‍🗨️ Đóng mắt
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a10.08 10.08 0 012.134-3.294m3.294-2.134A10.08 10.08 0 0112 5c4.478 0 8.269 2.943 9.543 7a10.08 10.08 0 01-4.347 5.306M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3"
                  />
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-red-500 text-sm mb-3">{fieldErrors.password}</p>
          )}
          {/* Error message */}
          {/*loginError && (
            <p className="text-red-600 text-sm mt-2 mb-4 text-center">
              {loginError}
            </p>
          )*/}

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between text-sm mt-2 mb-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          {/* <div className="flex justify-between items-center mt-2 mb-6 text-sm">
            <label className="flex items-center gap-2"></label>
            <Link
              to={ENDPOINTS.AUTH.FORGOT_PASSWORD}
              className="text-blue-600 font-semibold"
            >
              Forget password?
            </Link>
          </div> */}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#1d4ed8] text-white font-bold rounded-[10px] shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <button 
              onClick={handleFacebookLogin}
              disabled={isLoading}
              className="w-full border rounded-[10px] py-2 flex items-center justify-center gap-3 hover:bg-gray-50 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaFacebook className="text-blue-600 text-xl" />
              <span className="font-medium text-gray-700">
                Đăng nhập với Facebook
              </span>
            </button>

            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full border rounded-[10px] py-2 flex items-center justify-center gap-3 hover:bg-gray-50 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-red-500 text-xl" />
              <span className="font-medium text-gray-700">
                Đăng nhập với Google
              </span>
            </button>
          </div>

          {/* Register link */}
          <p className="text-center text-sm mt-5">
            Bạn chưa có tài khoản?{" "}
            <Link
              to={ENDPOINTS.AUTH.SIGNIN}
              className="text-blue-600 font-semibold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>
        </div>
      </div>

      {/* Right - Background */}
      <div className="w-1/2 relative flex  justify-center bg-purple-200">
        {/* <img
          src="https://c.animaapp.com/dMPYuAuq/img/image.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        /> */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-blue-600 min-h-screen px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg mt-[100px]">
            Thông minh - Hiệu quả - Không áp lực
          </h1>
          <h2 className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            Nền tảng AI giúp học sinh tự xây dựng lộ trình học tập theo năng
            lực, giải bài tập dễ hiểu, cảnh báo quá tải và đồng hành cùng phụ
            huynh trong suốt quá trình học.
          </h2>
          <img
            src={robot}
            alt="Learnly Illustration"
            className="w-60 mt-[60px] md:w-80 drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
