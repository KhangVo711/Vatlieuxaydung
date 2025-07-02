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
    soluongsp: null,
    gia: null,
    mansx: '',
    loaibienthe: '',
    cobienthe: true,
  });
  const [variants, setVariants] = useState([
    { mabienthe: '', gia: '', soluongtonkho: 0, thuoc_tinh: '' },
  ]);
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
  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { mabienthe: '', gia: '', soluongtonkho: 0, thuoc_tinh: '' }]);
  };

  const handleRemoveVariant = (index) => {
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
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
    maxSize: 100 * 1024 * 1024, // 5MB max
    multiple: true, // Allow multiple files
  });

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

  if (formData.cobienthe) {
    console.log('Variants being sent:', variants); // Add this log
    console.log('FormData before sending:', Object.fromEntries(data)); // Log FormData
    data.append('variants', JSON.stringify(variants));
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
    console.error('Submission error:', error.response?.data); // Log error details
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
    soluongsp: null,
    gia: null,
    mansx: '',
    loaibienthe: '',
    cobienthe: true,
    });
    setImageFiles([]);
    setVariants([{ mabienthe: '', gia: '', soluongtonkho: 0, thuoc_tinh: '' }]);
    setSelectedCategory(null);
    setSelectedProducer(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Toast notifications
  const handleSuccess = () =>
    toast.success('Thêm thành công!', { position: 'top-right', autoClose: 1500 });
  const handleError = () =>
    toast.error('Có lỗi xảy ra!', { position: 'top-right', autoClose: 1500 });
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
  if (formData.cobienthe === false) {
    formData.soluongsp = 0;
  } else {
    formData.soluongsp = null;
  }
  return (
    <div className="w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="2xl:w-1/2 w-2/3 h-5/6 mx-auto overflow-auto bg-gray-100 shadow-lg border flex flex-col rounded py-5 px-8 mt-16"
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
              placeholder="SP00189413"
              className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500"
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
              className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
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
              styles={customStyles}
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
              styles={customStyles}
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
            className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        <div className="mb-3 flex items-center">
          <label htmlFor="cobienthe" className="mr-3 text-sm font-medium outline-none text-gray-900 dark:text-white">
            Có biến thể
          </label>

          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.cobienthe ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                cobienthe: !prev.cobienthe,
              }))
            }
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.cobienthe ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
          </button>
        </div>

        {!formData.cobienthe && (
          <div className="mb-3">
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Giá bán
              </label>
              <input
                type="text"
                name="gia"
                value={formData.gia || null}
                onChange={handleChange}
                placeholder="25000"
                className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

          </div>
        )}
        {formData.cobienthe && (
          <div className="mb-3 flex flex-col">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Loại biến thể
                </label>
                <input
                  type="text"
                  name="loaibienthe"
                  value={formData.loaibienthe || null}
                  onChange={handleChange}
                  placeholder="Màu sắc, kích thước, v.v."
                  className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500" />
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 items-center">
                  <div className='mt-3'>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="mabt">Mã biến thể</label>
                    <input id='mabt' placeholder="Mã biến thể" value={v.mabienthe} onChange={(e) => handleVariantChange(i, 'mabienthe', e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500" />
                  </div>
                  <div className='mt-3'>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="gia">Giá</label>
                    <input id='gia' placeholder="Giá" value={v.gia} onChange={(e) => handleVariantChange(i, 'gia', e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500" />
                  </div>

                  {/* <input placeholder="Số lượng" value={v.soluongtonkho} onChange={(e) => handleVariantChange(i, 'soluongtonkho', e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500" /> */}
                  <div className='mt-3'>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="tt">Thuộc tính</label>
                    <input id='tt' placeholder="Thuộc tính" value={v.thuoc_tinh} onChange={(e) => handleVariantChange(i, 'thuoc_tinh', e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:ring-pink-500 focus:border-pink-500" />
                  </div>
                  <div className='flex pt-9 justify-center items-center'>
                    <button type="button" onClick={() => handleRemoveVariant(i)} className="text-red-600 text-sm">Xoá</button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button type="button" onClick={handleAddVariant} className="mt-2 text-sm text-pink-600">+ Thêm biến thể</button>
            </div>
          </div>
        )}




        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Thêm ảnh (Có thể chọn nhiều ảnh)
          </label>
          <div
            {...getRootProps()}
            className={`p-6 text-center border-2 border-dashed rounded-sm cursor-pointer h-24 flex items-center justify-center bg-gray-50 ${isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
              }`}
          >
            <input {...getInputProps()} ref={fileInputRef} />
            {isDragActive ? (
              <p className="text-sm text-pink-500">Thả ảnh vào đây...</p>
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
            className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 transition duration-150 ease-in-out"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
}