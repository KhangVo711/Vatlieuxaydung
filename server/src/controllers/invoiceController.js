import express from "express";
import invoiceModel from "../services/invoiceModel.js"
import productsModel from "../services/productsModel.js";
const insertInvoice = async (req, res) => {
    try {
        const { mapn, ngaylap, tenpn, maql, manv } = req.body;
        console.log(maql);
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
    const invoiceDetail = req.body;

    try {

        if (!Array.isArray(invoiceDetail) || invoiceDetail.length === 0) {
            return res.status(400).send({ message: "Không hợp lệ." });
        }
        await Promise.all(
            invoiceDetail.map(async (detail) => {
                const { soluong, dongia, masp, mapn } = detail;
                if (!soluong || !dongia || !masp || !mapn) {
                    throw new Error("Thông tin chi tiết phiếu nhập không đầy đủ.");
                }
                const resProducer = await invoiceModel.getNameProducer(masp);
                const tennsx = resProducer.tennsx;

                const product = await productsModel.detailProduct(masp);
                const tensp = product.tensp;
                if (!resProducer) {
                    throw new Error(`Không tìm thấy nhà sản xuất cho sản phẩm `);
                }
                const idPattern = /^[^\s].*$/;
                if (!idPattern.test(soluong) || !idPattern.test(dongia) || !idPattern.test(masp) || !idPattern.test(mapn)) {
                    throw new Error(`Có lỗi! Vui lòng kiểm tra lại ${masp}`);
                }
                if (isNaN(Number(soluong))) {
                    throw new Error(`Số lượng sản phẩm ${tensp} không phải số.`);
                }

                if (isNaN(Number(dongia))) {
                    throw new Error(`Đơn giá của sản phẩm ${tensp} không phải số.`);
                }
                if (soluong <= 0 || dongia <= 0) {
                    throw new Error("Số lượng và đơn giá phải lớn hơn 0.");
                }
                await invoiceModel.insertDetailInvoice(mapn, masp, soluong, dongia, tennsx);
                await invoiceModel.updateQuantity(masp, mapn);
            })
        );

        res.status(200).send({ message: "Phiếu nhập đã được lưu thành công!" });
    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lưu phiếu nhập.", error: error.message });
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
    const {mapn} = req.params;
    try {
        const detail = await invoiceModel.showDetailInvoice(mapn);
        if (detail) {
            res.status(200).json({ detail: detail });
        } else {
            res.status(404).send('Invoice not found');
        }

    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy dữ liệu." });
    }
};

export default { insertInvoice, insertDetailInvoice, showInvoice, showDetailInvoice };
