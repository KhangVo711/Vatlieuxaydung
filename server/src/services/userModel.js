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
const createDefaultDiscounts = async (makh) => {
  const defaultDiscounts = [
    {
      code: `NEW10${makh}`,
      percent: 10,
      min: 500000,
      note: "Giảm 10% cho đơn hàng trên 500.000đ"
    },
    {
      code: `NEW30${makh}`,
      percent: 30,
      min: 1200000,
      note: "Giảm 30% cho đơn hàng trên 1.200.000đ"
    },
    {
      code: `NEW50${makh}`,
      percent: 50,
      min: 2500000,
      note: "Giảm 50% cho đơn hàng trên 2.500.000đ"
    }
  ];

  for (const d of defaultDiscounts) {
    await connectDB.execute(
      `INSERT INTO giamgia (magiamgia, makh, phantramgiam, dieukien, soluongconlai, mota, ngaytao, ngayketthuc)
       VALUES (?, ?, ?, ?, 1, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))`,
      [d.code, makh, d.percent, d.min, d.note]
    );
  }

  return defaultDiscounts;
};



const getAdminById = async (maql) => {
  const [rows] = await connectDB.execute("SELECT * FROM quanly WHERE maql = ?", [maql]);
  return rows[0];
};

const updateAdminInfo = async (maql, tenql, sdt, diachi, email) => {
  await connectDB.execute(
    "UPDATE quanly SET tenql = ?, sdt = ?, diachi = ?, email = ? WHERE maql = ?",
    [tenql, sdt, diachi, email, maql]
  );
};

const updateAdminPassword = async (maql, hashedPassword) => {
  await connectDB.execute("UPDATE quanly SET matkhau = ? WHERE maql = ?", [hashedPassword, maql]);
};

const updateAvatar = async (role, id, avatarPath) => {
  let table, column;

  switch (role) {
    case "admin":
      table = "quanly";
      column = "maql";
      break;
    case "staff":
      table = "nhanvien";
      column = "manv";
      break;
    case "customer":
      table = "khachhang";
      column = "makh";
      break;
    default:
      return res.status(400).json({ message: "Role không hợp lệ" });
  }

  const [result] = await connectDB.execute(
    `UPDATE ${table} SET anhdaidien = ? WHERE ${column} = ?`,
    [avatarPath, id]
  );

  return result;
};

const getUserById = async (role, id) => {
  let table, column;

  switch (role) {
    case "admin":
      table = "quanly";
      column = "maql";
      break;
    case "staff":
      table = "nhanvien";
      column = "manv";
      break;
    case "customer":
      table = "khachhang";
      column = "makh";
      break;
    default:
      return res.status(400).json({ message: "Role không hợp lệ" });
  }

  const [rows] = await connectDB.execute(
    `SELECT * FROM ${table} WHERE ${column} = ?`,
    [id]
  );

  return rows[0];
};

export default {getUser, getAdminById, updateAdminInfo, updateAdminPassword, insertUser, createDefaultDiscounts, getInf, updateInf, getUserWithEmail, getUserWithPhone, changePassword, getAdminByEmail, getAdminByPhone, getAllUsers, updateAvatar, getUserById};

