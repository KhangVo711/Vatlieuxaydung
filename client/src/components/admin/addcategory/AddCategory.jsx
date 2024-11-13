import { ChevronRightIcon} from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import FormEditCategory from './formEditCategory/FormEditCategory';
import FormAddCategory from './formAddCategory/FormAddCategory';
import TableCategory from './tableCategory/TableCategory';

export default function AddCategory() {
    const product = [
        {
            code: 'NS-001',
            name: 'Nước sơn',
        },
        {
            code: 'KD-001',
            name: 'Keo dán',
        },
        {
            code: 'GC-001',
            name: 'Gạch',
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

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm]);
    // END ADD PRODUCT

    // EDIT PRODUCT
    const [nameCategory, setNameCategory] = useState("Nước sơn");

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
                            <a href='#' className="text-gray-600">Thêm loại</a>
                        </li>
                    </ol>
                </nav>
                <button onClick={handleAddProductClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm loại</button>
            </div>

           <TableCategory product={product} handleEditProductClick={handleEditProductClick}/>

            {showForm && (
                <FormAddCategory formRef={formRef}/>
            )}
            {showFormEdit && (
                <FormEditCategory formRefEdit={formRefEdit} nameCategory={nameCategory} setNameCategory={setNameCategory}/>
            )}

            

            
        </div>

    )
}