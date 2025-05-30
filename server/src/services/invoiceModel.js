import connectDB from "../configs/connectDB.js";

// Phieu nhap
const getInvoice = async () => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `phieunhap`')
    return rows
}
const getNameProducer = async (masp) => {
    const [rows, fields] = await connectDB.execute('SELECT `tennsx` FROM `nhasanxuat`, `sanpham` WHERE `nhasanxuat`.mansx = `sanpham`.mansx AND `sanpham`.masp = ?', [masp])
    return rows[0]
}
const insertInvoice = async (mapn, tenpn, ngaylap, maql, manv) => {
    try {
        await connectDB.execute("INSERT INTO `phieunhap` VALUES (?, ?, ?, ?, ?)", [mapn, tenpn, ngaylap, maql, manv]);
    } catch (error) {
        console.error("Error inserting invoice:", error);
        throw error;
    }
};
const updateQuantity = async (masp, mapn) => {
    await connectDB.execute(
        `UPDATE sanpham 
         SET soluongsp = soluongsp + (
             SELECT soluong 
             FROM chitietphieunhap 
             WHERE sanpham.masp = chitietphieunhap.masp 
             AND chitietphieunhap.mapn = ?
         )
         WHERE masp = ?;`,
        [mapn, masp]
    );
};
const insertDetailInvoice = async (soluong, dongia, masp, mapn, tennsx) => {
    await connectDB.execute("INSERT INTO `chitietphieunhap` VALUES (?, ?, ?, ?, ?)", [soluong, dongia, masp, mapn, tennsx]);
}

const showInvoice = async () => {
    const query = `
        SELECT 
            pn.mapn, 
            pn.ngaylap, 
            pn.tenpn, 
            COALESCE(ql.tenql, nv.tennv) AS nguoi_phu_trach,
            SUM(ctn.soluong * ctn.dongia) AS tong_gia_theo_mapn
        FROM 
            phieunhap pn
        JOIN 
            chitietphieunhap ctn 
        ON 
            pn.mapn = ctn.mapn
        LEFT JOIN 
            quanly ql 
        ON 
            pn.maql = ql.maql
        LEFT JOIN 
            nhanvien nv 
        ON 
            pn.manv = nv.manv
        GROUP BY 
            pn.mapn;
    `;
    const [rows] = await connectDB.execute(query);
    return rows;
};

const showDetailInvoice = async (mapn) => {
    const query = `
        SELECT
            pn.mapn,
            pn.tenpn,
            pn.ngaylap,
            sp.tensp AS ten_san_pham,
            COALESCE(ql.tenql, nv.tennv) AS nguoi_phu_trach,
            ct.soluong,
            ct.dongia,
            ct.tennsx,
            (ct.soluong * ct.dongia) AS thanh_tien,
            total.tong_gia
        FROM
            chitietphieunhap ct
        JOIN
            phieunhap pn ON ct.mapn = pn.mapn
        JOIN
            sanpham sp ON ct.masp = sp.masp
        LEFT JOIN
            quanly ql ON pn.maql = ql.maql
        LEFT JOIN
            nhanvien nv ON pn.manv = nv.manv
        JOIN
            (
                SELECT
                    mapn,
                    SUM(soluong * dongia) AS tong_gia
                FROM
                    chitietphieunhap
                GROUP BY
                    mapn
            ) AS total ON pn.mapn = total.mapn
        WHERE
            ct.mapn = ?
        GROUP BY
            pn.mapn, sp.tensp, nguoi_phu_trach, ct.soluong, ct.dongia, total.tong_gia;
    `;
    const [rows] = await connectDB.execute(query, [mapn]);
    return rows;
};


export default { insertInvoice, showInvoice, insertDetailInvoice, getNameProducer, getInvoice, updateQuantity, showDetailInvoice };

