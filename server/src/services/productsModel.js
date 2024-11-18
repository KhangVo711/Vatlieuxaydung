import connectDB from "../configs/connectDB.js";
// Loai
const getCategory = async () => {
    const [rows, fields] = await connectDB.execute('SELECT `maloai`, `tenloai` FROM `loaisanpham`')
    return rows
}
const insertCategory = async (maloai, tenloai) => {
    await connectDB.execute("INSERT INTO `loaisanpham` VALUES (?, ?)", [maloai, tenloai]);
}
const detailCategory= async (maloai) => {
        const [rows, fields] = await connectDB.execute('SELECT * FROM `loaisanpham` WHERE maloai=?', [maloai])
        return rows[0]
}
const editCategory = async (tenloai, maloai) => {
    await connectDB.execute('UPDATE `loaisanpham` SET tenloai=? WHERE maloai =?',[tenloai, maloai])
}
const deleteCategory = async(maloai) => {
    await connectDB.execute("DELETE FROM `loaisanpham` WHERE maloai=?", [maloai])
}
// Loai

// NSX
const getAllNSX = async () => {
    const [rows, fields] = await connectDB.execute('SELECT `mansx`, `tennsx`, `email`, `diachi` FROM `nhasanxuat`')
    return rows
}
const insertNSX = async (mansx, tennsx, email, diachi) => {
    await connectDB.execute("INSERT INTO `nhasanxuat` VALUES (?, ?, ?, ?)", [mansx, tennsx, email, diachi]);
}
const detailNSX= async (mansx) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `nhasanxuat` WHERE mansx=?', [mansx])
    return rows[0]
}
const editNSX = async (mansx, tennsx, email, diachi) => {
    await connectDB.execute('UPDATE `nhasanxuat` SET tennsx=?, email=?, diachi=? WHERE mansx =?',[tennsx, email, diachi, mansx])
}
const deleteNSX = async(mansx) => {
    await connectDB.execute("DELETE FROM `nhasanxuat` WHERE mansx=?", [mansx])
}
// NSX

// SP
const getAllProduct = async () => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `sanpham`, `loaisanpham`, `nhasanxuat` WHERE `sanpham`.maloai = `loaisanpham`.maloai AND `sanpham`.mansx = `nhasanxuat`.mansx')
    return rows
}

const getProduct8 = async () => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `sanpham` ORDER BY `create_at` DESC LIMIT 8')
    return rows
}

const getProduct12 = async () => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `sanpham` ORDER BY `create_at` DESC LIMIT 12')
    return rows
}

const insertProducts = async (masp, tensp, maloai, ttct, soluongsp, hinhanh, gia, mansx) => {
    await connectDB.execute("INSERT INTO `sanpham` VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [masp, tensp, maloai, ttct, soluongsp, hinhanh, gia, mansx]);
}
const detailProduct= async (masp) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `sanpham` WHERE masp=?', [masp])
    return rows[0]
}
const editProduct = async (masp, tensp, ttct, soluongsp, gia, maloai, mansx, hinhanh) => {

    let query = 'UPDATE `sanpham` SET tensp=?, ttct=?, soluongsp=?, gia=?, maloai=?, mansx=?';
    let params = [tensp, ttct, soluongsp, gia, maloai, mansx];

    if (hinhanh) {
        query += ', hinhanh=?';
        params.push(hinhanh);
    }

    query += ' WHERE masp=?';
    params.push(masp);

    try {
        await connectDB.execute(query, params);
        console.log('Sản phẩm đã được cập nhật thành công.');
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error.message);
        throw error;
    }
};

const deleteProduct = async(masp) => {
    await connectDB.execute("DELETE FROM `sanpham` WHERE masp=?", [masp])
}
// SP

// Detail Cart
const getAllCart = async () => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `donhang`')
    return rows
}
const getAllDetailCart = async (madh) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `donhang` JOIN `chitietdathang` ON `donhang`.madh = `chitietdathang`.madh JOIN `sanpham` ON `chitietdathang`.masp = `sanpham`.masp JOIN `admin` ON `donhang`.username = `admin`.username JOIN `hoso` ON `admin`.username = `hoso`.username WHERE `donhang`.madh = ?', [madh])
    return rows
}
// Detail Cart

// CART
const insertCart = async (madh, username, ngaydat, trangthai, tonggia, diachinhanhang) => {
    await connectDB.execute("INSERT INTO `donhang` VALUES (?, ?, ?, ?, ?, ?)", [madh, username, ngaydat, trangthai, tonggia, diachinhanhang]);
}
const insertDetailCart = async (madh, masp, gia, soluong) => {
    await connectDB.execute("INSERT INTO `chitietdathang` VALUES (?, ?, ?, ?)", [madh, masp, gia, soluong]);
}
const updateCart = async (trangthai, madh) => {
    await connectDB.execute('UPDATE `donhang` SET trangthai=? WHERE madh =?',[trangthai, madh])
}
const getCartAPI = async (username) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `donhang` WHERE username = ?', [username])
    return rows
}
const getAllAPICart = async (madh) => {
    const [rows, fields] = await connectDB.execute(
        `
        SELECT * 
        FROM donhang 
        JOIN chitietdathang ON donhang.madh = chitietdathang.madh
        JOIN sanpham ON chitietdathang.masp = sanpham.masp
        WHERE donhang.madh = ?
        `,
        [madh]
    );
    return rows;
}
// Update quantity
const updateQuantity = async (masp) => {
    await connectDB.execute('UPDATE sanpham,chitietdathang SET soluongsp=soluongsp-soluong WHERE sanpham.masp=chitietdathang.masp AND chitietdathang.masp=?', [masp])
}

export default {getCategory, getProduct8, getProduct12, updateQuantity, getCartAPI, getAllDetailCart, updateCart, getAllCart, getAllAPICart, insertCategory, insertCart, insertDetailCart, editCategory,detailCategory, deleteCategory, insertNSX, editNSX, getAllNSX, detailNSX, deleteNSX, insertProducts, getAllProduct, editProduct, detailProduct, deleteProduct}

