import express from "express";
import productsModel from "../services/productsModel.js"
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import compromise from 'compromise';
import { detectIntent } from '../services/dialogflowService.js';
import { getSession, clearSession } from '../../middleware/sessionStore.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Loai
const getCategory = async (req, res) => {
  try {
    const category = await productsModel.getCategory()
    res.status(200).send({ category: category });
  }
  catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách loại sản phẩm." });
  }
}
const insertCategory = async (req, res) => {
  try {
    let { maloai, tenloai } = req.body
    console.log(req.body);
    if (!maloai || !tenloai) {
      return res.status(400).send({ message: "Thiếu thông tin loại sản phẩm." });
    }
    const idPattern = /^[^\s].*$/;
    if (!idPattern.test(maloai)) {
      return res.status(400).json({ message: 'Mã loại không được chứa khoảng trắng ở đầu' });
    }
    if (!idPattern.test(tenloai)) {
      return res.status(400).json({ message: 'Tên loại không được chứa khoảng trắng ở đầu' });
    }
    const nameCategory = /^[\p{L}\p{N}\s]+$/u;
    if (!nameCategory.test(tenloai)) {
      return res.status(400).json({ message: 'Tên loại không được chứa ký tự đặc biệt.' });
    }

    await productsModel.insertCategory(maloai, tenloai)
    res.status(200).send({ message: "Thêm loại sản phẩm thành công!" });
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi thêm loại sản phẩm." });
  }

}
const detailCategory = async (req, res) => {
  let { maloai } = req.body
  try {
    await productsModel.detailCategory(maloai)
    res.status(200).send({ message: "Lấy chi tiết loại sản phẩm thành công!" });
  }
  catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết loại sản phẩm." });
  }

}
const getOneCategory = async (req, res) => {
  let { maloai } = req.params
  try {
    const listCategory = await productsModel.detailCategory(maloai)
    res.status(200).send({ message: "Lấy chi tiết loại sản phẩm thành công!", listCategory: listCategory });
  }
  catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết loại sản phẩm." });
  }

}
const editCategory = async (req, res) => {
  let { maloai, tenloai } = req.body
  try {
    if (!maloai || !tenloai) {
      return res.status(400).send({ message: "Không được để trống" });
    }
    const detailCategory = await productsModel.detailCategory(maloai);
    if (tenloai === detailCategory.tenloai) {
      return;
    }
    const idPattern = /^[^\s].*$/;
    if (!idPattern.test(tenloai)) {
      return res.status(400).json({ message: 'Tên loại không được chứa khoảng trắng ở đầu' });
    }
    const nameCategory = /^[\p{L}\p{N}\s]+$/u;
    if (!nameCategory.test(tenloai)) {
      return res.status(400).json({ message: 'Tên loại không được chứa ký tự đặc biệt' });
    }
    await productsModel.editCategory(tenloai, maloai)
    res.status(200).send({ message: "Sửa loại sản phẩm thành công!" });
  }
  catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi sửa loại sản phẩm." });
  }
}

const deleteCategory = async (req, res) => {
  let { maloai } = req.body
  await productsModel.deleteCategory(maloai)
  res.status(200).send({ message: "Xóa loại sản phẩm thành công!" });
}
// Loai

