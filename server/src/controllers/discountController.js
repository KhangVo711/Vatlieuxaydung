import discountCart from '../services/discountModel.js';

// Lấy danh sách mã giảm giá hợp lệ của người dùng
const getUserDiscounts = async (req, res) => {
  const { userId } = req.query;
  try {
    const discounts = await discountCart.getUserDiscountsModel(userId);
    res.json({ discounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy danh sách mã giảm giá!" });
  }
};

// Kiểm tra và áp dụng mã giảm giá
const checkDiscount = async (req, res) => {
  const { code, total, userId } = req.body;

  try {
    const discount = await discountCart.findDiscountByCodeModel(code);

    if (!discount) {
      return res.json({ valid: false, message: "Mã không tồn tại hoặc đã hết hạn" });
    }

    // Nếu mã dành riêng cho khách hàng khác
    if (discount.makh && discount.makh !== userId) {
      return res.json({ valid: false, message: "Mã này không dành cho tài khoản của bạn" });
    }

    const formatCurrency = (value) => {
  return Number(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

if (Number(total) < Number(discount.dieukien)) {
  return res.json({
    valid: false,
    message: `Đơn hàng phải đạt tối thiểu ${formatCurrency(discount.dieukien)} để sử dụng mã này`,
  });
}

    // Tính giá trị giảm
    const percent = discount.phantramgiam;
    const discountAmount = Math.floor((total * percent) / 100);

    // Cập nhật lượt sử dụng
    await discountCart.decreaseDiscountQuantityModel(code);

    return res.json({
      valid: true,
      percent,
      discountAmount,
      message: `Áp dụng thành công - giảm ${percent}%`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ khi kiểm tra mã giảm giá!" });
  }
};
export default {
  getUserDiscounts,
  checkDiscount
};
