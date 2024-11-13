import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import FormAddProduct from './formAddProduct/FormAddProduct';
import FormEditProduct from './formEditProduct/FormEditProduct';
import TableProduct from './tableProduct/TableProduct';

export default function AddProduct() {

  const product = [
    {
      name: 'Nước sơn chống thấm',
      code: 'MCNS-001',
      category: 'Nước sơn',
      producer: 'MyColor',
      quality: '2',
      price: '$2999',
    },
    {
      name: 'Keo dán gạch',
      code: 'KVKD-001',
      category: 'Keo dán',
      producer: 'Kova',
      quality: '5',
      price: '$1999',
    },
    {
      name: 'Gạch lát nền',
      code: 'DTGC-001',
      category: 'Gạch',
      producer: 'DongTam',
      quality: '10',
      price: '$99',
    },
  ]
  // ADD PRODUCT
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const handleAddProductClick = () => {
    setShowForm(!showForm);
  };
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    if (showForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    // Cleanup event listener khi component bị hủy
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForm]);
  //ADD PRODUCT

  // EDIT PRODUCT
  const [nameProduct, setNameProduct] = useState("Nước sơn");
  const [price, setPrice] = useState("25,000");
  const [quantity, setQuantity] = useState("4");
  const [detail, setDetail] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec.");

  const [showFormEdit, setShowFormEdit] = useState(false);
  const formRefEdit = useRef(null);

  const handleEditProductClick = () => {
    setShowFormEdit(!showFormEdit);
  };
  const handleClickOutsideEdit = (event) => {
    if (formRefEdit.current && !formRefEdit.current.contains(event.target)) {
      setShowFormEdit(false);
    }
  };
  useEffect(() => {
    if (showFormEdit) {
      document.addEventListener('mousedown', handleClickOutsideEdit);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideEdit);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideEdit);
    };
  }, [showFormEdit]);
  // END EDIT PRODUCT

  return (
    <div id="home" className='px-8 pt-5'>
      {/* Nav*/}
      <div className='w-full flex items-center justify-between mb-6'>
        <nav className="text-sm font-semibold">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center text-blue-500">
              <a href="#" className="text-gray-700">Sản phẩm</a>
              <ChevronRightIcon className="w-3 h-3 mx-3" />
            </li>
            <li className="flex items-center">
              <a href='#' className="text-gray-600">Thêm sản phẩm</a>
            </li>
          </ol>
        </nav>
        <button onClick={handleAddProductClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm sản phẩm</button>
      </div>

      <TableProduct product={product}  
      handleEditProductClick={handleEditProductClick} />

      {showForm && (
        <FormAddProduct formRef={formRef} />
      )}
      {showFormEdit && (
        
        <FormEditProduct 
        formRefEdit={formRefEdit} nameProduct={nameProduct} 
        setNameProduct={setNameProduct} price={price} 
        setPrice={setPrice} quantity={quantity} 
        setQuantity={setQuantity} detail={detail} 
        setDetail={setDetail} />

      )}
    </div>

  )
}