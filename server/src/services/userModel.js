import connectDB from "../configs/connectDB.js";

const getAdmin = async (username) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `admin` WHERE `username`=?', [username])
    return rows[0]
}

const getProfile = async (username) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `hoso` WHERE `username`=?', [username])
    return rows[0]
}

const insertAdmin = async (username, password, role) => {
    const [rows, fields] = await connectDB.execute('INSERT INTO `admin` VALUES (?, ?, ?)', [username, password, role])
    return rows
}
const insertProfile = async (username, fullname, address) => {
    const [rows, fields] = await connectDB.execute('INSERT INTO `hoso` VALUES (?, ?, ?)', [username, fullname, address])
    return rows
}
const updateProfile = async (username, fullname, address) => {
    const [rows, fields] = await connectDB.execute(
        'UPDATE `hoso` SET fullname = ?, address = ? WHERE username = ?',
        [fullname, address, username]
    );
    return rows;
};

export default {getAdmin, insertAdmin, getProfile, insertProfile, updateProfile}

