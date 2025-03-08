import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { FunnelIcon, BarsArrowDownIcon, BarsArrowUpIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { gsap } from 'gsap';
import { formatCurrency } from '../../../../utils/currency';
import { Context } from '../../../../components/Context';
import ReactModal from 'react-modal';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

// Bind modal to app element (required for accessibility)
ReactModal.setAppElement('#root');

export default function AllProduct() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { searchQuery, onAddToCart } = useContext(Context);

    const filteredProducts = products.filter(product =>
        product.tensp.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(productImages);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/getProduct');
                setProducts(response.data.product);
            } catch (error) {
                console.error('Lỗi:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleViewProductClick = useCallback(async (product) => {
        // Close the modal if it's already open to prevent conflicts
        if (isModalOpen) {
            setIsModalOpen(false);
            setSelectedProduct(null);
            setProductImages([]);
            // Wait for the modal to fully close before opening it again
            setTimeout(() => {
                fetchProductDetails(product);
            }, 300); // Adjust the delay if needed
        } else {
            fetchProductDetails(product);
        }
    }, [isModalOpen]);

    const fetchProductDetails = async (product) => {
        try {
            const response = await axios.post('http://localhost:5001/detailProduct', 
                { masp: product.masp, maloai: product.maloai, mansx: product.mansx },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    withCredentials: true
                }
            );
            console.log(response.data);
            setSelectedProduct(response.data.dataProduct);
            setProductImages(response.data.images);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
        }
    };

    const handleAddToCart = (product, e) => {
        const imgElement = e.target.closest('article').querySelector('img');
        const cartElement = document.querySelector('#cart-icon');
        if (!imgElement || !cartElement) return;

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
            zIndex: 2,
            pointerEvents: 'none',
        });

        gsap.to(cloneImg, {
            duration: 0.5,
            ease: 'power1.inOut',
            x: cartRect.left + window.scrollX - imgRect.left - window.scrollX,
            y: cartRect.top + window.scrollY - imgRect.top - window.scrollY,
            width: 20,
            height: 20,
            opacity: 0.5,
            onComplete: () => {
                cloneImg.remove();
                const fullProduct = products.find(p => p.masp === product.masp) || product;
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
            },
        });
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
        <div className="flex flex-col">
            <Popover className="w-full xl:px-48 mb-5 md:px-5 lg:px-8 px-2.5 pt-12 xl:pb-8 pb-3 flex justify-between items-center relative">
                <h2 className="w-full text-center lg:text-3xl text-xl tracking-wide font-bold uppercase">Sản phẩm</h2>
                <PopoverButton className="flex items-end justify-end group outline-none 2xl:mr-44 mr-3 text-gray-600 hover:text-gray-800 absolute right-6 bottom-0 text-xs md:text-sm lg:text-md transition duration-150 ease-in-out">
                    <FunnelIcon className="h-7 w-7 group-hover:text-gray-900 text-gray-600 mr-0.5" />Lọc
                </PopoverButton>
                <PopoverPanel
                    transition
                    className="absolute flex justify-between right-24 bottom-0 z-10 mt-3 w-screen max-w-20 overflow-hidden transition data-[closed]:translate-x-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <BarsArrowDownIcon className="h-7 w-7 text-gray-600 hover:text-gray-900 cursor-pointer" />
                    <BarsArrowUpIcon className="h-7 w-7 text-gray-600 hover:text-gray-900 cursor-pointer" />
                </PopoverPanel>
            </Popover>
            <div className="container mx-auto grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-5 pt-4 pb-12">
                {filteredProducts.map(product => (
                    <article key={product.masp} className="w-full relative shadow-md lg:h-[350px] h-[250px] flex p-2 flex-col items-center rounded-md">
                        {product.tenkm && product.km ? (
                            <div className="absolute top-0 right-0 bg-red-700/80 w-24 z-10 text-sm flex items-center justify-center h-10 text-white px-2 py-1 rounded-tr-md rounded-bl-md">
                                {product.tenkm}
                            </div>
                        ) : null}
                        <div>
                            <img
                                onClick={() => handleViewProductClick(product)}
                                className="mb-2.5 hover:grow hover:scale-105 w-full lg:h-[250px] h-[150px] rounded-sm transition duration-300 ease-in-out"
                                src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`}
                                alt={product.tensp}
                            />
                        </div>
                        <div className="pt-4 px-4 w-full flex items-center justify-between">
                            <p><strong>{product.tensp}</strong></p>
                            <button type="button" onClick={(e) => handleAddToCart(product, e)}>
                                <PlusCircleIcon className="h-7 w-7 text-gray-600 hover:scale-105 cursor-pointer" />
                            </button>
                        </div>
                        <div className="flex w-full px-4 justify-start items-center">
                            <p className={`${product.tenkm ? 'line-through' : null} mr-5`}>{formatCurrency(product.gia)}</p>
                            {product.km ? (
                                <p className="text-red-600 font-semibold">{formatCurrency(product.gia - (product.gia * (product.km / 100)))}</p>
                            ) : null}
                        </div>
                    </article>
                ))}
            </div>
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
                                                className="w-10/12 ml-8 h-full object-cover rounded"
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
                            <div className='flex h-20 justify-between text-sm'>
                                <div className='flex flex-col justify-center'>
                                    <div className="mb-2">
                                        <span className="font-bold">Loại:</span> {selectedProduct.tenloai}
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-bold">Nhà sản xuất:</span> {selectedProduct.tennsx}
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <div>
                                        <p className="text-md font-semibold flex text-gray-800 mb-2">
                                            <span className="font-bold mr-2">Tình trạng:</span>
                                            {selectedProduct.soluong > 0 ? (
                                                <p className="text-gray-600 font-semibold">Còn hàng</p>
                                            ) : <p className="text-red-600 font-semibold">Hết hàng</p>}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-md font-semibold flex text-gray-800 mb-2">
                                            <span className="font-bold mr-2">Giá:</span>
                                            <p className={`${selectedProduct.tenkm ? 'line-through' : null} mr-3`}>{formatCurrency(selectedProduct.gia)}</p>
                                            {selectedProduct.km ? (
                                                <p className="text-red-600 font-semibold">{formatCurrency(selectedProduct.gia - (selectedProduct.gia * (selectedProduct.km / 100)))}</p>
                                            ) : null}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">{selectedProduct.ttct}</p>
                            <div className="mt-16 flex justify-center space-x-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-150"
                                    onClick={closeModal}
                                >
                                    Đóng
                                </button>
                                {/* <button
                                    className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition duration-150"
                                    onClick={() => {
                                        onAddToCart(selectedProduct);
                                        closeModal();
                                    }}
                                >
                                    Thêm vào giỏ
                                </button> */}
                            </div>
                        </div>
                    </div>
                )}
            </ReactModal>
        </div>
    );
}