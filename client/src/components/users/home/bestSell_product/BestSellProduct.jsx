
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function BestSellProduct() {
    const products = [
        {
            id: 1,
            name: 'Kem Dưỡng Da Hỗ Trợ Giảm Mụn',
            image: 'https://product.hstatic.net/200000868185/product/3701129805367_895fe4b889574369a36f18f90f7ec48b_96fc29025bef41bb970a2c71b2f387c2_master.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        },
        {
            id: 2,
            name: 'Kem Chống Nắng Che Khuyết Điểm',
            image: 'https://product.hstatic.net/200000868185/product/1089566365249960_149246432374919086_n_73c072463bd742e4a00793baeb7c0e2e_c87315103e2d4420ae7bf684824af338_master.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        },
        {
            id: 3,
            name: 'Bột Uống Collagen',
            image: 'https://product.hstatic.net/200000868185/product/1840_308c1c135d6b8197bbed9e718484631a_3c2352d32687449cb43dd6d268e4efdf_64c6d7009d1045849d29a569d6b15e71_master.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 4,
            name: 'Trà Giảm cân Genpi Tea',
            image: 'https://product.hstatic.net/200000868185/product/orihiro_genpi_tea_f2da0396b9c3442898c167bce280d950_8475a0681ecf4cd1b168ecddce81ef61_master.jpeg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 5,
            name: 'Gel Dưỡng Vùng Mắt',
            image: 'https://product.hstatic.net/200000868185/product/6955416224486__62__25154db06bdc45799536988ba228def6_c21b189dd73943e9bae399daa9e07d67_master.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 6,
            name: 'Phấn Mắt 4 Ô',
            image: 'https://product.hstatic.net/200000868185/product/a36457ffe4556be368b3-removebg-preview_a3ebaca15270466ca320dc683b1fa1c6_9027e92bd08843baa5c8ae9471a223a6_master.png',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 7,
            name: 'Kem Tắm Trắng Da',
            image: 'https://product.hstatic.net/200000868185/product/snow_f2757ad35d8840c2885472dcbf1aa34d_f4e9f278de304492941b10c4a5d585df_master.jpg',
            cta1: 'ĐẶT HÀNG',
            cta2: 'TƯ VẤN',
        }, {
            id: 8,
            name: 'Miếng Dán Mụn',
            image: 'https://product.hstatic.net/200000868185/product/5067-represent_33bec1847fdb4e8ca3d93c2d536225cb_dbf5b19afaaf4d239ab35470a4613a97_master.jpg',
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
                                <button className="bg-pink-400 text-white px-4 py-2 rounded hover:scale-105 transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md">
                                    {product.cta1}
                                </button>
                                <button className="bg-blue-400 text-white px-4 py-2 rounded hover:scale-105 transition duration-200 ease-in-out sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 sm:text-xs md:text-sm lg:text-md">
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