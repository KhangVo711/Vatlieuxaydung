import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef, useContext } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormAddInvoice from './addInvoice/FormAddInvoice';
import TableInvoice from './tableInvoice/TableInvoice';
import { Context } from '../../Context.jsx';
import axios from 'axios';
import ViewInvoice from './viewInvoice/ViewInvoice.jsx';
export default function ImportGoods() {
  const { loadDataInvoice, setLoadDataInvoice } = useContext(Context);

    const formAddRef = useRef(null);
    const [dataInvoice, setDataInvoice] = useState([]);
    const [selectDetailInvoice, setSelectDetailInvoice] = useState({mapn:'', tenpn:'', ngaylap:'', ten_san_pham: '', ten_quan_ly: '', soluong: '', dongia: '', thanh_tien:'', tong_gia: ''}); 
    const [showAddForm, setShowAddForm] = useState(false);
    const handleAddProductClick = () => {
        setShowAddForm(!showAddForm);
    }
    const handleClickOutside = (event) => {
        if (formAddRef.current && !formAddRef.current.contains(event.target)) {
            setShowAddForm(false);
        }
      };
    
      useEffect(() => {
        if (showAddForm) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        // Cleanup event listener khi component bị hủy
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [showAddForm]);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getInvoice`);
                if (response.status === 200) {
                    setDataInvoice(response.data.result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setLoadDataInvoice(false);

    }, [loadDataInvoice]);

    

  // VIEW DETAIL INVOICE
  const formRefView = useRef(null);
  const [showFormView, setShowFormView] = useState(false);
    console.log('selectDetailInvoice', selectDetailInvoice);
  const handleViewProductClick = async (item) => {
    try {
    setShowFormView(true);

        const response = await axios.get(`http://localhost:5001/getInvoice/${item.mapn}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            setSelectDetailInvoice(response.data.detail);

          }
    }
    catch (error) {
        console.error('Error fetching data:', error);
      }
}

const handleClickOutsideView = (event) => {
  if (formRefView.current && !formRefView.current.contains(event.target)) {
      setShowFormView(false);
      setSelectDetailInvoice({mapn:'', tenpn:'', ngaylap:'', ten_san_pham: '', ten_quan_ly: '', soluong: '', dongia: '', thanh_tien:'', tong_gia: ''})
  }
};


useEffect(() => {
  if (showFormView) {
      document.addEventListener("mousedown", handleClickOutsideView);
  } else {
      document.removeEventListener("mousedown", handleClickOutsideView);
  }
  return () => {
      document.removeEventListener("mousedown", handleClickOutsideView);
  };
}, [showFormView]);
    return (
<>
    <ToastContainer/>
    <div id="home" className='px-8 pt-5'>
      {/* Nav*/}
      <div className='w-full flex items-center justify-between mb-6'>
        <nav className="text-sm font-semibold">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center text-pink-500">
              <a href="#" className="text-gray-700">Trang chủ</a>
              <ChevronRightIcon className="w-3 h-3 mx-3" />
            </li>
            <li className="flex items-center">
              <a href='#' className="text-gray-600">Nhập kho</a>
            </li>
          </ol>
        </nav>
        <button onClick={handleAddProductClick} 
        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm phiếu nhập</button>
      </div>
        <TableInvoice dataInvoice = {dataInvoice}  handleViewProductClick = { handleViewProductClick}/>
      {showAddForm && (
        <FormAddInvoice formAddRef={formAddRef}  />
      )}
      {showFormView && (
        <ViewInvoice formRefView={formRefView}  selectDetailInvoice={selectDetailInvoice} />
      )}
    </div>
    </>
    )
}