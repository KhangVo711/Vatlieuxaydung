
export default function DescribeProduct() {
    return (
        <>
            <div className="w-full h-[350px] xl:h-[450px] mt-8 xl:mt-24 px-10 xl:flex lg:flex items-center hidden">
                <div className="w-11/12 mx-auto">
                    <div className="grid grid-cols-2 gap-6 items-center justify-center">
                        <div className="flex flex-col justify-center w-4/5 xl:w-3/4">
                            <h2 className="text-4xl text-black font-bold uppercase">Sản phẩm tốt nhất</h2>
                            <p className="text-black text-justify mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A tempora ratione eligendi fugiat reiciendis velit vel quia obcaecati, eos tempore, delectus perferendis. Consequuntur libero corrupti quasi et voluptates, itaque distinctio deleniti aliquam explicabo. Neque excepturi odit dolorem maiores eligendi accusamus temporibus ratione ullam doloribus perspiciatis!</p>
                            <button className="bg-black xl:w-1/4 border  border-black hover:bg-white hover:text-black text-white px-2 py-2 mt-4 transition duration-150 ease-in-out md:w-1/3">Xem thêm</button>
                        </div>
                        <div className="shadow-xl">
                            <img src="https://muabanson.vn/wp-content/uploads/2022/05/uu-nhuoc-diem-cua-son-dulux-7.jpg" alt="Sơn nhà Dulux" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[350px] xl:h-[450px] mt-8 xl:mt-8 px-10 xl:flex lg:flex items-center hidden">
                <div className="w-11/12 mx-auto">
                    <div className="grid grid-cols-2 gap-6 items-center justify-between">
                        <div className="shadow-xl">
                            <img src="https://ximangsunrise.vn/wp-content/uploads/2023/09/banner-web-3-1-1.png" alt="Sơn nhà Dulux" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center items-end w-full pr-0">
                            <h2 className="text-4xl text-black text-end font-bold uppercase">Hãng được ưa thích nhất</h2>
                            <p className="text-black text-justify w-3/4 xl:w-4/5 mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A tempora ratione eligendi fugiat reiciendis velit vel quia obcaecati, eos tempore, delectus perferendis. Consequuntur libero corrupti quasi et voluptates, itaque distinctio deleniti aliquam explicabo. Neque excepturi odit dolorem maiores eligendi accusamus temporibus ratione ullam doloribus perspiciatis!</p>
                            <button className="bg-black xl:w-1/5 border border-black hover:bg-white hover:text-black text-white px-2 py-2.5 mt-4 transition duration-150 ease-in-out md:w-1/4">Xem thêm</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className="w-full h-[500px] mt-28 px-10 xl:hidden lg:hidden items-center flex">
                <div className="w-11/12 mx-auto">
                    <div className="flex flex-col items-center justify-center ">
                        <div className="flex flex-col justify-center w-full">
                            <h2 className="text-2xl text-black text-center font-bold uppercase mb-5">Sản phẩm tốt nhất</h2>
                            <div className="shadow-xl">
                            <img src="https://muabanson.vn/wp-content/uploads/2022/05/uu-nhuoc-diem-cua-son-dulux-7.jpg" alt="Sơn nhà Dulux" className="w-full h-full object-cover" />
                        </div>
                            <p className="text-black text-justify mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A tempora ratione eligendi fugiat reiciendis velit vel quia obcaecati, eos tempore, delectus perferendis. Consequuntur libero corrupti quasi et voluptates, itaque distinctio deleniti aliquam explicabo. Neque excepturi odit dolorem maiores eligendi accusamus temporibus ratione ullam doloribus perspiciatis!</p>
                            <button className="bg-black xl:w-1/4 border  border-black hover:bg-white hover:text-black text-white px-2 py-2.5 mt-4 transition duration-150 ease-in-out md:w-1/3">Xem thêm</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="w-full h-[500px] px-10 mt-28 xl:hidden lg:hidden items-center flex">
                <div className="w-11/12 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col justify-center w-full">
                            <h2 className="text-2xl text-black text-center font-bold uppercase mb-5">Hãng được ưa thích</h2>
                            <div className="shadow-xl">
                            <img src="https://ximangsunrise.vn/wp-content/uploads/2023/09/banner-web-3-1-1.png" alt="Sơn nhà Dulux" className="w-full h-full object-cover" />
                        </div>
                            <p className="text-black text-justify mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A tempora ratione eligendi fugiat reiciendis velit vel quia obcaecati, eos tempore, delectus perferendis. Consequuntur libero corrupti quasi et voluptates, itaque distinctio deleniti aliquam explicabo. Neque excepturi odit dolorem maiores eligendi accusamus temporibus ratione ullam doloribus perspiciatis!</p>
                            <button className="bg-black xl:w-1/4 border  border-black hover:bg-white hover:text-black text-white px-2 py-2.5 mt-4 transition duration-150 ease-in-out md:w-1/3">Xem thêm</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}