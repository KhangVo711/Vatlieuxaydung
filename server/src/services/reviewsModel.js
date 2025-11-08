import connectDB from "../configs/connectDB.js";

// Lấy đánh giá theo sản phẩm
const getReview = async (masp) => {
  const [rows] = await connectDB.execute(
    `SELECT b.*, 
            sp.tensp, 
            (SELECT hinhanh FROM hinhanhsanpham ha WHERE ha.masp = sp.masp LIMIT 1) AS hinhanh,
            t.noidung AS phanhoi,
            COALESCE(q.tenql, nv.tennv) AS ten_nguoi_tra_loi,
            t.ngaytraloi,
            kh.tenkh,
            NULLIF(nv.manv, 'null') AS manv,
  NULLIF(q.maql, 'null') AS maql
     FROM binhluan b
     JOIN sanpham sp ON sp.masp = b.masp
     JOIN khachhang kh ON kh.makh = b.makh
     LEFT JOIN traloi_binhluan t ON b.id = t.id_binhluan
     LEFT JOIN quanly q ON t.maql = q.maql
     LEFT JOIN nhanvien nv ON t.manv = nv.manv
     WHERE b.masp = ?
     ORDER BY b.ngaydang DESC`,
    [masp]
  );
  return rows;
};

// Lấy toàn bộ đánh giá (cho admin)
const getRepreview = async () => {
  const [rows] = await connectDB.execute(
    `SELECT b.*, 
            sp.tensp, 
            hasp.hinhanh,
            t.noidung AS phanhoi,
            COALESCE(q.tenql, nv.tennv) AS ten_nguoi_tra_loi,
            t.ngaytraloi,
            NULLIF(nv.manv, 'null') AS manv,
  NULLIF(q.maql, 'null') AS maql
     FROM binhluan b
     JOIN sanpham sp ON sp.masp = b.masp
     JOIN hinhanhsanpham hasp ON hasp.masp = sp.masp
     LEFT JOIN traloi_binhluan t ON b.id = t.id_binhluan
     LEFT JOIN quanly q ON t.maql = q.maql
     LEFT JOIN nhanvien nv ON t.manv = nv.manv
     ORDER BY b.ngaydang DESC`
  );
  return rows;
};

// Thêm đánh giá mới
const addReview = async (masp, makh, sosao, noidung) => {
  const [rows] = await connectDB.execute(
    `INSERT INTO binhluan (masp, makh, sosao, noidung, ngaydang, trangthai)
     VALUES (?, ?, ?, ?, NOW(), 'hiển thị')`,
    [masp, makh, sosao, noidung]
  );
  return rows;
};

// Cập nhật trạng thái hiển thị
const updateStatusReview = async (id, trangthai) => {
  const [rows] = await connectDB.execute(
    `UPDATE binhluan SET trangthai = ? WHERE id = ?`,
    [trangthai, id]
  );
  return rows;
};

// Phản hồi đánh giá (có thể từ quản lý hoặc nhân viên)
const replyReview = async (id_binhluan, maql, manv, noidung) => {
  const [rows] = await connectDB.execute(
    `INSERT INTO traloi_binhluan (id_binhluan, maql, manv, noidung, ngaytraloi)
     VALUES (?, ?, ?, ?, NOW())`,
    [id_binhluan, maql || null, manv || null, noidung]
  );
  return rows;
};

export default {
  getReview,
  addReview,
  getRepreview,
  updateStatusReview,
  replyReview,
};
