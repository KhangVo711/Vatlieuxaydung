import transporter from "../configs/mailConfig.js";
import dotenv from "dotenv";
dotenv.config();    


const sendMail = async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message)
    return res.status(400).json({ message: "Thiếu thông tin gửi mail." });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    res.json({ success: true, message: "Gửi mail thành công!" });
  } catch (error) {
    console.error("Lỗi gửi mail:", error);
    res.status(500).json({ success: false, message: "Gửi mail thất bại." });
  }
};
export default { sendMail };
