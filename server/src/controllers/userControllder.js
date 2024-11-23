import express from "express";
import bcrypt, { hash } from "bcrypt";
import userModel from '../services/userModel.js';
import JWTAction from '../../middleware/jwt.js';
import jwt from 'jsonwebtoken';

// ----------------------------------------------------

// Đăng ký tài khoản
const insertUser = async (req, res) => {
    try {
        const { fullname, email, phone, password, repassword } = req.body;
        const { id } = req.params;
        if (!fullname || !password || (!phone && !email)) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }

        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(fullname)) {
            return res.status(400).json({ message: 'Tên không được chứa khoảng trắng ở đầu' });
        }
        const fullnameRegex = /^[\p{L}\s]+$/u;
        if (!fullnameRegex.test(fullname)) {
            return res.status(400).json({ message: 'Tên không được chứa ký tự đặc biệt hoặc số' });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email không đúng định dạng' });
        }
        const phoneRegex = /^\d{10,11}$/;
        if (phone && !phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Số điện thoại phải là số có độ dài từ 10 đến 11 ký tự' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
        }
        const acc = await userModel.getUser(email, phone);
        if (acc) {
            return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
        }
        if (password !== repassword) {
            return res.status(400).json({ message: 'Mật khẩu không khớp' });
        }
        const emailValue = email === '' ? null : email;
        const phoneValue = phone === '' ? null : phone;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await userModel.insertUser(fullname, id, emailValue, phoneValue, hashedPassword);

        res.status(200).json({ message: 'Đăng kí thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// ----------------------------------------------------

// Đăng nhập
const getUser = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        if (!password || (!phone && !email)) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }
        const phoneRegex = /^\d{10,11}$/;
        if (phone && !phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Số điện thoại phải là số có độ dài từ 10 đến 11 ký tự' });
        }
        const acc = await userModel.getUser(email, phone);
        if (!acc) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại' });
        }
        const isPasswordMatch = await bcrypt.compare(password, acc.matkhau);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }
        console.log(acc);
        const payload = {};

        if (acc.email === null || acc.sdt === null) {
            if (acc.email === null) {
                payload.fullname = acc.tenkh;
                payload.id = acc.makh
                payload.phone = acc.sdt;
                payload.address = acc.diachi;
            }
            if (acc.sdt === null) {
                payload.fullname = acc.tenkh;
                payload.id = acc.makh
                payload.email = acc.email;
                payload.address = acc.diachi;
            }
        } else {
            payload.fullname = acc.tenkh;
            payload.id = acc.makh
            payload.email = acc.email;
            payload.phone = acc.sdt;
            payload.address = acc.diachi;

        }

        console.log(payload)

        const token = JWTAction.createJWT(payload);
        console.log(token);
        res.cookie("jwt", token, { path: "/", httpOnly: false, secure: false, sameSite: 'Lax' });

        return res.status(200).json({ message: 'Đăng nhập thành công', token, user: acc });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
};

// ----------------------------------------------------

const getInf = async (req, res) => {
    let id = req.params.id;

    const acc = await userModel.getInf(id);
    res.status(200).json({ infomation: acc });
}
// ----------------------------------------------------
// Cập nhật thông tin cá nhân
const updateInf = async (req, res) => {
    try {
        let id = req.params.id;

        const { fullname, email, phone, address } = req.body;
        const acc = await userModel.getInf(id);

        const idPattern = /^[^\s].*$/;
        const fullnameRegex = /^[\p{L}\p{N}\s]+$/u;

        if (!idPattern.test(fullname)) {
            return res.status(400).json({ message: 'Tên không được chứa khoảng trắng ở đầu' });
        }
        if (!fullnameRegex.test(fullname)) {
            return res.status(400).json({ message: 'Tên không được chứa ký tự đặc biệt.' });
        }
        if (!idPattern.test(address)) {
            return res.status(400).json({ message: 'Địa chỉ không được chứa khoảng trắng ở đầu' });
        }
        // if (!fullnameRegex.test(address)) {
        //     return res.status(400).json({ message: 'Địa chỉ không được chứa ký tự đặc biệt.' });
        // }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email không đúng định dạng' });
        }
        if (!idPattern.test(phone)) {
            return res.status(400).json({ message: 'Số điện thoại không được chứa khoảng trắng ở đầu' });
        }
        const phoneRegex = /^\d{10,11}$/;
        if (phone && !phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Số điện thoại phải là số có độ dài từ 10 đến 11 ký tự' });
        }
        if (email === acc.email && phone !== acc.sdt) {
            const checkPhone = await userModel.getUserWithPhone(phone);
            if (checkPhone) {
                return res.status(400).json({ message: 'Số điện thoại đã tồn tại' });
            }
            await userModel.updateInf(fullname, id, email, phone, address);
            return res.status(200).json({ message: 'Cập nhật thành công' });

        }
        if (email !== acc.email && phone === acc.sdt) {
            const checkEmail = await userModel.getUserWithEmail(email);
            if (checkEmail) {
                return res.status(400).json({ message: 'Email đã tồn tại' });
            }
            await userModel.updateInf(fullname, id, email, phone, address);
            return res.status(200).json({ message: 'Cập nhật thành công' });
        }
        if (email !== acc.email && phone !== acc.sdt) {
            const checkEmail = await userModel.getUserWithPhone(email);
            const checkPhone = await userModel.getUserWithPhone(phone);

            if (checkEmail || checkPhone) {
                return res.status(400).json({ message: 'Email hoặc số điện thoại đã tồn tại' });
            }

            await userModel.updateInf(fullname, id, email, phone, address);
            return res.status(200).json({ message: 'Cập nhật thành công' });
        }
        if (email === acc.email && phone === acc.sdt) {
            await userModel.updateInf(fullname, id, email, phone, address);
            return res.status(200).json({ message: 'Cập nhật thành công' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
};
const changePassword = async (req, res) => {
    try {
        let id = req.params.id;
        const { password, newpassword, renewpassword } = req.body;
        const acc = await userModel.getInf(id);
        if (!password || !newpassword || !renewpassword) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }
        const isPasswordMatch = await bcrypt.compare(password, acc.matkhau);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }
        const isNewPasswordMatch = await bcrypt.compare(newpassword, acc.matkhau);

        if (isNewPasswordMatch) {
            return res.status(401).json({ message: 'Mật khẩu mới phải khác mật khẩu cũ' });
        }
        if (newpassword !== renewpassword) {
            return res.status(400).json({ message: 'Mật khẩu không khớp' });
        }
        if (newpassword.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        await userModel.changePassword(hashedPassword, id);
        return res.status(200).json({ message: 'Cập nhật thành công' });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { phone, email, password } = req.body;
        if (!phone || !email || !password) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }
        const acc = await userModel.getAdmin(phone, email);
        if (!acc) {
            return res.status(400).json({ message: 'Sai Email hoặc số điện thoại' });
        }
        const isPasswordMatch = await bcrypt.compare(password, acc.matkhau);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }
        const payload = {
            maql: acc.maql,
            tenql: acc.tenql,
            sdt: acc.sdt,
            email: acc.email,
            diachi: acc.diachi,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.cookie("admin", token, { path: "/", httpOnly: false, secure: false, sameSite: 'Lax' });

        return res.status(200).json({ message: 'Đăng nhập thành công', token, admin: acc });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
}

export default { getInf, insertUser, getUser, updateInf, changePassword, loginAdmin };
