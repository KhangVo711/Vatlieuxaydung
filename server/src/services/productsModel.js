import connectDB from "../configs/connectDB.js";
// Loai
const getCategory = async () => {
  const [rows, fields] = await connectDB.execute('SELECT `maloai`, `tenloai` FROM `loaisanpham`')
  return rows
}
const insertCategory = async (maloai, tenloai) => {
  await connectDB.execute("INSERT INTO `loaisanpham` VALUES (?, ?)", [maloai, tenloai]);
}
const detailCategory = async (maloai) => {
  const [rows, fields] = await connectDB.execute('SELECT * FROM `loaisanpham` WHERE maloai=?', [maloai])
  return rows[0]
}
const editCategory = async (tenloai, maloai) => {
  await connectDB.execute('UPDATE `loaisanpham` SET tenloai=? WHERE maloai =?', [tenloai, maloai])
}
const deleteCategory = async (maloai) => {
  await connectDB.execute("DELETE FROM `loaisanpham` WHERE maloai=?", [maloai])
}
// Loai

// NSX
const getAllNSX = async () => {
  const [rows, fields] = await connectDB.execute('SELECT `mansx`, `tennsx`, `email`, `diachi` FROM `nhasanxuat`')
  return rows
}
const insertNSX = async (mansx, tennsx, email, diachi) => {
  await connectDB.execute("INSERT INTO `nhasanxuat` VALUES (?, ?, ?, ?)", [mansx, tennsx, email, diachi]);
}
const detailNSX = async (mansx) => {
  const [rows, fields] = await connectDB.execute('SELECT * FROM `nhasanxuat` WHERE mansx=?', [mansx])
  return rows[0]
}
const editNSX = async (mansx, tennsx, email, diachi) => {
  await connectDB.execute('UPDATE `nhasanxuat` SET tennsx=?, email=?, diachi=? WHERE mansx =?', [tennsx, email, diachi, mansx])
}
const deleteNSX = async (mansx) => {
  await connectDB.execute("DELETE FROM `nhasanxuat` WHERE mansx=?", [mansx])
}
// NSX

// SP
const getAllProduct = async () => {
  const query = `
    SELECT 
      sp.*, 
      km.makm, km.tenkm, km.thoigianbatdaukm, km.thoigianketthuckm, km.km, 
      lsp.tenloai, nsx.tennsx,
      (SELECT hinhanh FROM hinhanhsanpham ha WHERE ha.masp = sp.masp LIMIT 1) AS hinhanh,
      GROUP_CONCAT(DISTINCT cb.mabienthe SEPARATOR ',') AS mabienthe_list,
      GROUP_CONCAT(DISTINCT tb.thuoc_tinh SEPARATOR ',') AS thuoc_tinh_list,
      CASE 
          WHEN COUNT(cb.mabienthe) = 0 THEN sp.gia -- No variants, use base price
          ELSE MIN(cb.gia) -- Use the minimum price when there are variants
      END AS gia_range
    FROM sanpham sp
    JOIN loaisanpham lsp ON sp.maloai = lsp.maloai
    JOIN nhasanxuat nsx ON sp.mansx = nsx.mansx
    LEFT JOIN khuyenmai km ON sp.masp = km.masp
    LEFT JOIN cacbienthe cb ON sp.masp = cb.masp
    LEFT JOIN thuoctinhbienthe tb ON cb.mabienthe = tb.mabienthe
    GROUP BY sp.masp, sp.tensp, sp.gia, sp.soluongsp, sp.ttct, km.makm, km.tenkm, km.thoigianbatdaukm, km.thoigianketthuckm, km.km, 
             lsp.tenloai, nsx.tennsx; 
  `;
  const [rows] = await connectDB.execute(query);
  return rows;
};
const getProductById = async (masp) => {
  const [rows, fields] = await connectDB.execute('SELECT * FROM `sanpham` WHERE masp=?', [masp]);
  return rows[0];
};

