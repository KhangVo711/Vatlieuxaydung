import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { Mail, CreditCard, HelpCircle, Truck, Phone } from "lucide-react";
import ReactModal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { formatCurrency } from '../../../../utils/currency';
import { Context } from '../../../../components/Context';

const PreFooter = ({ selectedProduct}) => {
    const [products, setProducts] = useState([]);
  
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [error, setError] = useState(null);
  const { onAddToCart } = useContext(Context);

  useEffect(() => {
    axios
      .get('http://localhost:5001/getProduct')
      .then((response) => {
        setProducts(response.data.product);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProduct?.maloai) {
      fetchRecommendedProducts(selectedProduct.maloai);
    }
  }, [selectedProduct]);

  const fetchRecommendedProducts = async (maloai) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({ maloai });
      const response = await fetch(`http://localhost:5001/recommendations?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setRecommendedProducts(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Không thể tải sản phẩm đề xuất.');
      setRecommendedProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductDetails = async (product) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/detailProduct',
        { masp: product.masp, maloai: product.maloai, mansx: product.mansx },
        { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, withCredentials: true }
      );
      setSelectedProductModal(response.data.dataProduct);
      setProductImages(response.data.images);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Không thể tải chi tiết sản phẩm.');
    }
  };

  const handleViewProductClick = useCallback(
    async (product) => {
      if (isModalOpen) {
        setIsModalOpen(false);
        setSelectedProductModal(null);
        setProductImages([]);
        setTimeout(() => fetchProductDetails(product), 300);
      } else {
        fetchProductDetails(product);
      }
    },
    [isModalOpen]
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductModal(null);
    setProductImages([]);
  };

  const handleAddCartSelect = (product) => {
    const fullProduct = products.find((p) => p.masp === product.masp) || product;
    const productToAdd = {
      masp: fullProduct.masp,
      tensp: fullProduct.tensp,
      gia: fullProduct.gia,
      hinhanh: fullProduct.hinhanh,
      maloai: fullProduct.maloai,
      mansx: fullProduct.mansx,
      soluong: 1,
      soluongsp: fullProduct.soluongsp,
      tenloai: fullProduct.tenloai,
      tennsx: fullProduct.tennsx,
      ttct: fullProduct.ttct,
      km: fullProduct.km,
      makm: fullProduct.makm,
      tenkm: fullProduct.tenkm,
      thoigianbatdaukm: fullProduct.thoigianbatdaukm,
      thoigianketthuckm: fullProduct.thoigianketthuckm,
    };
    onAddToCart(productToAdd);
    closeModal();
    };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isModalOpen]);

  const features = [
    { icon: <Truck className="w-8 h-8 text-pink-400" />, title: "Vận chuyển miễn phí", description: "Miễn phí giao hàng cho đơn hàng trên 2.000.000đ" },
    { icon: <CreditCard className="w-8 h-8 text-pink-400" />, title: "Thanh toán an toàn", description: "Nhiều phương thức thanh toán bảo mật" },
    { icon: <HelpCircle className="w-8 h-8 text-pink-400" />, title: "Hỗ trợ 24/7", description: "Luôn sẵn sàng hỗ trợ bạn mọi lúc" },
    { icon: <Phone className="w-8 h-8 text-pink-400" />, title: "Đặt hàng qua điện thoại", description: "Gọi ngay: 1900 1234 567" },
  ];

  return (
    <div className="py-12 mt-3">
    {recommendedProducts.length > 0 ? (

      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">Sản phẩm tương tự</h2>
        <p className="text-gray-600 mb-6">Dựa trên {"sản phẩm bạn vừa xem"}</p>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recommendedProducts.length === 0 ? (
          <p className="text-gray-500">Không có sản phẩm tương tự nào.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {recommendedProducts.map((product) => (
              <div
                key={product.masp}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`}
                    alt={product.tensp}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">{product.tennsx}</div>
                  <h3 className="font-medium text-sm truncate">{product.tensp}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-800 font-semibold mt-1">{formatCurrency(product.gia)}</p>
                    <button
                      onClick={() => handleViewProductClick(product)}
                      className="bg-pink-400 text-white px-0.5 py-0.5 rounded hover:scale-105 transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                      aria-label={`View details of ${product.tensp}`}
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ): null}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Chi tiết sản phẩm"
        className="relative bg-white rounded-lg shadow-2xl mx-auto mt-24 max-w-3xl w-full h-fit py-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
      >
        {selectedProductModal && (
          <div className="p-4 flex items-center gap-6">
            <div className="w-1/2">
              <Swiper modules={[Navigation]} navigation spaceBetween={10} slidesPerView={1} className="w-full h-64">
                {productImages.length > 0 ? (
                  productImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="w-9/12 ml-11 h-full object-cover rounded"
                        src={`http://localhost:5001/uploads/${selectedProductModal.masp}/${image}`}
                        alt={`${selectedProductModal.tensp} - ${index}`}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <img
                      className="w-full h-full object-cover rounded"
                      src={`http://localhost:5001/uploads/${selectedProductModal.masp}/${selectedProductModal.hinhanh}`}
                      alt={selectedProductModal.tensp}
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <h2 className="text-xl text-center font-bold text-gray-800 mb-2">{selectedProductModal.tensp}</h2>
              <div className="flex h-20 justify-between text-sm">
                <div className="flex flex-col justify-center">
                  <div className="mb-2"><span className="font-bold">Loại:</span> {selectedProductModal.tenloai}</div>
                  <div className="mb-2"><span className="font-bold">Nhà sản xuất:</span> {selectedProductModal.tennsx}</div>
                </div>
                <div className="flex flex-col justify-center">
                  <div>
                    <p className="text-md font-semibold flex text-gray-800 mb-2">
                      <span className="font-bold mr-2">Tình trạng:</span>
                      {selectedProductModal.soluongsp > 0 ? (
                        <p className="text-gray-700 font-semibold">Còn hàng</p>
                      ) : (
                        <p className="text-red-600 font-semibold">Hết hàng</p>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-md font-semibold flex text-gray-800 mb-2">
                      <span className="font-bold mr-2">Giá:</span>
                      <p className={`${selectedProductModal.tenkm ? 'line-through' : null} mr-3`}>
                        {formatCurrency(selectedProductModal.gia)}
                      </p>
                      {selectedProductModal.km ? (
                        <p className="text-red-600 font-semibold">
                          {formatCurrency(selectedProductModal.gia - selectedProductModal.gia * (selectedProductModal.km / 100))}
                        </p>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{selectedProductModal.ttct}</p>
              <div className="mt-16 flex justify-center space-x-8">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-150"
                  onClick={closeModal}
                >
                  Đóng
                </button>
                <button
                  onClick={() => handleAddCartSelect(selectedProductModal)}
                  className="bg-pink-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                  aria-label={`Add ${selectedProductModal.tensp} to cart`}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </ReactModal>
    </div>

)
};

export default PreFooter;