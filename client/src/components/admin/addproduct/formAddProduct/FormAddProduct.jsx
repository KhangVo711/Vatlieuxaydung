import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext, useRef } from 'react';
import Select from 'react-select';
import { Context } from '../../../Context.jsx';
import Cookies from 'js-cookie';

export default function FormAddProduct({ formRef, category, producer }) {
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [selectedProducer, setSelectedProducer] = useState(null);
  const optionsCategory = category.map((item) => ({
    value: item.maloai,
    label: item.tenloai,
  }));
  const optionsProducer = producer.map((item) => ({
    value: item.mansx,
    label: item.tennsx,
  }));

  const { setLoadProduct } = useContext(Context);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    masp: '',
    tensp: '',
    maloai: '',
    ttct: '',
    soluongsp: 0,
    gia: '',
    mansx: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [colorMsg, setColorMsg] = useState('');

  const handleChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  console.log(formData);
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (!imageFile) {
      setMessage('Vui lòng chọn ảnh sản phẩm');
      setColorMsg('text-red-600');
      return;
    }
    if (imageFile) {
      data.append('hinhanh', imageFile);
    }
    const token = Cookies.get('admin') || Cookies.get('staff');
    try {
      const response = await axios.post('http://localhost:5001/addProduct', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        setColorMsg('text-green-600');
        setMessage(response.data.message);
        handleSuccess();
        setFormData({
          masp: '',
          tensp: '',
          maloai: '',
          ttct: '',
          soluongsp: 0,
          gia: '',
          mansx: '',
        });
        setImageFile(null);
        setSelectedCategory(null); 
      setSelectedProducer(null);
        fileInputRef.current.value = '';
        setLoadProduct(true);
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }
      if (response.status === 400) {
        setColorMsg('text-red-600');
        setMessage(response.data.message);
      }
    } catch (error) {
      setColorMsg('text-red-600');
      setMessage(error.response ? error.response.data.message : 'An error occurred');
      handleError();
    }
  };

  const handleSuccess = () => {
    toast.success("Thêm thành công!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleError = () => {
    toast.error("Có lỗi xảy ra!", {
      position: "top-right",
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
      <form onSubmit={handleSubmit} ref={formRef} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16 ">
        <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Thêm sản phẩm</h2>
        {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

        <div className="mb-3 flex">
          <div className="w-1/3 mr-1">
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã sản phẩm</label>
            <input type="text" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder='SP-001'
              name='masp'
              value={formData.masp}
              onChange={handleChange}
            />
          </div>
          <div className="w-2/3 ml-1">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
            <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder='Gỗ sồi'
              name='tensp'
              value={formData.tensp}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6 flex">
          <div className="w-full mr-1">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá bán</label>
            <input type="text" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder='25000'
              name='gia'
              value={formData.gia}
              onChange={handleChange}
            />
          </div>

        </div>
        <div className='mb-3 flex justify-between'>
  <div className="w-1/2 relative mr-2">
    <Select
      options={optionsCategory}
      value={selectedCategory}
      onChange={(selectedOption) => {
        setSelectedCategory(selectedOption);
        setFormData({
          ...formData,
          maloai: selectedOption.value,
        });
      }}
      placeholder="Chọn loại sản phẩm"
      className='w-full text-sm rounded-lg'
    />
  </div>
  <div className="w-1/2 relative">
    <Select
      options={optionsProducer}
      value={selectedProducer}
      onChange={(selectedOption) => {
        setSelectedProducer(selectedOption);
        setFormData({
          ...formData,
          mansx: selectedOption.value,
        });
      }}
      placeholder="Chọn nhà sản xuất"
      className='w-full text-sm rounded-lg'
    />
  </div>
</div>
        <div className='mb-3'>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thông tin chi tiết</label>
          <textarea id="message" rows={3} className="block pl-2.5 py-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Thông tin chi tiết của sản phẩm"
            name='ttct'
            value={formData.ttct}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='mb-3'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Thêm ảnh</label>
          <input ref={fileInputRef} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            name="hinhanh"

            onChange={handleFileChange}
          />
          <p className="mt-1 text-gray-500 dark:text-gray-300 text-xs" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div>
        <div className='flex items-center justify-center w-full'>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thêm</button>
        </div>
      </form>
    </div>
  )
}