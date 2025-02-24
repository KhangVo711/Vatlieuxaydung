
export default function ProductIntro() {
    const productsale = [
        {
            id: 1,
            name: 'Mascara',
            image: 'https://product.hstatic.net/200000868185/product/al_sky_high_waterproof_mascara_makeup_159c1f2688ee493ea0fd267c5663ca0f_85d5208dbd4a4d8d9db199675de29198_master.jpeg',
            price: '219,000',
            sale: '-30%',
            cta1: 'Free Ship',
            cta2: 'Rẻ Bất Ngờ',
            detail: 'Mascara Al Sky High Waterproof có đầu cọ độc đáo giúp bạn chải đều đến từng sợi mi nhỏ nhất và ngắn nhất theo từng lớp.',
        },
        {
            id: 2,
            name: 'Lược lưới',
            image: 'https://product.hstatic.net/200000868185/product/6977364830090_e93444fe77b545fd96cd5728224f97ec_master.jpg',
            price: '62,000',
            sale: '-25%',
            cta1: 'Free Ship',
            cta2: 'Rẻ Bất Ngờ',
            detail: 'Thiết kế bản lược to, kèm ô thông khí giúp tóc khô nhanh và gỡ rối, giúp hạn chế tối đa tình trạng gãy rụng tóc.',
        },
        {
            id: 3,
            name: 'Kem nền',
            image: 'https://product.hstatic.net/200000868185/product/trice_hd_liquid_coverage_foundation_5_958feb1526fd4dbbb5cdba9a5e24d27f_49006ecc01d8442ba9911d5cd35ce54f_master.jpeg',
            price: '199,000',
            sale: '-40%',
            cta1: 'Free Ship',
            cta2: 'Rẻ Bất Ngờ',
            detail: 'Kem nền dạng lỏng tựa như serum, đang ngày càng phổ biến vì độ che phủ cao nhưng nền lại cực kì mỏng nhẹ.',
        },
        {
            id: 4,
            name: 'Son Tint Dearmay',
            image: 'https://product.hstatic.net/200000868185/product/son_tint_dearmay_la_piste_lip_tint_cc1c7c4ff685498fa7b5b06cb1d763b9_cb54a841b28e445083750502ee9ef632_master.jpeg',
            price: '82,000',
            sale: '-51%',
            cta1: 'Free Ship',
            cta2: 'Rẻ Bất Ngờ',
            detail: 'Đưa bạn qua từng cung bậc cảm xúc qua từng tông màu từ đỏ rượu qua cam sữa rồi là hồng nude nhẹ nhàng mà son mang lại.'
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