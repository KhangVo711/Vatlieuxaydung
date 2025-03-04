import React, { useContext, useState, useEffect, useRef } from 'react';
import { formatCurrency } from '../../../../utils/currency'; // Điều chỉnh import theo cấu hình của bạn
import L from 'leaflet'; // Thư viện Leaflet
import 'leaflet/dist/leaflet.css'; // CSS của Leaflet
import 'leaflet-routing-machine'; // Plugin để vẽ đường đi
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { Context } from '../../../Context';
import axios from 'axios';
export default function DeliveryMap({ selectedDelivery, setFeeShip, formData }) {
  const [distance, setDistance] = useState(null); // Khoảng cách đến cửa hàng gần nhất
  const [shippingFee, setShippingFee] = useState(0); // Phí vận chuyển động
  const [nearestStore, setNearestStore] = useState(null); // Thông tin cửa hàng gần nhất
  const [error, setError] = useState(null); // Lỗi nếu có
  const [userLatLng, setUserLatLng] = useState(null); // Tọa độ người dùng
  const mapRef = useRef(null); // Ref để gắn bản đồ
  const mapInstance = useRef(null); // Lưu instance của bản đồ
  const debounceTimer = useRef(null); // Timer cho debounce

  const {isData} = useContext(Context);
  const [loginAddress, setLoginAddress] = useState(null);
  console.log(isData.id);
  console.log(loginAddress);
  useEffect(() => {
    if (isData) {
      axios.get(`http://localhost:5001/getInf/${isData.id}`)
        .then(res => {
          setLoginAddress(res.data.infomation.diachi); // Don't forget res.data!
        })
        .catch(error => {
          console.error('There was an error fetching the data:', error);
        });
    }
  }, [isData]);
  
  
  
  // Danh sách các cửa hàng từ cơ sở dữ liệu (giả lập)
  const storeLocations = [
    { id: 1, name: 'Cửa hàng 1 - TP. Hồ Chí Minh', lat: 10.7769, lng: 106.7009 },
    { id: 2, name: 'Cửa hàng 2 - TP. Hà Nội', lat: 21.0285, lng: 105.8542 },
    { id: 5, name: 'Cửa hàng 5 - TP. Cần Thơ', lat: 10.0458, lng: 105.7497 },
  ];

  // Hàm chuyển đổi địa chỉ thành tọa độ bằng Nominatim với debounce và headers
  const geocodeAddress = async (address) => {
    try {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(async () => {
        if (!address.trim()) {
          setError('Địa chỉ không hợp lệ. Vui lòng kiểm tra lại.');
          setDistance(null);
          setShippingFee(0);
          setNearestStore(null);
          setUserLatLng(null);
          setFeeShip(0);
          return;
        }
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
          {
            headers: {
              'User-Agent': 'DeliveryMap/1.0 (your.email@example.com)', // Thay bằng email hoặc tên ứng dụng của bạn
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const userCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
          setUserLatLng(userCoords);
          findNearestStore(userCoords.lat, userCoords.lng);
        } else {
          setError('Không tìm thấy địa chỉ. Vui lòng kiểm tra lại địa chỉ.');
          setDistance(null);
          setShippingFee(0);
          setNearestStore(null);
          setUserLatLng(null);
          setFeeShip(0);
        }
      }, 500);
    } catch (err) {
      setError(`Lỗi khi gọi dịch vụ Geocoding: ${err.message}`);
      console.error('Geocoding error:', err);
      setDistance(null);
      setShippingFee(0);
      setNearestStore(null);
      setUserLatLng(null);
      setFeeShip(0);
    }
  };

  // Hàm tính khoảng cách đơn giản (Haversine) giữa hai điểm
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Bán kính Trái Đất (km)
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách tính bằng km
  };

  // Hàm tìm cửa hàng gần nhất
  const findNearestStore = (userLat, userLng) => {
    let minDistance = Infinity;
    let nearest = null;

    storeLocations.forEach((store) => {
      const dist = calculateDistance(userLat, userLng, store.lat, store.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = store;
      }
    });

    if (nearest) {
      setDistance(minDistance);
      setNearestStore(nearest);
      let fee;
      if (minDistance > 20) {
        fee = 30000; // Phí ship mặc định khi khoảng cách > 20km
      } else {
        fee = Math.round(minDistance * selectedDelivery.phivanchuyen); // Tính phí dựa trên khoảng cách
      }
      setShippingFee(fee);
      setFeeShip(fee);
      setError(null);
    } else {
      setError('Không tìm thấy cửa hàng nào gần bạn.');
      setDistance(null);
      setShippingFee(0);
      setNearestStore(null);
      setFeeShip(0);
    }
  };

  // Hàm khởi tạo bản đồ Leaflet
  const initMap = () => {
    if (!mapRef.current || !userLatLng || !nearestStore) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([userLatLng.lat, userLatLng.lng], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    } else {
      mapInstance.current.setView([userLatLng.lat, userLatLng.lng], 12);
    }

    mapInstance.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Routing.Control) {
        mapInstance.current.removeLayer(layer);
      }
    });

    L.marker([userLatLng.lat, userLatLng.lng])
      .addTo(mapInstance.current)
      .bindPopup('Vị trí của bạn')
      .openPopup();

    L.marker([nearestStore.lat, nearestStore.lng])
      .addTo(mapInstance.current)
      .bindPopup(nearestStore.name);

    L.Routing.control({
      waypoints: [
        L.latLng(userLatLng.lat, userLatLng.lng),
        L.latLng(nearestStore.lat, nearestStore.lng),
      ],
      routeWhileDragging: true,
      show: false,
      createMarker: () => null,
      addWaypoints: false,
    }).addTo(mapInstance.current);
  };

  // Tự động load khi formData.address hoặc selectedDelivery thay đổi
  useEffect(() => {
    const addressToUse = loginAddress || formData?.address;
    if (addressToUse  && selectedDelivery?.phivanchuyen) {
      geocodeAddress(addressToUse );
    } else {
      setDistance(null);
      setShippingFee(0);
      setNearestStore(null);
      setUserLatLng(null);
      setFeeShip(0);
      setError('Vui lòng cung cấp địa chỉ và đơn vị vận chuyển.');
    }
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [formData.address, selectedDelivery, loginAddress]);

  // Gọi hàm vẽ bản đồ khi có tọa độ
  useEffect(() => {
    if (userLatLng && nearestStore) {
      initMap();
    }
  }, [userLatLng, nearestStore]);

  // Hàm tính thời gian dự kiến dựa trên khoảng cách
  const getEstimatedDeliveryTime = (distance) => {
    if (distance <= 5) {
      return 'Giao trong 1 giờ';
    } else if (distance <= 10) {
      return 'Giao trong 2 giờ';
    } else if (distance <= 20) {
      return 'Giao trong ngày';
    } else if (distance <= 50) {
      return 'Giao trong 1-2 ngày';
    } else {
      return 'Giao trong 3-4 ngày'; // Thêm điều kiện cho khoảng cách > 50km
    }
  };

  return (
    <>
      {/* Giao ngay */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="w-full flex justify-center items-center">
          <div className="text-sm w-full text-gray-800">
            {distance ? (
              <div className="w-full flex justify-between px-2">
                <div className="flex flex-col justify-start">
                  <p>
                    <span className="font-semibold">Cửa hàng gần nhất:</span> {nearestStore.name}
                  </p>
                  <p>
                    <span className="font-semibold">Thời gian dự kiến:</span>{' '}
                    {getEstimatedDeliveryTime(distance)}
                  </p>
                </div>
                <div className="flex flex-col justify-start">
                  <p>
                    <span className="font-semibold">Khoảng cách:</span> {distance.toFixed(2)} km
                  </p>
                  <p>
                    <span className="font-semibold">Phí vận chuyển:</span>{' '}
                    <span className="text-red-600 font-semibold">{formatCurrency(shippingFee)}</span>
                  </p>
                </div>
              </div>
            ) : (
              <p>Đang tải ...</p>
            )}
          </div>
        </div>
        {/* Bản đồ */}
        <div ref={mapRef} style={{ height: '400px', width: '100%', marginTop: '20px' }}></div>
      </div>
      {/* Giao ngay */}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </>
  );
}