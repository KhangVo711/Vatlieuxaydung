import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef, useContext } from 'react';
import FormEditProducer from './formEditProducer/FormEditProducer';
import FormAddProducer from './formAddProducer/FormAddProducer';
import ViewProducer from './viewProducer/ViewProducer';
import TableProducer from './tableProducer/TableProducer';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../Context.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';


export default function AddProducer() {
    const { loadProducer, setLoadProducer } = useContext(Context);
    
    const [selectedProducer, setSelectedProducer] = useState({ mansx: '', tennsx: '', email: '', diachi: '' });
    const [producer, setProducer] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getProducer`);
                if (response.status === 200) {
                    setProducer(response.data.listNSX);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setLoadProducer(false);

    }, [loadProducer]);
    // ADD PRODUCER
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);
    const handleAddProductClick = () => {
        setShowForm(!showForm);
    };
    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setShowForm(false); // Ẩn form nếu click xảy ra bên ngoài form
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
    // END ADD PRODUCT

    // EDIT PRODUCT

    const [showFormEdit, setShowFormEdit] = useState(false);
    const formRefEdit = useRef(null);

    const handleEditProductClick = (item) => {
        setSelectedProducer(item);
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
    // END EDIT PRODUCT

    // VIEW PRODUCT

    const [showFormView, setShowFormView] = useState(false);
    const formRefView = useRef(null);

    const handleViewProductClick = (item) => {
        setSelectedProducer(item);
        setShowFormView(true);
    };

    const handleClickOutsideView = (event) => {
        if (formRefView.current && !formRefView.current.contains(event.target)) {
            setShowFormView(false);
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
    // END VIEW PRODUCT

    // DELETE PRODUCER

    const handleDeleteProductClick = async (item) => {
        const token = Cookies.get('admin') || Cookies.get('staff');
        try {
            const response = await axios.post(`http://localhost:5001/deleteProducer`, { mansx: item.mansx }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setLoadProducer(true);
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
    // END DELETE CATEGORY
    return (
        <>
        <ToastContainer />
        <div id="home" className='px-8 pt-5'>
            {/* Breadcrumb */}
            <div className='w-full flex items-center justify-between mb-6'>
                <nav className="text-sm font-semibold " aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center text-pink-500">
                            <a href="#" className="text-gray-700">Sản phẩm</a>
                            <ChevronRightIcon className="w-3 h-3 mx-3" />
                        </li>
                        <li className="flex items-center">
                            <a href='#' className="text-gray-600">Nhà sản xuất</a>
                        </li>
                    </ol>
                </nav>
                <button onClick={handleAddProductClick} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm nhà sản xuất</button>
            </div>

            <TableProducer producer={producer} 
            handleViewProductClick={handleViewProductClick} 
            handleEditProductClick={handleEditProductClick} 
            handleDeleteProductClick={handleDeleteProductClick}
            />

            {showForm && (
                <FormAddProducer formRef={formRef} />
            )}

            {showFormEdit && (
               <FormEditProducer formRefEdit={formRefEdit} 
               selectedProducer={selectedProducer}
                    setSelectedProducer={setSelectedProducer}
                    setLoadProducer={setLoadProducer} />
            )}

            {showFormView && (
                <ViewProducer formRefView={formRefView} selectedProducer={selectedProducer} />
            )}

        </div>
</>
    )
}