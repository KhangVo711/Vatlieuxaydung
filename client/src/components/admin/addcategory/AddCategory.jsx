import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef, useContext } from 'react';
import FormEditCategory from './formEditCategory/FormEditCategory';
import FormAddCategory from './formAddCategory/FormAddCategory';
import TableCategory from './tableCategory/TableCategory';
import axios from 'axios';
import { Context } from '../../Context.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


export default function AddCategory() {
    const { loadCategory, setLoadCategory } = useContext(Context);
    const [selectedCategory, setSelectedCategory] = useState({ maloai: '', tenloai: '' });
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getCategory`);
                if (response.status === 200) {
                    setCategory(response.data.category);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setLoadCategory(false);

    }, [loadCategory]);

    // ADD CATEGORY
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
    // END ADD CATEGORY

    // EDIT CATEGORY

    const [showFormEdit, setShowFormEdit] = useState(false);
    const formRefEdit = useRef(null);

    const handleEditProductClick = (item) => {
        setSelectedCategory(item);
        setShowFormEdit(true);
    };
    // console.log(selectedCategory);
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
    // END EDIT CATEGORY

    // DELETE CATEGORY

    const handleDeleteProductClick = async (item) => {
        const token = Cookies.get('admin') || Cookies.get('staff');
        
        try {
            const response = await axios.post(`http://localhost:5001/deleteCategory`, { maloai: item.maloai }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                withCredentials: true
    
            });
            if (response.status === 200) {
                setLoadCategory(true);
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
            {/* Nav*/}
            <div className='w-full flex items-center justify-between mb-6'>
                <nav className="text-sm font-semibold">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center text-pink-500">
                            <a href="#" className="text-gray-700">Sản phẩm</a>
                            <ChevronRightIcon className="w-3 h-3 mx-3" />
                        </li>
                        <li className="flex items-center">
                            <a href='#' className="text-gray-600">Thêm loại</a>
                        </li>
                    </ol>
                </nav>
                <button onClick={handleAddProductClick} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm loại</button>
            </div>

            <TableCategory category={category} handleEditProductClick={handleEditProductClick} setLoadCategory={setLoadCategory} handleDeleteProductClick={handleDeleteProductClick} />

            {showForm && (
                <FormAddCategory formRef={formRef} />
            )}
            {showFormEdit && selectedCategory && (
                <FormEditCategory
                    formRefEdit={formRefEdit}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setLoadCategory={setLoadCategory}
                />
            )}




        </div>
</>
    )
}