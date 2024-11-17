import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function FormEditProduct({ formRefEdit, selectedProduct, setSelectedProduct, setLoadProduct, category, producer }) {

  const [initialProduct, setInitialProduct] = useState(selectedProduct);

  const optionsProducer = producer.map((item) => ({
    value: item.mansx,
    label: item.tennsx,
  }));

  const optionsCategory = category.map((item) => ({
    value: item.maloai,
    label: item.tenloai,
  }));
  const [imgChange, setImgChanage] = useState("")

  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [colorMsg, setColorMsg] = useState('');

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasChanges = JSON.stringify(selectedProduct) !== JSON.stringify(initialProduct) || imageFile;
    if (!hasChanges) {
      
      return;
    }
    const data = new FormData();

    for (const key in selectedProduct) {
      if (key !== 'hinhanh') {
        data.append(key, selectedProduct[key]);
      }
    }

    if (imageFile) {
      data.append('hinhanh', imageFile);
      setImgChanage(imageFile.name)
    }

    try {
      const response = await axios.post('http://localhost:5001/editProduct', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${Cookies.get('admin')}`,
          'Accept': 'application/json'
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setColorMsg('text-green-600');
        setMessage(response.data.message);
        handleSuccess();
        setImageFile(null);
        fileInputRef.current.value = '';
        setLoadProduct(true);
        setInitialProduct(selectedProduct);
        setTimeout(() => {
          setMessage('');
        }, 2000);
      } else if (response.status === 400) {
        setColorMsg('text-red-600');
        setMessage(response.data.message);
      }
    } catch (error) {
      setColorMsg('text-red-600');
      setMessage(error.response ? error.response.data.message : 'Đã xảy ra lỗi');
      handleError();
    }
  };

  const handleSuccess = () => {
    toast.success('Cập nhật thành công!', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleError = () => {
    toast.error('Có lỗi xảy ra!', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>

      <form onSubmit={handleSubmit} ref={formRefEdit} className="2xl:w-1/2 w-3/4 mx-auto bg-gray-100 shadow-lg border flex rounded py-5 px-8 mt-16 ">

        <div className='flex items-center justify-center pt-10 z-10'>
          <img src={`http://localhost:5001/uploads/${imgChange ? imgChange : selectedProduct.hinhanh}`} alt="" className='w-64' />

        </div>
        <div className='mx-auto'>
          <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Sửa sản phẩm</h2>
          {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

          <div className="mb-3 flex">
            <div className="w-1/3 mr-1">
              <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã sản phẩm</label>
              <p id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{selectedProduct.masp}</p>
            </div>
            <div className="w-2/3 ml-1">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
              <input type="text" id="name" name='tensp' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder='Tên sản phẩm'
                value={selectedProduct.tensp}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, tensp: e.target.value })}
              />
            </div>
          </div>
          <div className="mb-3 flex">
            <div className="w-full">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá bán</label>
              <input type="text" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder='25000'
                name='gia'
                value={selectedProduct.gia}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, gia: e.target.value })}
              />
            </div>

          </div>
          <div className='mb-3 flex justify-between'>
            {/* Dropdown Nhà sản xuất */}
            <div className="w-1/2 relative mr-2">
              <label htmlFor="producer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhà sản xuất</label>
              <Select
                options={optionsProducer}
                value={optionsProducer.find(option => option.value === selectedProduct.mansx)} // Khớp giá trị đã chọn với options
                onChange={(selectedOption) => {
                  setSelectedProduct({ ...selectedProduct, mansx: selectedOption.value }); // Cập nhật `mansx` trong state
                }}
                placeholder="Chọn nhà sản xuất"
                className="w-full text-sm rounded shadow"
              />
            </div>

            {/* Dropdown Loại sản phẩm */}
            <div className="w-1/2 relative">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại sản phẩm</label>
              <Select
                options={optionsCategory}
                value={optionsCategory.find(option => option.value === selectedProduct.maloai)} // Khớp giá trị đã chọn với options
                onChange={(selectedOption) => {
                  setSelectedProduct({ ...selectedProduct, maloai: selectedOption.value }); // Cập nhật `maloai` trong state
                }}
                placeholder="Chọn loại sản phẩm"
                className="w-full text-sm rounded shadow"
              />
            </div>
          </div>
          
          <div className='mb-3'>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thông tin chi tiết</label>
            <textarea id="message" rows={3} className="block pl-2.5 py-2 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
              value={selectedProduct.ttct}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, ttct: e.target.value })}

            ></textarea>
          </div>
          <div className='mb-3'>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Sửa ảnh</label>
            <input onChange={handleFileChange} ref={fileInputRef} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
            <p className="mt-1 text-gray-500 dark:text-gray-300 text-xs" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

          </div>
          <div className='flex items-center justify-center w-full'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đồng ý</button>
          </div>
        </div>
      </form>

    </div>
  )
}