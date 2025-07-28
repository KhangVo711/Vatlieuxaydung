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
import PreFooter from '../prefooter/PreFooter';
import CosmeticsProductCard from '../cosmeticsproductcard/CosmeticsProductCard';
import { useLocation } from 'react-router-dom';

ReactModal.setAppElement('#root');

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchQuery, onAddToCart } = useContext(Context);
  const location = useLocation();
  const isProductCategory = /^\/products\/.*/.test(location.pathname);
  const category = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = isProductCategory
          ? `http://localhost:5001/getProductOfCategory/${category}`
          : 'http://localhost:5001/getProduct';
        const response = await axios.get(endpoint);
        setProducts(response.data.product);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [category, isProductCategory]);

  const handleViewProductClick = useCallback(async (product) => {
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
  }, [isModalOpen]);

  const fetchProductDetails = async (product) => {
    try {
      const response = await axios.post('http://localhost:5001/detailProduct', 
        { masp: product.masp, maloai: product.maloai, mansx: product.mansx },
        { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, withCredentials: true }
      );
      setSelectedProduct(response.data.dataProduct);
      setProductImages(response.data.images);
      setVariants(response.data.variants || []);
      // Set default to first available variant with stock, or next available if first is out of stock
      const firstAvailableVariant = response.data.variants?.find(v => v.soluongtonkho > 0) || response.data.variants?.[0] || null;
      setSelectedVariant(firstAvailableVariant);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    }
  };

  const handleAddToCart = (product, e) => {
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
      ...(fullProduct.mabienthe && fullProduct.mabienthe && { mabienthe: fullProduct.mabienthe }),
      ...(fullProduct.mathuoctinh && fullProduct.thuoc_tinh && { mathuoctinh: fullProduct.mathuoctinh }),
    };
    onAddToCart(productToAdd);
  };
  console.log('Selected Product:', selectedProduct);
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
      soluongsp: selectedVariant ? selectedVariant.soluongtonkho : selectedProduct.soluongsp,
      tenloai: selectedProduct.tenloai,
      tennsx: selectedProduct.tennsx,
      ttct: selectedProduct.ttct,
      km: selectedProduct.km,
      makm: selectedProduct.makm,
      tenkm: selectedProduct.tenkm,
      thoigianbatdaukm: selectedProduct.thoigianbatdaukm,
      thoigianketthuckm: selectedProduct.thoigianketthuckm,
      ...(selectedVariant && selectedVariant.mabienthe && {mabienthe: selectedVariant.mabienthe}),
      ...(selectedVariant && selectedVariant.thuoc_tinh && { thuoctinh: selectedVariant.thuoc_tinh }),
    };
    onAddToCart(productToAdd);
    closeModal();

  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setProductImages([]);
    setVariants([]);
    setSelectedVariant(null);
  };
useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isModalOpen]);

  const filteredProducts = products.filter(product =>
    product.tensp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col">
        <Popover className="w-full xl:px-48 mb-5 md:px-5 lg:px-8 px-2.5 pt-12 xl:pb-8 pb-3 flex justify-between items-center relative">
          <h2 className="w-full text-center lg:text-3xl text-xl tracking-wide font-bold uppercase">Sản phẩm</h2>
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
                {/* <button type="button" onClick={(e) => handleAddToCart(product, e)}>
                  <PlusCircleIcon className="h-7 w-7 text-gray-600 hover:scale-105 cursor-pointer" />
                </button> */}
              </div>
              <div className="flex w-full px-4 justify-start items-center">
                <p className={`${product.tenkm ? 'line-through' : null} mr-5`}>
                  {product.gia && product.gia
                    ? formatCurrency(product.gia)
                    : product.gia_range ? formatCurrency(product.gia_range)  + ' +' : formatCurrency(product.gia)}
                </p>
                {product.km ? (
                  <p className="text-red-600 font-semibold">
                    {product.gia && product.gia 
                      ? `${formatCurrency(parseInt(product.gia) * (1 - product.km / 100))}`
                      : product.gia_range 
                        ? `Chỉ từ ${formatCurrency(parseInt(product.gia_range) * (1 - product.km / 100))} +`
                        : formatCurrency(product.gia - (product.gia * (product.km / 100)))
                    }
                  </p>
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
                        ) : <p className="text-red-600 font-semibold">Hết hàng</p>}
                      </p>
                    </div>
                    <div>
                      <p className="text-md font-semibold flex text-gray-800 mb-2">
                        <span className="font-bold mr-2">Giá:</span>
                        <p className={`${selectedProduct.tenkm ? 'line-through' : null} mr-3`}>
                          {selectedVariant ? formatCurrency(selectedVariant.gia) : 
                            selectedProduct.gia_range && selectedProduct.gia_range 
                              ? formatCurrency(selectedProduct.gia_range) + ' +'
                              : selectedProduct.gia_range ? selectedProduct.gia_range : formatCurrency(selectedProduct.gia)}
                        </p>
                        {selectedProduct.km ? (
                          <p className="text-red-600 font-semibold">
                            {selectedVariant ? formatCurrency(selectedVariant.gia * (1 - selectedProduct.km / 100)) :
                              selectedProduct.gia_range && selectedProduct.gia_range 
                                ? `${formatCurrency(parseInt(selectedProduct.gia_range) * (1 - selectedProduct.km / 100))} +`
                                : selectedProduct.gia_range 
                                  ? `${formatCurrency(parseInt(selectedProduct.gia_range) * (1 - selectedProduct.km / 100))}}`
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
                          <br />
                          {/* <span className={variant.soluongtonkho > 0 ? 'text-green-600' : 'text-red-600'}>
                            ({variant.soluongtonkho > 0 ? 'Còn hàng' : 'Hết hàng'})
                          </span> */}
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
                    disabled={!selectedVariant && variants.length > 0 || (selectedVariant?.soluongtonkho === 0)}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          )}
        </ReactModal>
      </div>
      <CosmeticsProductCard />
      <PreFooter selectedProduct={selectedProduct} />
    </>
  );
}