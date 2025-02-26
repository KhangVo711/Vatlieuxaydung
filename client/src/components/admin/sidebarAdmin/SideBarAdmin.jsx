import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Cookie from 'js-cookie';
import axios from 'axios'
import { Context } from '../../Context.jsx';
export default function SideBarAdmin() {
  const location = useLocation()
  const isLocation = /^\/admin\/.*/.test(location.pathname);

  const navigate = useNavigate();
  const logout = () => {
    if(isLocation){
      Cookie.remove('admin');
      navigate('/admin/login');
    }
    else{
      Cookie.remove('staff');
      navigate('/staff/login');
    }
  };

  const { loadStatus, setLoadStatus, isDataAdmin } = useContext(Context);
  const [dataOrder, setDataOrder] = useState([]);

      
  useEffect(() => {
    const fetchOrderData = () => {
        axios.get('http://localhost:5001/getOrder')
            .then((response) => {
                setDataOrder(response.data.order);
                setLoadStatus(false);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    };

    fetchOrderData();

    // Đặt interval để gọi lại API
    const interval = setInterval(fetchOrderData, 3000); 

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
}, []);

  return (
    <div
      className="w-1/2 md:w-1/3 lg:w-1/5 fixed md:top-0 md:left-0 h-screen lg:block bg-gray-100 z-30"
      id="main-nav"
    >
      <div className="w-full h-16 border-b flex px-4 items-center mb-8">
        <p className="font-semibold text-3xl text-blue-400 pl-4">LOGO</p>
      </div>

      <div className="mb-4 px-4">
        <p className="pl-4 text-sm font-semibold uppercase mb-1">Trang chủ</p>
        <Link to="dashboard" className={`w-full flex items-center text-blue-400 h-10 pl-4 ${location.pathname === '/admin/dashboard' || location.pathname === '/staff/dashboard' ? 'bg-gray-200' : ''}  hover:bg-gray-200 rounded-lg cursor-pointer`}>
        <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#60a5fa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Dashboard</title> <g id="Dashboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <rect id="Container" x="0" y="0" width="24" height="24"> </rect> <rect id="shape-1" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" x="4" y="4" width="16" height="16" rx="2"> </rect> <line x1="4" y1="9" x2="20" y2="9" id="shape-2" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"> </line> <line x1="9" y1="10" x2="9" y2="20" id="shape-3" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"> </line> </g> </g></svg>
          <span className="text-gray-700">Bảng điều khiển</span>
        </Link>
{isDataAdmin &&  isLocation ? (
        <Link to="addstaff" className={`w-full flex items-center text-blue-400 h-10 pl-4 ${location.pathname === '/admin/addstaff' || location.pathname === '/staff/addstaff' ? 'bg-gray-200' : ''} hover:bg-gray-200 rounded-lg cursor-pointer`}>
          <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          <span className="text-gray-700">Nhân viên</span>
        </Link>
):(null)}
        <Link to="viewUsers" className={`w-full flex items-center text-blue-400 h-10 pl-4 ${location.pathname === '/admin/viewUsers' || location.pathname === '/staff/viewUsers' ? 'bg-gray-200' : ''} hover:bg-gray-200 rounded-lg cursor-pointer`}>
        <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#60a5fa"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          <span className="text-gray-700">Khách hàng</span>
        </Link>
        <Link to="importgoods" className={`w-full flex items-center text-blue-400 h-10 pl-4 ${location.pathname === '/admin/importgoods' || location.pathname === '/staff/importgoods' ? 'bg-gray-200' : ''} hover:bg-gray-200 rounded-lg cursor-pointer`}>
          <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.4 19.62H6.39999C5.40543 19.62 4.4516 19.2249 3.74834 18.5216C3.04508 17.8184 2.64999 16.8646 2.64999 15.87V13.37C2.64999 13.1711 2.72901 12.9803 2.86966 12.8397C3.01032 12.699 3.20108 12.62 3.39999 12.62C3.59891 12.62 3.78967 12.699 3.93032 12.8397C4.07098 12.9803 4.14999 13.1711 4.14999 13.37V15.87C4.14999 16.4667 4.38705 17.039 4.809 17.461C5.23096 17.8829 5.80326 18.12 6.39999 18.12H16.4C16.9967 18.12 17.569 17.8829 17.991 17.461C18.4129 17.039 18.65 16.4667 18.65 15.87V13.37C18.65 13.1711 18.729 12.9803 18.8697 12.8397C19.0103 12.699 19.2011 12.62 19.4 12.62C19.5989 12.62 19.7897 12.699 19.9303 12.8397C20.071 12.9803 20.15 13.1711 20.15 13.37V15.87C20.15 16.8646 19.7549 17.8184 19.0516 18.5216C18.3484 19.2249 17.3946 19.62 16.4 19.62Z" fill="#60a5fa"></path> <path d="M11.4 14.88C11.2011 14.88 11.0103 14.801 10.8697 14.6603C10.729 14.5197 10.65 14.3289 10.65 14.13V5.13C10.65 4.93109 10.729 4.74033 10.8697 4.59967C11.0103 4.45902 11.2011 4.38 11.4 4.38C11.5989 4.38 11.7897 4.45902 11.9303 4.59967C12.071 4.74033 12.15 4.93109 12.15 5.13V14.13C12.1474 14.3281 12.0676 14.5174 11.9275 14.6575C11.7874 14.7976 11.5981 14.8774 11.4 14.88Z" fill="#60a5fa"></path> <path d="M11.4 16.12C11.3014 16.121 11.2036 16.1021 11.1125 16.0643C11.0214 16.0265 10.9389 15.9706 10.87 15.9L6.63 11.66C6.55925 11.5911 6.50301 11.5086 6.46461 11.4176C6.42621 11.3266 6.40643 11.2288 6.40643 11.13C6.40643 11.0312 6.42621 10.9334 6.46461 10.8424C6.50301 10.7514 6.55925 10.669 6.63 10.6C6.77063 10.4596 6.96125 10.3807 7.16 10.3807C7.35875 10.3807 7.54938 10.4596 7.69 10.6L11.4 14.31L15.11 10.6C15.1787 10.5263 15.2615 10.4672 15.3535 10.4262C15.4455 10.3852 15.5448 10.3632 15.6455 10.3614C15.7462 10.3596 15.8462 10.3782 15.9396 10.4159C16.033 10.4536 16.1178 10.5097 16.189 10.581C16.2603 10.6522 16.3164 10.737 16.3541 10.8304C16.3918 10.9238 16.4104 11.0238 16.4086 11.1245C16.4068 11.2252 16.3848 11.3245 16.3438 11.4165C16.3028 11.5085 16.2437 11.5913 16.17 11.66L11.93 15.9C11.8608 15.9701 11.7782 16.0257 11.6872 16.0635C11.5962 16.1013 11.4985 16.1205 11.4 16.12Z" fill="#60a5fa"></path> </g></svg>
          <span className="text-gray-700">Nhập kho</span>
        </Link>
        <div className="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <svg fill="#60a5fa" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-51.2 -51.2 614.40 614.40" xml:space="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M255.999,0.306L0,150.668v361.026h65.909h30.417h319.347h30.417H512V150.668L255.999,0.306z M415.674,481.277 L415.674,481.277H96.326v-20.272h319.347V481.277z M415.674,430.587H96.326v-20.272h319.347V430.587z M415.674,379.897H96.326 v-20.272h319.347V379.897z M415.674,329.208H96.326v-20.272h319.347V329.208z M415.674,278.518H96.326v-20.273h319.347V278.518z M415.674,227.828L415.674,227.828H96.326v-20.272h319.347V227.828z M446.091,481.277v-20.272v-30.417v-20.272v-30.417v-20.272 v-30.417v-20.272v-30.417v-20.273v-30.417V177.14H65.909v50.689v30.417v20.273v30.417v20.272v30.417v20.272v30.417v20.272v30.417 v20.272H30.417V168.078L255.999,35.582l225.582,132.496v313.198H446.091z"></path> </g> </g> </g></svg>
          <span className="text-gray-700">Kho hàng</span>
        </div>
        <div className="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
          <svg fill="#60a5fa" width="30px" height="30px" viewBox="-102.4 -102.4 1228.80 1228.80" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#60a5fa" strokeWidth="10.24"></g><g id="SVGRepo_iconCarrier"><path d="M266.815 537.708c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.775 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zM266.815 679.347c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.775 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zM266.815 820.988c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.775 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zM228.18 81.918v153.6c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48v-153.6c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm528.09 0v153.6c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48v-153.6c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48z"></path><path d="M890.877 137.517c33.931 0 61.44 27.509 61.44 61.44v703.375c0 33.931-27.509 61.44-61.44 61.44h-757.76c-33.931 0-61.44-27.509-61.44-61.44V198.957c0-33.931 27.509-61.44 61.44-61.44h757.76zm-757.76 40.96c-11.309 0-20.48 9.171-20.48 20.48v703.375c0 11.309 9.171 20.48 20.48 20.48h757.76c11.309 0 20.48-9.171 20.48-20.48V198.957c0-11.309-9.171-20.48-20.48-20.48h-757.76z"></path><path d="M575.03 338.288c0-33.93-27.51-61.44-61.44-61.44s-61.44 27.51-61.44 61.44c0 33.93 27.51 61.44 61.44 61.44s61.44-27.51 61.44-61.44zm40.96 0c0 56.551-45.849 102.4-102.4 102.4s-102.4-45.849-102.4-102.4c0-56.551 45.849-102.4 102.4-102.4s102.4 45.849 102.4 102.4z"></path></g></svg>
          <span className="text-gray-700">Lịch</span>
        </div>
        {isDataAdmin &&  isLocation ? (
        <div className="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
          <svg fill="#60a5fa" version="1.1" id="Capa_1" width="30px" height="30px" viewBox="-38.87 -38.87 466.43 466.43" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M368.305,237.449c8.605-10.172,20.387-24.102,20.387-43.104s-11.781-32.933-20.389-43.106 c-2.74-3.239-7.326-8.661-8.104-10.782c-0.773-2.382-0.244-9.954,0.07-14.485c0.91-13.07,2.156-30.971-8.701-45.887 c-10.932-15.019-28.424-19.355-41.201-22.523c-4.33-1.074-11.578-2.871-13.523-4.265c-1.877-1.422-5.732-7.641-8.037-11.357 c-6.98-11.256-16.541-26.673-34.396-32.471c-4.424-1.437-9.129-2.165-13.986-2.165c-11.947,0-22.558,4.285-31.92,8.067 c-4.563,1.843-11.462,4.628-14.157,4.628c-2.697,0-9.595-2.786-14.159-4.63c-9.362-3.78-19.973-8.065-31.918-8.065 c-4.857,0-9.563,0.728-13.984,2.164c-17.857,5.798-27.419,21.215-34.4,32.473c-2.305,3.716-6.161,9.935-8.03,11.352 c-1.95,1.398-9.199,3.195-13.536,4.271c-12.771,3.166-30.264,7.502-41.194,22.521c-10.86,14.922-9.612,32.825-8.701,45.896 c0.315,4.525,0.843,12.099,0.08,14.45c-0.785,2.148-5.372,7.57-8.115,10.813C11.784,161.413,0,175.343,0,194.345 s11.783,32.932,20.388,43.105c2.741,3.24,7.328,8.662,8.104,10.783c0.773,2.381,0.246,9.953-0.069,14.479 c-0.911,13.07-2.159,30.974,8.701,45.895c10.931,15.019,28.423,19.354,41.201,22.522c4.33,1.073,11.579,2.871,13.523,4.265 c1.875,1.421,5.731,7.641,8.037,11.357c6.98,11.257,16.541,26.674,34.399,32.472c4.423,1.437,9.128,2.164,13.984,2.164 c11.945,0,22.556-4.285,31.918-8.065c4.564-1.844,11.463-4.63,14.159-4.63c2.697,0,9.594,2.786,14.159,4.63 c9.362,3.78,19.973,8.065,31.918,8.065c4.857,0,9.562-0.728,13.984-2.164c17.857-5.798,27.418-21.214,34.4-32.473 c2.303-3.716,6.16-9.936,8.029-11.353c1.953-1.399,9.203-3.195,13.541-4.271c12.77-3.166,30.26-7.502,41.189-22.521 c10.859-14.922,9.611-32.824,8.701-45.896c-0.314-4.525-0.844-12.1-0.08-14.45C360.975,246.113,365.562,240.691,368.305,237.449z M345.4,218.076c-5.545,6.553-11.277,13.33-13.732,20.892c-2.572,7.919-1.939,17.022-1.324,25.828 c0.688,9.868,1.398,20.071-3.029,26.157c-4.5,6.183-14.492,8.66-24.156,11.056c-8.516,2.11-17.32,4.292-23.971,9.132 c-6.555,4.77-11.293,12.41-15.875,19.801c-5.287,8.524-10.754,17.34-18.168,19.747c-1.426,0.463-3.014,0.698-4.721,0.698 c-6.117,0-13.191-2.857-20.683-5.882c-8.292-3.351-16.866-6.813-25.395-6.813c-8.525,0-17.101,3.463-25.394,6.813 c-7.491,3.024-14.566,5.883-20.684,5.883c-1.706,0-3.295-0.235-4.721-0.698c-7.413-2.407-12.881-11.224-18.169-19.75 c-4.582-7.388-9.319-15.027-15.872-19.796c-6.647-4.839-15.451-7.021-23.971-9.133c-9.664-2.396-19.657-4.873-24.157-11.058 c-4.429-6.082-3.718-16.285-3.029-26.153c0.613-8.806,1.247-17.909-1.325-25.831c-2.456-7.561-8.188-14.336-13.733-20.893 C36.757,210.35,30,202.363,30,194.346c0-8.016,6.757-16.004,13.292-23.73c5.545-6.553,11.277-13.33,13.733-20.892 c2.571-7.919,1.938-17.023,1.324-25.828c-0.688-9.868-1.399-20.072,3.029-26.157c4.5-6.184,14.493-8.661,24.164-11.058 c8.513-2.111,17.316-4.293,23.963-9.131c6.554-4.769,11.291-12.409,15.874-19.798c5.287-8.526,10.755-17.342,18.169-19.75 c1.426-0.463,3.014-0.698,4.72-0.698c6.117,0,13.192,2.857,20.683,5.882c8.292,3.35,16.866,6.813,25.395,6.813 c8.523,0,17.098-3.462,25.394-6.813c7.49-3.025,14.566-5.883,20.684-5.883c1.707,0,3.295,0.235,4.721,0.698 c7.414,2.407,12.881,11.224,18.168,19.749c4.582,7.389,9.32,15.029,15.873,19.798c6.648,4.839,15.451,7.021,23.971,9.133 c9.664,2.396,19.658,4.873,24.158,11.057c4.426,6.081,3.717,16.283,3.029,26.152c-0.615,8.804-1.25,17.908,1.324,25.833 c2.455,7.562,8.188,14.338,13.732,20.892c6.533,7.726,13.291,15.714,13.291,23.73C358.691,202.361,351.936,210.349,345.4,218.076z "></path> <polygon points="167.993,208.912 177.984,208.912 172.988,175.535 "></polygon> <path d="M194.346,79.345c-63.513,0-115,51.487-115,115c0,63.514,51.487,115,115,115s115-51.486,115-115 C309.346,130.832,257.859,79.345,194.346,79.345z M128.177,237.291c-13.142,0-20.375-7.729-20.375-21.77v-2.418 c0-2.142,1.74-3.877,3.878-3.877h6.93c2.141,0,3.879,1.735,3.879,3.877v3.232c0,5.833,2.697,6.619,5.34,6.619 c2.637,0,5.34-0.786,5.34-6.619c0-7.121-5.131-11.811-10.553-16.777c-6.781-6.203-14.465-13.231-14.465-26.388 c0-14.04,7.155-21.771,20.14-21.771c12.833,0,19.972,7.548,20.143,21.269c0.02,0.157,0.028,0.316,0.028,0.475 c0,2.145-1.739,3.881-3.877,3.881c-0.005,0-0.022,0.001-0.028,0h-6.929c-2.145,0-3.883-1.736-3.883-3.881v-0.786 c0-5.936-2.573-6.736-5.101-6.736c-2.528,0-5.106,0.8-5.106,6.736c0,7.124,5.124,11.81,10.55,16.776 c6.779,6.206,14.463,13.231,14.463,26.389C148.55,229.561,141.319,237.291,128.177,237.291z M197.428,235.898 c-0.754,0.883-1.856,1.393-3.017,1.393h-7.825c-1.963,0-3.63-1.438-3.922-3.379l-1.755-11.726h-13.774l-1.758,11.726 c-0.287,1.941-1.955,3.379-3.92,3.379h-6.633c-1.161,0-2.265-0.51-3.016-1.393c-0.756-0.883-1.082-2.053-0.897-3.199l12.472-77.96 c0.308-1.922,1.967-3.338,3.912-3.338h14.642c1.947,0,3.604,1.416,3.913,3.338l12.473,77.96 C198.51,233.845,198.178,235.015,197.428,235.898z M239.504,233.326c0,2.188-1.775,3.965-3.964,3.965h-29.323 c-2.188,0-3.963-1.776-3.963-3.965v-77.959c0-2.189,1.774-3.965,3.963-3.965h7.797c2.19,0,3.967,1.776,3.967,3.965v67.389h17.561 c2.188,0,3.965,1.775,3.965,3.964v6.606H239.504z M280.891,155.366v6.606c0,2.189-1.775,3.964-3.967,3.964h-18.631v20.547h13.994 c2.189,0,3.963,1.775,3.963,3.965v6.607c0,2.188-1.773,3.964-3.963,3.964h-13.994v21.736h18.631c2.191,0,3.967,1.775,3.967,3.964 v6.606c0,2.188-1.775,3.965-3.967,3.965h-30.391c-2.189,0-3.964-1.776-3.964-3.965v-77.959c0-2.189,1.772-3.965,3.964-3.965 h30.391C279.115,151.4,280.891,153.177,280.891,155.366z"></path> </g> </g> </g></svg>
          <span className="text-gray-700">Khuyến mãi</span>
        </div>
        ):(null)}
        

        <Link to='ordercart' className={`w-full flex items-center text-blue-400 ${location.pathname === '/admin/ordercart' || location.pathname === '/staff/ordercart' ? 'bg-gray-200' : ''} h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer`}>
        <svg version="1.1" id="Uploaded to svgrepo.com" width="32px" height="32px" viewBox="-3.2 -3.2 38.40 38.40"  fill="#60a5fa" stroke="#60a5fa" strokeWidth="0.00032"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
        <path d="M23,8H9l-4,6v14h22V14L23,8z M23.93,13H17v-3h4.93L23.93,13z M10.07,10H15v3H8.07L10.07,10z M7,26V15h18v11H7z M9,17h8v2H9V17z M9,20h8v2H9V20z"></path> </g></svg>
          <div className="flex w-full items-center justify-between pr-4">
          <span className="text-gray-700">Đơn hàng</span>
          <span className={`${dataOrder.length > 0 ? 'bg-red-500' : 'bg-transparent'} text-white rounded-full text-xs w-5 h-5 flex items-center justify-center`}>
            {dataOrder.length > 0 && dataOrder.filter((item) => item.trangthai === 'Chờ xác nhận').length}
                </span>
          </div>
        </Link>
        
        <div className="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <svg width="30px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#60a5fa"></path></g></svg>
          <span className="text-gray-700">Phản hồi</span>
        </div>
        <Link to='delivery' className={`w-full flex items-center text-blue-400 h-10 pl-4 ${location.pathname === '/admin/delivery' || location.pathname === '/staff/delivery' ? 'bg-gray-200' : ''} hover:bg-gray-200 rounded-lg cursor-pointer`}>
        <svg fill="#60a5fa" width="30px" height="30px" viewBox="-5 -5 60.00 60.00"><g id="SVGRepo_bgCarrier" strokeWidth="1"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11 11C4.9375 11 0 15.9375 0 22C0 24.347656 0.746094 26.519531 2 28.308594L2 42.003906C2 43.664063 3.339844 45 5 45L7.09375 45C7.570313 47.828125 10.039063 50 13 50C15.960938 50 18.429688 47.828125 18.90625 45L28.15625 45C28.898438 45 29.574219 44.699219 30.082031 44.226563C30.59375 44.679688 31.246094 44.992188 31.992188 45L33.09375 45C33.570313 47.828125 36.039063 50 39 50C42.300781 50 45 47.300781 45 44C45 40.699219 42.300781 38 39 38C36.039063 38 33.570313 40.171875 33.09375 43L32.007813 43C31.820313 43 31.539063 42.882813 31.328125 42.671875C31.113281 42.457031 31 42.183594 31 42L31 23C31 22.625 31.625 22 32 22L40 22C40.792969 22 41.921875 22.867188 42.6875 23.785156L42.84375 24L38 24C36.40625 24 35 25.289063 35 27L35 31C35 31.832031 35.386719 32.550781 35.917969 33.082031C36.449219 33.613281 37.167969 34 38 34L48 34L48 42C48 42.375 47.375 43 47 43L45 43L45 45L47 45C48.660156 45 50 43.660156 50 42L50 32.386719C50 30.097656 48.402344 28.074219 48.402344 28.074219L48.390625 28.0625L44.246094 22.535156L44.230469 22.515625C43.308594 21.402344 41.914063 20 40 20L32 20C31.644531 20 31.3125 20.070313 31 20.183594L31 17.90625C31 16.371094 29.789063 15 28.1875 15L19.480469 15C17.457031 12.558594 14.40625 11 11 11 Z M 11 13C15.980469 13 20 17.019531 20 22C20 26.980469 15.980469 31 11 31C6.019531 31 2 26.980469 2 22C2 17.019531 6.019531 13 11 13 Z M 10.984375 13.984375C10.433594 13.996094 9.992188 14.449219 10 15L10 20.78125C9.632813 21.082031 9.421875 21.527344 9.421875 22C9.421875 22.050781 9.425781 22.101563 9.429688 22.15625L7.292969 24.292969C7.03125 24.542969 6.925781 24.917969 7.019531 25.265625C7.109375 25.617188 7.382813 25.890625 7.734375 25.980469C8.082031 26.074219 8.457031 25.96875 8.707031 25.707031L10.84375 23.570313C10.894531 23.574219 10.949219 23.578125 11 23.578125C11.871094 23.578125 12.578125 22.871094 12.578125 22C12.578125 21.527344 12.367188 21.082031 12 20.78125L12 15C12.003906 14.730469 11.898438 14.46875 11.707031 14.277344C11.515625 14.085938 11.253906 13.980469 10.984375 13.984375 Z M 20.785156 17L28.1875 17C28.617188 17 29 17.414063 29 17.90625L29 22.980469C29 22.988281 29 22.992188 29 23L29 42C29 42.007813 29 42.011719 29 42.015625L29 42.15625C29 42.628906 28.628906 43 28.15625 43L18.90625 43C18.429688 40.171875 15.960938 38 13 38C10.039063 38 7.570313 40.171875 7.09375 43L5 43C4.625 43 4 42.375 4 42.003906L4 30.472656C5.902344 32.050781 8.34375 33 11 33C17.0625 33 22 28.0625 22 22C22 20.199219 21.558594 18.5 20.785156 17 Z M 38 26L44.34375 26L46.773438 29.238281C46.777344 29.246094 47.691406 30.804688 47.882813 32L38 32C37.832031 32 37.550781 31.886719 37.332031 31.667969C37.113281 31.449219 37 31.167969 37 31L37 27C37 26.496094 37.59375 26 38 26 Z M 13 40C15.222656 40 17 41.777344 17 44C17 46.222656 15.222656 48 13 48C10.777344 48 9 46.222656 9 44C9 41.777344 10.777344 40 13 40 Z M 39 40C41.222656 40 43 41.777344 43 44C43 46.222656 41.222656 48 39 48C36.777344 48 35 46.222656 35 44C35 41.777344 36.777344 40 39 40Z"></path></g></svg>
          <span className="text-gray-700">Vận chuyển</span>
        </Link>
        
      </div>

      <div className="mb-4 px-4">
        <p className="pl-4 text-sm font-semibold uppercase mb-1">Sản phẩm</p>
        <Link to="addcategory" className={`w-full flex items-center text-blue-400 ${location.pathname === '/admin/addcategory' || location.pathname === '/staff/addcategory' ? 'bg-gray-200' : ''} h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer`}>
        <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="9" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle> </g></svg>

          <span className="text-gray-700">Loại</span>
        </Link>
        <Link to="addproducer" className={`w-full flex items-center text-blue-400 h-10 pl-4 ${location.pathname === '/admin/addproducer' || location.pathname === '/staff/addproducer' ? 'bg-gray-200' : ''} hover:bg-gray-200 rounded-lg cursor-pointer`}>
        <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="9" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle> </g></svg>

          <span className="text-gray-700">Nhà sản xuất</span>
        </Link>
        <Link to="addproduct" className={`w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 ${location.pathname === '/admin/addproduct' || location.pathname === '/staff/addproduct' ? 'bg-gray-200' : ''} rounded-lg cursor-pointer`}>
        <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="9" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle> </g></svg>
          <span className="text-gray-700">Sản phẩm</span>
        </Link>

      </div>

      <div className="mb-4 px-4">
        <p className="pl-4 text-sm font-semibold uppercase mb-1">Khác</p>
        {isDataAdmin &&  isLocation ? (
        <div className="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
          <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.8613 3.36335C11.3679 2.45445 11.6213 2 12 2C12.3787 2 12.6321 2.45445 13.1387 3.36335L13.2698 3.59849C13.4138 3.85677 13.4858 3.98591 13.598 4.07112C13.7103 4.15633 13.8501 4.18796 14.1296 4.25122L14.3842 4.30881C15.3681 4.53142 15.86 4.64273 15.977 5.01909C16.0941 5.39546 15.7587 5.78763 15.088 6.57197L14.9144 6.77489C14.7238 6.99777 14.6285 7.10922 14.5857 7.24709C14.5428 7.38496 14.5572 7.53364 14.586 7.83102L14.6122 8.10176C14.7136 9.14824 14.7644 9.67148 14.4579 9.90409C14.1515 10.1367 13.6909 9.92462 12.7697 9.50047L12.5314 9.39073C12.2696 9.2702 12.1387 9.20994 12 9.20994C11.8613 9.20994 11.7304 9.2702 11.4686 9.39073L11.2303 9.50047C10.3091 9.92462 9.84847 10.1367 9.54206 9.90409C9.23565 9.67148 9.28635 9.14824 9.38776 8.10176L9.41399 7.83102C9.44281 7.53364 9.45722 7.38496 9.41435 7.24709C9.37147 7.10922 9.27617 6.99777 9.08557 6.77489L8.91204 6.57197C8.2413 5.78763 7.90593 5.39546 8.02297 5.01909C8.14001 4.64273 8.63194 4.53142 9.61581 4.30881L9.87035 4.25122C10.1499 4.18796 10.2897 4.15633 10.402 4.07112C10.5142 3.98591 10.5862 3.85677 10.7302 3.59849L10.8613 3.36335Z" stroke="#60a5fa" stroke-width="1.5"></path> <path d="M19.4306 7.68168C19.684 7.22723 19.8106 7 20 7C20.1894 7 20.316 7.22722 20.5694 7.68167L20.6349 7.79925C20.7069 7.92839 20.7429 7.99296 20.799 8.03556C20.8551 8.07817 20.925 8.09398 21.0648 8.12561L21.1921 8.15441C21.684 8.26571 21.93 8.32136 21.9885 8.50955C22.047 8.69773 21.8794 8.89381 21.544 9.28598L21.4572 9.38744C21.3619 9.49889 21.3143 9.55461 21.2928 9.62354C21.2714 9.69248 21.2786 9.76682 21.293 9.91551L21.3061 10.0509C21.3568 10.5741 21.3822 10.8357 21.229 10.952C21.0758 11.0683 20.8455 10.9623 20.3849 10.7502L20.2657 10.6954C20.1348 10.6351 20.0694 10.605 20 10.605C19.9306 10.605 19.8652 10.6351 19.7343 10.6954L19.6151 10.7502C19.1545 10.9623 18.9242 11.0683 18.771 10.952C18.6178 10.8357 18.6432 10.5741 18.6939 10.0509L18.707 9.91551C18.7214 9.76682 18.7286 9.69248 18.7072 9.62354C18.6857 9.55461 18.6381 9.49889 18.5428 9.38744L18.456 9.28599C18.1206 8.89381 17.953 8.69773 18.0115 8.50955C18.07 8.32136 18.316 8.26571 18.8079 8.15441L18.9352 8.12561C19.075 8.09398 19.1449 8.07817 19.201 8.03556C19.2571 7.99296 19.2931 7.92839 19.3651 7.79925L19.4306 7.68168Z" stroke="#60a5fa" stroke-width="1.5"></path> <path d="M3.43063 7.68168C3.68396 7.22723 3.81063 7 4 7C4.18937 7 4.31604 7.22722 4.56937 7.68167L4.63491 7.79925C4.7069 7.92839 4.74289 7.99296 4.79901 8.03556C4.85513 8.07817 4.92503 8.09398 5.06482 8.12561L5.19209 8.15441C5.68403 8.26571 5.93 8.32136 5.98852 8.50955C6.04704 8.69773 5.87935 8.89381 5.54398 9.28598L5.45722 9.38744C5.36191 9.49889 5.31426 9.55461 5.29283 9.62354C5.27139 9.69248 5.27859 9.76682 5.293 9.91551L5.30612 10.0509C5.35682 10.5741 5.38218 10.8357 5.22897 10.952C5.07576 11.0683 4.84547 10.9623 4.38487 10.7502L4.2657 10.6954C4.13481 10.6351 4.06937 10.605 4 10.605C3.93063 10.605 3.86519 10.6351 3.7343 10.6954L3.61513 10.7502C3.15454 10.9623 2.92424 11.0683 2.77103 10.952C2.61782 10.8357 2.64318 10.5741 2.69388 10.0509L2.707 9.91551C2.72141 9.76682 2.72861 9.69248 2.70717 9.62354C2.68574 9.55461 2.63809 9.49889 2.54278 9.38744L2.45602 9.28599C2.12065 8.89381 1.95296 8.69773 2.01148 8.50955C2.07 8.32136 2.31597 8.26571 2.80791 8.15441L2.93518 8.12561C3.07497 8.09398 3.14487 8.07817 3.20099 8.03556C3.25711 7.99296 3.29311 7.92839 3.36509 7.79925L3.43063 7.68168Z" stroke="#60a5fa" stroke-width="1.5"></path> <path d="M4 21.3884H6.25993C7.27079 21.3884 8.29253 21.4937 9.27633 21.6964C11.0166 22.0549 12.8488 22.0983 14.6069 21.8138M13.6764 18.5172C13.7962 18.5033 13.911 18.4874 14.0206 18.4699C14.932 18.3245 15.697 17.8375 16.3974 17.3084L18.2046 15.9433C18.8417 15.462 19.7873 15.4619 20.4245 15.943C20.9982 16.3762 21.1736 17.0894 20.8109 17.6707C20.388 18.3487 19.7921 19.216 19.2199 19.7459M13.6764 18.5172C13.6403 18.5214 13.6038 18.5254 13.5668 18.5292M13.6764 18.5172C13.8222 18.486 13.9669 18.396 14.1028 18.2775C14.746 17.7161 14.7866 16.77 14.2285 16.1431C14.0991 15.9977 13.9475 15.8764 13.7791 15.7759C10.9817 14.1074 6.62942 15.3782 4 17.2429M13.6764 18.5172C13.6399 18.525 13.6033 18.5292 13.5668 18.5292M13.5668 18.5292C13.0434 18.5829 12.4312 18.5968 11.7518 18.5326" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
          <span className="text-gray-700">Chấm công</span>
        </div>
        ):(null)}
        <div className="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <svg width="30px" height="30px" viewBox="-102.4 -102.4 1228.80 1228.80" xmlns="http://www.w3.org/2000/svg" fill="#60a5fa"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#60a5fa" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"></path></g></svg>
          <span className="text-gray-700 ml-0.5">Cài đặt</span>
        </div>
        <div onClick={logout} className="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8.25 5.25L9 4.5H18L18.75 5.25V18.75L18 19.5H9L8.25 18.75V16.5H9.75V18H17.25V6H9.75V7.5H8.25V5.25Z" fill="#60a5fa"></path> <path fillRule="evenodd" clipRule="evenodd" d="M7.06068 12.7499L14.25 12.7499L14.25 11.2499L7.06068 11.2499L8.78035 9.53027L7.71969 8.46961L4.18936 11.9999L7.71969 15.5303L8.78035 14.4696L7.06068 12.7499Z" fill="#60a5fa"></path> </g></svg>
<span className="text-gray-700 ml-0.5">Đăng xuất</span>
        </div>
      </div>
    </div>
  );
}