const getProduct8 = async () => {
  const [rows] = await connectDB.execute(`
    SELECT 
      s.masp, s.tensp, s.maloai, s.mansx, s.gia, s.soluongsp, s.ttct,
      h.hinhanh,
      lsp.tenloai, nsx.tennsx,
      km.makm, km.tenkm, km.thoigianbatdaukm, km.thoigianketthuckm, km.km,
      GROUP_CONCAT(DISTINCT cb.mabienthe SEPARATOR ',') AS mabienthe_list,
      GROUP_CONCAT(DISTINCT tb.thuoc_tinh SEPARATOR ',') AS thuoc_tinh_list,
      CASE 
        WHEN COUNT(cb.mabienthe) = 0 THEN s.gia
        WHEN MAX(cb.gia) - MIN(cb.gia) <= 6000 AND MIN(cb.gia) >= 72000 AND MAX(cb.gia) <= 78000 
          THEN CONCAT(FLOOR(MIN(cb.gia) / 10000) * 10000, ' +')
        ELSE CONCAT('Từ ', MIN(cb.gia), ' đến ', MAX(cb.gia))
      END AS gia_range,
      MAX(cb.soluongtonkho) AS max_soluongtonkho
    FROM sanpham s
    JOIN loaisanpham lsp ON s.maloai = lsp.maloai
    JOIN nhasanxuat nsx ON s.mansx = nsx.mansx
    LEFT JOIN khuyenmai km ON s.masp = km.masp
    LEFT JOIN cacbienthe cb ON s.masp = cb.masp
    LEFT JOIN thuoctinhbienthe tb ON cb.mabienthe = tb.mabienthe
    LEFT JOIN (
      SELECT masp, hinhanh,
             ROW_NUMBER() OVER (PARTITION BY masp ORDER BY masp) as rn
      FROM hinhanhsanpham
    ) h ON s.masp = h.masp AND h.rn = 1
    WHERE km.masp IS NULL OR (km.thoigianketthuckm > NOW() AND km.thoigianbatdaukm <= NOW())
    GROUP BY s.masp, s.tensp, s.gia, s.soluongsp, s.ttct, lsp.tenloai, nsx.tennsx, km.makm, km.tenkm, km.thoigianbatdaukm, km.thoigianketthuckm, km.km
    ORDER BY s.masp
    LIMIT 8
  `);
  return rows;
};
const getProduct_Hot8 = async () => {
  const [rows] = await connectDB.execute(`
    SELECT 
      s.masp, s.tensp, s.maloai, s.mansx, s.gia, s.soluongsp, s.ttct,
      lsp.tenloai, nsx.tennsx,
      h.hinhanh,
      COALESCE(SUM(CASE WHEN dh.trangthai = 'Đã giao hàng' THEN ct.soluongsanpham ELSE 0 END), 0) as total_sold,
      km.makm, km.tenkm, km.km, km.thoigianbatdaukm, km.thoigianketthuckm,
      GROUP_CONCAT(DISTINCT cb.mabienthe SEPARATOR ',') AS mabienthe_list,
      GROUP_CONCAT(DISTINCT tb.thuoc_tinh SEPARATOR ',') AS thuoc_tinh_list,
      CASE 
        WHEN COUNT(cb.mabienthe) = 0 THEN s.gia
        WHEN MAX(cb.gia) - MIN(cb.gia) <= 6000 AND MIN(cb.gia) >= 72000 AND MAX(cb.gia) <= 78000 
          THEN CONCAT(FLOOR(MIN(cb.gia) / 10000) * 10000, ' +')
        ELSE CONCAT('Từ ', MIN(cb.gia), ' đến ', MAX(cb.gia))
      END AS gia_range,
      MAX(cb.soluongtonkho) AS max_soluongtonkho
    FROM sanpham s
    JOIN loaisanpham lsp ON s.maloai = lsp.maloai
    JOIN nhasanxuat nsx ON s.mansx = nsx.mansx
    LEFT JOIN (
      SELECT masp, hinhanh,
             ROW_NUMBER() OVER (PARTITION BY masp ORDER BY masp) as rn
      FROM hinhanhsanpham
    ) h ON s.masp = h.masp AND h.rn = 1
    LEFT JOIN khuyenmai km ON s.masp = km.masp AND km.thoigianketthuckm > NOW() AND km.thoigianbatdaukm <= NOW()
    LEFT JOIN chitietdonhang ct ON s.masp = ct.masp
    LEFT JOIN donhang dh ON ct.madh = dh.madh
    LEFT JOIN cacbienthe cb ON s.masp = cb.masp
    LEFT JOIN thuoctinhbienthe tb ON cb.mabienthe = tb.mabienthe
    GROUP BY 
      s.masp, s.tensp, s.maloai, s.mansx, s.gia, s.soluongsp, s.ttct,
      lsp.tenloai, nsx.tennsx, h.hinhanh, km.makm, km.tenkm, km.km, km.thoigianbatdaukm, km.thoigianketthuckm
    ORDER BY total_sold DESC
    LIMIT 8
  `);
  return rows;
};
const getProduct12 = async () => {
  const [rows] = await connectDB.execute(`
        SELECT s.masp, s.tensp, s.maloai, s.soluongsp, s.gia, s.mansx, h.hinhanh
        FROM sanpham s
        LEFT JOIN khuyenmai k ON s.masp = k.masp
        LEFT JOIN (
            SELECT masp, hinhanh,
                   ROW_NUMBER() OVER (PARTITION BY masp ORDER BY masp) as rn
            FROM hinhanhsanpham
        ) h ON s.masp = h.masp AND h.rn = 1
        WHERE k.masp IS NULL
        ORDER BY s.masp
        LIMIT 12
    `);
  return rows;
};
const getProduct5 = async () => {
  const [rows] = await connectDB.execute(`
    SELECT 
  s.masp, s.tensp, s.maloai, s.mansx, s.gia, s.soluongsp, s.ttct,
  lsp.tenloai, nsx.tennsx,
  h.hinhanh,
  km.makm, km.tenkm, km.km, km.thoigianbatdaukm, km.thoigianketthuckm,
  GROUP_CONCAT(DISTINCT cb.mabienthe SEPARATOR ',') AS mabienthe_list,
  GROUP_CONCAT(DISTINCT tb.thuoc_tinh SEPARATOR ',') AS thuoc_tinh_list,
  CASE 
    WHEN COUNT(cb.mabienthe) = 0 THEN s.gia -- No variants, use base price
    ELSE MIN(cb.gia) -- Use the minimum price when there are variants
  END AS gia_range,
  MAX(cb.soluongtonkho) AS max_soluongtonkho
FROM sanpham s
JOIN loaisanpham lsp ON s.maloai = lsp.maloai
JOIN nhasanxuat nsx ON s.mansx = nsx.mansx
INNER JOIN khuyenmai km ON s.masp = km.masp AND km.thoigianketthuckm > NOW() AND km.thoigianbatdaukm <= NOW()
LEFT JOIN (
  SELECT masp, hinhanh,
         ROW_NUMBER() OVER (PARTITION BY masp ORDER BY masp) as rn
  FROM hinhanhsanpham
) h ON s.masp = h.masp AND h.rn = 1
LEFT JOIN cacbienthe cb ON s.masp = cb.masp
LEFT JOIN thuoctinhbienthe tb ON cb.mabienthe = tb.mabienthe
GROUP BY 
  s.masp, s.tensp, s.maloai, s.mansx, s.gia, s.soluongsp, s.ttct,
  lsp.tenloai, nsx.tennsx, h.hinhanh, km.makm, km.tenkm, km.km, km.thoigianbatdaukm, km.thoigianketthuckm
ORDER BY s.masp
LIMIT 5
  `);
  return rows;
};
const getProductOfCategory = async (maloai) => {
  const [rows] = await connectDB.execute(`
    SELECT 
      sp.*, 
      km.makm, km.tenkm, km.thoigianbatdaukm, km.thoigianketthuckm, km.km, 
      lsp.tenloai, nsx.tennsx,
      (SELECT hinhanh FROM hinhanhsanpham ha WHERE ha.masp = sp.masp LIMIT 1) AS hinhanh,
      GROUP_CONCAT(DISTINCT cb.mabienthe SEPARATOR ',') AS mabienthe_list,
      GROUP_CONCAT(DISTINCT tb.thuoc_tinh SEPARATOR ',') AS thuoc_tinh_list,
      CASE 
        WHEN COUNT(cb.mabienthe) = 0 THEN sp.gia -- No variants, use base price
        ELSE MIN(cb.gia) -- Use the minimum price when there are variants
      END AS gia_range,
      MAX(cb.soluongtonkho) AS max_soluongtonkho
    FROM sanpham sp
    JOIN loaisanpham lsp ON sp.maloai = lsp.maloai
    JOIN nhasanxuat nsx ON sp.mansx = nsx.mansx
    LEFT JOIN khuyenmai km ON sp.masp = km.masp AND km.thoigianketthuckm > NOW() AND km.thoigianbatdaukm <= NOW()
    LEFT JOIN cacbienthe cb ON sp.masp = cb.masp
    LEFT JOIN thuoctinhbienthe tb ON cb.mabienthe = tb.mabienthe
    WHERE sp.maloai = ?
    GROUP BY 
      sp.masp, sp.tensp, sp.gia, sp.soluongsp, sp.ttct, 
      lsp.tenloai, nsx.tennsx, km.makm, km.tenkm, km.km, km.thoigianbatdaukm, km.thoigianketthuckm
  `, [maloai]);
  return rows;
};

