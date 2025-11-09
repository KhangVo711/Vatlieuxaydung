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
};

export default ContactModel;