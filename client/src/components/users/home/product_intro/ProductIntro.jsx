import React, { useContext, useState, useEffect } from 'react';
import { formatCurrency } from '../../../../utils/currency';
import { gsap } from 'gsap';
import { Context } from '../../../../components/Context';
import axios from 'axios';
import ReactModal from 'react-modal';

// Bind modal to app element (required for accessibility)
ReactModal.setAppElement('#root');

export default function ProductIntro() {
  const [productsale, setProductsale] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    // Kiểm tra nếu có biến thể
    const hasVariants = product.mabienthe_list && product.mabienthe_list.split(',').length > 1;
    if (hasVariants) {
      handleViewProductClick(product); // Mở modal để chọn biến thể
      return;
    }

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

  const handleViewProductClick = async (product) => {
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
                    {formatCurrency(product.gia_range ? product.gia_range : product.gia)}
                  </span>
                  <span className="font-bold text-red-600">
                    {product.gia && product.gia
                      ? `${formatCurrency(parseInt(product.gia) * (1 - product.km / 100))}`
                      : product.gia
                        ? `${formatCurrency(parseInt(product.gia_range) * (1 - product.km / 100))}`
                        : formatCurrency(product.gia_range * (1 - product.km / 100)) + ' +'}
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
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Chi tiết sản phẩm"
        className="relative bg-white rounded-lg shadow-2xl mx-auto mt-24 max-w-3xl w-full h-fit py-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
      >
        {selectedProduct && (
          <div className="p-4 flex items-center gap-6">
            <div className="w-1/2 flex items-center justify-center">
              <img
                className="w-64 h-72 object-cover rounded"
                src={`http://localhost:5001/uploads/${selectedProduct.masp}/${selectedProduct.hinhanh}`}
                alt={selectedProduct.tensp}
              />
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
                          selectedProduct.gia_range && selectedProduct
                            ? formatCurrency(selectedProduct.gia_range) + ' +'
                            : selectedProduct.gia_range ? selectedProduct.gia_range : formatCurrency(selectedProduct.gia)}
                      </p>
                      {selectedProduct.km ? (
                        <p className="text-red-600 font-semibold">
                          {selectedVariant ? formatCurrency(selectedVariant.gia * (1 - selectedProduct.km / 100)) :
                            selectedProduct.gia_range && selectedProduct
                              ? `Từ ${formatCurrency(parseInt(selectedProduct.gia_range) * (1 - selectedProduct.km / 100))} +`
                              : selectedProduct.gia_range 
                                ? `Từ ${formatCurrency(parseInt(selectedProduct.gia_range) * (1 - selectedProduct.km / 100))}`
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
                  className="bg-pink-400 text-white px-4 py-2 rounded hover:scale-105 uppercase transition duration-200 ease-in-out"
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