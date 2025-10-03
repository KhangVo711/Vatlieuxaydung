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
      return res.json({
        success: false,
        message: pyRes.data.message || "Không nhận diện được khuôn mặt",
      });
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

    // 3. Xác định ca làm hiện tại (ngày hôm nay và giờ trong khoảng ca)
    const [rows] = await connectDB.execute(
      `SELECT c.maca, c.tenca, c.giovaoca, c.gioraca, DATE(c.giovaoca) AS ngayca
       FROM giaonhanca g
       JOIN calam c ON g.maca = c.maca
       WHERE g.manv = ?
         AND DATE(c.giovaoca) = CURDATE()
         AND NOW() BETWEEN c.giovaoca AND c.gioraca`,
      [manvRecognized]
    );

    console.log("[CURRENT SHIFT ROWS]", rows);

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "Bạn không có ca làm hôm nay hoặc chưa đến giờ ca",
      });
    }

    const ca = rows[0];

    // 4. Kiểm tra trong chitietchamcong
    const [record] = await connectDB.execute(
      "SELECT * FROM chitietchamcong WHERE manv = ? AND maca = ?",
      [manvRecognized, ca.maca]
    );

    console.log("[CHITIETCHAMCONG RECORD]", record);

    if (!record.length) {
      // Checkin lần đầu
      await connectDB.execute(
        "INSERT INTO chitietchamcong (manv, maca, checkin) VALUES (?, ?, NOW())",
        [manvRecognized, ca.maca]
      );

      console.log(`[CHECKIN INSERTED] manv=${manvRecognized}, maca=${ca.maca}`);

      await connectDB.execute(
        "UPDATE calam SET soluongCheckin = IFNULL(soluongCheckin, 0) + 1 WHERE maca = ?",
        [ca.maca]
      );

      return res.json({
        success: true,
        type: "checkin",
        message: ` Check-in thành công cho ca ${ca.tenca}`,
        manv: manvRecognized,
        maca: ca.maca,
      });
    } else {
      const chitiet = record[0];
      console.log("[CHITIETCHAMCONG EXISTING]", chitiet);
      // Nếu đã có checkout rồi => chặn spam
      if (chitiet.checkout !== null) {
        return res.json({
          success: false,
          message: "❌ Bạn đã checkout ca này rồi, không thể chấm thêm",
        });
      }

      // Nếu đã checkin nhưng chưa checkout => cho checkout
      if (chitiet.checkin && chitiet.checkout === null) {
        const checkinTime = new Date(chitiet.checkin);
        const checkoutTime = new Date();

        const diffMs = checkoutTime - checkinTime;
        const diffHours = diffMs / (1000 * 60 * 60);

        // Làm tròn giờ
        const giolam = Math.ceil(diffHours * 100) / 100;

        console.log(
          `[CHECKOUT] checkin=${checkinTime}, checkout=${checkoutTime}, giolam=${giolam}`
        );

        await connectDB.execute(
          "UPDATE chitietchamcong SET checkout = NOW(), giolam = ? WHERE id = ?",
          [giolam, chitiet.id]
        );

        await connectDB.execute(
          "UPDATE calam SET soluongCheckout = IFNULL(soluongCheckout, 0) + 1 WHERE maca = ?",
          [ca.maca]
        );

        // Tính lương ca
        const [luong] = await connectDB.execute(
          `SELECT c.luongmoica, ct.giolam,
            CASE 
              WHEN (c.luongmoica * ct.giolam) % 1000 >= 500 
                THEN CEIL((c.luongmoica * ct.giolam) / 1000) * 1000 
                ELSE FLOOR((c.luongmoica * ct.giolam) / 1000) * 1000 
            END AS tongluong
           FROM calam c 
           JOIN chitietchamcong ct ON c.maca = ct.maca AND ct.manv = ?
           WHERE c.maca = ?`,
          [manvRecognized, ca.maca]
        );

        console.log("[LUONG MOI CA]", luong[0].tongluong);

        await connectDB.execute(
          "UPDATE nhanvien SET tongluong = IFNULL(tongluong, 0) + ? WHERE manv = ?",
          [luong[0].tongluong, manvRecognized]
        );

        return res.json({
          success: true,
          type: "checkout",
          message: `✅ Checkout thành công cho ca ${ca.tenca}`,
          manv: manvRecognized,
          maca: ca.maca,
          giolam,
        });
      }
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