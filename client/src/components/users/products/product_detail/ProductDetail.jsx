import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from '../../../../components/Context';
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { formatCurrency } from "../../../../utils/currency";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import PreFooter from "../prefooter/PreFooter";

export default function ProductDetail() {
  const masp = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [ratingStats, setRatingStats] = useState({
  count: {},
  percent: {},
  total: 0
});
  const { onAddToCart, isData } = useContext(Context);
  console.log(reviews)
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/detailProduct",
          { masp: masp.id },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            withCredentials: true,
          }
        );
        setProduct(response.data.dataProduct);
        setImages(response.data.images);
        setVariants(response.data.variants || []);
        // Lấy bình luận
        const resCmt = await axios.get(`http://localhost:5001/reviews/${masp.id}`);
        const dataReviews = resCmt.data;
        setReviews(dataReviews);

        if (dataReviews.length > 0) {
          // Ép kiểu sang số an toàn, bỏ qua giá trị không hợp lệ
          const validStars = dataReviews
            .map((r) => Number(r.sosao))
            .filter((v) => !isNaN(v) && v >= 1 && v <= 5);

          const sum = validStars.reduce((acc, v) => acc + v, 0);
          const avg = validStars.length > 0 ? sum / validStars.length : 0;

          setAvgRating(avg.toFixed(1));  // VD: 4.5
          setTotalReviews(validStars.length);
        } else {
          setAvgRating(0);
          setTotalReviews(0);
        }
        // Đếm số lượng từng sao (1→5)
const starCount = [1, 2, 3, 4, 5].reduce((acc, star) => {
  acc[star] = dataReviews.filter(r => Number(r.sosao) === star).length;
  return acc;
}, {});

// Tổng số đánh giá hợp lệ
const total = Object.values(starCount).reduce((a, b) => a + b, 0);

// Tính phần trăm từng mức sao
const starPercent = {};
for (let i = 1; i <= 5; i++) {
  starPercent[i] = total > 0 ? ((starCount[i] / total) * 100).toFixed(1) : 0;
}

