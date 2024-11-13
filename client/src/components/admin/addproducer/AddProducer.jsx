import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import FormEditProducer from './formEditProducer/FormEditProducer';
import FormAddProducer from './formAddProducer/FormAddProducer';
import ViewProducer from './viewProducer/ViewProducer';
import TableProducer from './tableProducer/TableProducer';

export default function AddProducer() {
    const product = [
        {
            name: 'MyColor',
            code: 'MC-001',
            category: 'Nước sơn',
            email: 'mycolor@gmail.com',
            address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec.',
        },
        {
            name: 'DongTam',
            code: 'DT-001',
            category: 'Gạch',
            email: 'dongtam@gmail.com',
            address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec.',
        },
        {
            name: 'Kova',
            code: 'KV-001',
            category: 'Keo dán',
            email: 'kova@gmail.com',
            address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec.',
        },
    ]
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

        // Cleanup event listener khi component bị hủy
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm]);
    // END ADD PRODUCT

    // EDIT PRODUCT
    // const [nameProducer, setNameProducer] = useState("MyColor");
    const [nameCategory, setNameCategory] = useState("Nước sơn");
    const [email, setEmail] = useState("mycolor@gmail.com");
    const [address, setAddress] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec.");

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

    const [viewedProducer, setViewedProducer] = useState(null);
    const formRefView = useRef(null);

    const handleViewProductClick = (product) => {
        setViewedProducer(product);
    };

    const handleClickOutsideView = (event) => {
        if (formRefView.current && !formRefView.current.contains(event.target)) {
            setViewedProducer(null);
        }
    };

    useEffect(() => {
        if (viewedProducer) {
            document.addEventListener("mousedown", handleClickOutsideView);
        } else {
            document.removeEventListener("mousedown", handleClickOutsideView);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideView);
        };
    }, [viewedProducer]);
    return (
        <div id="home" className='px-8 pt-5'>
            {/* Breadcrumb */}
            <div className='w-full flex items-center justify-between mb-6'>
                <nav className="text-sm font-semibold " aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center text-blue-500">
                            <a href="#" className="text-gray-700">Sản phẩm</a>
                            <ChevronRightIcon className="w-3 h-3 mx-3" />
                        </li>
                        <li className="flex items-center">
                            <a href='#' className="text-gray-600">Nhà sản xuất</a>
                        </li>
                    </ol>
                </nav>
                <button onClick={handleAddProductClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm nhà sản xuất</button>
            </div>

            <TableProducer product={product} handleViewProductClick={handleViewProductClick} handleEditProductClick={handleEditProductClick} />

            {showForm && (
                <FormAddProducer formRef={formRef} />
            )}

            {showFormEdit && (
               <FormEditProducer formRefEdit={formRefEdit} 
               nameCategory={nameCategory} setNameCategory={setNameCategory} 
               email={email} setEmail={setEmail} address={address} 
               setAddress={setAddress} />
            )}

            {viewedProducer && (
                <ViewProducer formRefView={formRefView} viewedProducer={viewedProducer} />
            )}

        </div>

    )
}