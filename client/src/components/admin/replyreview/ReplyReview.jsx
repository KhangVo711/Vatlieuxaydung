import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReplyReview() {
  const [reviews, setReviews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  // 🔹 Lấy danh sách đánh giá + phản hồi
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = Cookies.get("admin") || Cookies.get("staff");
        const res = await axios.get("http://localhost:5001/admin/reviews", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const unique = Array.from(new Map(res.data.map(r => [r.id, r])).values());
        setReviews(unique);
        setFiltered(unique);

        const uniqueProducts = Array.from(
          new Map(unique.map(r => [r.masp, { value: r.masp, label: r.tensp }])).values()
        );
        setProducts(uniqueProducts);
      } catch (err) {
        toast.error("❌ Lỗi tải danh sách đánh giá!");
      }
    };
    fetchReviews();
  }, []);

  // 🔹 Lọc dữ liệu theo sản phẩm và số sao
  useEffect(() => {
    let data = [...reviews];
    if (selectedProduct?.value) data = data.filter(r => r.masp === selectedProduct.value);
    if (selectedStar?.value) data = data.filter(r => Number(r.sosao) === Number(selectedStar.value));
    setFiltered(data);
  }, [selectedProduct, selectedStar, reviews]);

  // 🔹 Cập nhật trạng thái
  const handleStatus = async (id, newStatus) => {
    const token = Cookies.get("admin") || Cookies.get("staff");
    try {
      await axios.put(
        `http://localhost:5001/admin/reviews/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      setReviews(prev => prev.map(r => (r.id === id ? { ...r, trangthai: newStatus } : r)));
      toast.success(newStatus === "hiển thị" ? "Đã hiển thị đánh giá" : "Đã ẩn đánh giá");
    } catch {
      toast.error("Lỗi cập nhật trạng thái!");
    }
  };

  // 🔹 Mở modal phản hồi
  const openReplyModal = (review) => {
    setCurrentReview(review);
    setReplyContent(review.phanhoi || "");
    setIsModalOpen(true);
  };

  // 🔹 Gửi phản hồi admin
  const submitReply = async () => {
    const token = Cookies.get("admin") || Cookies.get("staff");
    if (!replyContent.trim()) {
      toast.warning("Vui lòng nhập nội dung phản hồi!");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5001/admin/reviews/${currentReview.id}/reply`,
        { ten_admin: "Admin", noidung: replyContent },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      setReviews(prev =>
        prev.map(r =>
          r.id === currentReview.id
            ? { ...r, phanhoi: replyContent, ten_admin: "Admin" }
            : r
        )
      );
      setIsModalOpen(false);
      toast.success("💬 Đã phản hồi thành công!");
    } catch {
      toast.error("❌ Lỗi khi gửi phản hồi!");
    }
  };

  // 🔹 Style react-select
  const customSelect = {
    control: (base) => ({
      ...base,
      minWidth: 200,
      borderColor: "#f9a8d4",
      backgroundColor: "#fff1f2",
      "&:hover": { borderColor: "#ec4899" },
    }),
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl relative">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Quản lý đánh giá sản phẩm</h2>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Select
          options={[{ value: "", label: "Tất cả sản phẩm" }, ...products]}
          placeholder="Lọc theo sản phẩm"
          styles={customSelect}
          value={selectedProduct}
          onChange={setSelectedProduct}
        />
        <Select
          options={[
            { value: "", label: "Tất cả số sao" },
            { value: 5, label: "5 sao" },
            { value: 4, label: "4 sao" },
            { value: 3, label: "3 sao" },
            { value: 2, label: "2 sao" },
            { value: 1, label: "1 sao" },
          ]}
          placeholder="Lọc theo số sao"
          styles={customSelect}
          value={selectedStar}
          onChange={setSelectedStar}
        />
      </div>

      {/* Danh sách đánh giá */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 italic">Không có đánh giá nào.</p>
      ) : (
        filtered.map((r) => (
          <div key={r.id} className="border-b py-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-800">{r.tenkh}</span>
                <span className="ml-2 text-yellow-500">{"⭐".repeat(r.sosao)}</span>
              </div>
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => openReplyModal(r)}
                  className="text-pink-600 hover:underline font-medium"
                >
                  Phản hồi
                </button>
                <button
                  onClick={() => handleStatus(r.id, r.trangthai === "hiển thị" ? "ẩn" : "hiển thị")}
                  className={`hover:underline font-medium ${
                    r.trangthai === "hiển thị" ? "text-gray-500" : "text-green-600"
                  }`}
                >
                  {r.trangthai === "hiển thị" ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-pink-50 p-2 rounded-md mt-2">
              <img
                src={`http://localhost:5001/uploads/${r.masp}/${r.hinhanh}`}
                alt={r.tensp}
                className="w-14 h-14 object-cover rounded-md"
              />
              <span className="text-gray-700 font-medium">{r.tensp}</span>
            </div>

            <p className="text-gray-700 mt-2">{r.noidung}</p>
            <p className="text-gray-400 text-sm">{new Date(r.ngaydang).toLocaleString()}</p>

            {r.phanhoi && (
              <div className="bg-pink-100 border-l-4 border-pink-400 p-2 rounded mt-2">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold text-pink-700">
                    {r.ten_admin || "Admin"} phản hồi:
                  </span>{" "}
                  {r.phanhoi}
                </p>
                <p className="text-xs text-gray-500">
                  {r.ngaytraloi ? new Date(r.ngaytraloi).toLocaleString() : ""}
                </p>
              </div>
            )}
          </div>
        ))
      )}

      {/* Modal phản hồi */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] rounded-2xl shadow-xl p-6 border border-pink-200">
            <h3 className="text-lg font-semibold text-pink-600 mb-3">
              Phản hồi đánh giá của {currentReview?.tenkh}
            </h3>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Nhập nội dung phản hồi..."
              className="w-full border border-pink-300 rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={submitReply}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 shadow"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