// NSX
const getAllNSX = async (req, res) => {
  try {
    const listNSX = await productsModel.getAllNSX()
    res.status(200).send({ listNSX: listNSX });

  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách nhà sản xuất" });
  }
}
const insertNSX = async (req, res) => {
  let { mansx, tennsx, email, diachi } = req.body
  try {
    if (!mansx || !tennsx || !email || !diachi) {
      return res.status(400).send({ message: "Thiếu thông tin nhà sản xuất" });
    }
    const idPattern = /^[^\s].*$/;
    if (!idPattern.test(mansx)) {
      return res.status(400).json({ message: 'Mã nhà sản xuất không được chứa khoảng trắng ở đầu' });
    }
    if (!idPattern.test(tennsx)) {
      return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa khoảng trắng ở đầu' });
    }
    if (!idPattern.test(email)) {
      return res.status(400).json({ message: 'Eamil không được chứa khoảng trắng ở đầu' });
    }
    if (!idPattern.test(diachi)) {
      return res.status(400).json({ message: 'Địa chỉ không được chứa khoảng trắng ở đầu' });
    }
    const nameProducer = /^[\p{L}\p{N}\s]+$/u;
    if (!nameProducer.test(tennsx)) {
      return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa ký tự đặc biệt.' });
    }

    const emailProducer = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailProducer.test(email)) {
      return res.status(400).json({ message: 'Email không hợp lệ.' });
    }

    await productsModel.insertNSX(mansx, tennsx, email, diachi)
    res.status(200).send({ message: "Thêm nhà sản xuất thành công" });
  }
  catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi thêm nhà sản xuất" });
  }
}
const detailNSX = async (req, res) => {
  let { mansx } = req.body
  try {
    await productsModel.detailCategory(mansx)
    res.status(200).send({ message: "Lấy chi tiết nhà sản xuất thành công!" });
  }
  catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết nhà sản xuất." });
  }
}
const getNSX = async (req, res) => {
  let { mansx } = req.params
  try {
    const listNSX = await productsModel.detailNSX(mansx)
    res.status(200).send({ message: "Lấy chi tiết nhà sản xuất thành công!", listNSX: listNSX });
  }
  catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết nhà sản xuất." });
  }
}

const editNSX = async (req, res) => {
  let { mansx, tennsx, email, diachi } = req.body
  try {
    if (!mansx || !tennsx || !email || !diachi) {
      return res.status(400).send({ message: "Thiếu thông tin nhà sản xuất" });
    }
    const detailNSX = await productsModel.detailNSX(mansx);
    if (tennsx === detailNSX.tennsx && email === detailNSX.email && diachi === detailNSX.diachi) {
      return
    }
    const idPattern = /^[^\s].*$/;
    if (!idPattern.test(tennsx)) {
      return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa khoảng trắng ở đầu' });
    }
    if (!idPattern.test(email)) {
      return res.status(400).json({ message: 'Eamil không được chứa khoảng trắng ở đầu' });
    }
    if (!idPattern.test(diachi)) {
      return res.status(400).json({ message: 'Địa chỉ không được chứa khoảng trắng ở đầu' });
    }
    const nameProducer = /^[\p{L}\p{N}\s]+$/u;
    if (!nameProducer.test(tennsx)) {
      return res.status(400).json({ message: 'Tên nhà sản xuất không được chứa ký tự đặc biệt' });
    }
    // if (!nameProducer.test(diachi)) {
    //     return res.status(400).json({ message: 'Địa chỉ nhà sản xuất không được chứa ký tự đặc biệt' });
    // }
    const emailProducer = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailProducer.test(email)) {
      return res.status(400).json({ message: 'Email không hợp lệ.' });
    }

    let dataNSX = await productsModel.editNSX(mansx, tennsx, email, diachi)
    res.status(200).send({ message: "Sửa thành công", dataNSX: dataNSX });
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi sửa nhà sản xuất" });
  }

}

const deleteNSX = async (req, res) => {
  let { mansx } = req.body
  await productsModel.deleteNSX(mansx)
  res.status(200).send({ message: "Xóa nhà sản xuất thành công!" });
}
// NSX

// SanPham
const getAllProduct = async (req, res) => {
  try {
    const product = await productsModel.getAllProduct();
    res.status(200).send({ product });
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách nhà sản xuất" });
  }
};
const getProductOfCategory = async (req, res) => {
  const maloai = req.params.maloai;
  console.log(maloai);
  try {
    const product = await productsModel.getProductOfCategory(maloai);
    res.status(200).send({ product });
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách nhà sản xuất" });
  }

};
const getProduct8 = async (req, res) => {
  try {
    const product = await productsModel.getProduct8();
    res.status(200).send({ product });
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
  }
};
const getProduct_Hot8 = async (req, res) => {
  try {
    const product = await productsModel.getProduct_Hot8();
    res.status(200).send({ product });
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
  }
};
const getProduct5 = async (req, res) => {
  try {
    const product = await productsModel.getProduct5();
    res.status(200).send({ product });
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
  }
};

const getProduct12 = async (req, res) => {
  try {
    const product = await productsModel.getProduct12();
    res.status(200).send({ product });
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
  }
};

