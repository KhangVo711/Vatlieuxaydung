import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef, useContext } from 'react';
import FormEditPromo from './formEditPromo/FormEditPromo';
import FormAddPromo from './formAddPromo/FormAddPromo';
import TablePromo from './tablePromo/TablePromo';
import axios from 'axios';
import { Context } from '../../Context.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


export default function AddPromo() {
    const { loadPromo, setLoadPromo } = useContext(Context);
    console.log(loadPromo);
    const [selectedPromo, setSelectedPromo] = useState({ makm: '', tenkm: '', km: '',thoigianbatdaukm: '', thoigianketthuckm: '', masp: '' });
    const [promo, setPromo] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getPromotions`);
                if (response.status === 200) {
                    setPromo(response.data.promotions);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData(); // Gọi ngay khi component mount
        setLoadPromo(false);
        
        const interval = setInterval(fetchData, 60000); // Gọi lại mỗi phút
    
        return () => clearInterval(interval); // Cleanup để tránh memory leak
    }, [loadPromo]);
    

    // ADD Promo
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
    // END ADD Promo

    // EDIT Promo

    const [showFormEdit, setShowFormEdit] = useState(false);
    const formRefEdit = useRef(null);

    const handleEditProductClick = (item) => {
        setSelectedPromo(item);
        setShowFormEdit(true);
    };
    // console.log(selectedPromo);
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
    // END EDIT Promo

    // DELETE Promo

    const handleDeleteProductClick = async (item) => {
        const token = Cookies.get('admin') || Cookies.get('staff');
        try {
            const response = await axios.post(`http://localhost:5001/deletePromo`, { makm: item.makm }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                withCredentials: true
    
            });
            if (response.status === 200) {
                setLoadPromo(true);
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
    // END DELETE Promo
    return (
        <>
            <ToastContainer />

        <div id="home" className='px-8 pt-5'>
            {/* Nav*/}
            <div className='w-full flex items-center justify-between mb-6'>
                <nav className="text-sm font-semibold">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center text-pink-500">
                            <a href="#" className="text-gray-700">Khuyến mãi</a>
                            <ChevronRightIcon className="w-3 h-3 mx-3" />
                        </li>
                        <li className="flex items-center">
                            <a href='#' className="text-gray-600">Thêm khuyến mãi</a>
                        </li>
                    </ol>
                </nav>
                <button onClick={handleAddProductClick} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm khuyến mãi</button>
            </div>

            <TablePromo promo={promo} handleEditProductClick={handleEditProductClick} setLoadPromo={setLoadPromo} handleDeleteProductClick={handleDeleteProductClick} />

            {showForm && (
                <FormAddPromo formRef={formRef} />
            )}
            {showFormEdit && selectedPromo && (
                <FormEditPromo
                    formRefEdit={formRefEdit}
                    selectedPromo={selectedPromo}
                    setSelectedPromo={setSelectedPromo}
                    setLoadPromo={setLoadPromo}
                />
            )}




        </div>
</>
    )
}