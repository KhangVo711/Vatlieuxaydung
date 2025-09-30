import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const orderCode = searchParams.get("orderCode");

        if (!orderCode) {
          setStatus("Không tìm thấy mã đơn hàng!");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:5001/orders/get-order-status/${orderCode}`
        );

        if (res.data.paymentStatus === "Đã thanh toán") {
          setStatus("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
          setTimeout(() => {
            navigate("/ordered"); 
          }, 2000);
        } else {
          setStatus("Đơn hàng chưa được xác nhận thanh toán. Vui lòng chờ...");
        }
      } catch (err) {
        console.error("PaymentSuccess error:", err);
        setStatus("Có lỗi khi kiểm tra trạng thái đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [navigate, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <p className="text-lg">Đang kiểm tra trạng thái đơn hàng...</p>
      ) : (
        <p className="text-xl font-semibold">{status}</p>
      )}
    </div>
  );
}
