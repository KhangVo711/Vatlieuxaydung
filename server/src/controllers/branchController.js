import express from "express";
import branchModel from "../services/branchModel.js";

const getBranch = async (req, res) => {
    try {
        const branches = await branchModel.getBranch(); 
        res.status(200).send({ branches: branches });
    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy danh sách cửa hàng." });
    }
};

const insertBranch = async (req, res) => {
    try {
        let { id, tencuahang, diachi, kinhdo, vido, giohoatdong, created_at } = req.body;
        if (!id || !tencuahang || !diachi || !kinhdo || !vido || !giohoatdong || !created_at) {
            return res.status(400).send({ message: "Thiếu thông tin cửa hàng." });
        }

        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(id)) {
            return res.status(400).json({ message: 'Mã cửa hàng không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(tencuahang)) {
            return res.status(400).json({ message: 'Tên cửa hàng không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(diachi)) {
            return res.status(400).json({ message: 'Địa chỉ không được chứa khoảng trắng ở đầu' });
        }

        const namePattern = /^[\p{L}\p{N}\s]+$/u;
        if (!namePattern.test(tencuahang)) {
            return res.status(400).json({ message: 'Tên cửa hàng không được chứa ký tự đặc biệt.' });
        }

        const coordPattern = /^-?\d+(\.\d+)?$/;
        if (!coordPattern.test(kinhdo) || !coordPattern.test(vido)) {
            return res.status(400).json({ message: 'Kinh độ và vĩ độ phải là số.' });
        }

        const timePattern = /^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/;
        if (!timePattern.test(giohoatdong)) {
            return res.status(400).json({ message: 'Giờ hoạt động phải có định dạng HH:MM - HH:MM.' });
        }

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(created_at)) {
            return res.status(400).json({ message: 'Ngày tạo phải có định dạng YYYY-MM-DD.' });
        }

        await branchModel.insertBranch(id, tencuahang, diachi, kinhdo, vido, giohoatdong, created_at);
        res.status(200).send({ message: "Thêm cửa hàng thành công!" });
    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi thêm cửa hàng." });
    }
};

const detailBranch = async (req, res) => {
    let { id } = req.body;
    try {
        const branch = await branchModel.detailBranch(id);
        res.status(200).send({ message: "Lấy chi tiết cửa hàng thành công!", branch: branch });
    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết cửa hàng." });
    }
};

const getOneBranch = async (req, res) => {
    let { id } = req.params;
    try {
        const branch = await branchModel.detailBranch(id);
        res.status(200).send({ message: "Lấy chi tiết cửa hàng thành công!", branch: branch });
    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy chi tiết cửa hàng." });
    }
};

// Controller
const editBranch = async (req, res) => {
    let { id, tencuahang, diachi, kinhdo, vido, giohoatdong } = req.body; // Removed created_at
    try {
        console.log('Request body:', req.body); // Log to debug payload
        if (!id || !tencuahang || !diachi || !kinhdo || !vido || !giohoatdong) {
            return res.status(400).send({ message: "Không được để trống thông tin cửa hàng." });
        }

        const idPattern = /^[^\s].*$/;
        if (!idPattern.test(tencuahang)) {
            return res.status(400).json({ message: 'Tên cửa hàng không được chứa khoảng trắng ở đầu' });
        }
        if (!idPattern.test(diachi)) {
            return res.status(400).json({ message: 'Địa chỉ không được chứa khoảng trắng ở đầu' });
        }

        const namePattern = /^[\p{L}\p{N}\s]+$/u;
        if (!namePattern.test(tencuahang)) {
            return res.status(400).json({ message: 'Tên cửa hàng không được chứa ký tự đặc biệt.' });
        }
      

        const coordPattern = /^-?\d+(\.\d+)?$/;
        if (!coordPattern.test(kinhdo) || !coordPattern.test(vido)) {
            return res.status(400).json({ message: 'Kinh độ và vĩ độ phải là số.' });
        }

        const timePattern = /^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/;
        if (!timePattern.test(giohoatdong)) {
            return res.status(400).json({ message: 'Giờ hoạt động phải có định dạng HH:MM - HH:MM.' });
        }

        await branchModel.editBranch(id, tencuahang, diachi, kinhdo, vido, giohoatdong);
        res.status(200).send({ message: "Sửa cửa hàng thành công!" });
    } catch (error) {
        console.error('Error in editBranch:', error); // Log error for debugging
        res.status(500).send({ message: "Đã xảy ra lỗi khi sửa cửa hàng." });
    }
};


const deleteBranch = async (req, res) => {
    let { id } = req.body;
    console.log(id);
    try {
        await branchModel.deleteBranch(id);
        res.status(200).send({ message: "Xóa cửa hàng thành công!" });
    } catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi xóa cửa hàng." });
    }
};

export default {
    getBranch,
    insertBranch,
    detailBranch,
    getOneBranch,
    editBranch,
    deleteBranch
};