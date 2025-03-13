import React, { useState, useEffect } from 'react';
import {formatCurrency} from '../../../../utils/currency';

import axios from 'axios';
export default function ProductIntro() {
    
    const [productsale, setProductsale] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/getProduct5')
            .then((response) => {
                setProductsale(response.data.product);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    }, []);
    console.log(productsale);
    return (
        <div className="lg:h-[500px] md:h-[400px] px-20 w-full md:block hidden">
        <h2 className="my-12 tracking-wider text-3xl text-center uppercase font-bold ">Sản phẩm giảm sốc</h2>
        <div className="w-full flex justify-evenly items-center">
            {productsale.map((product) => (
                <div key={product.masp} className="w-72 h-fit bg-white border rounded-lg shadow-md overflow-hidden ">
                    <div className="relative">
                        <img src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`} alt={product.tensp} className="w-full lg:h-60 md:h-32 object-cover" />
                        <span className="absolute top-0 right-0 bg-red-600 text-white text-sm font-semibold py-1 px-2 rounded-bl-lg">
                            {product.tenkm}
                        </span>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <h2 className="text-lg tracking-tight md:text-md font-bold text-gray-900">
                                    {product.tensp}
                                </h2>
                            </div>
                            {/* <div className="text-xs text-green-600 font-semibold xl:block hidden">
                                hh
                            </div> */}
                        </div>
                        <p className=" text-sm md:text-xs text-gray-600">
                            {product.ttct}
                        </p>
                        <div className="flex items-center justify-between mt-1.5">
                            <div className='flex flex-col'>
                            <span className=" font-bold text-gray-900 opacity-85 line-through">{formatCurrency(product.gia)}</span>
                            <span className=" font-bold text-gray-900">{formatCurrency(product.gia * (1-product.km/100))}</span>
                            </div>
                            <button className="bg-pink-400 text-white font-semibold py-1.5 px-3 rounded-md xl:block hidden hover:scale-105 transition duration-200 ease-in-out">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
    
}