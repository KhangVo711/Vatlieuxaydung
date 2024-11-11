import connectDB from "../configs/connectDB.js";
// Loai
const getAllProductType = async () => {
    const [rows, fields] = await connectDB.execute('SELECT `maloai`, `tenloai` FROM `loaisanpham`')
    return rows
}
const insertTProducts = async (maloaisp, tenloaisp) => {
    await connectDB.execute("INSERT INTO `loaisanpham` VALUES (?, ?)", [maloaisp, tenloaisp]);
}
const detailProductType= async (id) => {
        const [rows, fields] = await connectDB.execute('SELECT * FROM `loaisanpham` WHERE maloai=?', [id])
        return rows[0]
}
const editProductType = async (tenloaisp, maloaisp) => {
    await connectDB.execute('UPDATE `loaisanpham` SET tenloai=? WHERE maloai =?',[tenloaisp, maloaisp])
}
const deleteType = async(maloaisp) => {
    await connectDB.execute("DELETE FROM `loaisanpham` WHERE maloai=?", [maloaisp])
}
// Loai

// NSX
const getAllNSX = async () => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `nhasanxuat`')
    return rows
}
const insertNSX = async (mansx, tennsx, loaisp, emailnsx, diachinsx) => {
    await connectDB.execute("INSERT INTO `nhasanxuat` VALUES (?, ?, ?, ?, ?)", [mansx, tennsx, loaisp, emailnsx, diachinsx]);
}
const detailNSX= async (id) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `nhasanxuat` WHERE mansx=?', [id])
    return rows[0]
}
const editNSX = async (mansx, tennsx, loaisp, emailnsx, diachinsx) => {
    await connectDB.execute('UPDATE `nhasanxuat` SET tennsx=?, loaisp =?, emailnsx=?, diachinsx=? WHERE mansx =?',[tennsx, loaisp, emailnsx, diachinsx, mansx])
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

const insertProducts = async (masp, tensp, thongtinchitiet, soluongsp, gia, hinhanh, maloai, mansx) => {
    await connectDB.execute("INSERT INTO `sanpham` VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [masp, tensp, thongtinchitiet, soluongsp, gia, hinhanh, maloai, mansx]);
}
const detailProduct= async (id) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `sanpham` WHERE masp=?', [id])
    return rows[0]
}
const editProduct = async (id, tensp, thongtinchitiet, soluongsp, hinhanh, maloai, mansx) => {
    let query = 'UPDATE `sanpham` SET tensp=?, thongtinchitiet=?, soluongsp=?, maloai=?, mansx=?';
    let params = [tensp, thongtinchitiet, soluongsp, maloai, mansx];
    if (hinhanh) {
        query += ', hinhanh=?';
        params.push(hinhanh);
    }

    query += ' WHERE masp=?';
    params.push(id);

    await connectDB.execute(query, params);
}
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

export default {getAllProductType, updateQuantity, getCartAPI, getAllDetailCart, updateCart, getAllCart, getAllAPICart, insertTProducts, insertCart, insertDetailCart, editProductType, detailProductType, deleteType, insertNSX, editNSX, getAllNSX, detailNSX, deleteNSX, insertProducts, getAllProduct, editProduct, detailProduct, deleteProduct}

