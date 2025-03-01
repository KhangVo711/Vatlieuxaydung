import express from "express";
import promoModel from "../services/promoModel.js";
const getOnePromo = async (req, res) => {
    const makm = req.body;
    try {
        const promo = await promoModel.getPromo(makm)
        res.status(200).send({ promo: promo });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách khuyến mãi" });
    }
}
const getAllPromo = async (req, res) => {
    try {
        const promo = await promoModel.getAllPromo();
        res.status(200).send({ promo: promo });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách khuyến mãi" });
    }
}
const addPromo = async (req, res) => {
    const { makm, tenkm, km, thoigianbatdaukm, thoigianketthuckm, masp } = req.body;
    try {
        const promo = await promoModel.addPromo(makm, tenkm, km, thoigianbatdaukm, thoigianketthuckm, masp);
        res.status(200).send({ message: "Thêm thành công" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi thêm khuyến mãi" });
    }
}
const editPromo = async (req, res) => {
    const { makm, tenkm, km, thoigianbatdaukm, thoigianketthuckm, masp } = req.body;
    try {
        const promo = await promoModel.editPromo(makm, tenkm, km, thoigianbatdaukm, thoigianketthuckm, masp);
        res.status(200).send({ message: "Sửa thành công" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi sửa khuyến mãi" });
    }
}
const deletePromo = async (req, res) => {
    const makm = req.body.makm;
    try {
        const promo = await promoModel.deletePromo(makm);
        res.status(200).send({ message: "Xóa thành công" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi xóa khuyến mãi" });
    }
}

export default {
    getOnePromo,
    getAllPromo,
    addPromo,
    editPromo,
    deletePromo
};