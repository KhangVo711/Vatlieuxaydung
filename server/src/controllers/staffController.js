import express from "express";
import staffModel from "../services/staffModel.js";
import JWTAction from '../../middleware/jwt.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from "bcrypt";


const addStaff = async (req, res) => {
    try {
        const { manv, tennv, sdtnv, emailnv, diachinv, chucvunv, matkhau, tongluong } = req.body;
        console.log(req.body);

        if (!manv || !tennv || !sdtnv || !emailnv || !diachinv || !chucvunv || !matkhau) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        const staff = await staffModel.getStaff(manv);
        if (staff) {
            return res.status(400).json({ message: 'Mã nhân viên đã tồn tại' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(matkhau, salt);

        const result = await staffModel.addStaff(manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong, hashedPassword);
        if (!result) {
            return res.status(400).json({ message: 'Thêm nhân viên thất bại' });
        }

        return res.status(200).json({ message: 'Thêm nhân viên thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
};


const loginStaff = async (req, res) => {
    try {
        const { emailnv, sdtnv, matkhau } = req.body;

        // Kiểm tra xem có ít nhất một trong hai (emailnv hoặc sdtnv) và matkhau được cung cấp
        if ((!emailnv && !sdtnv) || !matkhau) {
            return res.status(400).json({ 
                message: 'Vui lòng điền đầy đủ thông tin' 
            });
        }

        // Lấy thông tin nhân viên dựa trên emailnv hoặc sdtnv
        const acc = emailnv 
            ? await staffModel.getStaffByEmail(emailnv) 
            : await staffModel.getStaffByPhone(sdtnv);

        if (!acc) {
            return res.status(400).json({ 
                message: emailnv ? 'Sai Email' : 'Sai số điện thoại' 
            });
        }

        // So sánh mật khẩu
        const isPasswordMatch = await bcrypt.compare(matkhau, acc.matkhau);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        // Tạo payload cho JWT
        const payload = {
            manv: acc.manv,
            tennv: acc.tennv,
            sdtnv: acc.sdtnv,
            emailnv: acc.emailnv,
            diachinv: acc.diachinv,
            chucvunv: acc.chucvunv,
            tongluong: acc.tongluong
        };

        // Tạo token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.cookie("staff", token, { 
            path: "/", 
            httpOnly: false, 
            secure: false, 
            sameSite: 'Lax' 
        });

        return res.status(200).json({ 
            message: 'Đăng nhập thành công', 
            token, 
            staff: acc 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
};


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
// Lấy danh sách ca làm việc
const getAllShifts = async (req, res) => {
    try {
        const shifts = await staffModel.getAllShifts();
        return res.status(200).json({ shifts });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}

const addShift = async (req, res) => {
    try {
        const { maca, tenca, luongmoca, thuong, chiphaphatsinh, giovao, giora, staff } = req.body;

        // Kiểm tra thông tin đầu vào
        if (!maca || !tenca || !giovao || !giora || !staff || !staff.length) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        // Kiểm tra mã ca đã tồn tại chưa
        const existingShift = await staffModel.getShiftById(maca);
        if (existingShift) {
            return res.status(400).json({ message: 'Mã ca đã tồn tại' });
        }

        // Thêm ca làm việc
        await staffModel.addShift(
            maca,
            tenca,
            luongmoca || 0,
            thuong || 0,
            chiphaphatsinh || 0,
            giovao,
            giora,
        );

        // Thêm nhân viên vào ca làm việc qua bảng trung gian
        for (const manv of staff) {
            const staffExists = await staffModel.getStaffById(manv);
            if (!staffExists) {
                return res.status(400).json({ message: `Nhân viên ${manv} không tồn tại` });
            }
            await staffModel.addStaffToShift(manv, maca);
        }

        return res.status(200).json({ message: 'Thêm ca làm thành công' });
    } catch (error) {
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
const removeStaffFromShift = async (req, res) => {
    try {
        const { manv, maca } = req.body;

        if (!manv || !maca) {
            return res.status(400).json({ message: 'Vui lòng cung cấp manv và maca' });
        }

        const shift = await staffModel.getShiftById(maca);
        if (!shift) {
            return res.status(404).json({ message: 'Ca làm không tồn tại' });
        }

        const staff = await staffModel.getStaffById(manv);
        if (!staff) {
            return res.status(404).json({ message: 'Nhân viên không tồn tại' });
        }

        await staffModel.removeStaffFromShift(manv, maca);

        const remainingStaff = await staffModel.getStaffByShift(maca);
        if (remainingStaff.length === 0) {
            await staffModel.deleteShift(maca);
        }

        return res.status(200).json({ message: 'Xóa nhân viên khỏi ca làm thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}
const updateShiftStaff  = async (req, res) => {
    try {
        const { maca, staff, luongmoca, thuong, chiphaphatsinh } = req.body;

        if (!maca || !staff || !staff.length) {
            return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin' });
        }

        const shift = await staffModel.getShiftById(maca);
        if (!shift) {
            return res.status(404).json({ message: 'Ca làm không tồn tại' });
        }

        await staffModel.removeAllStaffFromShift(maca);

        for (const manv of staff) {
            const staffExists = await staffModel.getStaffById(manv);
            if (!staffExists) {
                return res.status(400).json({ message: `Nhân viên ${manv} không tồn tại` });
            }
            await staffModel.addStaffToShift(manv, maca);
        }
        await staffModel.updateShift(maca, luongmoca, thuong, chiphaphatsinh);
        return res.status(200).json({ message: 'Cập nhật danh sách nhân viên thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}
export default { loginStaff, addStaff, getAllStaff, editStaff, deleteStaff, getAllShifts, addShift, removeStaffFromShift, updateShiftStaff };