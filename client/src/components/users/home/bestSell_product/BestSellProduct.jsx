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

// Bind modal to app element (required for accessibility, placed outside the component)
ReactModal.setAppElement('#root');

export default function NewProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onAddToCart } = useContext(Context);
    console.log(products);
  useEffect(() => {
    axios
      .get('http://localhost:5001/getProduct_Hot8')
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

        setTimeout(() => {
          fetchProductDetails(product);
        }, 300); 
      } else {
        fetchProductDetails(product);
      }
    },
    [isModalOpen]
  );
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
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setProductImages([]);
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
      {/* Section header */}
      <h2 className="my-6 lg:my-12 tracking-wider text-xl ml-4 md:ml-6 lg:ml-12 uppercase font-bold sm:text-2xl md:text-3xl lg:text-3xl">
        Sản phẩm bán chạy
      </h2>
      {/* Swiper slider for displaying products */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 }, // 1 product on small screens
          768: { slidesPerView: 2 }, // 2 products on tablets
          1024: { slidesPerView: 3 }, // 3 products on desktops
          1280: { slidesPerView: 4 }, // 4 products on larger screens
        }}
        navigation
      >
        {products.map((product) => (
          <SwiperSlide className="p-4" key={product.masp}>
            {/* Product card */}
            <div className="bg-white shadow-md rounded-lg p-8 h-fit product-card">
              <img
                src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`}
                alt={product.tensp}
                className="lg:w-2/3 h-48 object-cover sm:h-40 w-1/2 md:h-48 lg:h-56 mx-auto"
              />
              <h3 className="text-md tracking-tighter font-semibold mt-2 sm:text-sm md:text-md lg:text-lg">
                {product.tensp}
              </h3>
              <p>{product.ttct}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="bg-pink-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                  aria-label={`Add ${product.tensp} to cart`}
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
                      {selectedProduct.soluongsp > 0 ? (
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
                        {formatCurrency(selectedProduct.gia)}
                      </p>
                      {selectedProduct.km ? (
                        <p className="text-red-600 font-semibold">
                          {formatCurrency(selectedProduct.gia - selectedProduct.gia * (selectedProduct.km / 100))}
                        </p>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{selectedProduct.ttct}</p>
              <div className="mt-16 flex justify-center space-x-8">
              
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-150"
                  onClick={closeModal}
                >
                  Đóng
                </button>
                <button
                  onClick={() => handleAddCartSelect(selectedProduct)}
                  className="bg-pink-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                  aria-label={`Add ${selectedProduct.tensp} to cart`}
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