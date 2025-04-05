import express from "express";
import contactModel from "../services/contactModel.js";
import e from "express";


const getContact = async (req, res) => {
    try {
        const order = await contactModel.getContact();
        res.status(200).send({order:order});
    } catch (error) {
        console.error("Error getting orders:", error);
        res.status(500).send({ message: "Lỗi khi lấy thông tin đơn hàng." });
    }
}

const insertContact = async (req, res) => {
    try {
        const { malienhe, hoten, email, sodienthoai, chude, noidung } = req.body;
        console.log(req.body)
        if (!malienhe || !hoten || !email || !sodienthoai || !chude || !noidung) {
            return res.status(400).send({ message: "Thiếu thông tin liên hệ." });
        }
        await contactModel.insertContact(malienhe, hoten, email, sodienthoai, chude, noidung);
        res.status(200).send({ message: "Đơn hàng đã được đặt thành công!" });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).send({ message: "Đặt hàng không thành công." });
    }
}
const deleteContact = async (req, res) => {
    try {
        const { malienhe } = req.body;
        if (!malienhe) {
            return res.status(400).send({ message: "Thiếu thông tin liên hệ." });
        }
        await contactModel.deleteContact(malienhe);
        res.status(200).send({ message: "Xóa liên hệ thành công!" });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).send({ message: "Xóa liên hệ không thành công." });
    }
};

const updateContact = async (req, res) => {
    try {
        const { malienhe, hoten, email, sodienthoai, chude, noidung } = req.body;
        if (!malienhe || !hoten || !email || !sodienthoai || !chude || !noidung) {
            return res.status(400).send({ message: "Thiếu thông tin liên hệ." });
        }
        await contactModel.updateContact(malienhe, hoten, email, sodienthoai, chude, noidung);
        res.status(200).send({ message: "Cập nhật liên hệ thành công!" });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).send({ message: "Cập nhật liên hệ không thành công." });
    }
}

const getContactById = async (req, res) => {
    try {
        const { malienhe } = req.params;
        if (!malienhe) {
            return res.status(400).send({ message: "Thiếu thông tin liên hệ." });
        }
        const order = await contactModel.getContactById(malienhe);
        res.status(200).send({order:order});
    } catch (error) {
        console.error("Error getting orders:", error);
        res.status(500).send({ message: "Lỗi khi lấy thông tin đơn hàng." });
    }
}

export default {
    getContact,
    insertContact,
    deleteContact,
    updateContact,
    getContactById
}