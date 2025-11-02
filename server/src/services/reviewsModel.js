import connectDB from "../configs/connectDB.js";

// Lấy tất cả đánh giá theo sản phẩm
const getReview = async (masp) => {
  const [rows] = await connectDB.execute(
    `SELECT b.*, 
            sp.tensp, 
            hasp.hinhanh, 
            t.noidung AS phanhoi, 
            t.ten_admin, 
            t.ngaytraloi,
     FROM binhluan b
     JOIN sanpham sp ON sp.masp = b.masp
     JOIN hinhanhsanpham hasp ON hasp.masp = sp.masp
     LEFT JOIN traloi_binhluan t ON b.id = t.id_binhluan
     WHERE b.masp = ?
     ORDER BY b.ngaydang DESC`,
    [masp]
  );
  return rows;
};

// Lấy tất cả đánh giá (cho trang admin)
const getRepreview = async () => {
  const [rows] = await connectDB.execute(
    `SELECT b.*, 
            sp.tensp, 
            hasp.hinhanh, 
            t.noidung AS phanhoi, 
            t.ten_admin, 
            t.ngaytraloi
     FROM binhluan b
     JOIN sanpham sp ON sp.masp = b.masp
     JOIN hinhanhsanpham hasp ON hasp.masp = sp.masp
     LEFT JOIN traloi_binhluan t ON b.id = t.id_binhluan
     ORDER BY b.ngaydang DESC`
  );
  return rows;
};

// Thêm đánh giá mới
const addReview = async (masp, tenkh, sosao, noidung) => {
  const [rows] = await connectDB.execute(
    `INSERT INTO binhluan (masp, tenkh, sosao, noidung, ngaydang, trangthai)
     VALUES (?, ?, ?, ?, NOW(), 'hiển thị')`,
    [masp, tenkh, sosao, noidung]
  );
  return rows;
};

// Cập nhật trạng thái đánh giá
const updateStatusReview = async (id, trangthai) => {
  const [rows] = await connectDB.execute(
    `UPDATE binhluan SET trangthai = ? WHERE id = ?`,
    [trangthai, id]
  );
  return rows;
};

// Phản hồi đánh giá
const replyReview = async (id_danhgia, ten_admin, noidung) => {
  const [rows] = await connectDB.execute(
    `INSERT INTO traloi_binhluan (id_binhluan, ten_admin, noidung, ngaytraloi)
     VALUES (?, ?, ?, NOW())`,
    [id_danhgia, ten_admin, noidung]
  );
  return rows;
};

export default { getReview, addReview, getRepreview, updateStatusReview, replyReview };
