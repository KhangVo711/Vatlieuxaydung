
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function BestSellProduct() {
    const products = [
        {
            id: 1,
            name: 'Sơn Dulux EasyClean',
            image: 'https://buildmart.vn/image/cache/catalog/son-dulux/easy-clean/son-dulux-easyclean-chong-bam-ban-mo-300x300.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        },
        {
            id: 2,
            name: 'Bột trét tường cao cấp',
            image: 'https://buildmart.vn/image/cache/catalog/son-dulux/bot-tret-tuong-noi-that-dulux-01-300x300.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        },
        {
            id: 3,
            name: 'Ngói gốm Prime Milano',
            image: 'https://buildmart.vn/image/cache/catalog/vat-lieu/PRIME/08.15.110%20ngoi%20gom%20prime%20milano%20vatlieugiasi-300x300.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 4,
            name: 'Ngói Prime Hai Sóng',
            image: 'https://buildmart.vn/image/cache/catalog/vat-lieu/PRIME/0804108%20ngoi%20prime%20ghi%20xam%20vatlieugiasi-300x300.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 5,
            name: 'Xi măng Vicem Hà Tiên',
            image: 'https://cdn.hoasenhome.vn/catalog/product/x/i/xi-mang-vicem-ha-tien-da-dung-50kg.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 6,
            name: 'Đá 4x6 trắng',
            image: 'https://vlxdcantho.com/wp-content/uploads/2022/02/da-4x6-trang.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 7,
            name: 'Gạch ống 4 lỗ',
            image: 'https://group4n.com/wp-content/uploads/2023/02/ff4536274dc78799ded6.webp',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 8,
            name: 'Tấm ốp tường chống nóng',
            image: 'https://vatlieuanvinh.com/wp-content/uploads/2022/12/tam-op-tuong-ngoai-troi-chong-nong-11.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        },
    ];
    return (
        <div>
            <h2 className="my-6 lg:my-12 tracking-wider text-xl ml-4 md:ml-6 lg:ml-12 uppercase font-bold sm:text-2xl md:text-3xl lg:text-3xl">Sản phẩm bán chạy</h2>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                breakpoints={{
                    // Khi màn hình lớn hơn 640px (điện thoại)
                    640: {
                        slidesPerView: 1,  // Hiển thị 2 sản phẩm
                    },
                    // Khi màn hình lớn hơn 768px (máy tính bảng)
                    768: {
                        slidesPerView: 2,  // Hiển thị 2 sản phẩm
                    },
                    // Khi màn hình lớn hơn 1024px (máy tính)
                    1024: {
                        slidesPerView: 3,  // Hiển thị 3 sản phẩm
                    },
                    // Khi màn hình lớn hơn 1280px (màn hình lớn hơn)
                    1280: {
                        slidesPerView: 4,  // Hiển thị 4 sản phẩm
                    },
                }}
                navigation
            >
                {products.map((product) => (
                    <SwiperSlide className="p-4" key={product.id}>
                        <div className="bg-white shadow-md rounded-lg p-8 h-[350px] md:h-[360px] lg:h-[380px]">
                            <img src={product.image} alt={product.name} className="lg:w-2/3 h-48 object-cover sm:h-40 w-1/2 md:h-48 lg:h-56 mx-auto" />
                            <h3 className="text-md tracking-tighter font-semibold mt-2 sm:text-sm md:text-md lg:text-lg">
                                {product.name}
                            </h3>
                            <div className="flex justify-between mt-4">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:scale-105 transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md">
                                    {product.cta1}
                                </button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md">
                                    {product.cta2}
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}