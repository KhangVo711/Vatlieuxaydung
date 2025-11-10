import connectDB from "../configs/connectDB.js";


const ContactModel = {

  getById: async (id) => {
    const [rows] = await connectDB.execute("SELECT * FROM lienhe WHERE malienhe = ?", [id]);
    return rows[0];
  },

  create: async (hoten, email, sodienthoai, chude, noidung) => {
    await connectDB.execute(
      "INSERT INTO lienhe (hoten, email, sodienthoai, chude, noidung) VALUES (?, ?, ?, ?, ?)",
      [hoten, email, sodienthoai, chude, noidung]
    );
    return { success: true };
  },
  getAll: async () => {
    const [rows] = await connectDB.execute("SELECT * FROM lienhe ORDER BY malienhe DESC");
    return rows;
  },

  saveResponse: async ({ malienhe, email, chude, noidung, maql = null, manv = null }) => {
    await connectDB.execute(
      `INSERT INTO phanhoi (malienhe, email, chude, noidung, maql, manv, ngaygui)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [malienhe, email, chude, noidung, maql, manv]
    );
    return { success: true };
  }
};



export default ContactModel;