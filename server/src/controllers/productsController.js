import express from "express";
import productsModel from "../services/productsModel.js"

// Loai
const getCategory = async (req, res) => {
    try {
        const category = await productsModel.getCategory()
        res.status(200).send({ category: category });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách loại sản phẩm." });
    }
}
const insertCategory = async (req, res) => {
    try {
        let { maloai, tenloai } = req.body
        console.log(req.body);
        if (!maloai || !tenloai) {
            return res.status(400).send({ message: "Thiếu thông tin loại sản phẩm." });
        }
        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(maloai)) {
            return res.status(400).json({ message: 'Mã loại không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(tenloai)) {
            return res.status(400).json({ message: 'Tên loại không được chứa khoảng trắng ở đầu' });
        }
        const nameCategory = /^[\p{L}\p{N}\s]+$/u;
        if (!nameCategory.test(tenloai)) {
            return res.status(400).json({ message: 'Tên loại không được chứa ký tự đặc biệt.' });
        }

        await productsModel.insertCategory(maloai, tenloai)
        res.status(200).send({ message: "Thêm loại sản phẩm thành công!" });
    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi thêm loại sản phẩm." });
    }

}
const detailCategory = async (req, res) => {
    let { maloai } = req.body
    try {
        await productsModel.detailCategory(maloai)
        res.status(200).send({ message: "Lấy chi tiết loại sản phẩm thành công!" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết loại sản phẩm." });
    }

}
const getOneCategory = async (req, res) => {
    let { maloai } = req.params
    try {
        const listCategory = await productsModel.detailCategory(maloai)
        res.status(200).send({ message: "Lấy chi tiết loại sản phẩm thành công!", listCategory:listCategory });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết loại sản phẩm." });
    }

}
const editCategory = async (req, res) => {
    let { maloai, tenloai } = req.body
    try {
        if (!maloai || !tenloai) {
            return res.status(400).send({ message: "Không được để trống" });
        }
        const detailCategory = await productsModel.detailCategory(maloai);
        if (tenloai === detailCategory.tenloai) {
            return;
        }
        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(tenloai)) {
            return res.status(400).json({ message: 'Tên loại không được chứa khoảng trắng ở đầu' });
        }
        const nameCategory = /^[\p{L}\p{N}\s]+$/u;
        if (!nameCategory.test(tenloai)) {
            return res.status(400).json({ message: 'Tên loại không được chứa ký tự đặc biệt.' });
        }
        await productsModel.editCategory(tenloai, maloai)
        res.status(200).send({ message: "Sửa loại sản phẩm thành công!" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi sửa loại sản phẩm." });
    }
}

const deleteCategory = async (req, res) => {
    let { maloai } = req.body
    await productsModel.deleteCategory(maloai)
    res.status(200).send({ message: "Xóa loại sản phẩm thành công!" });
}
// Loai

// NSX
const getAllNSX = async (req, res) => {
    try {
        const listNSX = await productsModel.getAllNSX()
        res.status(200).send({ listNSX: listNSX });

    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách nhà sản xuất" });
    }
}
const insertNSX = async (req, res) => {
    let { mansx, tennsx, email, diachi } = req.body
    try {
        if (!mansx || !tennsx || !email || !diachi) {
            return res.status(400).send({ message: "Thiếu thông tin nhà sản xuất" });
        }
        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(mansx)) {
            return res.status(400).json({ message: 'Mã nhà sản xuất không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(tennsx)) {
            return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(email)) {
            return res.status(400).json({ message: 'Eamil không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(diachi)) {
            return res.status(400).json({ message: 'Địa chỉ không được chứa khoảng trắng ở đầu' });
        }
        const nameProducer = /^[\p{L}\p{N}\s]+$/u;
        if (!nameProducer.test(tennsx)) {
            return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa ký tự đặc biệt.' });
        }
        if (!nameProducer.test(diachi)) {
            return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa ký tự đặc biệt.' });
        }
        const emailProducer = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailProducer.test(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ.' });
        }

        await productsModel.insertNSX(mansx, tennsx, email, diachi)
        res.status(200).send({ message: "Thêm nhà sản xuất thành công" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi thêm nhà sản xuất" });
    }
}
const detailNSX = async (req, res) => {
    let { mansx } = req.body
    try {
        await productsModel.detailCategory(mansx)
        res.status(200).send({ message: "Lấy chi tiết nhà sản xuất thành công!" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết nhà sản xuất." });
    }
}
const getNSX = async (req, res) => {
    let { mansx } = req.params
    try {
        const listNSX = await productsModel.detailNSX(mansx)
        res.status(200).send({ message: "Lấy chi tiết nhà sản xuất thành công!", listNSX: listNSX });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết nhà sản xuất." });
    }
}

const editNSX = async (req, res) => {
    let { mansx, tennsx, email, diachi } = req.body
    try {
        if (!mansx || !tennsx || !email || !diachi) {
            return res.status(400).send({ message: "Thiếu thông tin nhà sản xuất" });
        }
        const detailNSX = await productsModel.detailNSX(mansx);
        if (tennsx === detailNSX.tennsx && email === detailNSX.email && diachi === detailNSX.diachi) {
            return
        }
        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(tennsx)) {
            return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(email)) {
            return res.status(400).json({ message: 'Eamil không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(diachi)) {
            return res.status(400).json({ message: 'Địa chỉ không được chứa khoảng trắng ở đầu' });
        }
        const nameProducer = /^[\p{L}\p{N}\s]+$/u;
        if (!nameProducer.test(tennsx)) {
            return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa ký tự đặc biệt.' });
        }
        if (!nameProducer.test(diachi)) {
            return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa ký tự đặc biệt.' });
        }
        const emailProducer = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailProducer.test(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ.' });
        }

        let dataNSX = await productsModel.editNSX(mansx, tennsx, email, diachi)
        res.status(200).send({ message: "Sửa thành công", dataNSX: dataNSX });
    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi sửa nhà sản xuất" });
    }

}

const deleteNSX = async (req, res) => {
    let { mansx } = req.body
    await productsModel.deleteNSX(mansx)
    res.status(200).send({ message: "Xóa nhà sản xuất thành công!" });
}
// NSX

// SanPham
const getAllProduct = async (req, res) => {
    try {
        const product = await productsModel.getAllProduct()
        res.status(200).send({ product: product });

    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách nhà sản xuất" });
    }
}

const getProduct8 = async (req, res) => {
    try {
        const product = await productsModel.getProduct8()
        res.status(200).send({ product: product });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
    }
}

const getProduct12 = async (req, res) => {
    try {
        const product = await productsModel.getProduct12()
        res.status(200).send({ product: product });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
    }
}

const insertProducts = async (req, res) => {
    let { masp, tensp, maloai, ttct, soluongsp, gia, mansx } = req.body;
    let hinhanh = req.file.filename;
    console.log(req.body);
    console.log(req.file);
    try {
        if (maloai === 'Loại sản phẩm') {
            return res.status(400).send({ message: "Chưa chọn loại sản phẩm" });
        }
        if (mansx === 'Nhà sản xuất') {
            return res.status(400).send({ message: "Chưa chọn nhà sản xuất" });
        }
        if (!masp || !tensp || !maloai || !ttct || !soluongsp || !gia || !mansx) {
            return res.status(400).send({ message: "Thiếu thông tin sản phẩm" });
        }
        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(masp)) {
            return res.status(400).json({ message: 'Mã sản phẩm không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(tensp)) {
            return res.status(400).json({ message: 'Tên sản phẩm không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(gia)) {
            return res.status(400).json({ message: 'Giá không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(ttct)) {
            return res.status(400).json({ message: 'Thông tin chi tiết không được chứa khoảng trắng ở đầu' });
        }
        const nameProduct = /^[\p{L}\p{N}\s]+$/u;
        if (!nameProduct.test(tensp)) {
            return res.status(400).json({ message: 'Tên sản phẩm không được chứa ký tự đặc biệt.' });
        }
        const checkNumber = /^[0-9]*$/;
        if (!checkNumber.test(soluongsp)) {
            return res.status(400).json({ message: 'Số lượng sản phẩm không hợp lệ' });
        }
        if (!checkNumber.test(gia)) {
            return res.status(400).json({ message: 'Giá sản phẩm không hợp lệ' });
        }
        if(gia <= 0){
            return res.status(400).json({ message: 'Giá sản phẩm phải lớn hơn 0' });
        }
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const fileExtension = hinhanh.substring(hinhanh.lastIndexOf('.')).toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
            return res.status(400).send({ message: "Vui lòng upload hình ảnh" });
        }
        await productsModel.insertProducts(masp, tensp, maloai, ttct, soluongsp, hinhanh, gia, mansx)
        res.status(200).send({ message: "Thêm sản phẩm thành công!" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi thêm sản phẩm" });
    }

}
const detailProduct = async (req, res) => {
    let {masp} = req.body
    let dataProduct = await productsModel.detailProduct(masp)
    res.status(200).send({ message: "Lấy chi tiết sản phẩm thành công!", dataProduct: dataProduct });
}

const editProduct = async (req, res) => {
    let { masp, tensp, maloai, ttct, soluongsp, gia, mansx } = req.body;
    let hinhanh = req.file ? req.file.filename : null;

    console.log(req.body);
    console.log(req.file);   
    console.log(masp, tensp, maloai, ttct, soluongsp, hinhanh, gia, mansx)
    try {
        if (!masp || !tensp || !ttct || !soluongsp || !gia || !maloai || !mansx) {
            return res.status(400).send({ message: "Thiếu thông tin sản phẩm" });
        }
        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(tensp)) {
            return res.status(400).json({ message: 'Tên sản phẩm không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(ttct)) {
            return res.status(400).json({ message: 'Thông tin chi tiết không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(soluongsp)) {
            return res.status(400).json({ message: 'Số lượng sản phẩm không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(gia)) {
            return res.status(400).json({ message: 'Giá sản phẩm không được chứa khoảng trắng ở đầu' });
        }
        const nameProduct = /^[\p{L}\p{N}\s]+$/u;
        if (!nameProduct.test(tensp)) {
            return res.status(400).json({ message: 'Tên sản phẩm không được chứa ký tự đặc biệt.' });
        }
        const checkNumber = /^[0-9]*$/;
        if (!checkNumber.test(soluongsp)) {
            return res.status(400).json({ message: 'Số lượng sản phẩm không hợp lệ' });
        }
        if (!checkNumber.test(gia)) {
            return res.status(400).json({ message: 'Giá sản phẩm không hợp lệ' });
        }
        if(gia <= 0){
            return res.status(400).json({ message: 'Giá sản phẩm phải lớn hơn 0' });
        }
        await productsModel.editProduct(masp, tensp, ttct, soluongsp, gia, maloai, mansx, hinhanh);
        res.status(200).send({ message: "Sửa sản phẩm thành công!" });

    }

    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi sửa sản phẩm" });
    }
}
const deleteProduct = async (req, res) => {
    let {masp} = req.body
    await productsModel.deleteProduct(masp)
    res.status(200).send({ message: "Xóa nhà sản xuất thành công!" });
}

// CartAdmin
const getAllCart = async (req, res) => {
    let listCart = await productsModel.getAllCart();
    res.render('home', { data: { title: 'cart', page: 'cart', listCarts: listCart } });
}
const getAllDetailCart = async (req, res) => {
    let id = req.params.id
    let detailCart = await productsModel.getAllDetailCart(id)
    console.log(detailCart)
    res.render('home', { data: { title: 'Detail Cart', page: 'detailCart', detailCarts: detailCart } })
}
const updateCart = async (req, res) => {
    const { trangthai, madh } = req.body;

    try {
        // Gọi hàm cập nhật trong productsModel
        const listOrder = await productsModel.getAllDetailCart(madh);
        console.log(listOrder);

        if (!Array.isArray(listOrder) || listOrder.length === 0) {
            return res.status(400).send({ message: "Không hợp lệ." });
        }
        if (trangthai === 'Đã hủy') {
            await productsModel.updateCart(trangthai, madh);
            return res.status(400).send({ message: "Đơn hàng đã bị hủy." });
        }
        if (trangthai === 'Đang giao') {
            await productsModel.updateCart(trangthai, madh);
        }
        if (trangthai === 'Đã giao') {
            await productsModel.updateCart(trangthai, madh);
        }
        if (trangthai === 'Đã xác nhận') {
            await Promise.all(
                listOrder.map(async (order) => {
                    const productQuatity = await productsModel.detailProduct(order.masp);
                    if (productQuatity.soluongsp < order.soluong) {
                        throw new Error("Số lượng sản phẩm không đủ.");
                    } else {
                        await productsModel.updateQuantity(order.masp, madh);
                    }
                })
            );
            await productsModel.updateCart(trangthai, madh);

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

const getAllAPICart = async (req, res) => {
    const madh = req.params.madh;
    let listOrder = await productsModel.getAllDetailCart(madh);
    return res.status(200).json({ order: listOrder });
}
const getCartAPI = async (req, res) => {
    const username = req.params.username;
    let listCart = await productsModel.getCartAPI(username);
    return res.status(200).json({ cartAPI: listCart });
}

// cart
const insertCart = async (req, res) => {
    try {
        const { madh, username, ngaydat, trangthai, tonggia, diachinhanhang } = req.body;

        if (!madh || !username || !ngaydat || !trangthai || !tonggia || !diachinhanhang) {
            return res.status(400).send({ message: "Thiếu thông tin đặt hàng." });
        }
        await productsModel.insertCart(madh, username, ngaydat, trangthai, tonggia, diachinhanhang);
        res.status(200).send({ message: "Đơn hàng đã được lưu thành công!" });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).send({ message: "Đã xảy ra lỗi khi lưu đơn hàng." });
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
                const { madh, masp, gia, soluong } = detail;
                if (!madh || !masp || !gia || !soluong) {
                    throw new Error("Thông tin chi tiết đơn hàng không đầy đủ.");
                }
                return productsModel.insertDetailCart(madh, masp, gia, soluong);
            })
        );

        res.status(200).send({ message: "Chi tiết đơn hàng đã được lưu thành công!" });
    } catch (error) {
        console.error("Error saving order details:", error);
        res.status(500).send({ message: "Đã xảy ra lỗi khi lưu chi tiết đơn hàng." });
    }
};

export default {
    getCategory, getCartAPI, updateCart,
    getAllAPICart, getAllCart, insertCart,
    insertDetailCart, getAllDetailCart,
    insertCategory,
    getProduct8, getProduct12,
    editCategory,
    getOneCategory,
    getNSX,
    deleteCategory, detailCategory,
    insertNSX, editNSX, getAllNSX,
    detailNSX, deleteNSX, insertProducts,
    getAllProduct, editProduct,
    detailProduct, deleteProduct
}