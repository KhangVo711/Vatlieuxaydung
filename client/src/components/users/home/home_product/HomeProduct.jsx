import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {formatCurrency} from '../../../../utils/currency';
export default function HomeProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/getProduct12')
            .then((response) => {
                setProducts(response.data.product);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    }, []);
    
    return (
        <div>
            <div className="w-full px-2.5 pt-12 xl:pb-8 pb-3 flex justify-between items-center relative">
                <h2 className="w-full text-center lg:text-3xl text-xl tracking-wide font-bold uppercase">Sản phẩm</h2>
                <button className="absolute right-28 bottom-0 bg-yellow-500 w-20 xl:w-24 border border-yellow-bg-yellow-500 hover:bg-yellow-400 rounded-md text-white text-xs md:text-sm lg:text-md px-0.5 py-2 transition duration-150 ease-in-out lg:w-20 md:w-16">Xem tất cả</button>
            </div>
            
            <div className="container mx-auto grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-5 pt-4 pb-12 ">
                {products.map(product => (
                    <article key={product.masp} className=" w-full lg:h-[350px] h-[250px] flex p-2 flex-col items-center rounded-md">
                        <div>

                            <img className="mb-2.5 hover:grow hover:scale-105 w-full lg:h-[250px] h-[150px] rounded-sm transition duration-300 ease-in-out" src={`http://localhost:5001/uploads/${product.hinhanh}`} alt={product.name} />
                            
                            
                        </div>
                        <div className="pt-4 px-4 w-full flex items-center justify-between">
                                <p className=""><strong>{product.tensp}</strong></p>
                                <PlusCircleIcon className="h-7 w-7 text-gray-600 hover:scale-105 cursor-pointer" />
                            </div>
                            <div className="flex w-full px-4 justify-start items-center">
                            <p>{formatCurrency(product.gia)}</p>
                            </div>
                    </article>
                ))}
            </div>
        </div>
    );
    
}