import express from "express";
import connectDB from "../configs/connectDB.js";
import axios from "axios";

const faceRegister = async (req, res) => {
  try {
    const { manv, image } = req.body;
    if (!manv || !image) {
      return res.status(400).json({ message: "Thiếu manv hoặc image" });
    }

    console.log("[FACE REGISTER] Nhận data:", manv, image.slice(0, 30));
    const pyRes = await axios.post("http://127.0.0.1:5000/register", { manv, image });
    console.log("[FACE REGISTER] Kết quả từ Python:", pyRes.data);

    res.json({ success: true });
  } catch (error) {
    console.error("[FACE REGISTER ERROR]", error.response?.data || error.message);
    res.status(500).json({ message: "Đăng ký khuôn mặt không thành công", error: error.response?.data?.error || error.message });
  }
};

const faceRecognize = async (req, res) => {
  try {
    const { image, manv: manvClient } = req.body;

    if (!image || !manvClient) {
      return res.status(400).json({ message: "Thiếu image hoặc mã nhân viên" });
    }

    console.log("[FACE RECOGNIZE] Nhận image:", image.slice(0, 30));
    console.log("[FACE RECOGNIZE] Nhân viên đăng nhập:", manvClient);

    // Gửi ảnh đến Python server để nhận diện gương mặt
    const pyRes = await axios.post("http://127.0.0.1:5000/recognize", { image });
    console.log("[FACE RECOGNIZE] Kết quả từ Python:", pyRes.data);

    if (!pyRes.data.success) {
      return res.json({ success: false, message: pyRes.data.message || "Không nhận diện được khuôn mặt" });
    }

    const manvRecognized = pyRes.data.manv;

    // So sánh gương mặt nhận diện được với mã nhân viên đang đăng nhập
    if (manvRecognized !== manvClient) {
      return res.json({
        success: false,
        message: `Gương mặt không khớp với mã nhân viên ${manvClient}. Phát hiện: ${manvRecognized}`,
      });
    }

    // Ghi thời gian chấm công
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');

    await connectDB.execute(
      "INSERT INTO chamcong (manv, thoigian) VALUES (?, ?)",
      [manvRecognized, formattedTime]
    );

    res.json({ success: true, manv: manvRecognized });
  } catch (error) {
    console.error("[FACE RECOGNIZE ERROR]", error.response?.data || error.message);
    res.status(500).json({
      message: "Nhận diện khuôn mặt không thành công",
      error: error.response?.data?.error || error.message,
    });
  }
};




export default {
  faceRegister,
  faceRecognize,
};