import connectDB from "../configs/connectDB.js";

const getOnePromo = async (makm) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM khuyenmai WHERE makm = ?`, [makm]);
    return rows[0];
}
const getAllPromo = async () => {
    const [rows, fields] = await connectDB.execute(`SELECT * FROM khuyenmai`);
    return rows;
}
const addPromo = async (makm, tenkm, km, thoigianbatdaukm, thoigianketthuckm, masp) => {
    const [rows, fields] = await connectDB.execute(
        `INSERT INTO khuyenmai (makm, tenkm, km, thoigianbatdaukm, thoigianketthuckm, masp) VALUES (?, ?, ?, ?, ?, ?)`,
        [makm, tenkm, km, thoigianbatdaukm, thoigianketthuckm, masp]);
    return rows;
}
const editPromo = async (makm, tenkm, km, thoigianbatdaukm, thoigianketthuckm, masp) => {
    const [rows, fields] = await connectDB.execute(
        `UPDATE khuyenmai SET tenkm = ?, km = ? , thoigianbatdaukm = ?, thoigianketthuckm = ?, masp = ? WHERE makm = ?`,
        [tenkm, km, thoigianbatdaukm, thoigianketthuckm, masp, makm]);
    return rows;
}
const deletePromo = async (makm) => {
    const [rows, fields] = await connectDB.execute(`DELETE FROM khuyenmai WHERE makm = ?`, [makm]);
    return rows;
}
export default { getOnePromo, getAllPromo, addPromo, editPromo, deletePromo };