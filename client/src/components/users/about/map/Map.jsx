import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

export default function Map() {
    const [map, setMap] = useState(null);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const fixMarkerIcon = () => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
    };

    const loadBranches = async () => {
        try {
            const response = await axios.get('http://localhost:5001/getBranch');
            const branchesData = response.data.branches;
            setBranches(branchesData);
            return branchesData;
        } catch (error) {
            console.error('Error fetching branches:', error);
            return [];
        }
    };

    const handleBranchClick = (branch) => {
        if (map) {
            map.setView([branch.vido, branch.kinhdo], 15);
            const marker = map._layers[Object.keys(map._layers).find(
                key => map._layers[key].feature?.properties?.id === branch.id
            )];
            if (marker) marker.openPopup();
            setSelectedBranch(branch);
        }
    };

    useEffect(() => {
        fixMarkerIcon();

        const initialMap = L.map('map').setView([21.0245, 105.8412], 15); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(initialMap);

        setMap(initialMap);

        loadBranches().then((branchesData) => {
            if (branchesData.length > 0) {
                const firstBranch = branchesData[0];
                initialMap.setView([firstBranch.vido, firstBranch.kinhdo], 15);
                setSelectedBranch(firstBranch); // Set first branch as selected
            }

            branchesData.forEach((branch, index) => {
                const marker = L.marker([branch.vido, branch.kinhdo]).addTo(initialMap);
                const popupContent = `
                    <h3><strong>${branch.tencuahang}</strong></h3>
                    <p><strong>Địa chỉ:</strong> ${branch.diachi}</p>
                    <p><strong>Giờ hoạt động:</strong> ${branch.giohoatdong}</p>
                `;
                marker.bindPopup(popupContent);
                marker.feature = { properties: { id: branch.id } };

                // Open popup for the first branch
                if (index === 0 && branchesData.length > 0) {
                    marker.openPopup();
                }
            });
        });

        return () => {
            initialMap.remove();
        };
    }, []);

    return (
        <div className="flex w-full py-6 px-8">
            {/* Map */}
            <div className="flex-1">
                <div id="map" className="w-full h-[calc(100vh-280px)] rounded-xl"></div>
            </div>

            {/* Sidebar with branch list */}
            <div className="w-1/5 overflow-y-auto p-2.5 bg-white">
                <h2 className="text-xl mb-2.5 font-semibold">Danh sách cửa hàng</h2>
                {branches.length > 0 ? (
                    <ul className="list-none p-0">
                        {branches.map((branch) => (
                            <li
                                key={branch.id}
                                onClick={() => handleBranchClick(branch)}
                                className={`p-2.5 cursor-pointer border-l-8 shadow-xl border-gray-400 mb-2.5 transition-colors duration-200 ${
                                    selectedBranch?.id === branch.id ? 'bg-pink-200' : 'bg-white hover:bg-pink-100'
                                }`}
                            >
                                <strong>{branch.tencuahang}</strong>
                                <p className="text-sm text-gray-600">{branch.diachi}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Đang tải dữ liệu...</p>
                )}
            </div>
        </div>
    );
}