import reviewsModel from "../services/reviewsModel.js";

// Lấy đánh giá theo sản phẩm
const getReviewsByProductId = async (req, res) => {
  const { masp } = req.params;
  try {
    const reviews = await reviewsModel.getReview(masp);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy đánh giá", error });
  }
};

// Lấy toàn bộ đánh giá cho admin/staff
const getReview = async (req, res) => {
  try {
    const reviews = await reviewsModel.getRepreview();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đánh giá", error });
  }
};

// Thêm đánh giá mới
const addReview = async (req, res) => {
  const { masp, makh, sosao, noidung } = req.body;
  try {
    const result = await reviewsModel.addReview(masp, makh, sosao, noidung);
    res.status(201).json({ message: "Đã thêm đánh giá", reviewId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm đánh giá", error });
  }
};

// Cập nhật trạng thái hiển thị / ẩn
const updateStatusReview = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await reviewsModel.updateStatusReview(id, status);
    res.status(200).json({ message: "Cập nhật trạng thái thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái", error });
  }
};

// Phản hồi đánh giá (từ quản lý hoặc nhân viên)
const replyReview = async (req, res) => {
  const { id } = req.params;
  const { maql, manv, noidung } = req.body;

  try {
    await reviewsModel.replyReview(id, maql, manv, noidung);
    res.status(200).json({ message: "Phản hồi đánh giá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi phản hồi đánh giá", error });
  }
};

export default {
  getReviewsByProductId,
  addReview,
  getReview,
  updateStatusReview,
  replyReview,
};