const detailProduct = async (req, res) => {
  const { masp, mabienthe } = req.body; // mabienthe is optional for initial load
  try {
    const dataProduct = await productsModel.detailProduct(masp, mabienthe); // Fetch base product or specific variant
    const images = await productsModel.getProductImages(masp); // Fetch all images
    const variants = await productsModel.getProductVariants(masp); // Fetch all variants

    res.status(200).send({
      message: "Lấy chi tiết sản phẩm thành công!",
      dataProduct,
      images,
      variants, // Include all variants
    });
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết sản phẩm" });
  }
};

const getRecommendations = async (req, res) => {
  try {
    console.log('Full query:', req.query); // Log toàn bộ req.query
    const { maloai } = req.query;

    console.log('Received parameter:', { maloai });

    if (!maloai) {
      return res.status(400).json({
        error: 'Mã loại là bắt buộc'
      });
    }

    const recommendedProducts = await productsModel.getRecommendedProducts(maloai);

    if (!recommendedProducts || recommendedProducts.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm nào' });
    }

    return res.status(200).json(recommendedProducts);
  } catch (error) {
    console.error('Error in getRecommendations:', error.message);
    return res.status(500).json({ error: 'Lỗi server nội bộ: ' + error.message });
  }
};



const insertProducts = async (req, res) => {
  let {
    masp, tensp, maloai, ttct, mansx,
    loaibienthe, cobienthe, gia, soluongsp,
  } = req.body;

  const images = req.files || [];
  const variants = req.body.variants ? JSON.parse(req.body.variants) : [];

  try {
    if (!masp || !tensp || !maloai || !ttct || !mansx) {
      return res.status(400).json({ message: "Thiếu thông tin sản phẩm" });
    }

    if (images.length === 0) {
      return res.status(400).json({ message: "Vui lòng chọn ít nhất một ảnh sản phẩm" });
    }

    cobienthe = cobienthe === 'true' || cobienthe === true;
    console.log('Normalized cobienthe:', cobienthe); // Log normalized cobienthe
    gia = cobienthe ? null : (gia === '' || gia === 'null' ? null : Number(gia));
    soluongsp = cobienthe ? null : (soluongsp === '' || soluongsp === 'null' ? null : Number(soluongsp));
    loaibienthe = cobienthe ? loaibienthe || null : null;

    if (cobienthe) {
      if (!loaibienthe) {
        return res.status(400).json({ message: "Vui lòng cung cấp loại biến thể" });
      }
      if (!Array.isArray(variants) || variants.length === 0) {
        return res.status(400).json({ message: "Vui lòng cung cấp ít nhất một biến thể" });
      }
      for (const variant of variants) {
        if (!variant.mabienthe || !variant.gia || !variant.thuoc_tinh) {
          return res.status(400).json({ message: "Thiếu thông tin biến thể" });
        }
        if (isNaN(Number(variant.gia)) || isNaN(Number(variant.soluongtonkho))) {
          return res.status(400).json({ message: "Giá và số lượng tồn kho phải là số" });
        }
      }
    }

    console.log('Inserting product with data:', { masp, tensp, maloai, ttct, mansx, loaibienthe, cobienthe, gia, soluongsp });
    await productsModel.insertProducts(masp, tensp, maloai, ttct, mansx, loaibienthe, cobienthe, gia, soluongsp);

    const imageNames = images.map(file => file.originalname);
    console.log('Inserting images:', imageNames);
    await productsModel.insertProductImages(masp, imageNames);

    if (cobienthe) {
      console.log('Processing variants:', variants);
      for (const variant of variants) {
        const { mabienthe, gia, soluongtonkho, thuoc_tinh } = variant;
        console.log('Inserting variant:', { mabienthe, masp, gia: Number(gia), soluongtonkho: Number(soluongtonkho) });
        await productsModel.insertVariant(mabienthe, masp, Number(gia), Number(soluongtonkho));
        console.log('Inserting variant property:', { mabienthe, loaibienthe, thuoc_tinh });
        await productsModel.insertVariantProperty(mabienthe, loaibienthe, thuoc_tinh);
      }
    }

    return res.status(200).json({ message: 'Thêm sản phẩm thành công!' });
  } catch (error) {
    console.error('Error inserting product:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm sản phẩm', error: error.message });
  }
};

