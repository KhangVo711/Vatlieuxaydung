import connectDB from "../configs/connectDB.js";

const getRepo = async (month) => {
  const importMonthCond = month
    ? `WHERE DATE_FORMAT(pn.ngaylap, '%Y-%m') = '${month}'`
    : '';

  const exportMonthCond = month
    ? `WHERE DATE_FORMAT(dh.ngaydat, '%Y-%m') = '${month}'`
    : '';

  const [rows] = await connectDB.execute(`
    SELECT 
      sp.masp,
      sp.tensp,
      sp.cobienthe,

      cb.mabienthe,
      GROUP_CONCAT(
        DISTINCT CONCAT(ttb.loaithuoctinh, ': ', ttb.thuoc_tinh)
        SEPARATOR ', '
      ) AS chitietbienthe,

      COALESCE(imp.total_import, 0) AS total_import,
      COALESCE(exp.total_export, 0) AS total_export,

      COALESCE(imp.import_value, 0) AS import_value,
      COALESCE(exp.revenue_value, 0) AS revenue_value,

      COALESCE(imp.total_import, 0) - COALESCE(exp.total_export, 0) AS current_stock,

      COALESCE(imp.import_value, 0)
        - COALESCE(exp.total_export * imp.avg_import_price, 0)
        AS stock_value,

      COALESCE(exp.revenue_value, 0)
        - COALESCE(exp.total_export * imp.avg_import_price, 0)
        AS profit_value

    FROM sanpham sp

    /* ================= BIẾN THỂ ================= */
    LEFT JOIN cacbienthe cb ON sp.masp = cb.masp
    LEFT JOIN thuoctinhbienthe ttb ON cb.mabienthe = ttb.mabienthe

    /* ================= NHẬP KHO ================= */
    LEFT JOIN (
      SELECT 
        COALESCE(ctpn.mabienthe, ctpn.masp) AS key_id,
        SUM(ctpn.soluongnhap) AS total_import,
        SUM(ctpn.soluongnhap * ctpn.gianhap) AS import_value,
        AVG(ctpn.gianhap) AS avg_import_price
      FROM chitietphieunhap ctpn
      JOIN phieunhap pn ON pn.mapn = ctpn.mapn
      ${importMonthCond}
      GROUP BY COALESCE(ctpn.mabienthe, ctpn.masp)
    ) imp ON imp.key_id = IF(sp.cobienthe = 1, cb.mabienthe, sp.masp)

    /* ================= XUẤT KHO ================= */
    LEFT JOIN (
      SELECT 
        COALESCE(ctdh.mabienthe, ctdh.masp) AS key_id,
        SUM(ctdh.soluongsanpham) AS total_export,
        SUM(ctdh.soluongsanpham * ctdh.dongia) AS revenue_value
      FROM chitietdonhang ctdh
      JOIN donhang dh ON dh.madh = ctdh.madh
      ${exportMonthCond}
      GROUP BY COALESCE(ctdh.mabienthe, ctdh.masp)
    ) exp ON exp.key_id = IF(sp.cobienthe = 1, cb.mabienthe, sp.masp)

    GROUP BY sp.masp, cb.mabienthe
    ORDER BY sp.masp, cb.mabienthe;
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
