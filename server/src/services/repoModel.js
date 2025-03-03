import connectDB from "../configs/connectDB.js";

const getRepoMonthCurrent = async () => {
    const [rows, fields] = await connectDB.execute(
        `SELECT 
            sp.masp,
            sp.tensp,
            SUM(ctpn.soluong) AS total_quantity,
            MONTH(pn.ngaylap) AS month,
            YEAR(pn.ngaylap) AS year
        FROM 
            chitietphieunhap AS ctpn
        JOIN 
            phieunhap AS pn
            ON ctpn.mapn = pn.mapn
        JOIN 
            sanpham AS sp
            ON ctpn.masp = sp.masp
        WHERE 
            MONTH(pn.ngaylap) = MONTH(CURDATE())
            AND YEAR(pn.ngaylap) = YEAR(CURDATE())
        GROUP BY 
            sp.masp, sp.tensp, month, year
        ORDER BY 
            total_quantity DESC;
        `
    );
    return rows; // Trả về tất cả các dòng
};

const getRepoSumAllMonth = async () => {
    const [rows, fields] = await connectDB.execute(
        `SELECT 
    sp.masp,
    sp.tensp,
    SUM(ctpn.soluong) AS total_quantity,
    MONTH(pn.ngaylap) AS month,
    YEAR(pn.ngaylap) AS year
FROM 
    chitietphieunhap AS ctpn
JOIN 
    phieunhap AS pn
    ON ctpn.mapn = pn.mapn
JOIN 
    sanpham AS sp
    ON ctpn.masp = sp.masp
GROUP BY 
    sp.masp, sp.tensp, month, year
ORDER BY 
    year, month, total_quantity DESC;

        `
    );
    return rows; // Trả về tất cả các dòng
};

export default { getRepoMonthCurrent, getRepoSumAllMonth };