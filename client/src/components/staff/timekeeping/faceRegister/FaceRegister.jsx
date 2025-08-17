import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const FaceRegister = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [showEmployeeInput, setShowEmployeeInput] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);

  const capture = () => {
    if (!webcamRef.current) return;
    const image = webcamRef.current.getScreenshot({
      width: 800,
      height: 600,
      screenshotQuality: 1,
    });

    if (!image) {
      setError("Không thể chụp ảnh từ webcam");
      return;
    }

    setImageSrc(image);
    setError(null);

    setTimeout(() => {
      setIsShrinking(true);
      setTimeout(() => {
        setShowEmployeeInput(true);
      }, 300);
    }, 200);
  };

  const handleRegister = async () => {
    if (!employeeId.trim()) {
      setError("Cần nhập mã nhân viên");
      return;
    }
    if (!imageSrc) {
      setError("Chưa có ảnh chụp để đăng ký");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5001/face_register", {
        manv: employeeId,
        image: imageSrc,
      });

      if (response.data.success) {
        alert("Đăng ký thành công!");
        setImageSrc(null);
        setEmployeeId("");
        setShowEmployeeInput(false);
      } else {
        setError(response.data.error || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Đăng ký lỗi:", error.response?.data || error);
      setError(error.response?.data?.error || "Đăng ký thất bại. Kiểm tra log.");
    } finally {
      setIsLoading(false);
    }
  };

  const retake = () => {
    setImageSrc(null);
    setError(null);
    setEmployeeId("");
    setShowEmployeeInput(false);
    setIsShrinking(false);
  };
  return (
    <div className="h-fit relative overflow-hidden">
      {/* Luxury Background with Animated Gradients */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-pink-600 to-slate-700"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30"></div> */}

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-700/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative z-10 flex mt-2 justify-center">
        <div className="w-full max-w-xl">
          {/* Main Container with Glass Effect */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="relative px-8 pt-6 pb-4 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20"></div>
              <div className="relative">
                {/* Logo/Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 mb-3 bg-gradient-to-br from-pink-400 to-purple-300 rounded-2xl shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>

                <h1 className="text-3xl font-bold text-white drop-shadow-md mb-1">
                  Đăng Ký Khuôn Mặt
                </h1>
                <p className="text-md text-white tracking-wide drop-shadow-lg">
                  Hệ thống nhận diện khuôn mặt
                </p>

                {/* Decorative Line */}
                <div className="mt-2 flex justify-center">
                  <div className="w-24 h-0.5 bg-gradient-to-r from-pink-500/50 to-purple-500/50 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Camera/Preview Section */}
            <div className={`px-8 ${imageSrc ? "mx-2" : "pb-8 mt-2"}`}>
              <div className="relative">
                {!imageSrc ? (
                  <div className="relative group">
                    {/* Camera Frame */}
                    <div className="relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-sm border-2 border-white/30 shadow-2xl">
                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        width={800}
                        height={600}
                        videoConstraints={{ facingMode: "user" }}
                        className="w-full h-auto rounded-2xl"
                        style={{ aspectRatio: "4/3" }}
                      />

                      {/* Scanning Overlay */}
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Corner Frames */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-pink-300 rounded-tl-lg"></div>
                        <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-pink-300 rounded-tr-lg"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-pink-300 rounded-bl-lg"></div>
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-pink-300 rounded-br-lg"></div>

                        {/* Center Focus Circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-48 border-2 border-pink-300/50 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute top-8 left-8 flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-medium">Camera Active</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-sm border-2 border-white/30 shadow-2xl">
                      <img
                        src={imageSrc}
                        alt="Captured Preview"
                        className={`w-full h-auto rounded-2xl transition-all duration-700 ${isShrinking ? "scale-75" : "scale-100"
                          } group-hover:scale-105`}
                      />

                      {/* Success Overlay */}
                      <div className="absolute w-full h-[73.5%] inset-0 bg-green-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-white font-semibold">Ảnh đã chụp</p>
                        </div>
                      </div>
                      {showEmployeeInput && (
                        <div className="mt-3 py-4 px-10 bg-white/30 backdrop-blur-md rounded-b-xl space-y-3 text-white">
                          <input
                            type="text"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            placeholder="Nhập mã nhân viên"
                            className="w-full px-4 py-2 bg-white/90 border text-black/90 border-white/30 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-300"
                            disabled={isLoading}
                          />
                          <div className="flex space-x-3">
                            <button
                              onClick={handleRegister}
                              disabled={isLoading || !employeeId.trim()}
                              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isLoading || !employeeId.trim()
                                  ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
                                  : "bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 transition-all"
                                }`}
                            >
                              {isLoading ? (
                                <div className="flex items-center justify-center">
                                  <div className="w-5 h-5 mr-2 border-2 bg-pink-300 border-white/30 border-t-white rounded-full animate-spin"></div>
                                  Đang xử lý...
                                </div>
                              ) : (
                                "Đăng Ký"
                              )}
                            </button>
                            <button
                              onClick={retake}
                              disabled={isLoading}
                              className="px-6 py-3 bg-white/20 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Retake Button */}
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={retake}
                        className="bg-white/85 backdrop-blur-sm border border-white/50 text-black/60 px-3 py-1.5 text-sm rounded-md font-medium hover:bg-white/65 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-4 h-4 mb-0.5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Chụp Lại
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className={`mt-8 ${imageSrc ? "hidden" : "flex justify-center"}`}>
                <button
                  onClick={capture}
                  disabled={imageSrc || isLoading}
                  className={`group relative px-12 py-4 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 ${imageSrc || isLoading
                      ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-300 to-pink-300 text-white hover:from-pink-400 hover:to-pink-400 shadow-pink-500/20"
                    }`}
                >
                  {/* Button Glow Effect */}
                  {!imageSrc && !isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-pink-300 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  )}

                  <span className="relative flex items-center text-white/70 justify-center">
                    
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Chụp ảnh & Đăng ký
                 
                  </span>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 mx-auto max-w-md">
                  <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-red-400 font-semibold">Lỗi</span>
                    </div>
                    <p className="text-red-300">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-black/25 backdrop-blur-sm px-8 py-6 border-t border-white/10">
              <div className="flex items-center justify-center space-x-6 text-white text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Secure Connection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>AI Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Privacy Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default FaceRegister;