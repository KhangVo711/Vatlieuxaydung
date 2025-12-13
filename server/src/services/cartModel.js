import connectDB from "../configs/connectDB.js";

// CART
const insertCart = async (madh, makh, ngaydat, magiamgia, trangthai, tonggia, madvvc, maform, quangduong, hinhthucthanhtoan, trangthaithanhtoan) => {
    const sql = `
      INSERT INTO donhang 
      (madh, makh, ngaydat, magiamgia, trangthai, tonggia, madvvc, maform, quangduong, hinhthucthanhtoan, trangthaithanhtoan) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await connectDB.execute(sql, [
      madh,
      makh,
      ngaydat,
      magiamgia,
      trangthai,
      tonggia,
      madvvc,
      maform,
      quangduong,
      hinhthucthanhtoan,
      trangthaithanhtoan
    ]);
};
const updateOrderPaymentStatus = async (madh, status) => {
  const sql = `UPDATE donhang SET trangthaithanhtoan = ? WHERE madh = ?`;
  await connectDB.execute(sql, [status, madh]);
};
const getOrderById = async (madh) => {
  const [rows] = await connectDB.execute(`SELECT * FROM donhang WHERE madh = ?`, [madh]);
  return rows[0];
}
const insertDetailCart = async (madh, masp, mabienthe, soluongsanpham, km, dongia) => {
  await connectDB.execute(
    "INSERT INTO `chitietdonhang` (madh, masp, mabienthe, soluongsanpham, km, dongia, thanhtien) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [madh, masp, mabienthe || null, soluongsanpham, km, dongia, soluongsanpham * dongia * (1 - (km || 0) / 100)]
  );
};
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
const updateStatusEnd = async (trangthai, trangthaithanhtoan, madh ) => {
    await connectDB.execute("UPDATE `donhang` SET trangthai = ?, trangthaithanhtoan = ? WHERE madh = ?", [trangthai, trangthaithanhtoan, madh]);
}
// // Update quantity
const updateQuantity = async (masp, mabienthe, madh, isAdd = false) => {
  const query = mabienthe
    ? `
        UPDATE cacbienthe
        INNER JOIN chitietdonhang ON cacbienthe.mabienthe = chitietdonhang.mabienthe
        SET cacbienthe.soluongtonkho = cacbienthe.soluongtonkho ${isAdd ? '+' : '-'} chitietdonhang.soluongsanpham
        WHERE chitietdonhang.masp = ? AND chitietdonhang.mabienthe = ? AND chitietdonhang.madh = ?;
      `
    : `
        UPDATE sanpham
        INNER JOIN chitietdonhang ON sanpham.masp = chitietdonhang.masp
        SET sanpham.soluongsp = sanpham.soluongsp ${isAdd ? '+' : '-'} chitietdonhang.soluongsanpham
        WHERE chitietdonhang.masp = ? AND chitietdonhang.madh = ? AND chitietdonhang.mabienthe IS NULL;
      `;

  try {
    await connectDB.execute(query, mabienthe ? [masp, mabienthe, madh] : [masp, madh]);
    console.log(`Cập nhật số lượng ${isAdd ? 'cộng' : 'trừ'} thành công!`);
  } catch (error) {
    console.error('Lỗi cập nhật số lượng:', error);
    throw error;
  }
};

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
            dh.quangduong,
            dh.trangthai,
            dh.tonggia,
            dh.madvvc,
            dv.tendvvc,
            dv.phivanchuyen,
            ct.masp,
            ct.km,
            sp.tensp,
            sp.maloai,
            sp.ttct,
            sp.masp,
            sp.soluongsp,
            (SELECT hinhanh FROM hinhanhsanpham WHERE masp = sp.masp LIMIT 1) AS hinhanh,
            sp.gia,
            sp.mansx,
            ct.soluongsanpham,
            ct.dongia,
            tt.thuoc_tinh
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
        LEFT JOIN
            cacbienthe cb ON ct.mabienthe = cb.mabienthe
        LEFT JOIN
            thuoctinhbienthe tt ON cb.mabienthe = tt.mabienthe
        JOIN
            donvivanchuyen dv ON dh.madvvc = dv.madvvc
        WHERE
            dh.madh = ?
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
    dh.trangthaithanhtoan,
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
    dh.madh, dh.makh, kh.tenkh, dh.ngaydat, dh.trangthai, dh.trangthaithanhtoan, dh.tonggia, dv.tendvvc;



    `, [makh]);

    return rows;
};


export default { insertCart, updateStatusEnd, insertDetailCart, getCart, updateStatus, getDetailCart, updateQuantity, detailProductInOrder, detailOrderOfUser, insertFormOD, updateOrderPaymentStatus, getOrderById };