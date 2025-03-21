import connectDB from "../configs/connectDB.js";

const getBranch = async () => {
    const [rows, fields] = await connectDB.execute(
        'SELECT `id`, `tencuahang`, `diachi`, `kinhdo`, `vido`, `giohoatdong`, `created_at` FROM `chinhanh`'
    );
    return rows;
};
const insertBranch = async (id, tencuahang, diachi, kinhdo, vido, giohoatdong, created_at) => {
    await connectDB.execute(
        "INSERT INTO `chinhanh` VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, tencuahang, diachi, kinhdo, vido, giohoatdong, created_at]
    );
};


const editBranch = async (id, tencuahang, diachi, kinhdo, vido, giohoatdong) => {
    await connectDB.execute(
        'UPDATE `chinhanh` SET tencuahang = ?, diachi = ?, kinhdo = ?, vido = ?, giohoatdong = ? WHERE id = ?',
        [tencuahang, diachi, kinhdo, vido, giohoatdong, id]
    );
};

const deleteBranch = async (id) => {
    await connectDB.execute(
        "DELETE FROM `chinhanh` WHERE id = ?",
        [id]
    );
};

export default {
    getBranch,
    insertBranch,
    editBranch,
    deleteBranch
};