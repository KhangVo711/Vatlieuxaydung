import connectDB from "../configs/connectDB.js";



const getStaffByPhone = async (sdtnv) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM nhanvien WHERE sdtnv = ?`, [sdtnv]
    );
    return rows[0];
}

const getStaffByEmail = async (emailnv) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM nhanvien WHERE emailnv = ?`, [emailnv]
    );
    return rows[0];
}

const addStaff = async (manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong, matkhau) => {
    const [rows, fields] = await connectDB.execute(
        `INSERT INTO nhanvien (manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong, matkhau) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [manv, tennv, sdtnv, emailnv, diachinv, chucvunv, tongluong, matkhau]
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

const getStaffById = async (manv) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM nhanvien WHERE manv = ?`, [manv]
    );
    return rows[0];
}

const getShiftById = async (maca) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM calam WHERE maca = ?`, [maca]
    );
    return rows[0];
}

const getStaffByShift = async (maca) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT n.manv, n.tennv 
         FROM giaonhanca g 
         JOIN nhanvien n ON g.manv = n.manv 
         WHERE g.maca = ?`,
        [maca]
    );
    return rows;
}

const getAllStaff = async () => { 
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM nhanvien`
    );
    return rows;
}
const getShifts = async (manv) => { 
    const [rows, fields] = await connectDB.execute(
        'SELECT c.* FROM calam c JOIN giaonhanca g ON c.maca = g.maca WHERE g.manv = ?',
      [manv]
    );
    return rows;
}

const getAllShifts = async () => { 
    const [rows, fields] = await connectDB.execute(
        `SELECT c.*, 
                GROUP_CONCAT(n.manv) as staff_ids, 
                GROUP_CONCAT(n.tennv) as staff_names
         FROM calam c
         LEFT JOIN giaonhanca g ON c.maca = g.maca
         LEFT JOIN nhanvien n ON g.manv = n.manv
         GROUP BY c.maca`
    );
    return rows.map(row => ({
        ...row,
        staff_ids: row.staff_ids ? row.staff_ids.split(',') : [],
        staff_names: row.staff_names ? row.staff_names.split(',') : []
    }));
}
const deleteShift = async (maca) => {
    await connectDB.execute(
        `DELETE FROM giaonhanca WHERE maca = ?`,
        [maca]
    );
    const [result, fields] = await connectDB.execute(
        `DELETE FROM calam WHERE maca = ?`,
        [maca]
    );
    return result;
}
const removeAllStaffFromShift = async (maca) => {
    const [result, fields] = await connectDB.execute(
        `DELETE FROM giaonhanca WHERE maca = ?`,
        [maca]
    );
    return result;
}
const removeStaffFromShift = async (manv, maca) => {
    const [result, fields] = await connectDB.execute(
        `DELETE FROM giaonhanca WHERE manv = ? AND maca = ?`,
        [manv, maca]
    );
    return result;
}
const addShift = async (maca, tenca, luongmoca, thuong, chiphaphatsinh, giovao, giora) => { 
    const [rows, fields] = await connectDB.execute(
        `INSERT INTO calam (maca, tenca, luongmoica, thuong, chiphiphatsinh, giovaoca, gioraca)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, [maca, tenca, luongmoca, thuong, chiphaphatsinh, giovao
            , giora]
    );
    return rows;
}

// Thêm mối quan hệ nhân viên - ca làm việc vào bảng trung gian
const addStaffToShift = async (manv, maca) => {
    const query = 'INSERT INTO giaonhanca (manv, maca) VALUES (?, ?)';
    const [result] = await connectDB.execute(query, [manv, maca]);
    return result;
}

const updateShift = async ( maca, luongmoca, thuong, chiphaphatsinh) => {
    const [rows, fields] = await connectDB.execute(
        'UPDATE `calam` SET luongmoica = ?, thuong = ?, chiphiphatsinh = ? WHERE maca = ?',
        [luongmoca, thuong, chiphaphatsinh, maca]
    );
    return rows;
}

const deleteStaff = async (manv) => {
    const [rows, fields] = await connectDB.execute(
        `DELETE FROM nhanvien WHERE manv = ?`, [manv]
    );
    return rows;
}

export default {addStaff, updateStaff, addStaffToShift, getShifts, deleteShift, updateShift, getStaffByShift, removeAllStaffFromShift, getAllStaff, getAllShifts, addShift, deleteStaff, getStaffByPhone, getStaffByEmail, getStaffById, getShiftById, removeStaffFromShift};