import React from 'react';

export default function About() {
    return (
        <div className="min-h-screen bg-pink-50">
            {/* Banner */}
            <div
    className="py-16 h-96 bg-cover bg-center relative flex items-center justify-center"
    style={{
        backgroundImage: `url('https://png.pngtree.com/background/20210709/original/pngtree-cosmetic-pink-background-simple-literary-picture-image_914316.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}
>
    <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
            <h1 
                className="text-4xl md:text-5xl font-bold text-gray-600 mb-6"
                style={{
                    fontFamily: "'Playfair Display', serif", // Font cho tiêu đề
                    color: "#2D1A3F", // Màu tím đậm để nổi bật trên nền hồng nhạt
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" // Thêm bóng chữ
                }}
            >
                Nét Đẹp Việt – Vẽ Nên Tự Tin
            </h1>
            <p 
                className="text-lg text-gray-600 mb-8"
                style={{
                    fontFamily: "'Lora', serif", // Font cho phụ đề
                    color: "#4A2C5A", // Màu tím nhạt hơn một chút
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)" // Bóng chữ nhẹ
                }}
            >
                Nâng Tầm Vẻ Đẹp Tự Nhiên Của Phụ Nữ Việt!
            </p>
        </div>
    </div>
</div>

            {/* Story Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Câu chuyện của chúng tôi</h2>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className='flex flex-col'>
  <div className="w-full mb-6">
    <img 
      src="https://hali.vn/wp-content/uploads/2020/07/thiet-ke-banner-my-pham37.jpg" 
      alt="Về BeautyShop" 
      className="rounded-lg shadow-lg" 
    />
  </div>
  <div className='mt-6 flex justify-between gap-4'>
    {/* Thay thế 5 div với thiết kế mới */}
    <div className='h-20 w-28 flex flex-col items-center justify-center bg-pink-100 rounded-xl shadow-md p-3 text-center text-xs text-gray-800 transition-transform hover:scale-105'>
      <span className='font-bold text-[13px]'>Chính hãng</span>
      <span className='text-[11px] mt-1'>100%</span>
    </div>
    <div className='h-20 w-28 flex flex-col items-center justify-center bg-pink-100 rounded-xl shadow-md p-3 text-center text-xs text-gray-800 transition-transform hover:scale-105'>
      <span className='font-bold text-[13px]'>Chất lượng</span>
      <span className='text-[11px] mt-1'>Đảm bảo cao cấp</span>
    </div>
   
    <div className='h-20 w-28 flex flex-col items-center justify-center bg-pink-100 rounded-xl shadow-md p-3 text-center text-xs text-gray-800 transition-transform hover:scale-105'>
      <span className='font-bold text-[13px]'>Uy tín</span>
      <span className='text-[11px] mt-1'>Được tin dùng</span>
    </div>
    <div className='h-20 w-28 flex flex-col items-center justify-center bg-pink-100 rounded-xl shadow-md p-3 text-center text-xs text-gray-800 transition-transform hover:scale-105'>
      <span className='font-bold text-[13px]'>Hỗ trợ</span>
      <span className='text-[11px] mt-1'>24/7 tận tâm</span>
    </div>
  </div>
</div>
                            <div className="md:w-2/3">
    <p className="text-gray-600 mb-4">
        BeautyShop được thành lập vào năm 2022 với sứ mệnh mang đến những sản phẩm mỹ phẩm chất lượng cao, an toàn và phù hợp cho người tiêu dùng Việt Nam. Chúng tôi hiểu rằng mỗi làn da đều có câu chuyện riêng, và hành trình làm đẹp không chỉ là việc làm đẹp bề ngoài, mà còn là cách để phụ nữ Việt tự tin tỏa sáng từ bên trong.
    </p>
    <p className="text-gray-600 mb-4">
        Chúng tôi cam kết chỉ cung cấp những sản phẩm đã được kiểm nghiệm nghiêm ngặt, đạt tiêu chuẩn chất lượng quốc tế và được thiết kế đặc biệt để phù hợp với làn da người Việt. Mỗi sản phẩm đều trải qua quy trình nghiên cứu kỹ lưỡng, từ việc lựa chọn nguyên liệu tự nhiên an toàn đến công nghệ sản xuất tiên tiến, đảm bảo hiệu quả tối ưu mà vẫn dịu nhẹ với làn da.
    </p>
    <p className="text-gray-600 mb-4">
        Với đội ngũ chuyên gia về da liễu và mỹ phẩm giàu kinh nghiệm, BeautyShop không chỉ là nơi cung cấp sản phẩm, mà còn là người bạn đồng hành đáng tin cậy. Chúng tôi luôn sẵn sàng lắng nghe, tư vấn và hỗ trợ bạn tìm ra những sản phẩm phù hợp nhất với nhu cầu cá nhân, từ chăm sóc da cơ bản đến các giải pháp chuyên sâu.
    </p>
    <p className="text-gray-600">
        Hơn thế nữa, BeautyShop không ngừng đổi mới để đáp ứng nhu cầu đa dạng của khách hàng, kết hợp xu hướng làm đẹp hiện đại với giá trị truyền thống của người Việt. Từ các sản phẩm dưỡng da dịu nhẹ, makeup tự nhiên đến giải pháp chăm sóc chuyên biệt, chúng tôi nỗ lực trở thành người bạn đồng hành không thể thiếu trong hành trình làm đẹp của bạn.
    </p>
</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-pink-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Giá trị cốt lõi</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">An toàn</h3>
                            <p className="text-gray-600">Chúng tôi đặt sự an toàn của khách hàng lên hàng đầu với các sản phẩm được kiểm nghiệm nghiêm ngặt.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Hiệu quả</h3>
                            <p className="text-gray-600">Sản phẩm của chúng tôi được nghiên cứu kỹ lưỡng để mang lại hiệu quả rõ rệt và bền vững.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Chất lượng</h3>
                            <p className="text-gray-600">Chúng tôi chỉ cung cấp những sản phẩm chất lượng cao từ các thương hiệu uy tín trong và ngoài nước.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Danh mục sản phẩm</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-pink-50 p-6 rounded-lg text-center hover:shadow-lg transition">
                            <img src="/api/placeholder/200/200" alt="Chăm sóc da" className="mx-auto mb-4 rounded-full" />
                            <h3 className="text-lg font-semibold text-gray-800">Chăm sóc da</h3>
                        </div>
                        <div className="bg-pink-50 p-6 rounded-lg text-center hover:shadow-lg transition">
                            <img src="/api/placeholder/200/200" alt="Trang điểm" className="mx-auto mb-4 rounded-full" />
                            <h3 className="text-lg font-semibold text-gray-800">Trang điểm</h3>
                        </div>
                        <div className="bg-pink-50 p-6 rounded-lg text-center hover:shadow-lg transition">
                            <img src="/api/placeholder/200/200" alt="Chăm sóc tóc" className="mx-auto mb-4 rounded-full" />
                            <h3 className="text-lg font-semibold text-gray-800">Chăm sóc tóc</h3>
                        </div>
                        <div className="bg-pink-50 p-6 rounded-lg text-center hover:shadow-lg transition">
                            <img src="/api/placeholder/200/200" alt="Nước hoa" className="mx-auto mb-4 rounded-full" />
                            <h3 className="text-lg font-semibold text-gray-800">Nước hoa</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-pink-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Khách hàng nói gì về chúng tôi</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center mb-4">
                                <img src="/api/placeholder/60/60" alt="Avatar" className="rounded-full w-12 h-12" />
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-800">Nguyễn Thị Hương</h4>
                                    <div className="flex text-yellow-400">
                                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"Sản phẩm chất lượng, giao hàng nhanh. Tôi đã trở thành khách hàng thân thiết của BeautyShop được 2 năm và chưa bao giờ thất vọng."</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center mb-4">
                                <img src="/api/placeholder/60/60" alt="Avatar" className="rounded-full w-12 h-12" />
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-800">Trần Minh Anh</h4>
                                    <div className="flex text-yellow-400">
                                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"Tôi rất hài lòng với dịch vụ tư vấn của BeautyShop. Nhân viên am hiểu và giúp tôi chọn được sản phẩm phù hợp với làn da nhạy cảm của mình."</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center mb-4">
                                <img src="/api/placeholder/60/60" alt="Avatar" className="rounded-full w-12 h-12" />
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-800">Phạm Thanh Mai</h4>
                                    <div className="flex text-yellow-400">
                                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"Bộ sản phẩm dưỡng da của BeautyShop đã giúp tôi cải thiện làn da rõ rệt sau 2 tháng sử dụng. Giá cả hợp lý và chất lượng tuyệt vời."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 bg-gradient-to-r from-pink-500 to-purple-500">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Khám phá bộ sưu tập mỹ phẩm cao cấp</h2>
                    <p className="text-white mb-8 max-w-2xl mx-auto">
                        Hãy để BeautyShop đồng hành cùng bạn trên hành trình chăm sóc và nâng niu làn da của mình với những sản phẩm an toàn, chất lượng.
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-white text-pink-600 font-semibold px-8 py-3 rounded-full hover:bg-pink-50 hover:text-pink-700 transition"
                    >
                        Mua sắm ngay
                    </a>
                </div>
            </section>
        </div>
    );
};

