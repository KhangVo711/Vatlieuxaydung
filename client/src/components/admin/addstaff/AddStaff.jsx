import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef, useContext } from 'react';
import FormAddStaff from './formAddStaff/FormAddStaff';
// import FormEditStaff from './formEditStaff/FormEditStaff';
// import TableStaff from './tableStaff/TableStaff';
// import ViewStaff from './viewStaff/ViewStaff'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../Context.jsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import TableStaff from './tableStaff/TableStaff.jsx';
import FormEditStaff from './formEditStaff/FormEditStaff.jsx';

export default function AddStaff() {

  const { loadStaff, setLoadStaff } = useContext(Context);

    // const [selectedStaff, setSelectedStaff] = useState({ masp: '', tensp: '', maloai: '', ttct:'', soluongsp: '', hinhanh:'', gia: '', mansx: '' });
    const [staff, setStaff] = useState([]);
   const [selectedStaff, setSelectedStaff] = useState({ manv: '', tennv: '', emailnv: '', sdtnv: '', diachinv: '', chucvunv: '', tongluong: '' });
//     useEffect(() => {
//       const fetchData = async () => {
//           try {
//               const response = await axios.get(`http://localhost:5001/getCategory`);
//               if (response.status === 200) {
//                   setCategory(response.data.category);
//               }
//           } catch (error) {
//               console.error('Error fetching data:', error);
//           }
//       };
//       fetchData();
  
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5001/getProducer`);
//             if (response.status === 200) {
//                 setProducer(response.data.listNSX);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//     fetchData();
  
//   }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getStaff`);
                if (response.status === 200) {
                    setStaff(response.data.staff);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setLoadStaff(false);

    }, [loadStaff]);
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

  //EDIT PRODUCT
  const [showFormEdit, setShowFormEdit] = useState(false);
  const formRefEdit = useRef(null);

  const handleEditStaffClick = (item) => {
    setSelectedStaff(item);
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
  //END EDIT PRODUCT

  //VIEW PRODUCT
//   const [showFormView, setShowFormView] = useState(false);
//   const formRefView = useRef(null);

//   const handleViewStaffClick = (item) => {
//     setSelectedStaff(item);

//       setShowFormView(true);
//   };

//   const handleClickOutsideView = (event) => {
//       if (formRefView.current && !formRefView.current.contains(event.target)) {
//           setShowFormView(false);
//       }
//   };

//   useEffect(() => {
//       if (showFormView) {
//           document.addEventListener("mousedown", handleClickOutsideView);
//       } else {
//           document.removeEventListener("mousedown", handleClickOutsideView);
//       }
//       return () => {
//           document.removeEventListener("mousedown", handleClickOutsideView);
//       };
//   }, [showFormView]);
  //END VIEW PRODUCT


  //DELETE PRODUCER

  const handleDeleteStaffClick = async (item) => {
    try {
        const response = await axios.post(`http://localhost:5001/deleteStaff`, { manv: item.manv }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('admin')}`,

                'Accept': 'application/json'
            },
            withCredentials: true

        });
        if (response.status === 200) {
            setLoadStaff(true);
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
  return (
    <>
    <ToastContainer/>
    <div id="home" className='px-8 pt-5'>
      {/* Nav*/}
      <div className='w-full flex items-center justify-between mb-6'>
        <nav className="text-sm font-semibold">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center text-blue-500">
              <a href="#" className="text-gray-700">Nhân viên</a>
              <ChevronRightIcon className="w-3 h-3 mx-3" />
            </li>
            <li className="flex items-center">
              <a href='#' className="text-gray-600">Thêm nhân viên</a>
            </li>
          </ol>
        </nav>
        <button onClick={handleAddProductClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 text-sm px-3 rounded transition duration-150 ease-in-out">Thêm nhân viên</button>
      </div>

      <TableStaff staff={staff}  
      handleEditStaffClick={handleEditStaffClick} handleDeleteStaffClick ={handleDeleteStaffClick} />

      {showForm && (
        <FormAddStaff formRef={formRef} />
      )}
      {showFormEdit && (
        
        <FormEditStaff
        formRefEdit={formRefEdit} 
        selectedStaff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
        setLoadStaff={setLoadStaff}
        />

      )}
      {/* {showFormView && (
                <ViewProduct formRefView={formRefView} selectedProduct={selectedProduct} />
            )}  */}
    </div>
    </>

  )
}