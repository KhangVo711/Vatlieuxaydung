import express from "express";
import connectDB from "../configs/connectDB.js";

import cartModel from "../services/cartModel.js";
import productsModel from "../services/productsModel.js";
import { PayOS } from "@payos/node";
import dotenv from "dotenv";
dotenv.config();

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

const getCart = async (req, res) => {
    try {
        const order = await cartModel.getCart();
        res.status(200).send({order:order});
    } catch (error) {
        console.error("Error getting orders:", error);
        res.status(500).send({ message: "Lỗi khi lấy thông tin đơn hàng." });
    }
}

const insertCart = async (req, res) => {
  try {
    const {
      madh,
      makh,
      ngaydat,
      trangthai,
      tonggia,
      madvvc,
      maform,
      quangduong,
      hinhthucthanhtoan,
    } = req.body;

    if (
      !madh ||
      (!makh && !maform) ||
      !ngaydat ||
      !trangthai ||
      !tonggia ||
      !madvvc ||
      !quangduong ||
      !hinhthucthanhtoan
    ) {
      return res.status(400).send({ message: "Thiếu thông tin đặt hàng." });
    }

    const trangthaithanhtoan =
      hinhthucthanhtoan === "cod" ? "Chưa thanh toán" : "Chờ thanh toán";

    await cartModel.insertCart(
      madh,
      makh,
      ngaydat,
      trangthai,
      tonggia,
      madvvc,
      maform,
      quangduong,
      hinhthucthanhtoan,
      trangthaithanhtoan
    );

    res.status(200).send({
      message: "Đơn hàng đã được đặt thành công!",
      // needPayment: hinhthucthanhtoan === "qr" 
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send({ message: "Đặt hàng không thành công." });
  }
};


// Tạo đơn hàng PayOS 
const createPayOSOrder = async (req, res) => {
  try {
    let { orderId, amount, description } = req.body;
console.log(payos);

    if (isNaN(orderId)) {
      orderId = Math.floor(Date.now() / 1000);
    }

    const body = {
      orderCode: Number(orderId),
      amount: Number(amount),
      description,
      returnUrl: "http://localhost:5173/payment-success",
      cancelUrl: "http://localhost:5173/payment-cancel",
    };

    const response = await payos.paymentRequests.create(body);

    res.json({
      checkoutUrl: response.checkoutUrl,
      qrCode: response.qrCode,
    });
  } catch (err) {
    console.error("createPayOSOrder error:", err.response?.data || err.message);
    res.status(500).json({ error: "Không tạo được link PayOS" });
  }
};




const payOSWebhook = async (req, res) => {
  try {
    const body = req.body;
    console.log("Webhook data:", body);

    if (body.code === "00" && body.success && body.data) {
      const orderId = body.data.orderCode;  
      await cartModel.updateOrderPaymentStatus(orderId, "Đã thanh toán");
      console.log(`Đơn hàng ${orderId} đã cập nhật thành "Đã thanh toán"`);
    }

    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Webhook failed" });
  }
};

const getOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const codeCart = id;
    const order = await cartModel.getOrderById(codeCart);

    if (!order) {
      return res.status(404).json({ status: "Không tìm thấy đơn hàng" });
    }

    res.json({
      orderId: id,
      paymentStatus: order.trangthaithanhtoan, // "Chưa thanh toán" | "Chờ thanh toán" | "Đã thanh toán"
      orderStatus: order.trangthai,          // "Chờ xác nhận" | "Đã xác nhận" | "Đang giao hàng" | "Đã giao hàng" | "Đã hủy"
    });
  } catch (error) {
    console.error("getOrderStatus error:", error);
    res.status(500).json({ error: "Lỗi khi lấy trạng thái đơn hàng" });
  }
};
const insertFormOD = async (req, res) => {
    try {
        const { maform, fullname, phone, address, email } = req.body;
        const idPattern = /^[^\s].*$/;
        const fullnameRegex = /^[\p{L}\p{N}\s]+$/u;

        if (!idPattern.test(fullname)) {
            return res.status(400).json({ message: 'Tên không được chứa khoảng trắng ở đầu' });
        }
        if (!fullnameRegex.test(fullname)) {
            return res.status(400).json({ message: 'Tên không được chứa ký tự đặc biệt.' });
        }
        if (!idPattern.test(address)) {
            return res.status(400).json({ message: 'Địa chỉ không được chứa khoảng trắng ở đầu' });
        }
 
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email không đúng định dạng' });
        }
        if (!idPattern.test(phone)) {
            return res.status(400).json({ message: 'Số điện thoại không được chứa khoảng trắng ở đầu' });
        }
        const phoneRegex = /^\d{10,11}$/;
        if (phone && !phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Số điện thoại phải là số có độ dài từ 10 đến 11 ký tự' });
        }
        const tenkh = fullname;
        const sdt = phone;
        const diachi = address;
        await cartModel.insertFormOD(maform, tenkh, sdt, diachi, email);
        return res.status(200).json({ message: 'Cập nhật thành công' });
        
    } catch (error) {
        res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
};
const insertDetailCart = async (req, res) => {
  const orderDetails = req.body;
  console.log(orderDetails);
  try {
    if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
      return res.status(400).send({ message: "Chi tiết đơn hàng không hợp lệ." });
    }
    await Promise.all(
      orderDetails.map(detail => {
        const { madh, masp, dongia, km, soluongsanpham, mabienthe } = detail;
        if (!madh || !masp || !dongia || !soluongsanpham) {
          throw new Error("Thông tin chi tiết đơn hàng không đầy đủ.");
        }
        return cartModel.insertDetailCart(madh, masp, mabienthe, soluongsanpham, km, dongia);
      })
    );
    res.status(200).send({ message: "Đơn hàng đã được đặt thành công!" });
  } catch (error) {
    console.error("Error saving order details:", error);
    res.status(500).send({ message: "Đặt hàng không thành công." });
  }
};

