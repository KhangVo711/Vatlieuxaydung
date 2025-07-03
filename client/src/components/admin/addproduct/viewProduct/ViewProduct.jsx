import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function FormViewProduct({ formRefView, selectedProduct }) {
  const [category, setCategory] = useState({});
  const [producer, setProducer] = useState({});
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getCategory/${selectedProduct.maloai}`);
        if (response.status === 200) {
          setCategory(response.data.listCategory || {});
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };
    fetchCategory();
  }, [selectedProduct.maloai]);

  useEffect(() => {
    const fetchProducer = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getProducer/${selectedProduct.mansx}`);
        if (response.status === 200) {
          setProducer(response.data.listNSX || {});
        }
      } catch (error) {
        console.error('Error fetching producer:', error);
      }
    };
    fetchProducer();
  }, [selectedProduct.mansx]);

  useEffect(() => {
    const fetchImages = async () => {
      const token = Cookies.get('admin') || Cookies.get('staff');
      try {
        const response = await axios.get(`http://localhost:5001/productImages/${selectedProduct.masp}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages(response.data.images || []);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, [selectedProduct.masp]);

  useEffect(() => {
    const fetchVariants = async () => {
      if (selectedProduct.cobienthe) {
        const token = Cookies.get('admin') || Cookies.get('staff');
        try {
          const response = await axios.get(`http://localhost:5001/getVariant/${selectedProduct.masp}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setVariants(response.data.variants || []);
        } catch (error) {
          console.error('Error fetching variants:', error);
        }
      } else {
        setVariants([]);
      }
    };
    fetchVariants();
  }, [selectedProduct.masp, selectedProduct.cobienthe]);

  return (
    <div className="w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center">
      <div ref={formRefView} className="2xl:w-1/2 w-3/4 h-5/6 mx-auto bg-white shadow-lg border flex rounded py-5 px-8 mt-16">
        <div className="flex w-1/2 items-center justify-center pt-10 z-10">
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5001/uploads/${selectedProduct.masp}/${image}`}
                  alt={`Product image ${index + 1}`}
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Không có ảnh</p>
          )}
        </div>
        <div className="mx-auto w-1/2 overflow-auto scrollbar-hide">
          <h2 className="mb-4 uppercase font-bold tracking-wider text-lg text-center">Xem sản phẩm</h2>

          <div className="w-full mb-3">
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mã sản phẩm
            </label>
            <p
              id="code"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {selectedProduct.masp}
            </p>
          </div>

          <div className="w-full mb-3">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tên sản phẩm
            </label>
            <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {selectedProduct.tensp}
            </p>
          </div>

          {!selectedProduct.cobienthe && (
            <div className="mb-3 flex">
              <div className="w-1/2 mr-1">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Giá
                </label>
                <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {selectedProduct.gia}
                </p>
              </div>
              <div className="w-1/2 ml-1">
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Số lượng
                </label>
                <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {selectedProduct.soluongsp}
                </p>
              </div>
            </div>
          )}

          <div className="w-full mb-3">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Loại
            </label>
            <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {category.tenloai || 'Đang tải...'}
            </p>
          </div>

          <div className="w-full mb-3">
            <label htmlFor="producer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nhà sản xuất
            </label>
            <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {producer.tennsx || 'Đang tải...'}
            </p>
          </div>

          <div className="w-full mb-3">
            <label htmlFor="cobienthe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Có biến thể
            </label>
            <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {selectedProduct.cobienthe ? 'Có' : 'Không'}
            </p>
          </div>

          {selectedProduct.cobienthe === 1 && (
            <>
              <div className="w-full mb-3">
                <label htmlFor="loaibienthe" className= "block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Loại biến thể
                </label>
                <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {selectedProduct.loaibienthe}
                </p>
              </div>
            
              <div className="w-full mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Biến thể
                </label>
                {variants.length > 0 ? (
                  variants.map((variant, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-50 border border-gray-300 rounded-sm">
                      <p className="text-sm text-gray-900">
                        <strong>Mã biến thể:</strong> {variant.mabienthe}
                      </p>
                      <p className="text-sm text-gray-900">
                        <strong>Giá:</strong> {variant.gia}
                      </p>
                      <p className="text-sm text-gray-900">
                        <strong>Số lượng tồn kho:</strong> {variant.soluongtonkho}
                      </p>
                      <p className="text-sm text-gray-900">
                        <strong>Thuộc tính:</strong> {variant.thuoc_tinh}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Không có biến thể</p>
                )}
              </div>
            </>
          )}

          <div className="mb-3">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Thông tin chi tiết
            </label>
            <p className="block pl-2.5 pr-2.5 py-1.5 w-full text-justify text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white whitespace-pre-wrap break-words overflow-y-auto scrollbar-hide">
  {selectedProduct.ttct || 'Không có thông tin chi tiết'}
</p>
          </div>
        </div>
      </div>
    </div>
  );
}