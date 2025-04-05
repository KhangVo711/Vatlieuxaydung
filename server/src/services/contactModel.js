import connectDB from "../configs/connectDB.js";

// Phieu nhap
const getContact = async () => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `lienhe`')
    return rows
}
const insertContact = async (malienhe, hoten, email, sodienthoai, chude, noidung) => {
    await connectDB.execute("INSERT INTO `lienhe` VALUES (?, ?, ?, ?, ?, ?)", [malienhe, hoten, email, sodienthoai, chude, noidung]);
}

const deleteContact = async (malienhe) => {
    await connectDB.execute("DELETE FROM `lienhe` WHERE malienhe = ?", [malienhe]);
};

const updateContact = async (malienhe, hoten, email, sodienthoai, chude, noidung) => {
    await connectDB.execute("UPDATE `lienhe` SET hoten = ?, email = ?, sodienthoai = ?, chude = ?, noidung = ? WHERE malienhe = ?", [hoten, email, sodienthoai, chude, noidung, malienhe]);
};

const getContactById = async (malienhe) => {
    const [rows, fields] = await connectDB.execute("SELECT * FROM `lienhe` WHERE malienhe = ?", [malienhe]);
    return rows;
};




export default {
    getContact,
    insertContact,
    deleteContact,
    updateContact,
    getContactById
}