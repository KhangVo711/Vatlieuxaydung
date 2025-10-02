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

    console.log("[REQ] manvClient:", manvClient);

    // 1. Gửi ảnh đến Python server để nhận diện gương mặt
    const pyRes = await axios.post("http://127.0.0.1:5000/recognize", { image });
    console.log("[PYTHON RES]", pyRes.data);

    if (!pyRes.data.success) {
      return res.json({ success: false, message: pyRes.data.message || "Không nhận diện được khuôn mặt" });
    }

    const manvRecognized = pyRes.data.manv;
    console.log("[MANV RECOGNIZED]", manvRecognized);

    // 2. Kiểm tra gương mặt có khớp với mã nhân viên đăng nhập
    if (manvRecognized !== manvClient) {
      return res.json({
        success: false,
        message: `Gương mặt không khớp với mã nhân viên ${manvClient}. Phát hiện: ${manvRecognized}`,
      });
    }

    // 3. Xác định ca làm hiện tại của nhân viên
    const [rows] = await connectDB.execute(
      `SELECT c.maca, c.giovaoca, c.gioraca
       FROM giaonhanca g
       JOIN calam c ON g.maca = c.maca
       WHERE g.manv = ?
         AND NOW() BETWEEN c.giovaoca AND c.gioraca`,
      [manvRecognized]
    );

    console.log("[CURRENT SHIFT ROWS]", rows);

    if (rows.length === 0) {
      return res.json({ success: false, message: "Không tìm thấy ca làm hiện tại của nhân viên" });
    }

    const maca = rows[0].maca;
    console.log("[MACA FOUND]", maca);

    // 4. Kiểm tra nhân viên đã có bản ghi chấm công trong ca này chưa
    const [record] = await connectDB.execute(
      "SELECT * FROM chitietchamcong WHERE manv = ? AND maca = ?",
      [manvRecognized, maca]
    );

    console.log("[CHITIETCHAMCONG RECORD]", record);

    if (!record.length) {
      // Chưa có -> ghi checkin
      await connectDB.execute(
        "INSERT INTO chitietchamcong (manv, maca, checkin) VALUES (?, ?, NOW())",
        [manvRecognized, maca]
      );

      console.log(`[CHECKIN INSERTED] manv=${manvRecognized}, maca=${maca}`);

      await connectDB.execute(
        "UPDATE calam SET soluongCheckin = IFNULL(soluongCheckin, 0) + 1 WHERE maca = ?",
        [maca]
      );

      return res.json({ success: true, message: "Điểm danh CHECKIN thành công", manv: manvRecognized, maca });
    } else {
      // Đã có checkin -> cập nhật checkout + tính giờ làm
      console.log("[CHECKIN TIME FROM RECORD]", record[0].checkin);

      if (!record[0].checkin) {
        return res.json({ success: false, message: "Không có thời gian checkin để tính checkout" });
      }

      const checkinTime = new Date(record[0].checkin);
      const checkoutTime = new Date();

      const diffMs = checkoutTime - checkinTime;
      const diffHours = diffMs / (1000 * 60 * 60);

      const giolam = isNaN(diffHours) ? 0 : parseFloat(diffHours.toFixed(2));

      console.log(`[CHECKOUT] checkin=${checkinTime}, checkout=${checkoutTime}, giolam=${giolam}, id=${record[0].id}`);

      await connectDB.execute(
        "UPDATE chitietchamcong SET checkout = NOW(), giolam = ? WHERE id = ?",
        [giolam, record[0].id]
      );

      await connectDB.execute(
        "UPDATE calam SET soluongCheckout = IFNULL(soluongCheckout, 0) + 1 WHERE maca = ?",
        [maca]
      );
      const [luongmoica] = await connectDB.execute(
        "SELECT c.luongmoica, ct.giolam, CASE WHEN (c.luongmoica * ct.giolam) % 1000 >= 500 THEN CEIL((c.luongmoica * ct.giolam) / 1000) * 1000 ELSE FLOOR((c.luongmoica * ct.giolam) / 1000) * 1000 END AS tongluong FROM calam c JOIN chitietcalam ct ON c.maca = ct.maca WHERE c.maca = ?;",
        [maca]
      );
      console.log("[LUONG MOI CA]", luongmoica[0].tongluong);
      await connectDB.execute(
        "UPDATE nhanvien SET tongluong = IFNULL(tongluong, 0) + ? WHERE manv = ?",
        [luongmoica[0].tongluong, manvRecognized]
      );
      return res.json({
        success: true,
        message: "Điểm danh CHECKOUT thành công",
        manv: manvRecognized,
        maca,
        giolam
      });
    }

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