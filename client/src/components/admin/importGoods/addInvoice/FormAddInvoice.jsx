import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../Context.jsx';
import Cookies from 'js-cookie';

export default function FormAddInvoice({ formAddRef }) {
  const { setLoadDataInvoice } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [variantsByProduct, setVariantsByProduct] = useState({});
  const [message, setMessage] = useState('');
  const [colorMsg, setColorMsg] = useState('');
  const [invoice, setInvoice] = useState([{ masp: '', mabienthe: '', soluong: '', dongia: '' }]);
    const { isDataAdmin, isDataStaff } = useContext(Context);
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('admin') || Cookies.get('staff');
        const response = await axios.get(`http://localhost:5001/getProduct`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const productData = response.data.product;
          setProducts(productData);

          const variantPromises = productData
            .filter((p) => p.cobienthe === 1)
            .map(async (p) => {
              const variantResponse = await axios.get(`http://localhost:5001/getVariant/${p.masp}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return { masp: p.masp, variants: variantResponse.data.variants || [] };
            });
          const variantResults = await Promise.all(variantPromises);
          const variantsMap = variantResults.reduce((acc, { masp, variants }) => {
            acc[masp] = variants;
            return acc;
          }, {});
          setVariantsByProduct(variantsMap);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Không thể tải dữ liệu sản phẩm');
        setColorMsg('text-red-600');
      }
    };
    fetchData();
  }, []);

const getProductOptions = () => {
  return products.map((item) => ({
    value: item.masp,
    label: item.tensp,
    cobienthe: item.cobienthe,
  }));
};

  const getVariantOptions = (masp) => {
    const variants = variantsByProduct[masp] || [];
    return variants.map((variant) => ({
      value: variant.mabienthe,
      label: `${variant.thuoc_tinh}`,
      gia: variant.gia,
      soluongtonkho: variant.soluongtonkho,
    }));
  };

  const generateInvoiceId = () => `${Date.now()}${Math.floor(Math.random() * 10)}`;
  const getCurrentDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const handleAddProduct = () => {
    setInvoice([...invoice, { masp: '', mabienthe: '', soluong: '', dongia: '' }]);
  };

  // Handle removing a product entry
  const handleSubProduct = (index) => {
    const updatedInvoice = invoice.filter((_, i) => i !== index);
    setInvoice(updatedInvoice.length > 0 ? updatedInvoice : [{ masp: '', mabienthe: '', soluong: '', dongia: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedInvoice = [...invoice];
    updatedInvoice[index][field] = value;

    if (field === 'masp') {
      const selectedProduct = products.find((p) => p.masp === value);
      if (selectedProduct) {
        updatedInvoice[index].mabienthe = ''; // Reset variant
        if (selectedProduct.cobienthe !== 1) {
          updatedInvoice[index].dongia = '';
          updatedInvoice[index].soluong = '';
        } else {
          updatedInvoice[index].dongia = '';
          updatedInvoice[index].soluong = '';
        }
      }
    }

    if (field === 'mabienthe') {
      const selectedVariant = variantsByProduct[updatedInvoice[index].masp]?.find((v) => v.mabienthe === value);
      if (selectedVariant) {
        updatedInvoice[index].dongia = selectedVariant.gia || '';
        updatedInvoice[index].soluong = '';
      }
    }

    setInvoice(updatedInvoice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('admin') || Cookies.get('staff');
    const nameInvoice = e.target.tenpn.value;

    if (!nameInvoice.trim()) {
      setColorMsg('text-red-600');
      setMessage('Tên phiếu nhập không được để trống.');
      return;
    }

    for (const inv of invoice) {
      if (!inv.masp) {
        setColorMsg('text-red-600');
        setMessage('Vui lòng chọn sản phẩm cho tất cả các mục.');
        return;
      }
      const product = products.find((p) => p.masp === inv.masp);
      if (product?.cobienthe === 1 && !inv.mabienthe) {
        setColorMsg('text-red-600');
        setMessage(`Vui lòng chọn biến thể cho sản phẩm ${product.tensp}.`);
        return;
      }
      if (!inv.soluong || !inv.dongia) {
        setColorMsg('text-red-600');
        setMessage('Vui lòng nhập đầy đủ số lượng và đơn giá.');
        return;
      }
      if (isNaN(Number(inv.soluong)) || isNaN(Number(inv.dongia)) || Number(inv.soluong) <= 0 || Number(inv.dongia) <= 0) {
        setColorMsg('text-red-600');
        setMessage('Số lượng và đơn giá phải là số dương.');
        return;
      }
    }

    const itemKeys = invoice.map((inv) => `${inv.masp}:${inv.mabienthe || ''}`);
    const duplicates = itemKeys.filter((item, index) => itemKeys.indexOf(item) !== index);
    if (duplicates.length > 0) {
      setColorMsg('text-red-600');
      setMessage('Có sản phẩm hoặc biến thể bị trùng. Vui lòng kiểm tra lại.');
      return;
    }

    const invoiceId = generateInvoiceId();
    const maql = isDataAdmin?.maql || null;
    const manv = isDataStaff?.manv || null;
    const formInvoice = {
      mapn: invoiceId,
      maql,
      manv,
      ngaylap: getCurrentDate(),
      tenpn: nameInvoice,
    };
    try {
      const response = await axios.post('http://localhost:5001/addInvoice', formInvoice, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const invoiceDetail = invoice.map((inv) => ({
          mapn: invoiceId,
          masp: inv.masp,
          mabienthe: inv.mabienthe || null,
          soluongnhap: Number(inv.soluong),
          gianhap: Number(inv.dongia),
        }));

        const detailResponse = await axios.post('http://localhost:5001/addInvoiceDetail', invoiceDetail, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          withCredentials: true,
        });

        if (detailResponse.status === 200) {
          setInvoice([{ masp: '', mabienthe: '', soluong: '', dongia: '' }]);
          setColorMsg('text-green-600');
          setMessage(response.data.message);
          e.target.tenpn.value = '';
          handleSuccess();
          setLoadDataInvoice(true);
          setTimeout(() => setMessage(''), 1500);
        }
      } else {
        setColorMsg('text-red-600');
        setMessage(response.data.message);
        handleError();
      }
    } catch (error) {
      setColorMsg('text-red-600');
      setMessage(error.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      handleError();
    }
  };

  const handleSuccess = () => {
    toast.success('Thêm thành công!', {
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
    <div className="w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 overflow-y-auto flex items-center">
      <form
        ref={formAddRef}
        onSubmit={handleSubmit}
        className="mx-auto bg-gray-100 shadow-lg border scrollbar-hide rounded py-5 px-8 mt-16 max-w-7xl overflow-y-auto max-h-[80vh]"
      >
        <h2 className="uppercase font-bold mb-2 tracking-wider text-lg text-center">Phiếu nhập kho</h2>
        {message && <p className={`${colorMsg} text-center text-sm mb-3`}>{message}</p>}

        <div className="mb-3">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Tên phiếu nhập
          </label>
          <input
            type="text"
            id="name"
            name="tenpn"
            className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 pl-2.5 py-2"
            placeholder="Tên phiếu nhập"
          />
        </div>

        <div className="grid" style={{ gridTemplateColumns: `repeat(${invoice.length >= 3 ? '2' : '1'}, 1fr)`, gap: '1rem' }}>
  {chunkArray(invoice, 3).map((group, groupIndex) => (
    <div key={groupIndex} className="space-y-4">
      {group.map((inv, index) => {
        const actualIndex = groupIndex * 3 + index;
        const selectedProduct = products.find((p) => p.masp === inv.masp);
        return (
          <div key={actualIndex} className="space-y-4 max-h-[200px]">
            <div className="flex justify-between items-center mb-2">
              <Select
                options={getProductOptions()}
                onChange={(selectedOption) => handleInputChange(actualIndex, 'masp', selectedOption.value)}
                placeholder="Chọn sản phẩm"
                className="w-11/12 text-sm rounded-lg"
                styles={customStyles}
                value={inv.masp ? { value: inv.masp, label: products.find((p) => p.masp === inv.masp)?.tensp || '' } : null}
              />
              <button
                type="button"
                onClick={() => handleSubProduct(actualIndex)}
                className="text-red-500 hover:text-red-400 transition duration-150 ease-in-out"
              >
                <MinusCircleIcon className="h-7 w-7" />
              </button>
            </div>
            {selectedProduct?.cobienthe === 1 && (
              <div className="mb-2">
                <label className="block mb-1 text-sm font-medium text-gray-900">Biến thể</label>
                <Select
                  options={getVariantOptions(inv.masp)}
                  onChange={(selectedOption) => handleInputChange(actualIndex, 'mabienthe', selectedOption.value)}
                  placeholder="Chọn biến thể"
                  className="w-full text-sm rounded-lg"
                  styles={customStyles}
                  isDisabled={!inv.masp}
                  value={
                    inv.mabienthe
                      ? {
                          value: inv.mabienthe,
                          label: variantsByProduct[inv.masp]?.find((v) => v.mabienthe === inv.mabienthe)?.thuoc_tinh || '',
                        }
                      : null
                  }
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor={`soluong-${actualIndex}`} className="block mb-1 text-sm font-medium text-gray-900">
                  Số lượng
                </label>
                <input
                  type="text"
                  id={`soluong-${actualIndex}`}
                  value={inv.soluong}
                  onChange={(e) => handleInputChange(actualIndex, 'soluong', e.target.value)}
                  className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 pl-2.5 py-2"
                  placeholder="100"
                />
              </div>
              <div>
                <label htmlFor={`dongia-${actualIndex}`} className="block mb-1 text-sm font-medium text-gray-900">
                  Đơn giá
                </label>
                <input
                  type="text"
                  id={`dongia-${actualIndex}`}
                  value={inv.dongia}
                  onChange={(e) => handleInputChange(actualIndex, 'dongia', e.target.value)}
                  className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 pl-2.5 py-2"
                  placeholder="25000"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ))}
</div>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleAddProduct}
            className="text-pink-500 hover:text-pink-600 transition duration-150 ease-in-out"
          >
            <PlusCircleIcon className="h-8 w-8" />
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-pink-500 hover:bg-pink-600 rounded shadow focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
}