setRatingStats({ count: starCount, percent: starPercent, total });
        const firstAvailable =
          response.data.variants?.find((v) => v.soluongtonkho > 0) || null;
        setSelectedVariant(firstAvailable);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      }
    };
    fetchProductDetail();
  }, [masp]);

  if (!product) return <div className="text-center py-20 text-lg">Đang tải...</div>;
  const handleAddToCart = () => {
    // if (!selectedVariant && variants.length > 0) {
    //   alert("Vui lòng chọn biến thể trước khi thêm vào giỏ hàng!");
    //   return;
    // }

    const newItem = {
      masp: product.masp,
      tensp: product.tensp,
      hinhanh: product.hinhanh,
      gia: selectedVariant ? selectedVariant.gia : product.gia,
      mabienthe: selectedVariant?.mabienthe || null,
      thuoc_tinh: selectedVariant?.thuoc_tinh || null,
    };

    onAddToCart(newItem);
    toast.success(
      `${product.tensp} đã được thêm vào giỏ hàng`,
      { duration: 3000 }
    );
  };
  const handleBuyToCart = () => {
    // if (!selectedVariant && variants.length > 0) {
    //   alert("Vui lòng chọn biến thể trước khi thêm vào giỏ hàng!");
    //   return;
    // }

    const newItem = {
      masp: product.masp,
      tensp: product.tensp,
      hinhanh: product.hinhanh,
      gia: selectedVariant ? selectedVariant.gia : product.gia,
      mabienthe: selectedVariant?.mabienthe || null,
      thuoc_tinh: selectedVariant?.thuoc_tinh || null,
    };

    onAddToCart(newItem);
    navigate("/cart");
    toast.success(
      `${product.tensp} đã được thêm vào giỏ hàng`,
      { duration: 3000 }
    );
  };
  const handleSubmitComment = async () => {
    if(!isData.fullname) {
      return toast.error("Vui lòng đăng nhập để gửi bình luận!");
    }
    if (!rating) return toast.error("Vui lòng chọn số sao!");
    if (!comment.trim()) return toast.error("Vui lòng nhập nội dung bình luận!");

    try {
      await axios.post("http://localhost:5001/reviews/add", {
        masp: product.masp,
        sosao: rating,
        noidung: comment,
        tenkh: isData.fullname
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      toast.success("Đã gửi bình luận!");
      setComment("");
      setRating(0);

      // Tải lại bình luận mới
      const resCmt = await axios.get(`http://localhost:5001/reviews/${masp.id}`);
      setReviews(resCmt.data || []);

    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi gửi bình luận!");
    }
  };
  return (

    <div className="container mx-auto py-12 px-4 lg:px-20">
      <div className="text-sm mb-4 text-gray-500 cursor-pointer hover:text-pink-500" onClick={() => navigate(-1)}>
        ← Quay lại
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Hình ảnh sản phẩm */}
        <div className="w-full lg:w-1/2 flex flex-row justify-center gap-3">
          {/* Thumbnail dọc */}
          <div className="hidden md:block w-[90px]">
            <Swiper
              onSwiper={setThumbsSwiper}
              direction="vertical"
              spaceBetween={10}
              slidesPerView={Math.min(images.length, 4)} // tối đa 4 ảnh hiển thị
              freeMode={true}
              watchSlidesProgress={true}
              style={{
                height: `${Math.min(images.length * 110, 450)}px`, // Chiều cao động
              }}
              modules={[FreeMode, Thumbs]}
            >
              {(images.length > 0 ? images : [product.hinhanh]).map((img, i) => (
                <SwiperSlide key={i} className="cursor-pointer">
                  <img
                    src={`http://localhost:5001/uploads/${product.masp}/${img}`}
                    alt=""
                    className="rounded-lg border hover:border-pink-500 w-full h-[90px] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Ảnh chính */}
          <div className="flex-1 flex justify-center items-center">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              spaceBetween={10}
              slidesPerView={1}
              className="rounded-xl overflow-hidden shadow-md max-w-[450px]"
              style={{ width: "450px", height: "450px" }}
            >
              {(images.length > 0 ? images : [product.hinhanh]).map((img, i) => (
                <SwiperSlide key={i} className="flex justify-center items-center">
                  <img
                    src={`http://localhost:5001/uploads/${product.masp}/${img}`}
                    alt={product.tensp}
                    className="w-full h-[450px] max-w-[450px] object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>


        {/* Thông tin sản phẩm */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.tensp}</h2>
          {totalReviews > 0 && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={star <= Math.round(avgRating) ? "#f59e0b" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.117 5.541.403a.562.562 0 01.316.98l-4.21 3.637 1.293 5.41a.562.562 0 01-.837.61L12 17.347l-4.748 2.31a.562.562 0 01-.837-.61l1.293-5.41-4.21-3.637a.562.562 0 01.316-.98l5.541-.403L11.48 3.5z"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-gray-700 font-medium">
                {avgRating} / 5 ({totalReviews} đánh giá)
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-pink-100 text-pink-600 px-2 py-1 text-xs rounded">
              {product.tenloai}
            </span>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded">
              {product.tennsx}
            </span>
          </div>

          {/* Giá */}
          <div className="my-4 flex items-center gap-3">
            <span className={`text-xl font-semibold ${product.km ? "text-gray-400 line-through" : "text-pink-600"}`}>
              {selectedVariant
                ? formatCurrency(selectedVariant.gia)
                : formatCurrency(product.gia)}
            </span>
            {product.km && (
              <span className="text-xl text-pink-600 font-bold">
                {selectedVariant
                  ? formatCurrency(selectedVariant.gia * (1 - product.km / 100))
                  : formatCurrency(product.gia * (1 - product.km / 100))}
              </span>
            )}
          </div>
          {/* Tình trạng sản phẩm */}
          <div className="mb-4">
            <span className="font-semibold">Tình trạng: </span>
            {selectedVariant || product ? (
              selectedVariant?.soluongtonkho || product.soluongsp > 0 ? (
                <span className="text-green-600 font-medium">Còn hàng</span>
              ) : (
                <span className="text-red-500 font-medium">Hết hàng</span>
              )
            ) : product.soluongtonkho > 0 ? (
              <span className="text-green-600 font-medium">Còn hàng</span>
            ) : (
              <span className="text-red-500 font-medium">Hết hàng</span>
            )}
          </div>

          {/* Mã khuyến mãi */}
          {/* <div className="flex gap-3 mb-4 flex-wrap">
            <div className="border border-pink-400 text-pink-500 px-3 py-1 rounded text-sm font-medium">
              Giảm ngay 20K • <span className="text-gray-700">T10GIAM20K</span>
            </div>
            <div className="border border-blue-400 text-blue-500 px-3 py-1 rounded text-sm font-medium">
              Giảm 10% • <span className="text-gray-700">T10GIAM10%</span>
            </div>
            <div className="border border-green-400 text-green-500 px-3 py-1 rounded text-sm font-medium">
              Giảm 8% • <span className="text-gray-700">T10GIAM8%</span>
            </div>
          </div> */}

          {/* Biến thể */}
          {variants.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-2">{product.loaibienthe}:</p>
              <div className="flex gap-2 flex-wrap">
                {variants.map((variant) => (
                  <button
                    key={variant.mabienthe}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-1 border rounded-md text-sm transition ${selectedVariant?.mabienthe === variant.mabienthe
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-gray-100 text-gray-700 hover:border-pink-400"
                      } ${variant.soluongtonkho === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={variant.soluongtonkho === 0}
                  >
                    {variant.thuoc_tinh}
                  </button>
                ))}
              </div>
            </div>
          )}
          <h3 className="font-semibold">Công dụng:</h3>
          {/* Mô tả */}
          <p className="text-gray-700 mb-6 leading-relaxed">{product.ttct}</p>
          {/* Nút hành động */}
          </div>
          <div>
          <div className="flex gap-4">
            <button onClick={handleBuyToCart} className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-md font-medium text-lg transition">
              Mua ngay
            </button>
            <button
              onClick={handleAddToCart}
              className={`border border-pink-500 text-pink-500 hover:bg-pink-50 px-3 py-1.5 rounded-md font-medium text-lg transition
    ${(selectedVariant?.soluongtonkho === 0 || (!selectedVariant && product.soluongtonkho === 0))
                  ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={
                selectedVariant?.soluongtonkho === 0 ||
                (!selectedVariant && product.soluongtonkho === 0)
              }
            >
              Thêm vào giỏ hàng
            </button>
</div>
          </div>
        </div>
      </div>
      {/* --- Bình luận & đánh giá --- */}
<div className="mt-16 border-t pt-10">
  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Đánh giá & Bình luận</h3>

  {/* Tổng quan đánh giá */}
  {totalReviews > 0 && (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Trung bình sao */}
        <div className="text-center md:w-1/4">
          <div className="text-5xl font-bold text-gray-800">{avgRating}</div>
          <div className="flex justify-center my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                fill={star <= Math.round(avgRating) ? "#facc15" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.117 5.541.403a.562.562 0 01.316.98l-4.21 3.637 1.293 5.41a.562.562 0 01-.837.61L12 17.347l-4.748 2.31a.562.562 0 01-.837-.61l1.293-5.41-4.21-3.637a.562.562 0 01.316-.98l5.541-.403L11.48 3.5z"
                />
              </svg>
            ))}
          </div>
          <p className="text-gray-600 text-sm">{totalReviews} lượt đánh giá</p>
        </div>

        {/* Thanh progress thống kê sao */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <span className="w-10 text-sm text-gray-700">{star} ⭐</span>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-yellow-400 rounded-full"
                  style={{ width: `${ratingStats.percent[star]}%` }}
                ></div>
              </div>
              <span className="w-12 text-sm text-gray-600 text-right">
                {ratingStats.percent[star]}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Biểu đồ Recharts */}
      {/* <div className="mt-8 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[5, 4, 3, 2, 1].map((star) => ({
              name: `${star}⭐`,
              percent: Number(ratingStats.percent[star]),
            }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percent" fill="#facc15" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  )}

  {/* Form thêm bình luận */}
  <div className="bg-gray-50 p-6 rounded-lg mb-8">
    <p className="font-medium mb-2">Bình luận của bạn:</p>

    {/* Đánh giá sao */}
    <div className="flex items-center mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating(star)}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= rating ? "#f59e0b" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7 cursor-pointer text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.117 5.541.403a.562.562 0 01.316.98l-4.21 3.637 1.293 5.41a.562.562 0 01-.837.61L12 17.347l-4.748 2.31a.562.562 0 01-.837-.61l1.293-5.41-4.21-3.637a.562.562 0 01.316-.98l5.541-.403L11.48 3.5z"
          />
        </svg>
      ))}
    </div>

    {/* Nội dung bình luận */}
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Nhập bình luận của bạn..."
      className="w-full border rounded-md p-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
      rows="4"
    />
  <div className="flex justify-center">
    <button
      onClick={handleSubmitComment}
      className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-md font-medium"
    >
      Gửi đánh giá
    </button>
    </div>
  </div>

  {/* Danh sách bình luận */}
  <div>
  {reviews.length > 0 ? (
  <>
    {reviews
      .filter((r) => r.trangthai === "hiển thị")
      .slice(0, showAllReviews ? reviews.length : 4)
      .map((r, i) => (
        <div key={i} className="border-b py-4 ">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">
              {r.tenkh || "Ẩn danh"}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <svg
                  key={idx}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={idx < r.sosao ? "#f59e0b" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-yellow-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.117 
                      5.541.403a.562.562 0 01.316.98l-4.21 3.637 
                      1.293 5.41a.562.562 0 01-.837.61L12 
                      17.347l-4.748 2.31a.562.562 0 
                      01-.837-.61l1.293-5.41-4.21-3.637a.562.562 
                      0 01.316-.98l5.541-.403L11.48 3.5z"
                  />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
          <p className="text-gray-700 mt-2 break-words text-sm whitespace-pre-wrap">
            {r.noidung}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {new Date(r.ngaydang).toLocaleString()}
          </p>
          </div>

          {/* Thêm phần phản hồi admin */}
          {r.phanhoi && (
            <div className="bg-pink-50 border-l-4 border-pink-400 p-3 mt-3 rounded-md">
              <p className="text-gray-800 text-sm">
                <span className="font-semibold text-pink-600">
                  {r.ten_admin || "Admin"} phản hồi:
                </span>{" "}
                {r.phanhoi}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(r.ngaytraloi).toLocaleString()}
              </p>
            </div>
          )}
        </div>
        ))}

      {/* Nút Xem thêm / Thu gọn */}
      {reviews.filter((r) => r.trangthai === "hiển thị").length > 4 && (
  <div className="text-center mt-4">
    <button
      onClick={() => setShowAllReviews(!showAllReviews)}
      className="text-pink-500 font-medium hover:underline"
    >
      {showAllReviews ? "Thu gọn" : "Xem thêm"}
    </button>
  </div>
)}

    </>
  ) : (
    <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
  )}
</div>
</div>

      <PreFooter selectedProduct={product} />
    </div>
  );
}