const updateStatus = async (req, res) => {
  const { trangthai, madh } = req.body;

  try {
    // Lấy trạng thái hiện tại của đơn hàng
    const [currentStatus] = await connectDB.execute(
      'SELECT trangthai FROM donhang WHERE madh = ?',
      [madh]
    );
    const currentStatusValue = currentStatus[0]?.trangthai || 'Chờ xác nhận';

    const listOrder = await cartModel.getDetailCart(madh);
    console.log('List Order:', listOrder);

    if (!Array.isArray(listOrder) || listOrder.length === 0) {
      return res.status(400).send({ message: "Không hợp lệ." });
    }

    // Xử lý các trạng thái không ảnh hưởng đến kho
    if (trangthai === 'Chờ xác nhận' && currentStatusValue !== 'Đã xác nhận') {
      await cartModel.updateStatus(trangthai, madh);
      return res.status(400).send({ message: "Đơn hàng đang chờ xác nhận" });
    }
    if (trangthai === 'Đã hủy' && currentStatusValue !== 'Đã xác nhận') {
      await cartModel.updateStatus(trangthai, madh);
      return res.status(400).send({ message: "Đơn hàng đã bị hủy." });
    }
    if (trangthai === 'Đang giao hàng' || trangthai === 'Đã giao hàng') {
      await cartModel.updateStatus(trangthai, madh);
    }

    // Xử lý trạng thái "Đã xác nhận"
    if (trangthai === 'Đã xác nhận') {
      if (currentStatusValue === 'Đã xác nhận') {
        return res.status(400).send({ message: "Đơn hàng đã được xác nhận trước đó." });
      }
      await Promise.all(
        listOrder.map(async (order) => {
          const productDetail = await productsModel.detailProduct(order.masp);
          const isVariant = productDetail.cobienthe === 1;
          const stockQuantity = isVariant
            ? (await connectDB.execute(
                'SELECT soluongtonkho FROM cacbienthe WHERE mabienthe = ? AND masp = ?',
                [order.mabienthe, order.masp]
              ))[0][0]?.soluongtonkho || 0
            : productDetail.soluongsp;

          if (stockQuantity < order.soluongsanpham) {
            throw new Error("Số lượng sản phẩm không đủ.");
          } else {
            await cartModel.updateQuantity(order.masp, order.mabienthe, madh, false); // false: trừ số lượng
          }
        })
      );
      await cartModel.updateStatus(trangthai, madh);
    }

    // Xử lý trạng thái "Đã hủy" sau khi đã xác nhận
    if (trangthai === 'Đã hủy' && currentStatusValue === 'Đã xác nhận') {
      await Promise.all(
        listOrder.map(async (order) => {
          await cartModel.updateQuantity(order.masp, order.mabienthe, madh, true); // true: cộng số lượng
        })
      );
      await cartModel.updateStatus(trangthai, madh);
      return res.status(200).send({ message: "Đơn hàng đã bị hủy và số lượng được hoàn lại." });
    }

    res.json({ success: true, message: 'Cập nhật trạng thái thành công' });
  } catch (error) {
    console.error('Error updating cart:', error);
    if (error.message === "Số lượng sản phẩm không đủ.") {
      return res.status(400).send({ message: error.message });
    }
    res.status(500).json({ success: false, message: 'Cập nhật trạng thái thất bại' });
  }
};

const detailProductInOrder = async (req, res) => {
    const { madh } = req.params;
    try {
        const orderProduct = await cartModel.detailProductInOrder(madh);
        res.status(200).send({ detail: orderProduct });
    } catch (error) {
        console.error("Error getting order details:", error);
        res.status(500).send({ message: "Lỗi khi lấy thông tin đơn hàng." });
    }
}

const detailOrderOfUser = async (req, res) => {
    const { makh } = req.params;
    try {
        const orderProduct = await cartModel.detailOrderOfUser(makh);
        res.status(200).send({ detailOrder: orderProduct });
    } catch (error) {
        console.error("Error getting order details:", error);
        res.status(500).send({ message: "Lỗi khi lấy thông tin đơn hàng." });
    }
}


export default { insertCart, insertDetailCart, getCart, updateStatus, detailProductInOrder, detailOrderOfUser, insertFormOD, payOSWebhook, getOrderStatus, createPayOSOrder };