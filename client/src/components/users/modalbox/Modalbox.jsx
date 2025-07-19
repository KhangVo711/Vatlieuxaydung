import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { formatCurrency } from "../../../utils/currency"; // Điều chỉnh đường dẫn theo cấu trúc dự án
import ReactModal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Context } from "../../Context.jsx";

// Bind modal to app element (required for accessibility)
ReactModal.setAppElement("#root");

const ModalBox = ({ isOpen, onClose, product: initialProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { onAddToCart } = useContext(Context);

  // Fetch product details
  const fetchProductDetails = useCallback(async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/detailProduct",
        {
          masp: product.masp,
          maloai: product.maloai,
          mansx: product.mansx,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      setSelectedProduct(response.data.dataProduct);
      setProductImages(response.data.images || []);
      setVariants(response.data.variants || []);
      const firstAvailableVariant =
        response.data.variants?.find((v) => v.soluongtonkho > 0) ||
        response.data.variants?.[0] ||
        null;
      setSelectedVariant(firstAvailableVariant);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen && initialProduct) {
      fetchProductDetails(initialProduct);
    }
  }, [isOpen, initialProduct, fetchProductDetails]);

  const handleAddCartSelect = () => {
    if (!selectedVariant && variants.length > 0) return; // Prevent adding if variant required but not selected
    const productToAdd = {
      masp: selectedProduct.masp,
      tensp: selectedProduct.tensp,
      gia: selectedVariant ? selectedVariant.gia : selectedProduct.gia,
      hinhanh: selectedProduct.hinhanh,
      maloai: selectedProduct.maloai,
      mansx: selectedProduct.mansx,
      soluong: 1,
      soluongsp: selectedVariant
        ? selectedVariant.soluongtonkho
        : selectedProduct.soluongsp,
      tenloai: selectedProduct.tenloai,
      tennsx: selectedProduct.tennsx,
      ttct: selectedProduct.ttct,
      km: selectedProduct.km,
      makm: selectedProduct.makm,
      tenkm: selectedProduct.tenkm,
      thoigianbatdaukm: selectedProduct.thoigianbatdaukm,
      thoigianketthuckm: selectedProduct.thoigianketthuckm,
      ...(selectedVariant && selectedVariant.mabienthe && {
        mabienthe: selectedVariant.mabienthe,
      }),
      ...(selectedVariant && selectedVariant.thuoc_tinh && {
        thuoctinh: selectedVariant.thuoc_tinh,
      }),
    };
    onAddToCart(productToAdd);
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Chi tiết sản phẩm"
      className="relative bg-white rounded-lg shadow-2xl mx-auto mt-24 max-w-3xl w-full h-fit py-24"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
    >
      {selectedProduct && (
        <div className="p-4 flex items-center gap-6">
          <div className="w-1/2">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              className="w-full h-64"
            >
              {productImages.length > 0 ? (
                productImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-9/12 ml-11 h-full object-cover rounded"
                      src={`http://localhost:5001/uploads/${selectedProduct.masp}/${image}`}
                      alt={`${selectedProduct.tensp} - ${index}`}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    className="w-full h-full object-cover rounded"
                    src={`http://localhost:5001/uploads/${selectedProduct.masp}/${selectedProduct.hinhanh}`}
                    alt={selectedProduct.tensp}
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-2">
              {selectedProduct.tensp}
            </h2>
            <div className="flex h-20 justify-between text-sm">
              <div className="flex flex-col justify-center">
                <div className="mb-2">
                  <span className="font-bold">Loại:</span> {selectedProduct.tenloai}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Nhà sản xuất:</span>{" "}
                  {selectedProduct.tennsx}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div>
                  <p className="text-md font-semibold flex text-gray-800 mb-2">
                    <span className="font-bold mr-2">Tình trạng:</span>
                    {(selectedVariant?.soluongtonkho || selectedProduct.soluongsp) >
                    0 ? (
                      <p className="text-gray-700 font-semibold">Còn hàng</p>
                    ) : (
                      <p className="text-red-600 font-semibold">Hết hàng</p>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-md font-semibold flex text-gray-800 mb-2">
                    <span className="font-bold mr-2">Giá:</span>
                    <p
                      className={`${
                        selectedProduct.tenkm ? "line-through" : null
                      } mr-3`}
                    >
                      {selectedVariant
                        ? formatCurrency(selectedVariant.gia)
                        : selectedProduct.gia_range && selectedProduct.gia_range
                        ? formatCurrency(selectedProduct.gia_range) + " +"
                        : selectedProduct.gia_range
                        ? formatCurrency(selectedProduct.gia_range)
                        : formatCurrency(selectedProduct.gia)}
                    </p>
                    {selectedProduct.km ? (
                      <p className="text-red-600 font-semibold">
                        {selectedVariant
                          ? formatCurrency(
                              selectedVariant.gia *
                                (1 - selectedProduct.km / 100)
                            )
                          : selectedProduct.gia_range &&
                            selectedProduct.gia_range
                          ? `${formatCurrency(
                              parseInt(selectedProduct.gia_range) *
                                (1 - selectedProduct.km / 100)
                            )} +`
                          : selectedProduct.gia_range
                          ? `${formatCurrency(
                              parseInt(selectedProduct.gia_range) *
                                (1 - selectedProduct.km / 100)
                            )}`
                          : formatCurrency(
                              selectedProduct.gia -
                                selectedProduct.gia * (selectedProduct.km / 100)
                            )}
                      </p>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
            {variants.length > 0 && (
              <div className="mb-4">
                <p className="font-bold text-sm mb-2">
                  {selectedProduct.loaibienthe}:
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {variants.map((variant) => (
                    <button
                      key={variant.mabienthe}
                      onClick={() => setSelectedVariant(variant)}
                      className={`py-1 text-sm border rounded ${
                        selectedVariant?.mabienthe === variant.mabienthe
                          ? "bg-pink-500 text-white"
                          : "bg-gray-200"
                      } ${
                        variant.soluongtonkho === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={variant.soluongtonkho === 0}
                    >
                      {variant.thuoc_tinh}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p className="text-gray-600 text-sm">{selectedProduct.ttct}</p>
            <div className="mt-16 flex justify-center space-x-8">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-150"
                onClick={onClose}
              >
                Đóng
              </button>
              <button
                onClick={handleAddCartSelect}
                className="bg-pink-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                aria-label={`Add ${selectedProduct.tensp} to cart`}
                disabled={
                  !selectedVariant &&
                  variants.length > 0 &&
                  (!selectedVariant?.soluongtonkho || selectedVariant?.soluongtonkho === 0)
                }
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </ReactModal>
  );
};

export default ModalBox;