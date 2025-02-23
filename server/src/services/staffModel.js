import connectDB from "../configs/connectDB.js";

const getStaff = async (manv) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM nhanvien WHERE manv = ?`, [manv]
    );
    return rows[0];
}

const addStaff = async (manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong) => {
    const [rows, fields] = await connectDB.execute(
        `INSERT INTO nhanvien (manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong) VALUES (?, ?, ?, ?, ?, ?, ?)`, [manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong]
    );
    return rows;
}

const updateStaff = async (manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong) => {
    const [rows, fields] = await connectDB.execute(
        'UPDATE `nhanvien` SET tennv = ?, sdtnv = ?, emailnv = ?, diachinv = ?, tongluong = ?, chucvunv = ? WHERE manv = ?',
        [tennv, sdtnv, emailnv, diachinv, tongluong, chucvunv, manv]
    );
    return rows;
}

const getAllStaff = async () => { 
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM nhanvien`
    );
    return rows;
}

const deleteStaff = async (manv) => {
    const [rows, fields] = await connectDB.execute(
        `DELETE FROM nhanvien WHERE manv = ?`, [manv]
    );
    return rows;
}

export default {addStaff, getStaff, updateStaff, getAllStaff, deleteStaff};