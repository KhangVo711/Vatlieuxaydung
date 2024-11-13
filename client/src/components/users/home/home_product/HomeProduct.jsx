import { HeartIcon } from "@heroicons/react/24/outline";

export default function HomeProduct() {
    const products = [
        { id: 1, name: 'Thép', price: '₫115.500', imageUrl: 'https://cdn.pixabay.com/photo/2014/10/05/08/11/iron-rods-474792_1280.jpg' },
        { id: 2, name: 'Sắt', price: '₫105.500', imageUrl: 'https://cdn.pixabay.com/photo/2017/05/19/15/18/iron-2326791_640.jpg' },
        { id: 3, name: 'Nhôm', price: '₫95.500', imageUrl: 'https://cdn.pixabay.com/photo/2017/08/14/17/02/aluminium-2641142_640.jpg' },
        { id: 4, name: 'Dây thừng', price: '₫65.500', imageUrl: 'https://cdn.pixabay.com/photo/2017/12/31/14/44/rope-3052477_640.jpg' },
        { id: 5, name: 'Lưới thép', price: '₫235.500', imageUrl: 'https://cdn.pixabay.com/photo/2015/06/30/21/06/grid-826831_1280.jpg' },
        { id: 6, name: 'Kẽm', price: '₫75.500', imageUrl: 'https://cdn.pixabay.com/photo/2020/06/20/08/30/fence-5320071_1280.jpg' },
        { id: 7, name: 'Thép không gỉ', price: '₫85.500', imageUrl: 'https://cdn.pixabay.com/photo/2020/08/30/04/58/steel-tube-5528518_640.jpg' },
        { id: 8, name: 'Gạch', price: '₫5.500', imageUrl: 'https://cdn.pixabay.com/photo/2017/04/25/12/00/brick-2259511_640.jpg' },
        { id: 9, name: 'Ống kim loại', price: '₫715.500', imageUrl: 'https://cdn.pixabay.com/photo/2017/04/25/12/05/sewer-pipes-2259514_640.jpg' },
        { id: 10, name: 'Đinh', price: '₫12.500', imageUrl: 'https://cdn.pixabay.com/photo/2021/10/07/13/55/screws-6688686_640.jpg' },
        { id: 11, name: 'Cát', price: '₫55.500', imageUrl: 'https://cdn.pixabay.com/photo/2021/10/30/08/12/desert-6753742_640.jpg' },
        { id: 12, name: 'Sơn Mykolor', price: '₫555.500', imageUrl: 'https://lavarel.mykolor.com/storage/images/color_board/8e67af697907fdd4511259b3140a3604670659d50e2df.jpg' },
    ];
    
    return (
        <div>
            <div className="w-full px-2.5 pt-12 xl:pb-8 pb-3 flex justify-between items-center relative">
                <h2 className="w-full text-center lg:text-3xl text-xl tracking-wide font-bold uppercase">Sản phẩm</h2>
                <button className="absolute right-4 bottom-0 bg-yellow-500 w-20 xl:w-28 border border-yellow-bg-yellow-500 hover:bg-yellow-400 rounded-md text-white text-xs md:text-md lg:text-lg px-0.5 py-2 transition duration-150 ease-in-out lg:w-32 md:w-24">Xem tất cả</button>
            </div>
            <div className="container mx-auto grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-5 pt-4 pb-12 ">
                {products.map(product => (
                    <article key={product.id} className=" w-full lg:h-[350px] h-[250px] flex p-2 flex-col items-center rounded-md">
                        <a href="#">

                            <img className="mb-2.5 hover:grow hover:scale-105 hover:shadow-xl w-full lg:h-[250px] h-[150px] rounded-sm transition duration-300 ease-in-out" src={product.imageUrl} alt={`Image of ${product.name}`} />
                            
                            <div className="pt-4 flex items-center justify-between">
                                <p className=""><strong>{product.name}</strong></p>
                                <HeartIcon className="h-6 w-6 text-gray-500" />
                            </div>
                            <p>{product.price}</p>
                        </a>
                    </article>
                ))}
            </div>
        </div>
    );
    
}