import React, { useContext, useState, useEffect, useRef } from 'react';
import { formatCurrency } from '../../../../utils/currency'; // Adjust import as needed
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { Context } from '../../../Context';
import axios from 'axios';

export default function DeliveryMap({ selectedDelivery, setFeeShip, formData, setDistanceCart }) {
  const [distance, setDistance] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [nearestStore, setNearestStore] = useState(null);
  const [error, setError] = useState(null);
  const [userLatLng, setUserLatLng] = useState(null);
  const [branches, setBranches] = useState([]); // State for branches from getBranch
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const debounceTimer = useRef(null);

  const { isData } = useContext(Context);
  const [loginAddress, setLoginAddress] = useState(null);

  // Fetch user address from getInf
  useEffect(() => {
    if (isData) {
      axios.get(`http://localhost:5001/getInf/${isData.id}`)
        .then(res => {
          setLoginAddress(res.data.infomation.diachi);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isData]);

  // Fetch branches from getBranch
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:5001/getBranch');
        const branchesData = response.data.branches; // Assuming { branches: [...] }
        setBranches(branchesData);
      } catch (error) {
        console.error('Error fetching branches:', error);
        setError('Không thể tải danh sách cửa hàng.');
      }
    };
    fetchBranches();
  }, []);

  // Geocode address with debounce
  const geocodeAddress = async (address) => {
    try {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(async () => {
        if (!address?.trim()) {
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
            headers: { 'User-Agent': 'DeliveryMap/1.0 (MyPhamHT)' },
          }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const userCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
          setUserLatLng(userCoords);
          findNearestStore(userCoords.lat, userCoords.lng);
        } else {
          setError('Không tìm thấy địa chỉ. Vui lòng kiểm tra lại.');
          setDistance(null);
          setShippingFee(0);
          setNearestStore(null);
          setUserLatLng(null);
          setFeeShip(0);
        }
      }, 500);
    } catch (err) {
      setError(`Lỗi khi gọi dịch vụ Geocoding: ${err.message}`);
      setDistance(null);
      setShippingFee(0);
      setNearestStore(null);
      setUserLatLng(null);
      setFeeShip(0);
    }
  };

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Find nearest store from fetched branches
  const findNearestStore = (userLat, userLng) => {
    let minDistance = Infinity;
    let nearest = null;

    branches.forEach((branch) => {
      const dist = calculateDistance(userLat, userLng, parseFloat(branch.vido), parseFloat(branch.kinhdo));
      if (dist < minDistance) {
        minDistance = dist;
        nearest = branch;
      }
    });

    if (nearest) {
      setDistance(minDistance);
      setNearestStore(nearest);
      let fee = minDistance > 20 ? 30000 : Math.round(minDistance * selectedDelivery.phivanchuyen);
      setShippingFee(fee);
      setFeeShip(fee);
      setDistanceCart(minDistance);
      setError(null);
    } else {
      setError('Không tìm thấy cửa hàng nào gần bạn.');
      setDistance(null);
      setShippingFee(0);
      setNearestStore(null);
      setFeeShip(0);
    }
  };

  // Initialize map with routing
  const initMap = () => {
    if (!mapRef.current || !userLatLng || !nearestStore) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([nearestStore.vido, nearestStore.kinhdo], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    } else {
      mapInstance.current.setView([nearestStore.vido, nearestStore.kinhdo], 12);
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

    L.marker([nearestStore.vido, nearestStore.kinhdo])
      .addTo(mapInstance.current)
      .bindPopup(`
        <h3><strong>${nearestStore.tencuahang}</strong></h3>
        <p><strong>Địa chỉ:</strong> ${nearestStore.diachi}</p>
        <p><strong>Giờ hoạt động:</strong> ${nearestStore.giohoatdong}</p>
      `);

    L.Routing.control({
      waypoints: [
        L.latLng(nearestStore.vido, nearestStore.kinhdo),
        L.latLng(userLatLng.lat, userLatLng.lng),
      ],
      routeWhileDragging: true,
      show: false,
      createMarker: () => null,
      addWaypoints: false,
    }).addTo(mapInstance.current);
  };

  // Load address and calculate when dependencies change
  useEffect(() => {
    const addressToUse = loginAddress || formData?.address;
    if (addressToUse && selectedDelivery?.phivanchuyen && branches.length > 0) {
      geocodeAddress(addressToUse);
    } else {
      setDistance(null);
      setShippingFee(0);
      setNearestStore(null);
      setUserLatLng(null);
      setFeeShip(0);
      setError('Vui lòng cung cấp địa chỉ, đơn vị vận chuyển và danh sách cửa hàng.');
    }
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [formData?.address, selectedDelivery, loginAddress, branches]);

  useEffect(() => {
    if (userLatLng && nearestStore) {
      initMap();
    }
  }, [userLatLng, nearestStore]);

  // Estimated delivery time based on distance
  const getEstimatedDeliveryTime = (distance) => {
    if (distance <= 5) return 'Giao trong 1 giờ';
    if (distance <= 10) return 'Giao trong 2 giờ';
    if (distance <= 20) return 'Giao trong ngày';
    if (distance <= 50) return 'Giao trong 1-2 ngày';
    return 'Giao trong 3-4 ngày';
  };

  return (
    <>
      <div className="p-4 bg-gray-50 border-t">
        <div className="w-full flex justify-center items-center">
          <div className="text-sm w-full text-gray-800">
            {distance ? (
              <div className="w-full flex justify-between px-2">
                <div className="flex flex-col justify-start">
                  <p>
                    <span className="font-semibold">Cửa hàng gần nhất:</span> {nearestStore.tencuahang}
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
        <div ref={mapRef} style={{ height: '400px', width: '100%', marginTop: '20px' }}></div>
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </>
  );
}