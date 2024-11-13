
export default function ProductIntro() {
    const productsale = [
        {
            id: 1,
            name: 'Xi măng HL',
            image: 'https://ximanghoanglong.vn/admin/upload/images/pc30_2024_06_28_10_17.jpg',
            price: '45,000',
            sale: '-30%',
            cta1: 'Free Ship',
            cta2: 'Rẻ Bất Ngờ',
            detail: 'Thành phần cấu tạo chính gồm có CaO (từ đá vôi), và SiO2, Fe2O3, Al2O3 (từ đất sét).',
        },
        {
            id: 2,
            name: 'Gạch ống 2 lỗ',
            image: 'https://vlxdcantho.com/wp-content/uploads/2022/02/gach-ong-2-lo.jpg',
            price: '1,000',
            sale: '-25%',
            cta1: 'Free Ship',
            cta2: 'Rẻ Bất Ngờ',
            detail: 'Thành phần chính của gạch ống bao gồm: đất sét, nước, chất phụ gia và chất màu.',
        },
        {
            id: 3,
            name: 'Sơn Nippon',
            image: 'https://buildmart.vn/image/cache/catalog/son-nippon/son-nippon-matex-300x300.jpg',
            price: '313,000',
            sale: '-40%',
            cta1: 'Free Ship',
            cta2: 'Rẻ Bất Ngờ',
            detail: 'Loại sơn nước được pha chế đặc biệt để có độ bền màu cao màu bóng đẹp lâu phai.',
        },
        {
            id: 4,
            name: 'Chống thấm',
            image: 'https://buildmart.vn/image/cache/catalog/vat-lieu/ACTIV/activ-crystal-seal-300x300.png',
            price: '745,000',
            sale: '-51%',
            cta1: 'Free Ship',
            cta2: 'Rẻ Bất Ngờ',
            detail: 'Hợp chất chống thấm thẩm thấu kết tinh, trám bít hàn kít các vết nứt co ngót trong bê tông.'
        },
    
    ];
    return (
        <div className="lg:h-[500px] md:h-[400px] px-20 w-full md:block hidden">
        <h2 className="my-12 tracking-wider text-3xl text-center uppercase font-bold ">Sản phẩm giảm sốc</h2>
        <div className="w-full flex justify-around items-center ">
            {productsale.map((product) => (
                <div key={product.id} className="w-1/5 lg:h-2/3 md:h-1/2 bg-white border rounded-lg shadow-md overflow-hidden hover:scale-105 transition duration-200 ease-in-out">
                    <div className="relative">
                        <img src={product.image} alt={product.name} className="w-full lg:h-48 md:h-24 object-cover" />
                        <span className="absolute top-0 right-0 bg-red-600 text-white text-sm font-semibold py-1 px-2 rounded-bl-lg">
                            {product.sale}
                        </span>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <h2 className="text-lg tracking-tight md:text-md font-bold text-gray-900">
                                    {product.name}
                                </h2>
                            </div>
                            <div className="text-xs text-green-600 font-semibold xl:block hidden">
                                {product.cta1}
                            </div>
                        </div>
                        <p className="mt-2 text-sm md:text-xs text-gray-600">
                            {product.detail}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-lg font-bold text-gray-900">{`₫${product.price}`}</span>
                            <span className="bg-yellow-500 text-white text-xs font-semibold py-1 px-2 rounded-lg xl:block hidden">
                                {product.cta2}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
    
}