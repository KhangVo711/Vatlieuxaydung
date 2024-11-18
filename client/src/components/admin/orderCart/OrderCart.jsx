import { ChevronRightIcon } from '@heroicons/react/24/solid';
import TableOrder from './tableOrder/TableOrder';
import EditStatus from './editStatus/EditStatus';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ViewDetailOrder from './viewDetailOrder/ViewDetailOrder';
export default function OrderCart() {

    // EDIT STATUS

    const [selected, setSelected] = useState({});
    const [showFormEdit, setShowFormEdit] = useState(false);
    const formRefEdit = useRef(null);

    const handleEditClick = (item) => {
        setSelected(item);
        setShowFormEdit(true);
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


      // VIEW DETAIL INVOICE
  const formRefView = useRef(null);
  const [showFormView, setShowFormView] = useState(false);
    console.log('selectDetail', selected);
  const handleViewClick = async (item) => {
    console.log('item', item.madh);
    try {
    setShowFormView(true);

        const response = await axios.get(`http://localhost:5001/getDetailOrder/${item.madh}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            setSelected(response.data.detail);

          }
    }
    catch (error) {
        console.error('Error fetching data:', error);
      }
}

const handleClickOutsideView = (event) => {
  if (formRefView.current && !formRefView.current.contains(event.target)) {
      setShowFormView(false);
      setSelected({})
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
            <ToastContainer />
            <div id="home" className='px-8 pt-8'>
                {/* Nav*/}
                <div className='w-full flex items-center justify-between mb-6'>
                    <nav className="text-sm font-semibold">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center text-blue-500">
                                <a href="#" className="text-gray-700">Trang chủ</a>
                                <ChevronRightIcon className="w-3 h-3 mx-3" />
                            </li>
                            <li className="flex items-center">
                                <a href='#' className="text-gray-600">Đơn hàng</a>
                            </li>
                        </ol>
                    </nav>
                </div>

                <TableOrder handleEditClick ={handleEditClick} handleViewClick={handleViewClick} />

                {showFormEdit && (
                    <EditStatus selected={selected} formRefEdit={formRefEdit} setSelected = {setSelected}/>
                )}

                {showFormView && (
                    <ViewDetailOrder selected={selected} formRefView={formRefView} />
                )    
                }

            </div>
        </>
    )
}