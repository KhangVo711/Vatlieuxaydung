import express from "express";
import staffModel from "../services/staffModel.js";
import JWTAction from '../../middleware/jwt.js';
import jwt from 'jsonwebtoken';


const addStaff = async (req, res) => {
    try {
        const { manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong } = req.body;
        console.log(req.body);
        if (!manv || !tennv || !sdtnv || !emailnv || !diachinv || !chucvunv ) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }
        const staff = await staffModel.getStaff(manv);
        if (staff) {
            return res.status(400).json({ message: 'Mã nhân viên đã tồn tại' });
        }
        const result = await staffModel.addStaff(manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong);
        if (!result) {
            return res.status(400).json({ message: 'Thêm nhân viên thất bại' });
        }
        return res.status(200).json({ message: 'Thêm nhân viên thành công' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}

const loginStaff = async (req, res) => {
    try {
        const { manv } = req.body;
        
        if (!manv) {
            return res.status(400).json({ message: 'Vui lòng nhập mã nhân viên' });
        }
        const acc = await staffModel.getStaff(manv);
        if (!manv) {
            return res.status(400).json({ message: 'Mã nhân viên không tồn tại' });
        }
       
        const payload = {
            manv: acc.manv,
            tennv: acc.tennv,
            sdtnv: acc.sdtnv,
            emailnv: acc.emailnv,
            diachinv: acc.diachinv,
            chucvunv: acc.chucvunv,
            tongluong: acc.tongluong
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.cookie("staff", token, { path: "/", httpOnly: false, secure: false, sameSite: 'Lax' });

        return res.status(200).json({ message: 'Đăng nhập thành công', token, staff: acc });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}

const getAllStaff = async (req, res) => {
    try {
        const staff = await staffModel.getAllStaff();
        return res.status(200).json({ staff });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}

const editStaff = async (req, res) => {
    try {
        const { manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong } = req.body;
        if (!manv || !tennv || !sdtnv || !emailnv || !diachinv || !chucvunv) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }
        const staff = await staffModel.getStaff(manv);
        if (!staff) {
            return res.status(400).json({ message: 'Nhân viên không tồn tại' });
        }
        const result = await staffModel.updateStaff(manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong);
        if (!result) {
            return res.status(400).json({ message: 'Sửa nhân viên thất bại' });
        }
        return res.status(200).json({ message: 'Sửa nhân viên thành công' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}

const deleteStaff = async (req, res) => {
    try {
        const { manv } = req.body;
       
        const staff = await staffModel.getStaff(manv);
        if (!staff) {
            return res.status(400).json({ message: 'Nhân viên không tồn tại' });
        }
        const result = await staffModel.deleteStaff(manv);
        if (!result) {
            return res.status(400).json({ message: 'Xóa nhân viên thất bại' });
        }
        return res.status(200).json({ message: 'Xóa nhân viên thành công' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}

export default { loginStaff, addStaff, getAllStaff, editStaff, deleteStaff };