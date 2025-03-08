import connectDB from "../configs/connectDB.js";
// Loai
const getCategory = async () => {
    const [rows, fields] = await connectDB.execute('SELECT `maloai`, `tenloai` FROM `loaisanpham`')
    return rows
}
const insertCategory = async (maloai, tenloai) => {
    await connectDB.execute("INSERT INTO `loaisanpham` VALUES (?, ?)", [maloai, tenloai]);
}
const detailCategory= async (maloai) => {
        const [rows, fields] = await connectDB.execute('SELECT * FROM `loaisanpham` WHERE maloai=?', [maloai])
        return rows[0]
}
const editCategory = async (tenloai, maloai) => {
    await connectDB.execute('UPDATE `loaisanpham` SET tenloai=? WHERE maloai =?',[tenloai, maloai])
}
const deleteCategory = async(maloai) => {
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
const detailNSX= async (mansx) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `nhasanxuat` WHERE mansx=?', [mansx])
    return rows[0]
}
const editNSX = async (mansx, tennsx, email, diachi) => {
    await connectDB.execute('UPDATE `nhasanxuat` SET tennsx=?, email=?, diachi=? WHERE mansx =?',[tennsx, email, diachi, mansx])
}
const deleteNSX = async(mansx) => {
    await connectDB.execute("DELETE FROM `nhasanxuat` WHERE mansx=?", [mansx])
}
// NSX

// SP
const getAllProduct = async () => {
    const query = `
      SELECT sp.*, km.makm, km.tenkm, km.thoigianbatdaukm, km.thoigianketthuckm, km.km, lsp.tenloai, nsx.tennsx,
             (SELECT hinhanh FROM hinhanhsanpham ha WHERE ha.masp = sp.masp LIMIT 1) AS hinhanh
      FROM sanpham sp
      JOIN loaisanpham lsp ON sp.maloai = lsp.maloai
      JOIN nhasanxuat nsx ON sp.mansx = nsx.mansx
      LEFT JOIN khuyenmai km ON sp.masp = km.masp
    `;
    const [rows] = await connectDB.execute(query);
    return rows;
  };
  const getProductById = async (masp) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `sanpham` WHERE masp=?', [masp]);
    return rows[0];
    };  
  const getProduct8 = async () => {
    const [rows] = await connectDB.execute('SELECT * FROM `sanpham` LIMIT 8');
    return rows;
  };
  
  const getProduct12 = async () => {
    const [rows] = await connectDB.execute('SELECT * FROM `sanpham` LIMIT 12');
    return rows;
  };
  
  const detailProduct = async (masp) => {
    const query = `
      SELECT sp.*, lsp.tenloai, nsx.tennsx
      FROM sanpham sp
      JOIN loaisanpham lsp ON sp.maloai = lsp.maloai
      JOIN nhasanxuat nsx ON sp.mansx = nsx.mansx
      WHERE sp.masp = ?
    `;
    const [rows] = await connectDB.execute(query, [masp]);
    return rows[0];
  };
  

const insertProducts = async (masp, tensp, maloai, ttct, soluongsp, gia, mansx) => {
    await connectDB.execute(
        "INSERT INTO `sanpham` (masp, tensp, maloai, ttct, soluongsp, gia, mansx) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [masp, tensp, maloai, ttct, soluongsp, gia, mansx]
    );
};

const insertProductImages = async (masp, images) => {
    for (const image of images) {
        await connectDB.execute(
            "INSERT INTO `hinhanhsanpham` (masp, hinhanh) VALUES (?, ?)",
            [masp, image]
        );
    }
};

const editProduct = async (masp, tensp, ttct, soluongsp, gia, maloai, mansx) => {
    await connectDB.execute('UPDATE `sanpham` SET tensp=?, ttct=?, soluongsp=?, gia=?, maloai=?, mansx=? WHERE masp=?',[tensp, ttct, soluongsp, gia, maloai, mansx, masp])
}

// models/productsModel.js
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
const deleteProduct = async(masp) => {
    await connectDB.execute("DELETE FROM `sanpham` WHERE masp=?", [masp])
}
const deleteImgProduct = async(masp) => {
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
    await connectDB.execute('UPDATE `donhang` SET trangthai=? WHERE madh =?',[trangthai, madh])
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

export default {getCategory, insertProductImages, getProduct8, checkProducerExists, checkCategoryExists, getProductById, getProduct12, getProductImages, updateQuantity, getCartAPI, updateProductImages, getAllDetailCart, updateCart, getAllCart, getAllAPICart, insertCategory, insertCart, insertDetailCart, editCategory,detailCategory, deleteCategory, insertNSX, editNSX, getAllNSX, detailNSX, deleteNSX, insertProducts, getAllProduct, editProduct, detailProduct, deleteProduct, deleteImgProduct }

