import React, { useState, useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { gsap } from 'gsap';
import 'swiper/css';
import toast from 'react-hot-toast';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Context } from '../../../../components/Context';
import axios from 'axios';
// import { formatCurrency } from '../../../../utils/currency';
import { Link, useNavigate } from 'react-router-dom';

export default function NewProduct() {
  const [products, setProducts] = useState([]);
  const { onAddToCart } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5001/getProduct8')
      .then((response) => setProducts(response.data.product))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

 const handleAddToCart = (product, e) => {
  const productCard = e.target.closest('.product-card');
  if (!productCard) {
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

  if (fullProduct.soluongsp <= 0) return;

  if (!imgElement || !cartElement) {
    onAddToCart(productToAdd);
    setTimeout(() => {
      navigate("/cart");
    }, 500);
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

    setTimeout(() => {
      navigate("/cart");
    }, 500);
    },
  });
};


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
                onClick={() => navigate(`/products/detail/${product.masp}`)}
                src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`}
                alt={product.tensp}
                className="lg:w-2/3 h-48 object-cover sm:h-40 w-1/2 md:h-48 lg:h-56 mx-auto cursor-pointer hover:scale-105 transition duration-300"
              />
              <h3 className="text-md tracking-tighter font-semibold mt-2 sm:text-sm md:text-lg lg:text-xl">
                {product.tensp}
              </h3>
              <p className="line-clamp-3 text-sm text-gray-600">{product.ttct}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="bg-pink-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                  aria-label={`Add ${product.tensp} to cart`}
                >
                  Mua ngay
                </button>
                <button
                  onClick={() => setTimeout(() => navigate(`/products/detail/${product.masp}`), 300)}
                  className="bg-blue-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md"
                >
                  Chi tiết
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
