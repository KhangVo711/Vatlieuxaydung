import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-500 mb-4">
        Thanh toán bị hủy
      </h1>
      <p className="mb-6">Bạn đã hủy giao dịch. Vui lòng thử lại.</p>
      <button
        onClick={() => navigate("/cart")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Quay lại giỏ hàng
      </button>
    </div>
  );
}
