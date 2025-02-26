import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef, useContext } from 'react';
import FormEditDelivery from './formEditDelivery/FormEditDelivery';
import FormAddDelivery from './formAddDelivery/FormAddDelivery';
import TableDelivery from './tableDelivery/TableDelivery';
import axios from 'axios';
import { Context } from '../../Context.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


export default function AddDelivery() {
    const { loadDelivery, setLoadDelivery } = useContext(Context);
    const [selectedDelivery, setSelectedDelivery] = useState({ madvvc: '', tendvvc: '', phivanchuyen: '' });
    const [delivery, setDelivery] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getDelivery`);
                if (response.status === 200) {
                    setDelivery(response.data.delivery);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setLoadDelivery(false);

    }, [loadDelivery]);

    // ADD Delivery
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

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm]);
    // END ADD Delivery

    // EDIT Delivery

    const [showFormEdit, setShowFormEdit] = useState(false);
    const formRefEdit = useRef(null);

    const handleEditProductClick = (item) => {
        setSelectedDelivery(item);
        setShowFormEdit(true);
    };
    // console.log(selectedDelivery);
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
    // END EDIT Delivery

    // DELETE Delivery

    const handleDeleteProductClick = async (item) => {
        const token = Cookies.get('admin') || Cookies.get('staff');
        try {
            const response = await axios.post(`http://localhost:5001/deleteDelivery`, { madvvc: item.madvvc }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                withCredentials: true
    
            });
            if (response.status === 200) {
                setLoadDelivery(true);
                handleSuccess();
            }
        }
        catch (error) {
            handleError();
        }
    }
    const handleSuccess = () => {
        toast.success("Xóa thành công!", {
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
    // END DELETE Delivery
    return (
        <>
            <ToastContainer />

        <div id="home" className='px-8 pt-5'>
            {/* Nav*/}
            <div className='w-full flex items-center justify-between mb-6'>
                <nav className="text-sm font-semibold">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center text-blue-500">
                            <a href="#" className="text-gray-700">Vận chuyển</a>
                            <ChevronRightIcon className="w-3 h-3 mx-3" />
                        </li>
                        <li className="flex items-center">
                            <a href='#' className="text-gray-600">Thêm đơn vị vận chuyển</a>
                        </li>
                    </ol>
                </nav>
                <button onClick={handleAddProductClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm đơn vị vận chuyển</button>
            </div>

            <TableDelivery delivery={delivery} handleEditProductClick={handleEditProductClick} setLoadDelivery={setLoadDelivery} handleDeleteProductClick={handleDeleteProductClick} />

            {showForm && (
                <FormAddDelivery formRef={formRef} />
            )}
            {showFormEdit && selectedDelivery && (
                <FormEditDelivery
                    formRefEdit={formRefEdit}
                    selectedDelivery={selectedDelivery}
                    setSelectedDelivery={setSelectedDelivery}
                    setLoadDelivery={setLoadDelivery}
                />
            )}




        </div>
</>
    )
}