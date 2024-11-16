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
const insertInvoice = async (mapn, tenpn, ngaylap, maql) => {
    try {
        await connectDB.execute("INSERT INTO `phieunhap` VALUES (?, ?, ?, ?)", [mapn, tenpn, ngaylap, maql]);
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
    ql.tenql, 
    SUM(ctn.soluong * ctn.dongia) AS tong_gia_theo_mapn
FROM 
    phieunhap pn
JOIN 
    chitietphieunhap ctn 
ON 
    pn.mapn = ctn.mapn
JOIN 
    quanly ql 
ON 
    pn.maql = ql.maql
GROUP BY 
    pn.mapn;
    `;
    const [rows] = await connectDB.execute(query);
    return rows;
};

export default { insertInvoice, showInvoice, insertDetailInvoice, getNameProducer, getInvoice, updateQuantity };