const getVariants = async (masp) => {
  const query = `
      SELECT c.mabienthe, c.gia, c.soluongtonkho, t.thuoc_tinh
     FROM cacbienthe c
     LEFT JOIN thuoctinhbienthe t ON c.mabienthe = t.mabienthe
     WHERE c.masp = ?
    `;
  const [rows] = await connectDB.execute(query, [masp]);
  return rows;
};


const detailProduct = async (masp, mabienthe = null) => {
  let query = `
    SELECT 
      sp.*, 
      lsp.tenloai, nsx.tennsx, km.tenkm, km.km,
      km.thoigianbatdaukm, km.thoigianketthuckm,
      ha.hinhanh
    FROM sanpham sp
    JOIN loaisanpham lsp ON sp.maloai = lsp.maloai
    JOIN nhasanxuat nsx ON sp.mansx = nsx.mansx
    LEFT JOIN hinhanhsanpham ha ON sp.masp = ha.masp
    LEFT JOIN khuyenmai km ON sp.masp = km.masp
    WHERE sp.masp = ?
  `;
  const params = [masp];

  if (mabienthe) {
    query += ` AND EXISTS (SELECT 1 FROM cacbienthe cb WHERE cb.masp = sp.masp AND cb.mabienthe = ?)`;
    params.push(mabienthe);
  }

  const [rows] = await connectDB.execute(query, params);
  return rows.length > 0 ? rows[0] : null;
};

