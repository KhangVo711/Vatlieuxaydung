import connectDB from "../configs/connectDB.js";

const getRepo = async (month) => {
  const importCond = month
    ? `AND DATE_FORMAT(pn.ngaylap, '%Y-%m') = '${month}'`
    : '';

  const exportCond = month
    ? `AND DATE_FORMAT(dh.ngaydat, '%Y-%m') = '${month}'`
    : '';

  const [rows] = await connectDB.execute(`
    SELECT
      sp.masp,
      sp.tensp,
      sp.cobienthe,

      bt.mabienthe,
      bt.chitietbienthe,

      COALESCE(imp.total_import, 0) AS total_import,
      COALESCE(exp.total_export, 0) AS total_export,

      COALESCE(imp.import_value, 0) AS import_value,
      COALESCE(exp.revenue_value, 0) AS revenue_value,

      /* ===== GIÁ VỐN BÌNH QUÂN ===== */
      COALESCE(
        exp.total_export
        * (imp.import_value / NULLIF(imp.total_import, 0)),
        0
      ) AS cost_value,

      /* ===== TIỀN LỜI ===== */
      COALESCE(exp.revenue_value, 0)
      - COALESCE(
          exp.total_export
          * (imp.import_value / NULLIF(imp.total_import, 0)),
          0
        ) AS profit_value

    FROM sanpham sp

    /* ========= BIẾN THỂ (CHỈ ĐỂ HIỂN THỊ) ========= */
    LEFT JOIN (
      SELECT
        cb.masp,
        cb.mabienthe,
        GROUP_CONCAT(
          CONCAT(ttb.loaithuoctinh, ': ', ttb.thuoc_tinh)
          SEPARATOR ', '
        ) AS chitietbienthe
      FROM cacbienthe cb
      LEFT JOIN thuoctinhbienthe ttb ON cb.mabienthe = ttb.mabienthe
      GROUP BY cb.mabienthe
    ) bt ON sp.masp = bt.masp

    /* ========= NHẬP KHO ========= */
    LEFT JOIN (
      SELECT
        COALESCE(ctpn.mabienthe, ctpn.masp) AS key_id,
        SUM(ctpn.soluongnhap) AS total_import,
        SUM(ctpn.soluongnhap * ctpn.gianhap) AS import_value
      FROM chitietphieunhap ctpn
      JOIN phieunhap pn ON pn.mapn = ctpn.mapn
      WHERE 1 = 1
      ${importCond}
      GROUP BY COALESCE(ctpn.mabienthe, ctpn.masp)
    ) imp
      ON imp.key_id = IF(sp.cobienthe = 1, bt.mabienthe, sp.masp)

    /* ========= XUẤT KHO ========= */
    LEFT JOIN (
      SELECT
        COALESCE(ctdh.mabienthe, ctdh.masp) AS key_id,
        SUM(ctdh.soluongsanpham) AS total_export,
        SUM(ctdh.soluongsanpham * ctdh.dongia) AS revenue_value
      FROM chitietdonhang ctdh
      JOIN donhang dh ON dh.madh = ctdh.madh
      WHERE 1 = 1
      ${exportCond}
      GROUP BY COALESCE(ctdh.mabienthe, ctdh.masp)
    ) exp
      ON exp.key_id = IF(sp.cobienthe = 1, bt.mabienthe, sp.masp)

    ORDER BY sp.masp, bt.mabienthe;
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