const getVariant = async (req, res) => {
  const masp = req.params.masp;
  try {
    const variants = await productsModel.getVariants(masp);
    if (!variants || variants.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy biến thể cho sản phẩm này' });
    }
    return res.status(200).json({ variants });
  } catch (error) {
    console.error('Error fetching variants:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy biến thể', error: error.message });
  }
};

const editProduct = async (req, res) => {
  let { masp, tensp, maloai, ttct, soluongsp, gia, mansx, loaibienthe, cobienthe, updatedImages, variants } = req.body;
  const images = req.files || [];
console.log(cobienthe)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const uploadDir = path.join(__dirname, `../Uploads/${masp}`);

  try {
    if (!maloai || maloai === 'Loại sản phẩm') {
      return res.status(400).json({ message: 'Chưa chọn loại sản phẩm' });
    }
    if (!mansx || mansx === 'Nhà sản xuất') {
      return res.status(400).json({ message: 'Chưa chọn nhà sản xuất' });
    }

    const existingProduct = await productsModel.getProductById(masp);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    cobienthe = cobienthe === 'true' || cobienthe === true || cobienthe === '1' || cobienthe === 1;
    gia = cobienthe ? null : (gia === '' || gia === 'null' ? null : Number(gia));
    soluongsp = cobienthe ? null : (soluongsp === '' || soluongsp === 'null' ? null : Number(soluongsp));
    loaibienthe = cobienthe ? loaibienthe || null : null;

    let parsedVariants = [];
    if (cobienthe) {
      if (!loaibienthe) {
        return res.status(400).json({ message: 'Vui lòng cung cấp loại biến thể' });
      }
      parsedVariants = variants ? JSON.parse(variants) : [];
      if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
        return res.status(400).json({ message: 'Vui lòng cung cấp ít nhất một biến thể' });
      }
      for (const variant of parsedVariants) {
        if (!variant.mabienthe || !variant.gia || !variant.thuoc_tinh) {
          return res.status(400).json({ message: 'Thiếu thông tin biến thể' });
        }
        if (isNaN(Number(variant.gia)) || isNaN(Number(variant.soluongtonkho))) {
          return res.status(400).json({ message: 'Giá và số lượng tồn kho phải là số' });
        }
      }
    }

    let imageUpdates = [];
    if (images.length > 0) {
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const parsedUpdatedImages = updatedImages ? JSON.parse(updatedImages) : [];

      for (const image of images) {
        const fileExtension = path.extname(image.originalname).toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
          for (const img of images) {
            const filePath = path.join(uploadDir, img.originalname);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          }
          return res.status(400).json({ message: 'Vui lòng upload hình ảnh (JPG, JPEG, PNG, GIF)' });
        }
      }

      parsedUpdatedImages.forEach((update) => {
        if (update.oldImage && images.length > 0) {
          imageUpdates.push({
            oldImage: update.oldImage,
            newImage: images[0].originalname,
          });
          const oldImagePath = path.join(uploadDir, update.oldImage);
          if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
      });
    }

    await productsModel.editProduct(masp, tensp, ttct, soluongsp, gia, maloai, mansx, loaibienthe, cobienthe);

    if (imageUpdates.length > 0) {
      await productsModel.updateProductImages(masp, imageUpdates);
    }

    if (cobienthe) {
      await productsModel.updateVariants(masp, parsedVariants, loaibienthe);
    } else {
      await productsModel.deleteVariants(masp);
    }

    res.status(200).json({ message: 'Sửa sản phẩm thành công!' });
  } catch (error) {
    console.error('Error updating product:', error);
    if (images.length > 0) {
      for (const img of images) {
        const filePath = path.join(uploadDir, img.originalname);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({ message: 'Đã xảy ra lỗi khi sửa sản phẩm', error: error.message });
  }
};

const getProductImages = async (req, res) => {
  try {
    const images = await productsModel.getProductImages(req.params.masp);
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách ảnh' });
  }
}


const deleteProduct = async (req, res) => {
  try {
    const { masp } = req.body;
    const uploadDir = `./src/uploads/${masp}`;
    const checkbienthe = await productsModel.getProductById(masp);
    if (fs.existsSync(uploadDir)) {
      fs.rmSync(uploadDir, { recursive: true, force: true }); 
    }
    if (checkbienthe.cobienthe === 1 || checkbienthe.cobienthe === true || checkbienthe.cobienthe === 'true' || checkbienthe.cobienthe === '1') {
      await productsModel.deleteVariants(masp);
      await productsModel.deleteImgProduct(masp);
    await productsModel.deleteProduct(masp);
    } else {
      await productsModel.deleteImgProduct(masp);
    await productsModel.deleteProduct(masp);
    }


    res.status(200).send({ message: "Xóa nhà sản xuất thành công!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Có lỗi xảy ra khi xóa sản phẩm!" });
  }
};

// CartAdmin
const getAllCart = async (req, res) => {
  let listCart = await productsModel.getAllCart();
  res.render('home', { data: { title: 'cart', page: 'cart', listCarts: listCart } });
}
const getAllDetailCart = async (req, res) => {
  let id = req.params.id
  let detailCart = await productsModel.getAllDetailCart(id)
  console.log(detailCart)
  res.render('home', { data: { title: 'Detail Cart', page: 'detailCart', detailCarts: detailCart } })
}
const updateCart = async (req, res) => {
  const { trangthai, madh } = req.body;

  try {
    // Gọi hàm cập nhật trong productsModel
    const listOrder = await productsModel.getAllDetailCart(madh);
    console.log(listOrder);

    if (!Array.isArray(listOrder) || listOrder.length === 0) {
      return res.status(400).send({ message: "Không hợp lệ." });
    }
    if (trangthai === 'Đã hủy') {
      await productsModel.updateCart(trangthai, madh);
      return res.status(400).send({ message: "Đơn hàng đã bị hủy." });
    }
    if (trangthai === 'Đang giao') {
      await productsModel.updateCart(trangthai, madh);
    }
    if (trangthai === 'Đã giao') {
      await productsModel.updateCart(trangthai, madh);
    }
    if (trangthai === 'Đã xác nhận') {
      await Promise.all(
        listOrder.map(async (order) => {
          const productQuatity = await productsModel.detailProduct(order.masp);
          if (productQuatity.soluongsp < order.soluong) {
            throw new Error("Số lượng sản phẩm không đủ.");
          } else {
            await productsModel.updateQuantity(order.masp, madh);
          }
        })
      );
      await productsModel.updateCart(trangthai, madh);

    }

    // Gửi phản hồi về client
    res.json({ success: true, message: 'Cập nhật trạng thái thành công' });
  } catch (error) {
    console.error('Error updating cart:', error);

    // Kiểm tra lỗi do số lượng sản phẩm không đủ
    if (error.message === "Số lượng sản phẩm không đủ.") {
      return res.status(400).send({ message: error.message });
    }

    // Gửi phản hồi lỗi về client cho các lỗi khác
    res.status(500).json({ success: false, message: 'Cập nhật trạng thái thất bại' });
  }
};

const getAllAPICart = async (req, res) => {
  const madh = req.params.madh;
  let listOrder = await productsModel.getAllDetailCart(madh);
  return res.status(200).json({ order: listOrder });
}
const getCartAPI = async (req, res) => {
  const username = req.params.username;
  let listCart = await productsModel.getCartAPI(username);
  return res.status(200).json({ cartAPI: listCart });
}

// cart
const insertCart = async (req, res) => {
  try {
    const { madh, username, ngaydat, trangthai, tonggia, diachinhanhang } = req.body;

    if (!madh || !username || !ngaydat || !trangthai || !tonggia || !diachinhanhang) {
      return res.status(400).send({ message: "Thiếu thông tin đặt hàng." });
    }
    await productsModel.insertCart(madh, username, ngaydat, trangthai, tonggia, diachinhanhang);
    res.status(200).send({ message: "Đơn hàng đã được lưu thành công!" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send({ message: "Đã xảy ra lỗi khi lưu đơn hàng." });
  }
};

const insertDetailCart = async (req, res) => {
  const orderDetails = req.body;
  console.log("Order details received:", orderDetails);

  try {

    if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
      return res.status(400).send({ message: "Chi tiết đơn hàng không hợp lệ." });
    }
    await Promise.all(
      orderDetails.map(detail => {
        const { madh, masp, gia, soluong } = detail;
        if (!madh || !masp || !gia || !soluong) {
          throw new Error("Thông tin chi tiết đơn hàng không đầy đủ.");
        }
        return productsModel.insertDetailCart(madh, masp, gia, soluong);
      })
    );

    res.status(200).send({ message: "Chi tiết đơn hàng đã được lưu thành công!" });
  } catch (error) {
    console.error("Error saving order details:", error);
    res.status(500).send({ message: "Đã xảy ra lỗi khi lưu chi tiết đơn hàng." });
  }
};

// Chatbox

// Những từ khoá để gợi ý sản phẩm

const triggerKeywords = ['tìm', 'muốn', 'mua', 'cho', 'kiếm', 'xem', 'tư vấn', 'gợi ý', 'giới thiệu', 'cần'];

// Bot đang hỏi thêm thông tin không?
const isAskingForInfo = (reply) => {
  const keywords = ['loại da', 'bạn là gì', 'bạn muốn', 'hãy chọn', 'cần thêm thông tin', 'bạn đang tìm'];
  return keywords.some(kw => reply.toLowerCase().includes(kw));
};

// Kiểm tra đủ thông tin để gợi ý
const hasEnoughCriteria = (params) => {
  return params.category || params.brand || params.skinType;
};

const chatbot = async (req, res) => {
  const { message, action, sessionId } = req.body;

  try {
    if (!sessionId) {
      return res.status(400).json({ reply: "Thiếu sessionId!" });
    }

    const sessionData = getSession(sessionId);

    let reply = "";
    let products = [];
    let showSuggestionButton = false;
    let needMoreInfo = false;

    // 🟢 Nếu người dùng nhấn "Xem gợi ý sản phẩm"
    if (action === 'suggest_products') {
      const params = sessionData.parameters;

      if (hasEnoughCriteria(params)) {
        products = await productsModel.getProductsByCriteria(params);

        reply = products.length > 0
          ? `Dưới đây là một số sản phẩm mình gợi ý cho bạn:`
          : `Xin lỗi, mình không tìm thấy sản phẩm phù hợp.`;

        clearSession(sessionId);   // 🛑 Reset session sau khi gợi ý

      } else {
        reply = `Tôi chưa có đủ thông tin để gợi ý sản phẩm cho bạn.`;
        needMoreInfo = true;
      }

      return res.json({
        reply,
        products,
        showSuggestionButton: false,
        needMoreInfo
      });
    }

    // 🟢 Xử lý hội thoại bình thường
    const result = message === "__welcome__"
      ? await detectIntent("welcome", sessionId)
      : await detectIntent(message, sessionId);

    reply = result.fulfillmentText || "Xin lỗi, tôi chưa hiểu câu hỏi của bạn.";

    const newParams = result.parameters?.fields || {};

    // Lưu trữ parameters vào session
    if (newParams.category?.stringValue)
      sessionData.parameters.category = newParams.category.stringValue;
    if (newParams.brand?.stringValue)
      sessionData.parameters.brand = newParams.brand.stringValue;
    if (newParams.producer?.stringValue)
      sessionData.parameters.brand = newParams.producer.stringValue;
    if (newParams.skinType?.stringValue)
      sessionData.parameters.skinType = newParams.skinType.stringValue;

    const đủTiêuChí = hasEnoughCriteria(sessionData.parameters);

    // Nếu bot đang hỏi thêm thông tin
    if (reply.toLowerCase().includes('loại da') || reply.toLowerCase().includes('bạn là gì')) {
      needMoreInfo = true;
    }

    if (đủTiêuChí && !needMoreInfo) {
      showSuggestionButton = true;  // ✅ Hiện nút gợi ý
    }

    return res.json({
      reply,
      products: [],
      showSuggestionButton,
      needMoreInfo
    });

  } catch (error) {
    console.error('Chatbot controller error:', error);
    return res.status(500).json({ reply: "Lỗi máy chủ. Vui lòng thử lại sau!" });
  }
};



export default {
  getCategory, getCartAPI, updateCart,
  getAllAPICart, getAllCart, insertCart,
  insertDetailCart, getAllDetailCart,
  insertCategory,
  getProduct8, getProduct12, getProduct5,
  getVariant,
  editCategory,
  getOneCategory,
  getNSX,
  deleteCategory, detailCategory,
  insertNSX, editNSX, getAllNSX,
  detailNSX, deleteNSX, insertProducts,
  getAllProduct, editProduct,
  detailProduct, deleteProduct,
  getProductImages,
  getRecommendations,
  getProductOfCategory,
  getProduct_Hot8,
  chatbot
}