import connectDB from "../configs/connectDB.js";

const getUserWithEmail = async (email) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM khachhang WHERE email = ?`, [email]
    );
    return rows[0];
}

const getUserWithPhone = async (phone) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM khachhang WHERE sdt = ?`, [phone]
    );
    return rows[0];
}

const getUser = async (email, phone) => {
    let fields = [];
    let values = [];
    if (email) {
        fields.push('email');
        values.push(email);
    }
    if (phone) {
        fields.push('sdt');
        values.push(phone);
    }
    const [rows, fieldsGuest] = await connectDB.execute(
        `SELECT * FROM khachhang WHERE ${fields[0]} = ? `,[values[0]]
    );
    console.log(`SELECT * FROM khachhang WHERE ${fields[0]} = ${values[0]} `);
    return rows[0];
};

const getInf = async (id) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `khachhang` WHERE `makh`=?', [id])
    return rows[0]
}

const insertUser = async (fullname, id, email, phone, password) => {
 
    let fields = ['tenkh', 'makh', 'matkhau'];
    let values = [fullname, id, password];
    if (email) {
        fields.push('email');
        values.push(email);
    }
    if (phone) {
        fields.push('sdt');
        values.push(phone);
    }
    const query = `INSERT INTO khachhang (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`;
    const [rows, fieldsInfo] = await connectDB.execute(query, values);
    return rows;
}
const updateInf = async (fullname, id, email, phone, address) => {
    const [rows, fields] = await connectDB.execute(
        'UPDATE `khachhang` SET tenkh = ?, email = ?, sdt = ?, diachi = ? WHERE makh = ?',
        [fullname, email, phone, address, id]
    );
    return rows;
};
const changePassword = async (password, id) => {
    const [rows, fields] = await connectDB.execute(
        'UPDATE `khachhang` SET matkhau = ? WHERE makh = ?',
        [password, id]
    );
    return rows;
};

const getAdminByEmail = async (email) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM quanly WHERE email = ?`, [email]
    );
    return rows[0];
}

const getAdminByPhone = async (sdt) => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM quanly WHERE sdt = ?`, [sdt]
    );
    return rows[0];
}

const getAllUsers = async () => {
    const [rows, fields] = await connectDB.execute(
        `SELECT kh.makh, kh.tenkh, kh.email, kh.sdt, kh.diachi, 
                COUNT(dh.madh) AS so_lan_mua, 
                SUM(dh.tonggia) AS tong_chi_tieu
         FROM khachhang kh
         LEFT JOIN donhang dh ON kh.makh = dh.makh
         GROUP BY kh.makh, kh.tenkh, kh.email, kh.sdt, kh.diachi;`
    );
    return rows;
}


export default {getUser, insertUser, getInf, updateInf, getUserWithEmail, getUserWithPhone, changePassword, getAdminByEmail, getAdminByPhone, getAllUsers};

