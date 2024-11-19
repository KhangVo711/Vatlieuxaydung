import connectDB from "../configs/connectDB.js";

// CART
const insertCart = async (madh, makh, ngaydat, trangthai, tonggia, madvvc) => {
    await connectDB.execute("INSERT INTO `donhang` VALUES (?, ?, ?, ?, ?, ?)", [madh, makh, ngaydat, trangthai, tonggia, madvvc]);
}
const insertDetailCart = async (madh, masp, soluongsanpham, dongia ) => {
    await connectDB.execute("INSERT INTO `chitietdonhang` VALUES (?, ?, ?, ?)", [madh, masp, soluongsanpham, dongia ]);
}

const getCart = async () => {
    const [rows] = await connectDB.execute("SELECT * FROM donhang, donvivanchuyen WHERE donhang.madvvc = donvivanchuyen.madvvc");
    return rows;
}
const getDetailCart = async (madh) => {
    const [rows] = await connectDB.execute("SELECT * FROM chitietdonhang WHERE madh = ?", [madh]);
    return rows;
}
const updateStatus = async (trangthai, madh ) => {
    await connectDB.execute("UPDATE `donhang` SET trangthai = ? WHERE madh = ?", [trangthai, madh]);
}
// // Update quantity
const updateQuantity = async (masp, madh) => {
    const query = `
        UPDATE sanpham
        INNER JOIN chitietdonhang ON sanpham.masp = chitietdonhang.masp
        SET sanpham.soluongsp = sanpham.soluongsp - chitietdonhang.soluongsanpham
        WHERE chitietdonhang.masp = ? AND chitietdonhang.madh = ?;
    `;

    try {
        await connectDB.execute(query, [masp, madh]);
        console.log('Cập nhật số lượng sản phẩm thành công!');
    } catch (error) {
        console.error('Lỗi cập nhật số lượng:', error);
    }
}

const detailProductInOrder = async (madh) => {
    const [rows] = await connectDB.execute(`
        SELECT
            dh.madh,
            dh.makh,
            dh.ngaydat,
            dh.trangthai,
            dh.tonggia,
            dh.madvvc,
            dv.tendvvc,
            dv.phivanchuyen,
            ct.masp,
            sp.tensp,
            sp.maloai,
            sp.ttct,
            sp.soluongsp,
            sp.hinhanh,
            sp.gia,
            sp.mansx,
            ct.soluongsanpham,
            ct.dongia
        FROM
            donhang dh
        JOIN
            chitietdonhang ct ON dh.madh = ct.madh
        JOIN
            sanpham sp ON ct.masp = sp.masp
        JOIN
            donvivanchuyen dv ON dh.madvvc = dv.madvvc
        WHERE
            dh.madh = ?;
    `, [madh]);

    return rows;
};


export default { insertCart, insertDetailCart, getCart, updateStatus, getDetailCart, updateQuantity, detailProductInOrder };