
export default function DescribeProduct() {
    return (
        <div className="mb-24">
            <div className="w-full h-[350px] xl:h-[450px] mt-8 xl:mt-24 px-10 xl:flex lg:flex items-center hidden">
                <div className="w-11/12 mx-auto">
                    <div className="grid grid-cols-2 gap-6 items-center justify-center">
                        <div className="flex flex-col justify-center w-4/5 xl:w-3/4">
                            <h2 className="text-4xl text-black font-bold uppercase">Sản phẩm tốt nhất</h2>
                            <p className="text-black text-justify mt-4">Khám phá bộ sưu tập son 3CE thời thượng và mặt nạ dưỡng da cao cấp đang được yêu thích nhất. Son 3CE với bảng màu cuốn hút, chất son mềm mịn giúp tôn lên nét đẹp tự nhiên. Kết hợp cùng mặt nạ dưỡng ẩm sâu, mang lại làn da căng mướt, tràn đầy sức sống. Hãy để vẻ đẹp của bạn luôn rạng rỡ và cuốn hút với những sản phẩm được yêu thích nhất từ chúng tôi!</p>
                            <button className="bg-pink-400 xl:w-1/4 border  border-pink-400 hover:bg-white hover:text-black text-white px-2 py-2 mt-4 transition duration-150 ease-in-out md:w-1/3">Xem thêm</button>
                        </div>
                        <div className="shadow-xl">
                            <img src="https://kenh14cdn.com/2017/1-1514177017096.jpg" alt="Sơn nhà Dulux" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[350px] xl:h-[450px] mt-8 xl:mt-8 px-10 xl:flex lg:flex items-center hidden">
                <div className="w-11/12 mx-auto">
                    <div className="grid grid-cols-2 gap-6 items-center justify-between">
                        <div className="shadow-xl">
                            <img src="https://bloganchoi.com/wp-content/uploads/2020/12/my-pham-thuan-chya.jpg" alt="Sơn nhà Dulux" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center items-end w-full pr-0">
                            <h2 className="text-4xl text-black text-end font-bold uppercase">Hãng được ưa thích nhất</h2>
                            <p className="text-black text-justify w-3/4 xl:w-4/5 mt-4">Cocoon – Mỹ phẩm thuần chay 100% từ thiên nhiên, an toàn và lành tính, mang đến vẻ đẹp thuần Việt đầy rạng rỡ. Sản phẩm không thử nghiệm trên động vật, không chứa thành phần hóa học độc hại, giúp nuôi dưỡng làn da khỏe mạnh từ bên trong. Hãy chọn Cocoon để trải nghiệm vẻ đẹp tự nhiên, thuần khiết và bền vững!</p>
                            <button className="bg-pink-400 xl:w-1/5 border border-pink-400 hover:bg-white hover:text-black text-white px-2 py-2.5 mt-4 transition duration-150 ease-in-out md:w-1/4">Xem thêm</button>
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
        </div>
    )
}