import express from "express";
import connectDB from "../configs/connectDB.js";
import invoiceModel from "../services/invoiceModel.js"
import productsModel from "../services/productsModel.js";
const insertInvoice = async (req, res) => {
    try {
        const { mapn, ngaylap, tenpn, maql, manv } = req.body;
        if (!mapn || !ngaylap || !tenpn || (!maql && !manv)) {
            return res.status(400).send({ message: "Thiếu thông tin." });
        }
        const nameInvoice = /^[\p{L}\p{N}\s]+$/u;
        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(tenpn)) {
            return res.status(400).send({ message: "Tên phiếu nhập không hợp lệ." });
        }
        if (!nameInvoice.test(tenpn)) {
            return res.status(400).send({ message: "Tên phiếu nhập không hợp lệ." });
        }
        await invoiceModel.insertInvoice(mapn, tenpn, ngaylap, maql, manv);
        res.status(200).send({ message: "Phiếu nhập thêm thành công!" });
    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi thêm phiếu nhập." });
    }
};

const insertDetailInvoice = async (req, res) => {
  const invoiceDetails = req.body;

  try {
    if (!Array.isArray(invoiceDetails) || invoiceDetails.length === 0) {
      return res.status(400).send({ message: "Danh sách chi tiết phiếu nhập không hợp lệ." });
    }

    const mapn = invoiceDetails[0].mapn;

    await Promise.all(
      invoiceDetails.map(async (detail) => {
        const { masp, mabienthe, soluongnhap, gianhap } = detail;

        if (!masp || !soluongnhap || !gianhap) {
          throw new Error("Thông tin chi tiết phiếu nhập không đầy đủ.");
        }
        if (isNaN(Number(soluongnhap)) || isNaN(Number(gianhap)) || Number(soluongnhap) <= 0 || Number(gianhap) <= 0) {
          throw new Error("Số lượng và đơn giá phải là số dương.");
        }

        const product = await productsModel.detailProduct(masp);
        if (!product) {
          throw new Error(`Sản phẩm ${masp} không tồn tại.`);
        }

        if (product.cobienthe === 1) {
          if (!mabienthe) {
            throw new Error(`Sản phẩm ${product.tensp} yêu cầu chọn biến thể.`);
          }
          const [variant] = await connectDB.execute(
            'SELECT mabienthe, soluongtonkho FROM cacbienthe WHERE mabienthe = ? AND masp = ?',
            [mabienthe, masp]
          );
          if (!variant.length) {
            throw new Error(`Biến thể ${mabienthe} không tồn tại cho sản phẩm ${masp}.`);
          }
        } else if (mabienthe) {
          throw new Error(`Sản phẩm ${product.tensp} không có biến thể.`);
        }

        const [producer] = await connectDB.execute(
          'SELECT tennsx FROM nhasanxuat WHERE mansx = (SELECT mansx FROM sanpham WHERE masp = ?)',
          [masp]
        );
        const tennsx = producer[0]?.tennsx;
        if (!tennsx) {
          throw new Error(`Không tìm thấy nhà sản xuất cho sản phẩm ${masp}.`);
        }

        await invoiceModel.insertDetailInvoice(mapn, masp, mabienthe, soluongnhap, gianhap, tennsx);

        if (product.cobienthe === 1) {
          await invoiceModel.updateVariantQuantity(mabienthe, soluongnhap);
        } else {
          await invoiceModel.updateQuantity(masp, soluongnhap);
        }
      })
    );

    const [rows] = await connectDB.execute(
      'SELECT SUM(soluongnhap * gianhap) AS tonggia FROM chitietphieunhap WHERE mapn = ?',
      [mapn]
    );
    const tonggia = rows[0].tonggia || 0;

    await connectDB.execute(
      'UPDATE phieunhap SET tonggia = ? WHERE mapn = ?',
      [tonggia, mapn]
    );

    res.status(200).send({ message: "Phiếu nhập chi tiết đã được lưu thành công!" });
  } catch (error) {
    console.error("Error inserting invoice details:", error);
    res.status(500).send({ message: "Đã xảy ra lỗi khi lưu phiếu nhập chi tiết.", error: error.message });
  }
};

const showInvoice = async (req, res) => {
    try {
        const result = await invoiceModel.showInvoice();
        res.status(200).send({result});

    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy dữ liệu." });
    }
};
const showDetailInvoice = async (req, res) => {
  const { mapn } = req.params;
  try {
    const detail = await invoiceModel.showDetailInvoice(mapn);
    if (detail && detail.length > 0) {
      res.status(200).json({ detail: detail });
    } else {
      res.status(404).send({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).send({ message: "Đã xảy ra lỗi khi lấy dữ liệu.", error: error.message });
  }
};

export default { insertInvoice, insertDetailInvoice, showInvoice, showDetailInvoice };
