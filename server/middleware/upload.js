import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { masp } = req.body; // Lấy masp từ req.body
    const uploadDir = `./src/uploads/${masp}`; // Thư mục lưu ảnh theo masp

    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Giữ nguyên tên file gốc
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Chỉ cho phép các loại file ảnh
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận các loại file ảnh: jpeg, jpg, png, gif!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Tăng giới hạn lên 100MB theo yêu cầu trước đó
  fileFilter: fileFilter,
});

const uploadMiddleware = upload.array('hinhanh', 20); // Cho phép tối đa 10 ảnh

export default uploadMiddleware;