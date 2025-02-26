import connectDB from "../configs/connectDB.js";

const getOneShip = async (madvvc) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM donvivanchuyen WHERE madvvc = ?`, [madvvc]);
    return rows[0];
}
const getAllShip = async () => {
    const [rows, fields] = await connectDB.execute(`SELECT * FROM donvivanchuyen`);
    return rows;
}
const addShip = async (madvvc, tendvvc, phivanchuyen) => {
    const [rows, fields] = await connectDB.execute(
        `INSERT INTO donvivanchuyen (madvvc, tendvvc, phivanchuyen) VALUES (?, ?, ?)`,
        [madvvc, tendvvc, phivanchuyen]);
    return rows;
}
const editShip = async (madvvc, tendvvc, phivanchuyen) => {
    const [rows, fields] = await connectDB.execute(
        `UPDATE donvivanchuyen SET tendvvc = ?, phivanchuyen = ? WHERE madvvc = ?`,
        [tendvvc, phivanchuyen, madvvc]);
    return rows;
}
const deleteShip = async (madvvc) => {
    const [rows, fields] = await connectDB.execute(`DELETE FROM donvivanchuyen WHERE madvvc = ?`, [madvvc]);
    return rows;
}
export default { getOneShip, getAllShip, addShip, editShip, deleteShip };