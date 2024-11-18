import express from "express";
import cartModel from "../services/cartModel.js";
import productsModel from "../services/productsModel.js";


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
        const { madh, makh, ngaydat, trangthai, tonggia, madvvc } = req.body;

        if (!madh || !makh || !ngaydat || !trangthai || !tonggia || !madvvc) {
            return res.status(400).send({ message: "Thiếu thông tin đặt hàng." });
        }
        await cartModel.insertCart(madh, makh, ngaydat, trangthai, tonggia, madvvc);
        res.status(200).send({ message: "Đơn hàng đã được đặt thành công!" });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).send({ message: "Đặt hàng không thành công." });
    }
};

const insertDetailCart = async (req, res) => {
    const orderDetails = req.body;
    console.log("Order details received:", orderDetails);

    try {
  
        if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
            return res.status(400).send({ message: "Chi tiết đơn hàng không hợp lệ." });
        }
        await Promise.all(
            orderDetails.map(detail => {
                const { madh, masp, dongia, soluongsanpham } = detail;
                if (!madh || !masp || !dongia || !soluongsanpham) {
                    throw new Error("Thông tin chi tiết đơn hàng không đầy đủ.");
                }
                return cartModel.insertDetailCart(madh, masp, soluongsanpham, dongia );
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
        // Gọi hàm cập nhật trong productsModel
        const listOrder = await cartModel.getDetailCart(madh);
        console.log(listOrder);
        
        if (!Array.isArray(listOrder) || listOrder.length === 0) {
            return res.status(400).send({ message: "Không hợp lệ." });
        }
        if (trangthai === 'Chờ xác nhận') {
            await cartModel.updateStatus(trangthai, madh);
            return res.status(400).send({ message: "Đơn hàng đang chờ xác nhận" });
        }
        if (trangthai === 'Đã hủy') {
            await cartModel.updateStatus(trangthai, madh);
            return res.status(400).send({ message: "Đơn hàng đã bị hủy." });
        }
        if(trangthai === 'Đang giao hàng') {
            await cartModel.updateStatus(trangthai, madh);
        }
        if(trangthai === 'Đã giao hàng') {
            await cartModel.updateStatus(trangthai, madh);
        }
        if (trangthai === 'Đã xác nhận') {
            await Promise.all(
                listOrder.map(async (order) => { 
                    const productQuatity = await productsModel.detailProduct(order.masp); 
                    if (productQuatity.soluongsp < order.soluongsanpham) {
                        throw new Error("Số lượng sản phẩm không đủ."); 
                    } else {
                        await cartModel.updateQuantity(order.masp, madh); 
                    }
                })
            );
            await cartModel.updateStatus(trangthai, madh);

        }
        
        // Gửi phản hồi về client
        res.json({ success: true, message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
        console.error('Error updating cart:', error);
        
        // Kiểm tra lỗi do số lượng sản phẩm không đủ
        if (error.message === "Số lượng sản phẩm không đủ.") {
            return res.status(400).send({ message: error.message });
        }

        // Gửi phản hồi lỗi về client cho các lỗi khác
        res.status(500).json({ success: false, message: 'Cập nhật trạng thái thất bại' });
    }
};

const detailProductInOrder = async (req, res) => {
    const { madh } = req.params;
    console.log("Order ID received:", madh);
    try {
        const orderProduct = await cartModel.detailProductInOrder(madh);
        res.status(200).send({ detail: orderProduct });
    } catch (error) {
        console.error("Error getting order details:", error);
        res.status(500).send({ message: "Lỗi khi lấy thông tin đơn hàng." });
    }
}


export default { insertCart, insertDetailCart, getCart, updateStatus, detailProductInOrder };