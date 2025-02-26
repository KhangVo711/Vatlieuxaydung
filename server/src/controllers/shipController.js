import express from "express";
import shipModel from "../services/shipModel.js";
const getOneShip = async (req, res) => {
    const madvvc = req.body;
    try {
        const ship = await shipModel.getShip(madvvc)
        res.status(200).send({ ship: ship });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
    }
}
const getAllShip = async (req, res) => {
    try {
        const ships = await shipModel.getAllShip();
        res.status(200).send({ delivery: ships });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
    }
}
const addShip = async (req, res) => {
    const { madvvc, tendvvc, phivanchuyen } = req.body;
    try {
        const ship = await shipModel.addShip(madvvc, tendvvc, phivanchuyen);
        res.status(200).send({ message: "Thêm thành công" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi thêm sản phẩm" });
    }
}
const editShip = async (req, res) => {
    const { madvvc, tendvvc, phivanchuyen } = req.body;
    try {
        const ship = await shipModel.editShip(madvvc, tendvvc, phivanchuyen);
        res.status(200).send({ message: "Sửa thành công" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi sửa sản phẩm" });
    }
}
const deleteShip = async (req, res) => {
    const madvvc = req.body.madvvc;
    console.log(madvvc);
    try {
        const ship = await shipModel.deleteShip(madvvc);
        res.status(200).send({ message: "Xóa thành công" });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi xóa sản phẩm" });
    }
}

export default {
    getOneShip,
    getAllShip,
    addShip,
    editShip,
    deleteShip
};