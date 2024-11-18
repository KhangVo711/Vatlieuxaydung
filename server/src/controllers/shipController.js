import express from "express";
import shipModel from "../services/shipModel.js";
const getShip = async (req, res) => {
    try {
        const ship = await shipModel.getShip()
        res.status(200).send({ ship: ship });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
    }
}

export default {
    getShip
};