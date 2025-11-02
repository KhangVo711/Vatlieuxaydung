import connectDB from "../configs/connectDB.js";

const getRepo = async (month) => {
  const monthCondition = month
    ? `WHERE (DATE_FORMAT(pn.ngaylap, '%Y-%m') = '${month}' OR DATE_FORMAT(dh.ngaydat, '%Y-%m') = '${month}')`
    : "";

  const [rows] = await connectDB.execute(`
    SELECT 
        sp.masp,
        sp.tensp,
        sp.cobienthe,
        cb.mabienthe,
        GROUP_CONCAT(ttb.loaithuoctinh, ': ', ttb.thuoc_tinh SEPARATOR ', ') AS chitietbienthe,

        COALESCE(SUM(ctpn.soluongnhap), 0) AS total_import,
        COALESCE(SUM(ctdh.soluongsanpham), 0) AS total_export,

        COALESCE(SUM(ctpn.soluongnhap * ctpn.gianhap), 0) AS import_value,
        COALESCE(SUM(ctdh.soluongsanpham * ctdh.dongia), 0) AS revenue_value,

        COALESCE(SUM(ctpn.soluongnhap), 0) - COALESCE(SUM(ctdh.soluongsanpham), 0) AS current_stock,

        (COALESCE(SUM(ctpn.soluongnhap * ctpn.gianhap), 0) 
          - COALESCE(SUM(ctdh.soluongsanpham * ctpn.gianhap), 0)) AS stock_value,

        (COALESCE(SUM(ctdh.soluongsanpham * ctdh.dongia), 0)
          - COALESCE(SUM(ctdh.soluongsanpham * ctpn.gianhap), 0)) AS profit_value

    FROM sanpham sp
    LEFT JOIN cacbienthe cb ON sp.masp = cb.masp
    LEFT JOIN thuoctinhbienthe ttb ON cb.mabienthe = ttb.mabienthe
    LEFT JOIN chitietphieunhap ctpn 
      ON (sp.cobienthe = 0 AND ctpn.masp = sp.masp)
      OR (sp.cobienthe = 1 AND ctpn.mabienthe = cb.mabienthe)
    LEFT JOIN phieunhap pn ON pn.mapn = ctpn.mapn
    LEFT JOIN chitietdonhang ctdh 
      ON (sp.cobienthe = 0 AND ctdh.masp = sp.masp)
      OR (sp.cobienthe = 1 AND ctdh.mabienthe = cb.mabienthe)
    LEFT JOIN donhang dh ON dh.madh = ctdh.madh
    ${monthCondition}
    GROUP BY sp.masp, sp.tensp, cb.mabienthe, sp.cobienthe
    ORDER BY sp.masp;
  `);

  return rows;
};


const getAvailableMonths = async () => {
  const [rows] = await connectDB.execute(`
    SELECT DISTINCT DATE_FORMAT(ngay, '%Y-%m') AS month
    FROM (
      SELECT ngaylap AS ngay FROM phieunhap
      UNION ALL
      SELECT ngaydat AS ngay FROM donhang
    ) AS combined
    ORDER BY month DESC;
  `);

  return rows.map((r) => r.month);
};

export default { getRepo, getAvailableMonths };
