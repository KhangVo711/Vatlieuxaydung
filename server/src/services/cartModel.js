import connectDB from "../configs/connectDB.js";

// CART
const insertCart = async (madh, makh, ngaydat, trangthai, tonggia, madvvc, maform) => {
    await connectDB.execute("INSERT INTO `donhang` VALUES (?, ?, ?, ?, ?, ?, ?)", [madh, makh, ngaydat, trangthai, tonggia, madvvc, maform]);
}
const insertDetailCart = async (madh, masp, soluongsanpham, dongia ) => {
    await connectDB.execute("INSERT INTO `chitietdonhang` VALUES (?, ?, ?, ?)", [madh, masp, soluongsanpham, dongia ]);
}
const insertFormOD = async (maform, tenkh, sdt, diachi, email) => {
    await connectDB.execute("INSERT INTO `formdathang` VALUES (?, ?, ?, ?, ?)", [maform, tenkh, sdt, diachi, email]);
}
const getCart = async () => {
    const [rows] = await connectDB.execute("SELECT * FROM donhang, donvivanchuyen WHERE donhang.madvvc = donvivanchuyen.madvvc ORDER BY ngaydat DESC");
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
            CASE
                WHEN dh.makh IS NOT NULL THEN dh.makh
                ELSE dh.maform
            END AS makh_or_form,
            CASE
                WHEN dh.makh IS NOT NULL THEN kh.tenkh
                ELSE fd.tenkh
            END AS tenkh_or_form,
            CASE
                WHEN dh.makh IS NOT NULL THEN kh.diachi
                ELSE fd.diachi
            END AS diachi_or_form,
            CASE
                WHEN dh.makh IS NOT NULL THEN kh.sdt
                ELSE fd.sdt
            END AS sdt_or_form,
            fd.email AS email_or_form,
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
        LEFT JOIN
            khachhang kh ON dh.makh = kh.makh
        LEFT JOIN
            formdathang fd ON dh.maform = fd.maform
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


const detailOrderOfUser = async (makh) => {
    const [rows] = await connectDB.execute(`
    SELECT 
    dh.madh,
    dh.makh,
    kh.tenkh,
    dh.ngaydat,
    dh.trangthai,
    dh.tonggia,
    dv.tendvvc,
    GROUP_CONCAT(
        CONCAT(
            sp.tensp, 
            ' - ', ct.soluongsanpham, 
            ' - ', ct.dongia, 'đ'
        ) SEPARATOR '; '
    ) AS sanpham_chitiet
FROM
    donhang dh
JOIN
    chitietdonhang ct ON dh.madh = ct.madh
JOIN
    khachhang kh ON dh.makh = kh.makh
JOIN
    donvivanchuyen dv ON dh.madvvc = dv.madvvc
JOIN
    sanpham sp ON ct.masp = sp.masp
WHERE
    kh.makh = ?
GROUP BY
    dh.madh, dh.makh, kh.tenkh, dh.ngaydat, dh.trangthai, dh.tonggia, dv.tendvvc;



    `, [makh]);

    return rows;
};


export default { insertCart, insertDetailCart, getCart, updateStatus, getDetailCart, updateQuantity, detailProductInOrder, detailOrderOfUser, insertFormOD };