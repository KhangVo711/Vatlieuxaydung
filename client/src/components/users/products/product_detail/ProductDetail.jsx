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
import PreFooter from "../prefooter/PreFooter";

export default function ProductDetail() {
  const masp = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  const { onAddToCart } = useContext(Context);

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
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.tensp}</h2>
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
            <span className={`text-2xl font-semibold ${product.km ? "text-gray-400 line-through" : "text-pink-600"}`}>
              {selectedVariant
                ? formatCurrency(selectedVariant.gia)
                : formatCurrency(product.gia)}
            </span>
            {product.km && (
              <span className="text-3xl text-pink-600 font-bold">
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
                    className={`px-4 py-1 border rounded-md text-sm transition ${
                      selectedVariant?.mabienthe === variant.mabienthe
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

          {/* Mô tả */}
          <p className="text-gray-700 mb-6 leading-relaxed">{product.ttct}</p>

          {/* Nút hành động */}
          <div className="flex gap-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-medium text-lg transition">
              Mua ngay
            </button>
            <button
  onClick={handleAddToCart}
  className={`border border-pink-500 text-pink-500 hover:bg-pink-50 px-6 py-3 rounded-md font-medium text-lg transition
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

      <PreFooter selectedProduct={product} />
    </div>
  );
}
