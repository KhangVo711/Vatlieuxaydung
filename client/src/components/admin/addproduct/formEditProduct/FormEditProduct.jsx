// components/FormEditProduct.jsx
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import Select from 'react-select';
import Cookies from 'js-cookie';
import { useDropzone } from 'react-dropzone';

export default function FormEditProduct({ formRefEdit, selectedProduct, setSelectedProduct, setLoadProduct, category, producer }) {
  const [initialProduct] = useState(selectedProduct);
  const [imageFile, setImageFile] = useState(null); // Chỉ lưu 1 file ảnh thay thế
  const [currentImages, setCurrentImages] = useState([]); // Ảnh hiện tại từ DB
  const [selectedImageToReplace, setSelectedImageToReplace] = useState(''); // Ảnh được chọn để thay thế
  const [message, setMessage] = useState('');
  const [colorMsg, setColorMsg] = useState('');
  const fileInputRef = useRef(null);
  console.log('img', currentImages);
  // Lấy danh sách ảnh hiện tại
  useEffect(() => {
    const fetchImages = async () => {
      const token = Cookies.get('admin') || Cookies.get('staff');
      const response = await axios.get(`http://localhost:5001/productImages/${selectedProduct.masp}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentImages(response.data.images);
    };
    fetchImages();
  }, [selectedProduct.masp]);

  // Chuyển đổi dữ liệu cho Select (giữ nguyên)
  const optionsCategory = category.map((item) => ({
    value: item.maloai,
    label: item.tenloai,
  }));
  const optionsProducer = producer.map((item) => ({
    value: item.mansx,
    label: item.tennsx,
  }));

  // Xử lý thay đổi file ảnh
  const handleFileChange = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImageFile(acceptedFiles[0]); // Chỉ lấy file đầu tiên
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
    },
    maxSize: 100 * 1024 * 1024,
    multiple: false, // Chỉ cho phép chọn 1 file
  });

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasChanges = JSON.stringify(selectedProduct) !== JSON.stringify(initialProduct) || imageFile;
    if (!hasChanges) {
      setMessage('Không có thay đổi nào để cập nhật');
      setColorMsg('text-yellow-600');
      return;
    }

    const data = new FormData();
    for (const key in selectedProduct) {
      if (key !== 'hinhanh') data.append(key, selectedProduct[key]);
    }

    if (imageFile && selectedImageToReplace) {
      data.append('hinhanh', imageFile);
      data.append('updatedImages', JSON.stringify([{ oldImage: selectedImageToReplace, newImage: imageFile.name }]));
    }

    const token = Cookies.get('admin') || Cookies.get('staff');
    try {
      const response = await axios.post('http://localhost:5001/editProduct', data, {
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
        setImageFile(null);
        setSelectedImageToReplace('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        setLoadProduct(true);
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (error) {
      setColorMsg('text-red-600');
      setMessage(error.response?.data.message || 'Đã xảy ra lỗi');
      handleError();
    }
  };

  const handleSuccess = () => toast.success('Cập nhật thành công!', { position: 'top-right', autoClose: 1500 });
  const handleError = () => toast.error('Có lỗi xảy ra!', { position: 'top-right', autoClose: 1500 });
// Tùy chỉnh giao diện react-select
const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
    padding: '0.5px',
    borderRadius: '0.2rem',
    '&:hover': {
      borderColor: '#f472b6',
    },
    boxShadow: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f472b6' : state.isFocused ? '#fce7f3' : 'white',
    color: state.isSelected ? 'white' : '#374151',
    '&:hover': {
      backgroundColor: '#fce7f3',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#374151',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
  }),
};
  return (
    <div className="w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center">
      <form onSubmit={handleSubmit} ref={formRefEdit} className="2xl:w-1/2 w-2/3 mx-auto bg-gray-100 shadow-lg border flex flex-col rounded py-5 px-8 mt-16">
        <h2 className="mb-4 uppercase font-bold tracking-wider text-lg text-center">Sửa sản phẩm</h2>
        {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

        <div className="mb-3 flex gap-2">
          <div className="w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã sản phẩm</label>
            <p className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50">{selectedProduct.masp}</p>
          </div>
          <div className="w-2/3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
            <input
              type="text"
              name="tensp"
              value={selectedProduct.tensp}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, tensp: e.target.value })}
              placeholder="Kem chống nắng"
              className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá bán</label>
          <input
            type="text"
            name="gia"
            value={selectedProduct.gia}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, gia: e.target.value })}
            placeholder="25000"
            className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-3 flex gap-2">
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại sản phẩm</label>
            <Select
              options={optionsCategory}
              value={optionsCategory.find((option) => option.value === selectedProduct.maloai)}
              onChange={(option) => setSelectedProduct({ ...selectedProduct, maloai: option?.value || '' })}
              placeholder="Chọn loại sản phẩm"
              className="text-sm"
              styles={customStyles}
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhà sản xuất</label>
            <Select
              options={optionsProducer}
              value={optionsProducer.find((option) => option.value === selectedProduct.mansx)}
              onChange={(option) => setSelectedProduct({ ...selectedProduct, mansx: option?.value || '' })}
              placeholder="Chọn nhà sản xuất"
              className="text-sm"
              styles={customStyles}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thông tin chi tiết</label>
          <textarea
            name="ttct"
            value={selectedProduct.ttct}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, ttct: e.target.value })}
            rows={3}
            placeholder="Thông tin chi tiết của sản phẩm"
            className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Thêm phần chọn ảnh để thay thế */}
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn ảnh muốn thay thế</label>
          <select
            value={selectedImageToReplace}
            onChange={(e) => setSelectedImageToReplace(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Không thay thế ảnh</option>
            {currentImages.map((image, index) => (
              <option key={index} value={image}>
                Ảnh {index + 1}: {image}
              </option>
            ))}
          </select>
        </div>

        {/* Upload ảnh thay thế */}
        {selectedImageToReplace && (
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload ảnh mới</label>
            <div
              {...getRootProps()}
              className={`p-4 text-center border-2 border-dashed rounded-sm cursor-pointer h-20 flex items-center justify-center bg-gray-50 ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} ref={fileInputRef} />
              {isDragActive ? (
                <p className="text-sm text-blue-500">Thả ảnh vào đây...</p>
              ) : (
                <p className="text-sm text-gray-900">
                  {imageFile ? imageFile.name : 'Kéo và thả hoặc chọn ảnh thay thế'}
                </p>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG hoặc GIF (tối đa 100MB).</p>
          </div>
        )}

        <div className="flex justify-center">
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 transition duration-150 ease-in-out">
            Đồng ý
          </button>
        </div>
      </form>
    </div>
  );
}