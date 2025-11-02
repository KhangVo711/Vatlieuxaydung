import repoModel from "../services/repoModel.js";

const getRepo = async (req, res) => {
  try {
    const { month } = req.query;
    const data = await repoModel.getRepo(month); // ✅ Gọi hàm model đúng cách
    res.status(200).json({ repo: data });
  } catch (err) {
    console.error("Lỗi trong getRepo:", err);
    res.status(500).json({ message: "Lỗi truy vấn kho hàng!" });
  }
};

const getMonths = async (req, res) => {
  try {
    const months = await repoModel.getAvailableMonths(); // ✅ Gọi đúng model
    res.status(200).json({ months });
  } catch (err) {
    console.error("Lỗi trong getMonths:", err);
    res.status(500).json({ message: "Lỗi lấy danh sách tháng!" });
  }
};

export default { getRepo, getMonths };
