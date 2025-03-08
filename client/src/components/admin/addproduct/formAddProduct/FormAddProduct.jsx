import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext, useRef, useCallback } from 'react';
import Select from 'react-select';
import { Context } from '../../../Context.jsx';
import Cookies from 'js-cookie';
import { useDropzone } from 'react-dropzone';

export default function FormAddProduct({ formRef, category, producer }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProducer, setSelectedProducer] = useState(null);
  const [formData, setFormData] = useState({
    masp: '',
    tensp: '',
    maloai: '',
    ttct: '',
    soluongsp: 0,
    gia: '',
    mansx: '',
  });
  const [imageFiles, setImageFiles] = useState([]); // Store multiple files
  const [message, setMessage] = useState('');
  const [colorMsg, setColorMsg] = useState('');

  const { setLoadProduct } = useContext(Context);
  const fileInputRef = useRef(null);

  const optionsCategory = category.map((item) => ({
    value: item.maloai,
    label: item.tenloai,
  }));
  const optionsProducer = producer.map((item) => ({
    value: item.mansx,
    label: item.tennsx,
  }));

  // Handle input changes
  const handleChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file drop or selection
  const handleFileChange = useCallback((acceptedFiles) => {
    setImageFiles(acceptedFiles);
  }, []);

  // Configure react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange,
    accept: {
      'image/svg+xml': ['.svg'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
    },
    maxSize:100* 1024 * 1024, // 5MB max
    multiple: true, // Allow multiple files
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (imageFiles.length === 0) {
      setMessage('Vui lòng chọn ít nhất một ảnh sản phẩm');
      setColorMsg('text-red-600');
      return;
    }

    imageFiles.forEach((file) => data.append('hinhanh', file));

    const token = Cookies.get('admin') || Cookies.get('staff');
    try {
      const response = await axios.post('http://localhost:5001/addProduct', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setColorMsg('text-green-600');
        setMessage(response.data.message);
        handleSuccess();
        resetForm();
        setLoadProduct(true);
        setTimeout(() => setMessage(''), 2000);
      } else if (response.status === 400) {
        setColorMsg('text-red-600');
        setMessage(response.data.message);
      }
    } catch (error) {
      setColorMsg('text-red-600');
      setMessage(error.response?.data.message || 'Đã xảy ra lỗi');
      handleError();
    }
  };

  // Reset form after success
  const resetForm = () => {
    setFormData({
      masp: '',
      tensp: '',
      maloai: '',
      ttct: '',
      soluongsp: 0,
      gia: '',
      mansx: '',
    });
    setImageFiles([]);
    setSelectedCategory(null);
    setSelectedProducer(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Toast notifications
  const handleSuccess = () =>
    toast.success('Thêm thành công!', { position: 'top-right', autoClose: 1500 });
  const handleError = () =>
    toast.error('Có lỗi xảy ra!', { position: 'top-right', autoClose: 1500 });

  return (
    <div className="w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="2xl:w-1/2 w-2/3 mx-auto bg-white shadow-lg border flex flex-col rounded py-5 px-8 mt-16"
      >
        <h2 className="mb-4 uppercase font-bold tracking-wider text-lg text-center">
          Thêm sản phẩm
        </h2>
        {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

        <div className="mb-3 flex gap-2">
          <div className="w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mã sản phẩm
            </label>
            <input
              type="text"
              name="masp"
              value={formData.masp}
              onChange={handleChange}
              placeholder="SP-001"
              className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-2/3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="tensp"
              value={formData.tensp}
              onChange={handleChange}
              placeholder="Kem chống nắng"
              className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Giá bán
          </label>
          <input
            type="text"
            name="gia"
            value={formData.gia}
            onChange={handleChange}
            placeholder="25000"
            className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-3 flex gap-2">
          <div className="w-1/2">
            <Select
              options={optionsCategory}
              value={selectedCategory}
              onChange={(option) => {
                setSelectedCategory(option);
                setFormData((prev) => ({ ...prev, maloai: option?.value || '' }));
              }}
              placeholder="Chọn loại sản phẩm"
              className="text-sm"
            />
          </div>
          <div className="w-1/2">
            <Select
              options={optionsProducer}
              value={selectedProducer}
              onChange={(option) => {
                setSelectedProducer(option);
                setFormData((prev) => ({ ...prev, mansx: option?.value || '' }));
              }}
              placeholder="Chọn nhà sản xuất"
              className="text-sm"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Thông tin chi tiết
          </label>
          <textarea
            name="ttct"
            value={formData.ttct}
            onChange={handleChange}
            rows={3}
            placeholder="Thông tin chi tiết của sản phẩm"
            className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Thêm ảnh (Có thể chọn nhiều ảnh)
          </label>
          <div
            {...getRootProps()}
            className={`p-6 text-center border-2 border-dashed rounded-sm cursor-pointer h-24 flex items-center justify-center bg-gray-50 ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} ref={fileInputRef} />
            {isDragActive ? (
              <p className="text-sm text-blue-500">Thả ảnh vào đây...</p>
            ) : (
              <p className="text-sm text-gray-900">
                Kéo và thả ảnh vào đây
              </p>
            )}
          </div>
          {imageFiles.length > 0 && (
            <ul className="mt-2 text-sm text-gray-700">
              {imageFiles.map((file, index) => (
                <li key={index}>
                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                </li>
              ))}
            </ul>
          )}
          <p className="mt-1 text-xs text-gray-500">
            SVG, PNG, JPG hoặc GIF.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
}