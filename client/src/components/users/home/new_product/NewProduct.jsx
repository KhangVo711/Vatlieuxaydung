import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
export default function NewProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/getProduct8')
            .then((response) => {
                setProducts(response.data.product);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    }, []);

    
    return (
        <div>
            <h2 className="my-6 lg:my-12 tracking-wider text-xl ml-4 md:ml-6 lg:ml-12 uppercase font-bold sm:text-2xl md:text-3xl lg:text-3xl">Sản phẩm mới</h2>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                breakpoints={{
                    // Khi màn hình lớn hơn 640px (điện thoại)
                    640: {
                        slidesPerView: 1,  // Hiển thị 2 sản phẩm
                    },
                    // Khi màn hình lớn hơn 768px (máy tính bảng)
                    768: {
                        slidesPerView: 2,  // Hiển thị 2 sản phẩm
                    },
                    // Khi màn hình lớn hơn 1024px (máy tính)
                    1024: {
                        slidesPerView: 3,  // Hiển thị 3 sản phẩm
                    },
                    // Khi màn hình lớn hơn 1280px (màn hình lớn hơn)
                    1280: {
                        slidesPerView: 4,  // Hiển thị 4 sản phẩm
                    },
                }}
                navigation
            >
                {products.map((product) => (
                    <SwiperSlide className="p-4" key={product.masp}>
                        <div className="bg-white shadow-md rounded-lg p-8 h-[350px] md:h-[360px] lg:h-[380px]">
                            <img src={`http://localhost:5001/uploads/${product.hinhanh}`} alt={product.tensp} className="lg:w-1/2 h-48 object-cover sm:h-40 w-1/2 md:h-48 lg:h-56 mx-auto" />
                            <h3 className="text-md tracking-tighter font-semibold mt-2 sm:text-sm md:text-md lg:text-lg">
                                {product.tensp}
                            </h3>
                            <div className="flex justify-between mt-4">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md">
                                    Đặt hàng
                                </button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md">
                                    Tư vấn
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}