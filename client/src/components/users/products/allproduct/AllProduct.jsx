import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FunnelIcon, BarsArrowDownIcon, BarsArrowUpIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { gsap } from 'gsap';
import { formatCurrency } from '../../../../utils/currency';
import { Context } from '../../../../components/Context';
import ReactModal from 'react-modal';
import {
    Popover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react'
export default function AllProduct() {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [producer, setProducer] = useState([]);
    const { searchQuery } = useContext(Context);
    const { onAddToCart } = useContext(Context);
    console.log(products)
    const filteredProducts = products.filter(product =>
        product.tensp.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/getProduct');
                setProducts(response.data.product);
            } catch (error) {
                console.error('Lỗi:', error);
            }
        };
    
        fetchData(); // Gọi lần đầu ngay khi component mount
    
        const interval = setInterval(fetchData, 60000); // Gọi lại mỗi phút
    
        return () => clearInterval(interval); // Cleanup interval khi component unmount
    }, []);
    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewProductClick = async (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);

        const response = await axios.get(`http://localhost:5001/getCategory/${selectedProduct.maloai}`);
        if (response.status === 200) {
            setCategory(response.data.listCategory);
        }

        const responser = await axios.get(`http://localhost:5001/getProducer/${selectedProduct.mansx}`);
        if (response.status === 200) {
            setProducer(responser.data.listNSX);
        }

    };



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
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedProduct]);
    

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
                    <article key={product.masp} className=" w-full relative shadow-md lg:h-[350px] h-[250px] flex p-2 flex-col items-center rounded-md">
{product.tenkm && product.km ? (
                        <div className='absolute top-0 right-0 bg-red-700/80 w-24 z-10 text-sm flex items-center justify-center h-10 text-white px-2 py-1 rounded-tr-md rounded-bl-md'>
                            {product.tenkm}
                        </div>
): null}
                        <div>

                            <img onClick={() => handleViewProductClick(product)} className="mb-2.5 hover:grow hover:scale-105 w-full lg:h-[250px] h-[150px] rounded-sm transition duration-300 ease-in-out" src={`http://localhost:5001/uploads/${product.hinhanh}`} alt={product.name} />


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
                        <div className={`flex w-full px-4 justify-start items-center`}>
                            <p className={`${product.tenkm ? 'line-through' : null} mr-5`}>{formatCurrency(product.gia)}</p>
                            {product.km ? (
                                 <p className='text-red-600 font-semibold'>{formatCurrency(product.gia - (product.gia * (product.km / 100)))}</p>
                            ) : null}
                           
                        </div>
                    </article>
                ))}
            </div>
            {selectedProduct && (
                <ReactModal
                isOpen={isModalOpen}
                onRequestClose={() => {setIsModalOpen(false), setSelectedProduct(null)}}
                contentLabel="Chi tiết sản phẩm"
                className="relative bg-white rounded-lg shadow-2xl mx-auto mt-24 max-w-xl w-full h-auto p-6"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
            >
                <div className="p-4 flex items-center gap-6">
                    {/* Hình ảnh sản phẩm */}
                    <div className="w-1/2 ">
                        <div className="relative flex items-center justify-center w-full h-64 rounded">
                            <img
                                className="w-2/3 h-full object-cover"
                                src={`http://localhost:5001/uploads/${selectedProduct.hinhanh}`}
                                alt={selectedProduct.name}
                            />
                        </div>
                    </div>
            
                    {/* Thông tin sản phẩm */}
                    <div className="w-1/2 flex flex-col  justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedProduct.tensp}</h2>
                           
                            <div className="mb-4">
                                <span className="font-bold">Loại:</span> {selectedProduct.tenloai}
                            </div>
                            <div className="mb-4">
                                <span className="font-bold">Nhà sản xuất:</span> {selectedProduct.tennsx}
                            </div>
                            <p className="text-md font-semibold flex text-gray-800 mb-4 ">
                                <span className='font-bold mr-2'>Giá:</span><p className={`${selectedProduct.tenkm ? 'line-through' : null} mr-3`}>{formatCurrency(selectedProduct.gia)}</p>
                            {selectedProduct.km ? (
                                    <p className='text-red-600 font-semibold'>{formatCurrency(selectedProduct.gia - (selectedProduct.gia * (selectedProduct.km / 100)))}</p>
                            ) : null}
                            </p>
                            <p className="text-gray-600">{selectedProduct.ttct}</p>
                        </div>
            
                        {/* Nút hành động */}
                        <div className="mt-6 flex justify-center space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-150"
                                onClick={() => {setIsModalOpen(false), setSelectedProduct(null)}}
                            >
                                Đóng
                            </button>
                            <button
                                className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 trasiton duration-150"
                                onClick={() => {
                                    onAddToCart(selectedProduct);
                                    setIsModalOpen(false);
                                }}
                            >
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            </ReactModal>
            
            )}
        </div>
    );
}
