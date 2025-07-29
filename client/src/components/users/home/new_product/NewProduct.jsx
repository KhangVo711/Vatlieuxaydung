import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Context } from '../../../../components/Context';
import axios from 'axios';
import ReactModal from 'react-modal';
import { formatCurrency } from '../../../../utils/currency';

ReactModal.setAppElement('#root');

export default function NewProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onAddToCart } = useContext(Context);

  useEffect(() => {
    axios
      .get('http://localhost:5001/getProduct8')
      .then((response) => {
        setProducts(response.data.product);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddToCart = (product, e) => {
    const productCard = e.target.closest('.product-card');
    if (!productCard) {
      console.error('Product card not found');
      onAddToCart(product);
      return;
    }

    const imgElement = productCard.querySelector('img');
    const cartElement = document.querySelector('#cart-icon');

    // Kiểm tra nếu có biến thể
    const hasVariants = product.mabienthe_list && product.mabienthe_list.split(',').length > 1;
    if (hasVariants) {
      handleViewProductClick(product); // Mở modal để chọn biến thể
      return;
    }

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
      ...(fullProduct.mabienthe_list && { mabienthe: fullProduct.mabienthe_list.split(',')[0] || null }),
      ...(fullProduct.thuoc_tinh_list && { thuoctinh: fullProduct.thuoc_tinh_list.split(',')[0] || null }),
    };

    if (fullProduct.soluongsp <= 0) {
      console.warn('Product out of stock, cannot add to cart');
      return;
    }

    if (!imgElement || !cartElement) {
      console.warn('Image or cart icon not found, adding to cart without animation');
      onAddToCart(productToAdd);
      return;
    }

    const imgRect = imgElement.getBoundingClientRect();
    const cartRect = cartElement.getBoundingClientRect();

    const cloneImg = imgElement.cloneNode(true);
    document.body.appendChild(cloneImg);

    Object.assign(cloneImg.style, {
      position: 'absolute',
      top: `${imgRect.top + window.scrollY}px`,
      left: `${imgRect.left + window.scrollX}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
      zIndex: 1000,
      pointerEvents: 'none',
    });

    gsap.to(cloneImg, {
      duration: 0.7,
      ease: 'power2.inOut',
      x: cartRect.left + window.scrollX - imgRect.left - window.scrollX,
      y: cartRect.top + window.scrollY - imgRect.top - window.scrollY,
      width: 20,
      height: 20,
      opacity: 0.5,
      onComplete: () => {
        cloneImg.remove();
        onAddToCart(productToAdd);
      },
    });
  };

  const handleViewProductClick = useCallback(
    async (product) => {
      if (isModalOpen) {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setProductImages([]);
        setVariants([]);
        setSelectedVariant(null);
        setTimeout(() => fetchProductDetails(product), 300);
      } else {
        fetchProductDetails(product);
      }
    },
    [isModalOpen]
  );

  const handleAddCartSelect = () => {
    if (!selectedVariant && variants.length > 0) return;
    const productToAdd = {
      masp: selectedProduct.masp,
      tensp: selectedProduct.tensp,
      gia: selectedVariant ? selectedVariant.gia : selectedProduct.gia,
      hinhanh: selectedProduct.hinhanh,
      maloai: selectedProduct.maloai,
      mansx: selectedProduct.mansx,
      soluong: 1,
      soluongsp: selectedVariant ? selectedVariant.soluongtonkho : selectedProduct.soluongsp,
      tenloai: selectedProduct.tenloai,
      tennsx: selectedProduct.tennsx,
      ttct: selectedProduct.ttct,
      km: selectedProduct.km,
      makm: selectedProduct.makm,
      tenkm: selectedProduct.tenkm,
      thoigianbatdaukm: selectedProduct.thoigianbatdaukm,
      thoigianketthuckm: selectedProduct.thoigianketthuckm,
      ...(selectedVariant && selectedVariant.mabienthe && { mabienthe: selectedVariant.mabienthe }),
      ...(selectedVariant && selectedVariant.thuoc_tinh && { thuoctinh: selectedVariant.thuoc_tinh }),
    };
    onAddToCart(productToAdd);
    closeModal();
  };

  const fetchProductDetails = async (product) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/detailProduct',
        { masp: product.masp, maloai: product.maloai, mansx: product.mansx },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true,
        }
      );
      setSelectedProduct(response.data.dataProduct);
      setProductImages(response.data.images);
      setVariants(response.data.variants || []);
      const firstAvailableVariant = response.data.variants?.find(v => v.soluongtonkho > 0) || response.data.variants?.[0] || null;
      setSelectedVariant(firstAvailableVariant);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setProductImages([]);
    setVariants([]);
    setSelectedVariant(null);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <div>
      <h2 className="my-6 lg:my-12 tracking-wider text-xl ml-4 md:ml-6 lg:ml-12 uppercase font-bold sm:text-2xl md:text-3xl lg:text-3xl">
        Sản phẩm mới
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        navigation
      >
        {products.map((product) => (
          <SwiperSlide className="p-4" key={product.masp}>
            <div className="bg-white shadow-md rounded-lg p-8 h-fit product-card">
              <img
                src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`}
                alt={product.tensp}
                className="lg:w-2/3 h-48 object-cover sm:h-40 w-1/2 md:h-48 lg:h-56 mx-auto"
              />
              <h3 className="text-md tracking-tighter font-semibold mt-2 sm:text-sm md:text-lg lg:text-xl">
                {product.tensp}
              </h3>
              <p className='line-clamp-3'>{product.ttct}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="bg-pink-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                  aria-label={`Add ${product.tensp} to cart`}
                  disabled={product.max_soluongtonkho === 0 && !product.soluongsp}
                >
                  Mua ngay
                </button>
                <button
                  onClick={() => handleViewProductClick(product)}
                  className="bg-blue-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                  aria-label={`View details of ${product.tensp}`}
                >
                  Chi tiết
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Chi tiết sản phẩm"
        className="relative bg-white rounded-lg shadow-2xl mx-auto mt-24 max-w-3xl w-full h-fit py-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
      >
        {selectedProduct && (
          <div className="p-4 flex items-center gap-6">
            <div className="w-1/2">
              <Swiper modules={[Navigation]} navigation spaceBetween={10} slidesPerView={1} className="w-full h-64">
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
              <h2 className="text-xl text-center font-bold text-gray-800 mb-2">{selectedProduct.tensp}</h2>
              <div className="flex h-20 justify-between text-sm">
                <div className="flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="font-bold">Loại:</span> {selectedProduct.tenloai}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Nhà sản xuất:</span> {selectedProduct.tennsx}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div>
                    <p className="text-md font-semibold flex text-gray-800 mb-2">
                      <span className="font-bold mr-2">Tình trạng:</span>
                      {(selectedVariant?.soluongtonkho || selectedProduct.soluongsp) > 0 ? (
                        <p className="text-gray-700 font-semibold">Còn hàng</p>
                      ) : (
                        <p className="text-red-600 font-semibold">Hết hàng</p>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-md font-semibold flex text-gray-800 mb-2">
                      <span className="font-bold mr-2">Giá:</span>
                      <p className={`${selectedProduct.tenkm ? 'line-through' : null} mr-3`}>
                        {selectedVariant ? formatCurrency(selectedVariant.gia) : 
                          selectedProduct.gia_range && selectedProduct.gia_range.includes('+') 
                            ? formatCurrency(selectedProduct.gia_range.split(' ')[0]) + ' +'
                            : selectedProduct.gia_range ? selectedProduct.gia_range : formatCurrency(selectedProduct.gia)}
                      </p>
                      {selectedProduct.km ? (
                        <p className="text-red-600 font-semibold">
                          {selectedVariant ? formatCurrency(selectedVariant.gia * (1 - selectedProduct.km / 100)) :
                            selectedProduct.gia_range && selectedProduct.gia_range.includes('+') 
                              ? `Từ ${formatCurrency(parseInt(selectedProduct.gia_range.split(' ')[0]) * (1 - selectedProduct.km / 100))} +`
                              : selectedProduct.gia_range 
                                ? `Từ ${formatCurrency(parseInt(selectedProduct.gia_range.split(' đến ')[0].replace('Từ ', '')) * (1 - selectedProduct.km / 100))} đến ${formatCurrency(parseInt(selectedProduct.gia_range.split(' đến ')[1]) * (1 - selectedProduct.km / 100))}`
                                : formatCurrency(selectedProduct.gia - (selectedProduct.gia * (selectedProduct.km / 100)))
                          }
                        </p>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
              {variants.length > 0 && (
                <div className="mb-4">
                  <p className="font-bold text-sm mb-2">{selectedProduct.loaibienthe}:</p>
                  <div className="grid grid-cols-4 gap-3">
                    {variants.map(variant => (
                      <button
                        key={variant.mabienthe}
                        onClick={() => setSelectedVariant(variant)}
                        className={`py-1 text-sm border rounded ${selectedVariant?.mabienthe === variant.mabienthe ? 'bg-pink-500 text-white' : 'bg-gray-200'} ${variant.soluongtonkho === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                  onClick={closeModal}
                >
                  Đóng
                </button>
                <button
                  onClick={handleAddCartSelect}
                  className="bg-pink-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                  aria-label={`Add ${selectedProduct.tensp} to cart`}
                  disabled={!selectedVariant && variants.length > 0 || (selectedVariant?.soluongtonkho === 0) || (!selectedVariant && selectedProduct.soluongsp === 0)}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </ReactModal>
    </div>
  );
}