const getProductVariants = async (masp) => {
  const query = `
    SELECT cb.*, tb.thuoc_tinh, cb.soluongtonkho
    FROM cacbienthe cb
    LEFT JOIN thuoctinhbienthe tb ON cb.mabienthe = tb.mabienthe
    
    WHERE cb.masp = ?
  `;
  const [rows] = await connectDB.execute(query, [masp]);
  return rows;
};

// Thêm sản phẩm
const insertProducts = async (masp, tensp, maloai, ttct, mansx, loaibienthe, cobienthe, gia, soluongsp) => {
  await connectDB.execute(
    "INSERT INTO sanpham (masp, tensp, maloai, ttct, mansx, loaibienthe, cobienthe, gia, soluongsp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [masp, tensp, maloai, ttct, mansx, loaibienthe, cobienthe, gia, soluongsp]
  );
};

// Thêm hình ảnh sản phẩm
const insertProductImages = async (masp, imageNames) => {
  for (const img of imageNames) {
    await connectDB.execute(
      "INSERT INTO hinhanhsanpham (masp, hinhanh) VALUES (?, ?)",
      [masp, img]
    );
  }
};

// Thêm biến thể
const insertVariant = async (mabienthe, masp, gia, soluongtonkho) => {
  await connectDB.execute(
    "INSERT INTO cacbienthe (mabienthe, masp, gia, soluongtonkho) VALUES (?, ?, ?, ?)",
    [mabienthe, masp, gia, soluongtonkho]
  );
};

// Thêm thuộc tính biến thể
const insertVariantProperty = async (mabienthe, loaithuoctinh, thuoc_tinh) => {
  const mathuoctinh = mabienthe + "_" + Date.now(); // Hoặc UUID nếu có
  await connectDB.execute(
    "INSERT INTO thuoctinhbienthe (mathuoctinh, mabienthe, loaithuoctinh, thuoc_tinh) VALUES (?, ?, ?, ?)",
    [mathuoctinh, mabienthe, loaithuoctinh, thuoc_tinh]
  );
};

const editProduct = async (masp, tensp, ttct, soluongsp, gia, maloai, mansx, loaibienthe, cobienthe) => {
  await connectDB.execute(
    'UPDATE `sanpham` SET tensp=?, ttct=?, soluongsp=?, gia=?, maloai=?, mansx=?, loaibienthe=?, cobienthe=? WHERE masp=?',
    [tensp, ttct, soluongsp, gia, maloai, mansx, loaibienthe, cobienthe, masp]
  );
};

