import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef, useContext } from 'react';
import FormEditBranch from './formEditBranch/FormEditBranch.jsx'; 
import FormAddBranch from './formAddBranch/FormAddBranch.jsx'; 
import TableBranch from './tableBranch/TableBranch.jsx'; 
import axios from 'axios';
import { Context } from '../../Context.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export default function AddBranch() {
    const { loadBranch, setLoadBranch } = useContext(Context); 
    const [selectedBranch, setSelectedBranch] = useState({
        id: '',
        tencuahang: '',
        diachi: '',
        kinhdo: '',
        vido: '',
        giohoatdong: '',
        created_at: ''
    });
    const [branches, setBranches] = useState([]);
console.log(branches);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getBranch`); 
                if (response.status === 200) {
                    setBranches(response.data.branches); 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setLoadBranch(false); 
    }, [loadBranch]); 

    // ADD BRANCH
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);

    const handleAddBranchClick = () => {
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
    // END ADD BRANCH

    // EDIT BRANCH
    const [showFormEdit, setShowFormEdit] = useState(false);
    const formRefEdit = useRef(null);

    const handleEditBranchClick = (item) => {
        setSelectedBranch(item);
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
    // END EDIT BRANCH

    // DELETE BRANCH
    const handleDeleteBranchClick = async (item) => {
        const token = Cookies.get('admin') || Cookies.get('staff');
        try {
            const response = await axios.post(`http://localhost:5001/deleteBranch`, { id: item.id }, { 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setLoadBranch(true); 
                handleSuccess();
            }
        } catch (error) {
            handleError();
        }
    };

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
    // END DELETE BRANCH

    return (
        <>
            <ToastContainer />
            <div id="home" className='px-8 pt-5'>
                {/* Nav */}
                <div className='w-full flex items-center justify-between mb-6'>
                    <nav className="text-sm font-semibold">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center text-pink-500">
                                <a href="#" className="text-gray-700">Cửa hàng</a>
                                <ChevronRightIcon className="w-3 h-3 mx-3" />
                            </li>
                            <li className="flex items-center">
                                <a href='#' className="text-gray-600">Thêm cửa hàng</a>
                            </li>
                        </ol>
                    </nav>
                    <button onClick={handleAddBranchClick} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm cửa hàng</button>
                </div>

                <TableBranch 
                    branches={branches} 
                    handleEditBranchClick={handleEditBranchClick} 
                    setLoadBranch={setLoadBranch} // Consider renaming to setLoadBranch
                    handleDeleteBranchClick={handleDeleteBranchClick} 
                />

                {showForm && (
                    <FormAddBranch formRef={formRef} />
                )}
                {showFormEdit && selectedBranch && (
                    <FormEditBranch
                        formRefEdit={formRefEdit}
                        selectedBranch={selectedBranch}
                        setSelectedBranch={setSelectedBranch}
                        setLoadBranch={setLoadBranch} // Consider renaming to setLoadBranch
                    />
                )}
            </div>
        </>
    );
}