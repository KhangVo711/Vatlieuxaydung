import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter, FaThreads, FaTiktok } from "react-icons/fa6";
import { PhoneIcon, EnvelopeIcon, MapIcon } from "@heroicons/react/24/solid"

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        
        <footer className="pt-8 pb-6 bg-pink-100">
            <hr className="my-6" />
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl font-semibold">Kết nối với chúng tôi!</h4>
                        <h5 className="text-sm text-justify mt-1 mb-4 opacity-80">
                        Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn. Hãy liên hệ ngay để được tư vấn, giải đáp thắc mắc hoặc chia sẻ những ý kiến quý báu. Cùng nhau, chúng ta sẽ tạo nên những trải nghiệm tuyệt vời!
                        </h5>
                        <div className=" text-gray-600 w-full md:w-5/6 lg:w-5/6 xl:w-5/6 mb-4">
                            <p className='mb-2.5'><PhoneIcon className="h-5 w-5 inline-block text-gray-600 mr-2" /><strong>Số điện thoại:</strong> 1900 1234 567</p>
                            <p className='mb-2.5'><EnvelopeIcon className="h-6 w-6 inline-block text-gray-600 mr-2" /><strong>Email:</strong> MyPhamHTCT@gmail.com</p>
                            {/* <p className='mb-2.5'><MapIcon className="h-6 w-6 inline-block text-gray-600 mr-2" /><strong>Địa chỉ:</strong> 789 Nguyễn Trãi, Ninh Kiều, Cần Thơ</p> */}
                        </div>
                        <div className="mt-3 lg:mb-0 mb-6 flex">
                            <button className="bg-white shadow-lg rounded-full h-10 w-10 flex items-center justify-center outline-none focus:outline-none mr-2" type="button">
                                <FaXTwitter />
                            </button>
                            <button className="bg-white shadow-lg rounded-full h-10 w-10 flex items-center justify-center outline-none focus:outline-none mr-2" type="button">
                                <FaFacebook className="text-blue-500" />
                            </button>
                            <button className="bg-white shadow-lg rounded-full h-10 w-10 flex items-center justify-center outline-none focus:outline-none mr-2" type="button">
                                <FaThreads />
                            </button>
                            <button className="bg-white shadow-lg rounded-full h-10 w-10 flex items-center justify-center outline-none focus:outline-none mr-2" type="button">
                                <FaTiktok />
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-8">
                        <div className="flex justify-between">
                            <div className="w-full lg:w-5/12">
                                <span className="block uppercase text-sm font-semibold mb-2 opacity-80">Liên kết</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="hover font-semibold block pb-2 text-sm" href="#">
                                            Thông tin về chúng tôi
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover font-semibold block pb-2 text-sm" href="#">
                                            Sản phẩm đang giảm
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover font-semibold block pb-2 text-sm" href="#">
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover font-semibold block pb-2 text-sm" href="#">
                                            Blog
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-5/12">
                                <span className="block uppercase text-sm font-semibold mb-2 opacity-80">Các liên kết khác</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="hover font-semibold block pb-2 text-sm" href="#">
                                            MIT License
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover font-semibold block pb-2 text-sm" href="#">
                                            Terms & Conditions
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover font-semibold block pb-2 text-sm" href="#">
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover font-semibold block pb-2 text-sm" href="#">
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6" />
                <div className="flex justify-center">
                    <div className="text-center text-sm font-semibold py-1">
                        Copyright © {currentYear} by{' '}
                        <a href="!#" className="hover:text-gray-600 transition duration-150 ease-in-out">
                            Huyen Tran
                        </a>
                        .
                    </div>
                </div>
            </div>
        </footer>
    );
};

