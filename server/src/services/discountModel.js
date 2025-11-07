import connectDB from "../configs/connectDB.js";


const getUserDiscountsModel = async (userId) => {
  if (userId) {
    const [rows] = await connectDB.execute(
      `SELECT * FROM giamgia 
       WHERE (makh = ? OR makh IS NULL) 
       AND soluongconlai > 0 
       AND (NOW() BETWEEN ngaytao AND ngayketthuc)`,
      [userId]
    );
    return rows;
  } else {
    const [rows] = await connectDB.execute(
      `SELECT * FROM giamgia 
       WHERE makh IS NULL 
       AND soluongconlai > 0 
       AND (NOW() BETWEEN ngaytao AND ngayketthuc)`
    );
    return rows;
  }
};

const findDiscountByCodeModel = async (code) => {
  const [rows] = await connectDB.execute(
    `SELECT * FROM giamgia 
     WHERE magiamgia = ? 
     AND soluongconlai > 0 
     AND (NOW() BETWEEN ngaytao AND ngayketthuc)
     LIMIT 1`,
    [code]
  );
  return rows[0];
};

const decreaseDiscountQuantityModel = async (code) => {
  await connectDB.execute(
    `UPDATE giamgia SET soluongconlai = soluongconlai - 1 WHERE magiamgia = ? AND soluongconlai > 0`,
    [code]
  );
};
export default {
  getUserDiscountsModel,
  findDiscountByCodeModel,
  decreaseDiscountQuantityModel
};
