import express from "express";
import bcrypt, { hash } from "bcrypt";
import userModel from '../services/userModel.js';
import JWTAction from '../../middleware/jwt.js';
import jwt from 'jsonwebtoken';
import transporter from "../configs/mailConfig.js";


// ----------------------------------------------------

const generateRandomPassword = (length = 8) => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

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
        const discountCodes = await userModel.createDefaultDiscounts(id);

        res.status(200).json({ message: 'Đăng kí thành công', discountCodes: discountCodes.map((d) => d.code) });
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
        const { email, phone, password } = req.body;

        // Kiểm tra xem có ít nhất một trong hai (email hoặc phone) và password được cung cấp
        if ((!email && !phone) || !password) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin (email hoặc số điện thoại và mật khẩu)' });
        }

        // Lấy thông tin admin dựa trên email hoặc phone
        const acc = email 
            ? await userModel.getAdminByEmail(email) 
            : await userModel.getAdminByPhone(phone);

        if (!acc) {
            return res.status(400).json({ 
                message: email ? 'Sai Email' : 'Sai số điện thoại' 
            });
        }

        // So sánh mật khẩu
        const isPasswordMatch = await bcrypt.compare(password, acc.matkhau);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        // Tạo payload cho JWT
        const payload = {
            maql: acc.maql,
            tenql: acc.tenql,
            sdt: acc.sdt,
            email: acc.email,
            diachi: acc.diachi,
        };

        // Tạo token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.cookie("admin", token, { 
            path: "/", 
            httpOnly: false, 
            secure: false, 
            sameSite: 'Lax' 
        });

        return res.status(200).json({ 
            message: 'Đăng nhập thành công', 
            token, 
            admin: acc 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

const updateInfoAdmin = async (req, res) => {
  try {
    const { maql } = req.params;
    const { name, phone, address, email } = req.body;
    console.log(req.body);

    await userModel.updateAdminInfo(maql, name, phone, address, email);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const getAdminInfo = async (req, res) => {
  try {
    const { maql } = req.params;
    const admin = await userModel.getAdminById(maql);
    if (!admin) return res.status(404).json({ message: "Không tìm thấy quản lý" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
}

// Đổi mật khẩu
const changePasswordAdmin = async (req, res) => {
  try {
    const { maql } = req.params;
    const { oldPassword, newPassword } = req.body;
    const admin = await userModel.getAdminById(maql);

    if (!admin) return res.status(404).json({ message: "Không tìm thấy quản lý" });

    const match = await bcrypt.compare(oldPassword, admin.matkhau);
    if (!match) return res.status(400).json({ message: "Mật khẩu cũ không đúng" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await userModel.updateAdminPassword(maql, hashed);
    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng chọn ảnh để tải lên!" });
    }

    const avatarPath = `/uploads/avatar/${req.file.filename}`;
    
    await userModel.updateAvatar(role, id, avatarPath);

    const updatedUser = await userModel.getUserById(role, id);
    res.json({
      message: "Cập nhật ảnh đại diện thành công!",
      anhdaidien: updatedUser.anhdaidien,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi cập nhật ảnh đại diện!" });
  }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Vui lòng nhập email" });
        }

        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Email không hợp lệ" });
        }

        const user = await userModel.getUserWithEmail(email);

        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại" });
        }

        const newPassword = generateRandomPassword(10);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await userModel.updatePasswordByEmail(hashedPassword, email);

        await transporter.sendMail({
            from: `"Hệ thống hỗ trợ" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Khôi phục mật khẩu",
            html: `
                <h3>Xin chào ${user.tenkh}</h3>
                <p>Mật khẩu mới của bạn là:</p>
                <h2 style="color:red">${newPassword}</h2>
                <p>Vui lòng đăng nhập và đổi mật khẩu ngay.</p>
            `,
        });

        return res.status(200).json({
            message: "Mật khẩu mới đã được gửi về Email của bạn",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

const forgotPasswordAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        if (!email) {
            return res.status(400).json({ message: "Vui lòng nhập email" });
        }

        const admin = await userModel.getAdminByEmail(email);
        if (!admin) {
            return res.status(400).json({ message: "Email admin không tồn tại" });
        }

        const newPassword = generateRandomPassword();
        const hashed = await bcrypt.hash(newPassword, 10);

        await userModel.updateAdminPasswordByEmail(hashed, email);

        await transporter.sendMail({
            from: `"Hệ thống quản trị" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Khôi phục mật khẩu Admin",
            html: `
                <p>Xin chào <b>${admin.tenql}</b></p>
                <p>Mật khẩu mới của bạn:</p>
                <h2 style="color:red">${newPassword}</h2>
                <p>Vui lòng đăng nhập và đổi mật khẩu ngay.</p>
            `
        });

        res.status(200).json({ message: "Mật khẩu mới đã được gửi về email" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" });
    }
};

export default { getInf, insertUser, forgotPassword, forgotPasswordAdmin, getUser, updateInf, changePassword, loginAdmin, getAllUsers, updateInfoAdmin, changePasswordAdmin, getAdminInfo, uploadAvatar };