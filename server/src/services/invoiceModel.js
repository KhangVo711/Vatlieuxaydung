import connectDB from "../configs/connectDB.js";

// Phieu nhap
const getInvoice = async () => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `phieunhap`')
    return rows
}
const insertInvoice = async (mapn, tenpn, ngaylap, maql, manv) => {
  try {
    await connectDB.execute('INSERT INTO phieunhap (mapn, tenpn, ngaylap, maql, manv, tonggia) VALUES (?, ?, ?, ?, ?, ?)', [
      mapn, tenpn, ngaylap, maql, manv, 0
    ]);
  } catch (error) {
    console.error('Error inserting invoice:', error);
    throw error;
  }
};

const insertDetailInvoice = async (mapn, masp, mabienthe, soluongnhap, gianhap, tennsx) => {
  try {
    await connectDB.execute(
      'INSERT INTO chitietphieunhap (mapn, masp, mabienthe, soluongnhap, gianhap, tennsx) VALUES (?, ?, ?, ?, ?, ?)',
      [mapn, masp, mabienthe || null, soluongnhap, gianhap, tennsx]
    );
  } catch (error) {
    console.error('Error inserting invoice detail:', error);
    throw error;
  }
};

const updateQuantity = async (masp, soluong) => {
  try {
    await connectDB.execute('UPDATE sanpham SET soluongsp = soluongsp + ? WHERE masp = ?', [Number(soluong), masp]);
  } catch (error) {
    console.error('Error updating product quantity:', error);
    throw error;
  }
};

const updateVariantQuantity = async (mabienthe, soluong) => {
  try {
    await connectDB.execute('UPDATE cacbienthe SET soluongtonkho = soluongtonkho + ? WHERE mabienthe = ?', [
      Number(soluong),
      mabienthe,
    ]);
  } catch (error) {
    console.error('Error updating variant quantity:', error);
    throw error;
  }
};

const getNameProducer = async (masp) => {
  try {
    const [rows] = await connectDB.execute(
      'SELECT nsx.tennsx FROM nhasanxuat nsx JOIN sanpham sp ON nsx.mansx = sp.mansx WHERE sp.masp = ?',
      [masp]
    );
    return rows[0];
  } catch (error) {
    console.error('Error fetching producer:', error);
    throw error;
  }
};

const showInvoice = async () => {
    const query = `
        SELECT 
            pn.mapn, 
            pn.ngaylap, 
            pn.tenpn, 
            COALESCE(ql.tenql, nv.tennv) AS nguoi_phu_trach,
            pn.tonggia
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
      ct.soluongnhap,
      ct.gianhap,
      ct.tennsx,
      ct.mabienthe,
      tb.thuoc_tinh AS tenbienthe,
      (ct.soluongnhap * ct.gianhap) AS thanh_tien,
      (SELECT SUM(soluongnhap * gianhap) FROM chitietphieunhap WHERE mapn = pn.mapn) AS tong_gia
    FROM
      chitietphieunhap ct
    JOIN
      phieunhap pn ON ct.mapn = pn.mapn
    JOIN
      sanpham sp ON ct.masp = sp.masp
    LEFT JOIN
      cacbienthe cb ON ct.mabienthe = cb.mabienthe
    LEFT JOIN
      thuoctinhbienthe tb ON cb.mabienthe = tb.mabienthe
    LEFT JOIN
      quanly ql ON pn.maql = ql.maql
    LEFT JOIN
      nhanvien nv ON pn.manv = nv.manv
    WHERE
      ct.mapn = ?
  
  `;
  const [rows] = await connectDB.execute(query, [mapn]);
  return rows;
};


export default { insertInvoice, showInvoice, insertDetailInvoice, getNameProducer, updateVariantQuantity, getInvoice, updateQuantity, showDetailInvoice };

