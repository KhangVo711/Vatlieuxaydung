import React, { useRef, useState, useContext } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Context } from '../../../Context.jsx';

const FaceCheckin = () => {
  const webcamRef = useRef(null);
  const [error, setError] = useState(null);
  const { isDataStaff } = useContext(Context);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot({ width: 640, height: 480, screenshotQuality: 1 });
    if (!imageSrc) {
      setError("Không thể chụp ảnh từ webcam");
      return;
    }

    setError(null);

    try {
      const response = await axios.post("http://localhost:5001/face_recognize", {
        image: imageSrc,
        manv: isDataStaff?.manv || null, // Gửi mã nhân viên hiện tại (nếu có)
      });

      if (response.data.success) {
        alert(`Chấm công thành công cho: ${response.data.manv}`);
      } else {
        setError(response.data.message || "Không nhận diện được khuôn mặt!");
      }
    } catch (error) {
      console.error("Nhận diện lỗi:", error.response?.data || error);
      setError(error.response?.data?.error || "Nhận diện thất bại. Kiểm tra log.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Chấm công khuôn mặt</h2>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        screenshotQuality={1}
      />
      <br />
      <button onClick={capture}>Chấm công</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FaceCheckin;
