import { useEffect, useState, useContext  } from 'react';
import { formatCurrency } from '../../../utils/currency.jsx';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Context } from '../../Context.jsx';
import { useLocation } from 'react-router-dom';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const location = useLocation()
  const isLocation = /^\/admin\/.*/.test(location.pathname);

  const [orders, setOrders] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [greeting, setGreeting] = useState('')
  const { isDataStaff } = useContext(Context);
  const updateGreeting = () => {
    // Lấy thời gian hiện tại tại Việt Nam (múi giờ Asia/Ho_Chi_Minh)
    const now = new Date();
    const vietnamTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const hour = vietnamTime.getHours();
    const minutes = vietnamTime.getMinutes().toString().padStart(2, '0');

    let greetingText = '';
  if (hour >= 0 && hour < 12) {
    greetingText = 'Chào buổi sáng';
  } else if (hour >= 12 && hour < 18) {
    greetingText = 'Chào buổi chiều';
  } else {
    greetingText = 'Chào buổi tối';
  }

  setGreeting(`${greetingText}, ${isDataStaff && isDataStaff.tennv && !isLocation ? isDataStaff.tennv : 'Admin'}! Bây giờ là ${hour}:${minutes}`);
  }
  const fetchTotalReviews = async () => {
    try {
      const response = await fetch('http://localhost:5001/getTotalReviews');
      const data = await response.json();
      setTotalReviews(data.total);
    } catch (error) {
      console.error('Error fetching total reviews:', error);
    }
  };

  const fetchTotalProductsSold = async () => {
    try {
      const response = await fetch('http://localhost:5001/getTotalProductsSold');
      const data = await response.json();
      setTotalProductsSold(data.total);
    } catch (error) {
      console.error('Error fetching total products sold:', error);
    }
  };
  const fetchRecentTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5001/getReTract');
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchDailyProductSales = async () => {
    try {
      const response = await fetch('http://localhost:5001/getDailyProductSales');
      const data = await response.json();
      setProductSales(data.sales);
    } catch (error) {
      console.error('Error fetching daily product sales:', error);
    }
  };

  const fetchDailyRevenue = async () => {
    try {
      const response = await fetch('http://localhost:5001/getDailyRevenue');
      const data = await response.json();
      setRevenue(data.revenue);
    } catch (error) {
      console.error('Error fetching daily revenue:', error);
    }
  };

  useEffect(() => {
    fetchRecentTransactions();
    fetchTotalProductsSold();
    fetchTotalReviews();
    updateGreeting();

    const greetingIntervalId = setInterval(updateGreeting, 60 * 1000);
    const intervalId = setInterval(() => {
      fetchRecentTransactions();
      fetchTotalProductsSold();
      fetchTotalReviews();
    }, 10000);
    

    return () => {
      clearInterval(intervalId);
      clearInterval(greetingIntervalId); 
    };
  }, []);
  useEffect(() => {
    fetchDailyProductSales();
    fetchDailyRevenue();

    const intervalId = setInterval(() => {
      fetchDailyProductSales();
      fetchDailyRevenue();
    }, 12 * 60 * 60 * 1000); // 12 tiếng 

    return () => clearInterval(intervalId);
}, []);
  

  const getColor = (amount) => {
    return amount > 2000000 ? 'red' : 'green';
  };

  useEffect(() => {
    const buyersChartElement = document.getElementById('buyers-chart');
    const reviewsChartElement = document.getElementById('reviews-chart');
    let buyersChartInstance, reviewsChartInstance;

    if (buyersChartElement && productSales.length > 0) {
      if (buyersChartInstance) {
        buyersChartInstance.destroy();
      }
      buyersChartInstance = new Chart(buyersChartElement, {
        type: 'line',
        data: {
          labels: productSales.map(item => item.day_of_week),
          datasets: [
            {
              backgroundColor: 'rgba(219, 39, 119, 0.2)',
              borderColor: '#f472b6',
              data: productSales.map(item => item.total_products_sold),
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#f472b6',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Bán hàng trong ngày',
              font: {
                size: 16,
              },
            },
          },
          scales: {
            y: {
              grid: { display: false },
              ticks: { display: true },
              title: {
                display: true,
                text: 'Số sản phẩm',
              },
            },
            x: {
              grid: { display: false },
              title: {
                display: true,
                text: 'Ngày trong tuần',
              },
            },
          },
        },
      });
    }

    if (reviewsChartElement && revenue.length > 0) {
      if (reviewsChartInstance) {
        reviewsChartInstance.destroy();
      }
      reviewsChartInstance = new Chart(reviewsChartElement, {
        type: 'bar',
        data: {
          labels: revenue.map(item => item.day_of_week),
          datasets: [
            {
              backgroundColor: 'rgba(236, 72, 153, 0.4)',
              borderColor: '#f472b6',
              data: revenue.map(item => item.total_revenue),
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Doanh thu trong ngày',
              font: {
                size: 16,
              },
            },
          },
          scales: {
            y: {
              grid: { display: false },
              ticks: {
                display: true,
                callback: function (value) {
                  return new Intl.NumberFormat('vi-VN').format(value);
                },
              },
              title: {
                display: true,
                text: 'Doanh thu (VNĐ)',
              },
            },
            x: {
              grid: { display: false },
              title: {
                display: true,
                text: 'Ngày trong tuần',
              },
            },
          },
        },
      });
    }

    return () => {
      if (buyersChartInstance) buyersChartInstance.destroy();
      if (reviewsChartInstance) reviewsChartInstance.destroy();
    };
  }, [productSales, revenue]);

  return (
    <div id="home" className="p-8 overflow-x-hidden">
      <nav className="text-sm font-semibold mb-3" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center text-pink-500">
            <a href="#" className="text-gray-700">
              Trang chủ
            </a>
            <ChevronRightIcon className="w-3 h-3 mx-3" />
          </li>
          <li className="flex items-center">
            <a href="#" className="text-gray-600">
              Bảng điều khiển
            </a>
          </li>
        </ol>
      </nav>

      <div className="lg:flex justify-between items-center mb-4">
        <p className="text-2xl font-semibold mb-2 lg:mb-0">{greeting}</p>
        <button className="bg-pink-500 hover:bg-pink-600 focus:outline-none rounded-lg px-3 py-2 text-white font-semibold shadow">
          Nhật ký
        </button>
      </div>

      <div className="flex flex-wrap -mx-3 mb-4">
        {[
          {
            count: totalProductsSold.toString(),
            label: 'Tổng sản phẩm đã bán',
            iconPath:
              'M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708',
          },
          {
            count: totalReviews.toString(),
            label: 'Đánh giá cửa hàng',
            iconPath:
              'M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z',
          },
          {
            count: '31',
            label: 'Yêu cầu mới',
            iconPath:
              'M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z',
          },
          {
            count: '1,653',
            label: 'Lượt xem sản phẩm',
            iconPath:
              'M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z',
          },
        ].map(({ count, label, iconPath }, index) => (
          <div key={index} className="w-1/2 xl:w-1/4 px-3">
            <div className="w-full bg-white border text-pink-400 rounded-lg flex items-center p-3">
              <svg className="w-10 h-10 fill-current mr-4 hidden lg:block" viewBox="0 0 22 22">
                <path d={iconPath}></path>
              </svg>
              <div className="text-gray-700">
                <p className="font-semibold lg:text-2xl w-28">{count}</p>
                <p className="text-sm">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap -mx-3 mt-0">
        <div className="w-full xl:w-1/3 px-3">
          <p className="text-xl font-semibold mb-3">Bán hàng trong ngày</p>
          <div className="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
            <canvas id="buyers-chart" width="700" height="500"></canvas>
          </div>
        </div>

        <div className="w-full xl:w-1/3 px-3">
          <p className="text-xl font-semibold mb-3">Doanh thu trong ngày</p>
          <div className="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
            <canvas id="reviews-chart" width="700" height="500"></canvas>
          </div>
        </div>

        <div className="w-1/3 px-3">
          <p className="text-xl font-semibold mb-3">Giao dịch gần đây</p>
          <div className="w-full bg-white border rounded-lg p-3">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="w-full bg-gray-50 border rounded-lg flex justify-between items-center px-3 py-1.5 mb-1"
                >
                  <div>
                    <p className="font-semibold text-md">{order.tenkh}</p>
                    <p className="text-sm">Số sản phẩm mua: {order.soluongsp}</p>
                  </div>
                  <span className={`text-${getColor(order.tonggia)}-500 font-semibold text-md`}>
                    {formatCurrency(order.tonggia)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}