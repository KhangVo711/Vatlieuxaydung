import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState, useEffect} from 'react';
import axios from 'axios';

export default function FormEditProduct({ formRefView, selectedProduct}) {
    const [category, setCategory] = useState([]);
    const [producer, setProducer] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getCategory/${selectedProduct.maloai}`);
                if (response.status === 200) {
                    setCategory(response.data.listCategory);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    
    }, [selectedProduct.maloai]);
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`http://localhost:5001/getProducer/${selectedProduct.mansx}`);
              if (response.status === 200) {
                  setProducer(response.data.listNSX);
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
    
    }, [selectedProduct.mansx]);
  return (
    <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>
      
      <div ref={formRefView} className="2xl:w-1/2 w-3/4 mx-auto bg-gray-100 shadow-lg border flex rounded py-5 px-8 mt-16 ">
      
      <div className='flex items-center justify-center pt-10 z-10'>
        <img src={`http://localhost:5001/uploads/${selectedProduct.hinhanh}`} alt="" className='w-64'/>
        
      </div>
      <div className='mx-auto w-1/2' >
        <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Xem sản phẩm</h2>

      
          <div className="w-full mb-3">
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã sản phẩm</label>
            <p id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{selectedProduct.masp}</p>
          </div>
          <div className="w-full mb-3">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
            <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        
            >{selectedProduct.tensp}</p>
          </div>
   
        <div className="mb-3 flex">
          <div className="w-1/2 mr-1">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
            <p  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
           
            >{selectedProduct.gia}</p>
          </div>
          <div className="w-1/2 ml-1">
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng</label>
            <p  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
            >{selectedProduct.soluongsp}</p>
          </div>
        </div>
          <div className="w-full mb-3">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại</label>

          <p  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
            >{category.tenloai}</p>
       
          </div>
          <div className="w-full mb-3 ">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhà sản xuất</label>

          <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
            >{producer.tennsx}</p>
          
          </div>
        <div className='mb-3'>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thông tin chi tiết</label>
          <p className="block pl-2.5 py-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          
          >{selectedProduct.ttct}</p>
        </div>
       
       
        </div>
      </div>
      
    </div>
  )
}