import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../../Context.jsx"; // 🔹 import context

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const { isData } = useContext(Context); // 🔹 lấy thông tin khách hàng

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
            if (isData?.id) navigate("/ordered");
            else navigate("/products");
          }, 3000);
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
  }, [navigate, searchParams, isData]);

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
