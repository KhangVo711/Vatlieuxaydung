import React, { useContext, useState, useEffect } from 'react';
import { formatCurrency } from '../../../../utils/currency';
import { gsap } from 'gsap';
import { Context } from '../../../../components/Context';
import axios from 'axios';

export default function ProductIntro() {
  const [productsale, setProductsale] = useState([]);
  const { onAddToCart } = useContext(Context);

  useEffect(() => {
    axios.get('http://localhost:5001/getProduct5')
      .then((response) => {
        setProductsale(response.data.product);
      })
      .catch((error) => {
        console.error('Lỗi:', error);
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

    const fullProduct = productsale.find((p) => p.masp === product.masp) || product;
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

  return (
    <div className="lg:h-[500px] md:h-[400px] px-20 w-full md:block hidden">
      <h2 className="my-12 tracking-wider text-3xl text-center uppercase font-bold">
        Sản phẩm giảm sốc
      </h2>
      <div className="w-full flex justify-evenly items-center">
        {productsale.map((product) => (
          <div
            key={product.masp}
            className="w-72 h-fit bg-white border rounded-lg shadow-md overflow-hidden product-card"
          >
            <div className="relative p-5">
              <img
                src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`}
                alt={product.tensp}
                className="w-full lg:h-60 md:h-32 object-cover"
              />
              <span className="absolute top-0 right-0 bg-red-600/85 text-white text-sm font-semibold py-2 px-3.5 rounded-bl-lg">
                {product.tenkm}
              </span>
            </div>
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="text-lg tracking-tight md:text-md font-bold text-gray-900">
                    {product.tensp}
                  </h2>
                </div>
              </div>
              <p className="xl:block hidden text-sm md:text-xs text-gray-600">
                {product.ttct}
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 opacity-80 line-through">
                    {formatCurrency(product.gia)}
                  </span>
                  <span className="font-bold text-red-600">
                    {formatCurrency(product.gia * (1 - product.km / 100))}
                  </span>
                </div>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="bg-pink-400 text-white font-semibold py-1.5 px-3 rounded-md xl:block hover:scale-105 transition duration-200 ease-in-out"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}