import connectDB from "../configs/connectDB.js";

const getReview = async (masp) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM binhluan WHERE masp = ? ORDER BY ngaydang DESC`, [masp]);
    return rows;
}

const addReview = async (masp, tenkh, sosao, noidung) => {
    const [rows, fields] = await connectDB.execute(
        `INSERT INTO binhluan (masp, tenkh, sosao, noidung, ngaydang) VALUES (?, ?, ?, ?, NOW())`,
        [masp, tenkh, sosao, noidung]);
    return rows;
}

export default { getReview, addReview };