const updateVariants = async (masp, variants, loaibienthe) => {
  const [existingVariants] = await connectDB.execute('SELECT mabienthe FROM cacbienthe WHERE masp = ?', [masp]);
  const existingVariantIds = existingVariants.map((v) => v.mabienthe);
  const newVariantIds = variants.map((v) => v.mabienthe);

  const variantsToDelete = existingVariantIds.filter((id) => !newVariantIds.includes(id));
  for (const mabienthe of variantsToDelete) {
    await connectDB.execute('DELETE FROM thuoctinhbienthe WHERE mabienthe = ?', [mabienthe]);
    await connectDB.execute('DELETE FROM cacbienthe WHERE mabienthe = ?', [mabienthe]);
  }

  for (const variant of variants) {
    const { mabienthe, gia, soluongtonkho, thuoc_tinh } = variant;
    const [existing] = await connectDB.execute('SELECT mabienthe FROM cacbienthe WHERE mabienthe = ?', [mabienthe]);

    if (existing.length > 0) {
      await connectDB.execute(
        'UPDATE cacbienthe SET gia = ?, soluongtonkho = ? WHERE mabienthe = ?',
        [Number(gia), Number(soluongtonkho), mabienthe]
      );
      await connectDB.execute(
        'UPDATE thuoctinhbienthe SET thuoc_tinh = ?, loaithuoctinh = ? WHERE mabienthe = ?',
        [thuoc_tinh, loaibienthe, mabienthe]
      );
    } else {
      await connectDB.execute(
        'INSERT INTO cacbienthe (mabienthe, masp, gia, soluongtonkho) VALUES (?, ?, ?, ?)',
        [mabienthe, masp, Number(gia), Number(soluongtonkho)]
      );
      const mathuoctinh = `${mabienthe}_${Date.now()}`;
      await connectDB.execute(
        'INSERT INTO thuoctinhbienthe (mathuoctinh, mabienthe, loaithuoctinh, thuoc_tinh) VALUES (?, ?, ?, ?)',
        [mathuoctinh, mabienthe, loaibienthe, thuoc_tinh]
      );
    }
  }
};

const deleteVariants = async (masp) => {
  await connectDB.execute('DELETE FROM thuoctinhbienthe WHERE mabienthe IN (SELECT mabienthe FROM cacbienthe WHERE masp = ?)', [masp]);
  await connectDB.execute('DELETE FROM cacbienthe WHERE masp = ?', [masp]);
};

