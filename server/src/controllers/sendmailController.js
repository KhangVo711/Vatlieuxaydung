import transporter from "../configs/mailConfig.js";
import ContactModel from "../services/sendmailModel.js";
import dotenv from "dotenv";
dotenv.config();    

const generateRandomCode = () => {
  // Sinh số 6 chữ số (100000 → 999999)
  return Math.floor(100000 + Math.random() * 900000);
};

const getContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.getAll();
    res.json({ order: contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

const sendMail = async (req, res) => {
  const { email, subject, message, maql, manv } = req.body;
  console.log(req.body);
  
  if (!email || !subject || !message)
    return res.status(400).json({ message: "Thiếu thông tin gửi mail." });

  try {
    // Gửi mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    // Lưu phản hồi vào DB
    await ContactModel.saveResponse({ malienhe: generateRandomCode(), email, chude: subject, noidung: message, maql, manv });

    res.json({ success: true, message: "Gửi mail thành công và đã lưu vào hệ thống!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gửi mail thất bại." });
  }
};
export default {
  sendMail,
  getContacts,
};