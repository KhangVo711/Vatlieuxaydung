import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FunnelIcon, BarsArrowDownIcon, BarsArrowUpIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { gsap } from 'gsap';
import { formatCurrency } from '../../../../utils/currency';
import { Context } from '../../../../components/Context';
import {
    Popover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react'
export default function AllProduct() {

    const [products, setProducts] = useState([]);
    const { searchQuery } = useContext(Context);
    const { onAddToCart } = useContext(Context);

    const filteredProducts = products.filter(product =>
        product.tensp.toLowerCase().includes(searchQuery.toLowerCase())
    );
        
    useEffect(() => {
        axios.get('http://localhost:5001/getProduct')
            .then((response) => {
                setProducts(response.data.product);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    }, []);

    const handleAddToCart = (product, e) => {
        const imgElement = e.target.closest('article').querySelector('img');
        const cartElement = document.querySelector('#cart-icon');
       

        if (!imgElement || !cartElement) return;
    
        const imgRect = imgElement.getBoundingClientRect();
        const cartRect = cartElement.getBoundingClientRect();
        console.log(cartRect);
        console.log(imgRect);
        // Clone hình ảnh
        const cloneImg = imgElement.cloneNode(true);
        document.body.appendChild(cloneImg);
    
        // Đặt style ban đầu cho hình ảnh clone
        Object.assign(cloneImg.style, {
            position: 'absolute',
            top: `${imgRect.top + window.scrollY}px`, // Cộng thêm scroll để tính chính xác
            left: `${imgRect.left + window.scrollX}px`,
            width: `${imgRect.width}px`,
            height: `${imgRect.height}px`,
            zIndex: 2,
            pointerEvents: 'none',
        });
    
        // Animation bằng GSAP
        gsap.to(cloneImg, {
            duration: 0.5,
            ease: 'power1.inOut',
            x: cartRect.left + window.scrollX - imgRect.left - window.scrollX,
            y: cartRect.top + window.scrollY - imgRect.top - window.scrollY,
            width: 20,
            height: 20,
            opacity: 0.5,
            onComplete: () => {
                cloneImg.remove(); // Xóa hình ảnh clone sau khi hoàn tất animation
                onAddToCart(product); // Thêm sản phẩm vào giỏ hàng
            },
        });
    };

    return (
        <div className='flex flex-col'> 
        <Popover className="w-full xl:px-48 mb-5 md:px-5 lg:px-8 px-2.5 pt-12 xl:pb-8 pb-3 flex justify-between items-center relative">
        <h2 className="w-full text-center lg:text-3xl text-xl tracking-wide font-bold uppercase">Sản phẩm</h2>
        <PopoverButton className="flex items-end justify-end group outline-none 2xl:mr-44 mr-3 text-gray-600 hover:text-gray-800 absolute right-6 bottom-0 text-xs md:text-sm lg:text-md transition duration-150 ease-in-out">
            <FunnelIcon className="h-7 w-7 group-hover:text-gray-900 text-gray-600 mr-0.5 " />Lọc
        </PopoverButton>
        <PopoverPanel
            transition
            className="absolute flex justify-between right-24 bottom-0 z-10 mt-3 w-screen max-w-20 overflow-hidden  transition data-[closed]:translate-x-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
            <BarsArrowDownIcon className="h-7 w-7 text-gray-600 hover:text-gray-900 cursor-pointer" />
            <BarsArrowUpIcon className="h-7 w-7 text-gray-600 hover:text-gray-900 cursor-pointer" />

        </PopoverPanel>
    </Popover>
        <div className="container mx-auto grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-5 pt-4 pb-12 ">
    
                {filteredProducts.map(product => (
                    <article key={product.masp} className=" w-full lg:h-[350px] h-[250px] flex p-2 flex-col items-center rounded-md">
                        <div>

                            <img className="mb-2.5 hover:grow hover:scale-105 w-full lg:h-[250px] h-[150px] rounded-sm transition duration-300 ease-in-out" src={`http://localhost:5001/uploads/${product.hinhanh}`} alt={product.name} />
                            
                            
                        </div>
                        <div className="pt-4 px-4 w-full flex items-center justify-between">
                                <p className=""><strong>{product.tensp}</strong></p>
                                <button
                                type="button"
                                onClick={(e) => handleAddToCart(product, e)}
                            >
                                <PlusCircleIcon className="h-7 w-7 text-gray-600 hover:scale-105 cursor-pointer" />
                            </button>
                            </div>
                            <div className="flex w-full px-4 justify-start items-center">
                            <p>{formatCurrency(product.gia)}</p>
                            </div>
                    </article>
                ))}
            </div>
            </div>
    );
}