const updateProductImages = async (masp, updatedImages) => {
  try {
    if (updatedImages && updatedImages.length > 0) {
      for (const { oldImage, newImage } of updatedImages) {
        if (oldImage && newImage) {
          const updateQuery = 'UPDATE `hinhanhsanpham` SET hinhanh = ? WHERE masp = ? AND hinhanh = ?';
          await connectDB.execute(updateQuery, [newImage, masp, oldImage]);
          console.log(`Đã cập nhật ảnh từ ${oldImage} thành ${newImage}`);
        }
      }
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật hình ảnh sản phẩm:', error.message);
    throw error;
  }
};


const getProductImages = async (masp) => {
  const [rows] = await connectDB.execute('SELECT hinhanh FROM `hinhanhsanpham` WHERE masp = ?', [masp]);
  return rows.map(row => row.hinhanh);
};
const checkProducerExists = async (mansx) => {
  try {
    const [rows] = await connectDB.execute('SELECT 1 FROM nhasanxuat WHERE mansx = ?', [mansx]);
    return rows.length > 0;
  } catch (error) {
    console.error('Error checking producer:', error);
    return false;
  }
};
const checkCategoryExists = async (maloai) => {
  try {
    const [rows] = await connectDB.execute('SELECT 1 FROM loaisanpham WHERE maloai = ?', [maloai]);
    return rows.length > 0;
  } catch (error) {
    console.error('Error checking category:', error);
    return false;
  }
};
const deleteProduct = async (masp) => {
  await connectDB.execute("DELETE FROM `sanpham` WHERE masp=?", [masp])
}
const deleteImgProduct = async (masp) => {
  await connectDB.execute("DELETE FROM `hinhanhsanpham` WHERE masp=?", [masp])
}
// SP

// Detail Cart
const getAllCart = async () => {
  const [rows, fields] = await connectDB.execute('SELECT * FROM `donhang`')
  return rows
}
const getAllDetailCart = async (madh) => {
  const [rows, fields] = await connectDB.execute('SELECT * FROM `donhang` JOIN `chitietdathang` ON `donhang`.madh = `chitietdathang`.madh JOIN `sanpham` ON `chitietdathang`.masp = `sanpham`.masp JOIN `admin` ON `donhang`.username = `admin`.username JOIN `hoso` ON `admin`.username = `hoso`.username WHERE `donhang`.madh = ?', [madh])
  return rows
}
// Detail Cart

// CART
const insertCart = async (madh, username, ngaydat, trangthai, tonggia, diachinhanhang) => {
  await connectDB.execute("INSERT INTO `donhang` VALUES (?, ?, ?, ?, ?, ?)", [madh, username, ngaydat, trangthai, tonggia, diachinhanhang]);
}
const insertDetailCart = async (madh, masp, gia, soluong) => {
  await connectDB.execute("INSERT INTO `chitietdathang` VALUES (?, ?, ?, ?)", [madh, masp, gia, soluong]);
}
const updateCart = async (trangthai, madh) => {
  await connectDB.execute('UPDATE `donhang` SET trangthai=? WHERE madh =?', [trangthai, madh])
}
const getCartAPI = async (username) => {
  const [rows, fields] = await connectDB.execute('SELECT * FROM `donhang` WHERE username = ?', [username])
  return rows
}
const getAllAPICart = async (madh) => {
  const [rows, fields] = await connectDB.execute(
    `
        SELECT * 
        FROM donhang 
        JOIN chitietdathang ON donhang.madh = chitietdathang.madh
        JOIN sanpham ON chitietdathang.masp = sanpham.masp
        WHERE donhang.madh = ?
        `,
    [madh]
  );
  return rows;
}
// Update quantity
const updateQuantity = async (masp) => {
  await connectDB.execute('UPDATE sanpham,chitietdathang SET soluongsp=soluongsp-soluong WHERE sanpham.masp=chitietdathang.masp AND chitietdathang.masp=?', [masp])
}

// RecommendProducts
const getRecommendedProducts = async (maloai) => {
  try {
    const query = `
      SELECT 
        sp.masp, sp.tensp, sp.gia, sp.soluongsp, sp.ttct,
        lsp.tenloai, nsx.tennsx,
        (SELECT hinhanh FROM hinhanhsanpham ha WHERE ha.masp = sp.masp LIMIT 1) AS hinhanh,
        km.makm, km.tenkm, km.thoigianbatdaukm, km.thoigianketthuckm, km.km,
        GROUP_CONCAT(DISTINCT cb.mabienthe SEPARATOR ',') AS mabienthe_list,
        GROUP_CONCAT(DISTINCT tb.thuoc_tinh SEPARATOR ',') AS thuoc_tinh_list,
        CASE 
          WHEN COUNT(cb.mabienthe) = 0 THEN sp.gia
          WHEN MAX(cb.gia) - MIN(cb.gia) <= 6000 AND MIN(cb.gia) >= 72000 AND MAX(cb.gia) <= 78000 
            THEN CONCAT(FLOOR(MIN(cb.gia) / 10000) * 10000, ' +')
          ELSE CONCAT('Từ ', MIN(cb.gia), ' đến ', MAX(cb.gia))
        END AS gia_range,
        MAX(cb.soluongtonkho) AS max_soluongtonkho
      FROM sanpham sp
      JOIN loaisanpham lsp ON sp.maloai = lsp.maloai
      JOIN nhasanxuat nsx ON sp.mansx = nsx.mansx
      LEFT JOIN khuyenmai km ON sp.masp = km.masp
      LEFT JOIN cacbienthe cb ON sp.masp = cb.masp
      LEFT JOIN thuoctinhbienthe tb ON cb.mabienthe = tb.mabienthe
      WHERE sp.maloai = ?
      GROUP BY sp.masp, sp.tensp, sp.gia, sp.soluongsp, sp.ttct, lsp.tenloai, nsx.tennsx, km.makm, km.tenkm, km.thoigianbatdaukm, km.thoigianketthuckm, km.km
      LIMIT 6;
    `;
    const [rows] = await connectDB.query(query, [maloai]);
    return rows;
  } catch (error) {
    throw new Error('Error fetching recommended products from database: ' + error.message);
  }
};


export default { getProduct_Hot8, getProductOfCategory, getVariants, getProductVariants, getRecommendedProducts, getCategory, insertProductImages, updateVariants, deleteVariants, insertVariant, insertVariantProperty, getProduct8, checkProducerExists, checkCategoryExists, getProductById, getProduct5, getProduct12, getProductImages, updateQuantity, getCartAPI, updateProductImages, getAllDetailCart, updateCart, getAllCart, getAllAPICart, insertCategory, insertCart, insertDetailCart, editCategory, detailCategory, deleteCategory, insertNSX, editNSX, getAllNSX, detailNSX, deleteNSX, insertProducts, getAllProduct, editProduct, detailProduct, deleteProduct, deleteImgProduct }

