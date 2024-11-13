import { useState } from 'react';

export default function HeaderAdmin() {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  return (
    <div className="sticky top-0 z-40 w-full">
      <div className="w-full h-16 px-3 bg-gray-100 border-b flex items-center justify-between">
        
        {/* Left navbar */}
        <div className="flex">
          {/* Mobile hamburger */}
          {/* <div className=" lg:hidden flex items-center mr-4">
            <button className="hover:text-blue-500 focus:outline-none" onClick={toggleDropdown}>
              <svg className="h-5 w-5" style={{ fill: 'black' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div> */}

          {/* Search bar */}
          <div className="relative text-gray-600">
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="bg-white h-10 w-full lg:w-96 xl:w-[500px] px-5 rounded-xl border text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right navbar */}
        <div className="flex items-center relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="fill-current mr-3 hover:text-blue-500"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>   
            <img onClick={toggleDropdown} src="https://cdn.pixabay.com/photo/2024/10/15/02/12/cat-9121108_640.jpg" alt="ATV" className="w-12 h-12 rounded-full shadow-lg cursor-pointer ml-4" />
        </div>

      </div>

      {/* Dropdown menu */}
      {dropDownOpen && (
        <div className="absolute bg-gray-50 border border-t-1 shadow-xl top-14 text-gray-700 rounded-b-lg w-48 h-[120px] bottom-10 right-0 mr-6">
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">
            Tài khoản
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">
            Cài đặt
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">
            Đăng suất
          </a>
        </div>
      )}
    </div>
  );
}
