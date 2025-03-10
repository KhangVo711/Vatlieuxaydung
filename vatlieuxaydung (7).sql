-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2025 at 04:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vatlieuxaydung`
--

-- --------------------------------------------------------

--
-- Table structure for table `calam`
--

CREATE TABLE `calam` (
  `maca` varchar(50) NOT NULL,
  `tenca` varchar(50) NOT NULL,
  `luongmoica` float NOT NULL,
  `thuong` float NOT NULL,
  `chiphiphatsinh` float NOT NULL,
  `giovaoca` datetime NOT NULL,
  `gioraca` datetime NOT NULL,
  `ngaynghi` date NOT NULL,
  `manv` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietdonhang`
--

CREATE TABLE `chitietdonhang` (
  `madh` varchar(50) NOT NULL,
  `masp` varchar(50) NOT NULL,
  `soluongsanpham` int(11) NOT NULL,
  `km` float NOT NULL,
  `dongia` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `ngaylaphd` date NOT NULL,
  `giolaphd` time NOT NULL,
  `ghichu` varchar(500) NOT NULL,
  `mahd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietphieunhap`
--

CREATE TABLE `chitietphieunhap` (
  `mapn` varchar(50) NOT NULL,
  `masp` varchar(50) NOT NULL,
  `soluong` int(11) NOT NULL,
  `dongia` float NOT NULL,
  `tennsx` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitietphieunhap`
--

INSERT INTO `chitietphieunhap` (`mapn`, `masp`, `soluong`, `dongia`, `tennsx`) VALUES
('17416195974997', 'BG65772325', 255, 15000, 'Vacosi'),
('17416195974997', 'BT87230912', 135, 22000, 'Vacosi'),
('17416195974997', 'CB28365738', 45, 165000, 'Vacosi'),
('17416198026875', 'EC45263431', 85, 145000, '3CE'),
('17416193638471', 'GP65237653', 50, 52000, 'SVR'),
('17416198026875', 'KL32639864', 25, 65000, 'Focallure'),
('17416198026875', 'KN66424567', 95, 75000, 'Catrice'),
('17416194804432', 'NH09812527', 80, 115000, 'Tesori DOriente'),
('17416193638471', 'RM98723245', 70, 33000, 'Hada Labo'),
('17416193638471', 'SG62587431', 120, 46000, 'SVR'),
('17416198026875', 'SR65478231', 105, 105000, 'Black Rouge'),
('17416194804432', 'ST56383818', 75, 35000, 'Tesori DOriente'),
('17416193638471', 'TC97412232', 55, 52000, 'DrCeutics'),
('17416193638471', 'TT75643232', 120, 48000, 'DrCeutics'),
('17416198805948', 'UC62194372', 350, 20000, 'DHC'),
('17416198805948', 'UE84463029', 315, 30000, 'DHC');

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `madh` varchar(50) NOT NULL,
  `makh` varchar(50) DEFAULT NULL,
  `ngaydat` datetime NOT NULL,
  `trangthai` varchar(50) NOT NULL,
  `tonggia` int(11) NOT NULL,
  `madvvc` varchar(50) NOT NULL,
  `maform` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donvivanchuyen`
--

CREATE TABLE `donvivanchuyen` (
  `madvvc` varchar(50) NOT NULL,
  `tendvvc` varchar(255) NOT NULL,
  `phivanchuyen` float NOT NULL,
  `songayvanchuyen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donvivanchuyen`
--

INSERT INTO `donvivanchuyen` (`madvvc`, `tendvvc`, `phivanchuyen`, `songayvanchuyen`) VALUES
('EXP-787', 'EXPRESS', 3000, 'Tiêu chuẩn'),
('GHT-812', 'GHTKSS', 2000, 'Chậm'),
('NHS-146', 'GHNDS', 4500, 'Nhanh');

-- --------------------------------------------------------

--
-- Table structure for table `formdathang`
--

CREATE TABLE `formdathang` (
  `maform` varchar(50) NOT NULL,
  `tenkh` varchar(50) NOT NULL,
  `sdt` varchar(50) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `giaonhanca`
--

CREATE TABLE `giaonhanca` (
  `manv` varchar(50) NOT NULL,
  `maca` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hinhanhsanpham`
--

CREATE TABLE `hinhanhsanpham` (
  `masp` varchar(50) NOT NULL,
  `hinhanh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hinhanhsanpham`
--

INSERT INTO `hinhanhsanpham` (`masp`, `hinhanh`) VALUES
('BG65772325', 'BongGiotNuoc1.png'),
('BG65772325', 'BongGiotNuoc2.png'),
('BT87230912', 'BongMakeupVcs1.png'),
('BT87230912', 'BongMakeupVcs2.png'),
('CB28365738', 'BoCoVCS1.png'),
('CB28365738', 'BoCoVCS2.png'),
('EC45263431', 'Son3CE1.png'),
('EC45263431', 'Son3CE2.png'),
('EC45263431', 'Son3CE3.png'),
('EC45263431', 'Son3CE4.png'),
('EC45263431', 'Son3CE5.png'),
('GP65237653', 'svgPink1.png'),
('GP65237653', 'svgPink2.png'),
('GP65237653', 'svgPink3.png'),
('KL32639864', 'KemlotFoca1.png'),
('KL32639864', 'KemlotFoca2.png'),
('KL32639864', 'KemlotFoca3.png'),
('KN66424567', 'Kemnen1.png'),
('KN66424567', 'Kemnen2.png'),
('KN66424567', 'Kemnen3.png'),
('KN66424567', 'Kemnen4.png'),
('NH09812527', 'NuochoaD\'O1.png'),
('NH09812527', 'NuochoaD\'O2.png'),
('NH09812527', 'NuochoaD\'O3.png'),
('RM98723245', 'srmhdlb1.png'),
('RM98723245', 'srmhdlb2.png'),
('RM98723245', 'srmhdlb3.png'),
('SG62587431', 'svgGreen1.png'),
('SG62587431', 'svgGreen2.png'),
('SG62587431', 'svgGreen3.png'),
('SR65478231', 'SonmoiBR1.png'),
('SR65478231', 'SonmoiBR2.png'),
('SR65478231', 'SonmoiBR3.png'),
('SR65478231', 'SonmoiBR4.png'),
('SR65478231', 'SonmoiBR5.png'),
('SR65478231', 'SonmoiBR6.png'),
('SR65478231', 'SonmoiBR7.png'),
('ST56383818', 'SuatamTL1.png'),
('ST56383818', 'SuatamTL2.png'),
('ST56383818', 'SuatamTL3.png'),
('TC97412232', 'Loaibotebaochet1.png'),
('TC97412232', 'Loaibotebaochet2.png'),
('TC97412232', 'Loaibotebaochet3.png'),
('TT75643232', 'DrC1.png'),
('TT75643232', 'DrC2.png'),
('UC62194372', 'BSVitaminC1.png'),
('UC62194372', 'BSVitaminC2.png'),
('UC62194372', 'BSVitaminC3.png'),
('UE84463029', 'BSVitaminE1.png'),
('UE84463029', 'BSVitaminE2.png'),
('UE84463029', 'BSVitaminE3.png');

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `mahd` varchar(50) NOT NULL,
  `ngaylap` datetime NOT NULL,
  `tongtien` float NOT NULL,
  `giamgia` float NOT NULL,
  `chiphikhac` float NOT NULL,
  `matt` varchar(50) NOT NULL,
  `maql` varchar(50) NOT NULL,
  `madvvc` varchar(50) NOT NULL,
  `manv` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `tenkh` varchar(50) NOT NULL,
  `makh` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sdt` varchar(50) DEFAULT NULL,
  `diachi` varchar(255) DEFAULT NULL,
  `matkhau` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`tenkh`, `makh`, `email`, `sdt`, `diachi`, `matkhau`) VALUES
('Vy', 'KH5A0LYR2K', 'vy@gmail.com', '01234568888', 'Can Tho', '$2b$10$V6vfYRim/rW82DM5Q1soN.eXEQTCYHqKveQC1a4Dwn3c0jeCoRvqu'),
('Võ', 'KH8PLPHA44', 'sada@gmail.com', '0886005452', 'ád', '$2b$10$v8ukNNdEgvZxe78f2Sc6ueTf9Rl1faRQuLZKHult1f0eQJgUQk07a'),
('To Huynh Huyen Tran', 'KH92JJYAJG', 'tran1@gmail.com', '03344455555', 'quản trọng hoàng, ninh kiều, cần thơ', '$2b$10$BaEPc62grJDUSPIlEVS1L.UGoXGbUZSHaYdcu6qJv804YxobGS4Ce'),
('Huyen Tran', 'KHD3UO56G4', NULL, '0334445566', NULL, '$2b$10$5hOJqbligU.VOIb7G/dN4OnFkXAInqEzEhqb5NmumQmyefQqYvB86'),
('Trang', 'KHF9OMM1RZ', 'trang@gmail.com', '0123456888', 'Ninh Kiều, Cần Thơ', '$2b$10$QnUTY9GYAk96mmv8T.3SWe.2hEA0PffhPZHIWCCpNyAreUedasque'),
('khangVOs', 'KHFZQUTQL2', 'vovvkhang123@gmail.com', '9876543210', 'CTHO', '$2b$10$bMaOUH9h4suDMew35uNoPOs1ychbs/h2k0vl8Lx5kCHOLDUTOQA3a'),
('tran', 'KHMCKG10KJ', 'tran11@gmail.com', '0123456788', 'Ninh Kieu, Cần Thơ', '$2b$10$FODeUCGwdJCwFndH/5M5v.IV79fwWqD2Asl9zNYBrHZMr88VBc38W'),
('gb', 'KHQYG6DL0M', NULL, '0123453289', NULL, '$2b$10$.DnoP4yZALr4L7XJ1UatuOlIPE8ywCprE2ursg20LYVlW0mku.8CS'),
('Vo Khang', 'KHR7ZC7H5X', 'vokhang12356@gmail.com', '0123456789', '15 Bùi Hữu Nghĩa, Bình Thủy, Cần Thơ', '$2b$10$GDHxdkA763tM3uX3PdI8ru.rvm7d54BV1QObx4CponD47iIhZxphC'),
('Vo Huynh Minh Khang', 'KHSXMOPJMO', 'khang123@gmail.com', '0983251652', 'Cần Thơ', '$2b$10$.VwH.2nLsy1nDBYVrFlwNuHcldcdDudVj26oAatUYWpBUBChwD2EC'),
('Nga', 'KHW21ZS5LK', NULL, '0123456123', NULL, '$2b$10$pVf6rqQsgsrZQ7PFlabB3OPQx07a/sa7Kff6H5/lLE94zwdjpn1.i'),
('Ngan', 'KHWRILEYIW', 'ngan@gmail.com', '0918747999', 'Soc Trang', '$2b$10$mNCks3J/z/SU4n8BrlghTe9xGFipM0oupgNVefG04ecrOsdeDulz.'),
('Do Huynh Kha Ai', 'KHWY2E0BIY', NULL, '0123455555', NULL, '$2b$10$9JxYukklOYkwvTJ9y6fsB.GYvlcCnT9UVflmynKvr.k1UCMgzzKaa'),
('Do Huynh Kha Ai', 'KHYLKYIU6W', 'thht060303@gmail.com', '03344456789', '27 Lê Bình, phường Hưng Lợi, quận Ninh Kiều, tp Cần Thơ', '$2b$10$OgRI1SxJxbtKKmaVSdreN.c9OO6.PXKTq6YiY6R9YCWoM0v3y5pdO');

-- --------------------------------------------------------

--
-- Table structure for table `khohang`
--

CREATE TABLE `khohang` (
  `makho` int(11) NOT NULL,
  `ngaynhap` int(11) NOT NULL,
  `tongnhap` int(11) NOT NULL,
  `tongxuat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khuyenmai`
--

CREATE TABLE `khuyenmai` (
  `makm` varchar(550) NOT NULL,
  `tenkm` varchar(50) NOT NULL,
  `km` float NOT NULL,
  `thoigianbatdaukm` datetime NOT NULL,
  `thoigianketthuckm` datetime NOT NULL,
  `masp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khuyenmai`
--

INSERT INTO `khuyenmai` (`makm`, `tenkm`, `km`, `thoigianbatdaukm`, `thoigianketthuckm`, `masp`) VALUES
('KM-562', 'Giảm 20%', 20, '2025-03-10 22:25:00', '2025-03-14 03:25:00', 'TC97412232'),
('KM-732', 'Giảm 10%', 10, '2025-03-10 22:20:00', '2025-03-12 12:20:00', 'GP65237653');

-- --------------------------------------------------------

--
-- Table structure for table `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `maloai` varchar(50) NOT NULL,
  `tenloai` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loaisanpham`
--

INSERT INTO `loaisanpham` (`maloai`, `tenloai`) VALUES
('CS874523', 'Chăm sóc da mặt'),
('CT368716', 'Chăm sóc cơ thể'),
('PK637124', 'Phụ kiện'),
('TD902642', 'Trang điểm'),
('TP378676', 'Thực phẩm chức năng');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `manv` varchar(50) NOT NULL,
  `tennv` varchar(50) NOT NULL,
  `sdtnv` varchar(50) NOT NULL,
  `emailnv` varchar(50) NOT NULL,
  `diachinv` varchar(200) NOT NULL,
  `chucvunv` varchar(50) NOT NULL,
  `tongluong` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`manv`, `tennv`, `sdtnv`, `emailnv`, `diachinv`, `chucvunv`, `tongluong`) VALUES
('MJBJA12341', 'Nguyễn Văn Pha', '84510020', 'Pha@gmail.com', 'NinhThuan', 'Nhân viên', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `nhasanxuat`
--

CREATE TABLE `nhasanxuat` (
  `mansx` varchar(50) NOT NULL,
  `tennsx` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `diachi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhasanxuat`
--

INSERT INTO `nhasanxuat` (`mansx`, `tennsx`, `email`, `diachi`) VALUES
('BR563283', 'Black Rouge', 'Blackrouge@gmail.com', '43 Phan Đình Phùng, Hải Phòng'),
('CE567824', '3CE', '3CE@gmail.com', '52 Trần Phú, Quận 12, Hồ Chí Minh'),
('CT325671', 'Catrice', 'catrice@gmail.com', '51 Phạm Thái Học, Quận 5, Hồ Chí Minh'),
('DC456782', 'DHC', 'DHC@gmail.com', '95 Trần Phú, Quận 1, Hồ Chí Minh'),
('FC125768', 'Focallure', 'Focall@gmail.com', '23 Võ Văn Kiệt, Đà Nẵng'),
('HJ354107', 'DrCeutics', 'DrCeutics241@gmail.com', '298 Đồng Khởi, Hoàn Kiếm, Hà Nội'),
('HL213276', 'Hada Labo', 'Hadalabo@gmail.com', '67 Trần Hưng Đạo, Bình Dương, Hồ Chí Minh'),
('SV657632', 'SVR', 'SVR@gmail.com', '73 Trần Hoàng Na, Ninh Kiều, Cần Thơ'),
('TL842324', 'Tesori DOriente', 'TesDorite@gmail.com', '94 Trần Bạch Đằng, An Khánh, Ninh Kiều, Cần Thơ'),
('VS630289', 'Vacosi', 'vacosi@gmail.com', '67 Nam Kỳ Khởi Nghĩa, An Hòa, Đồng Nai');

-- --------------------------------------------------------

--
-- Table structure for table `phieunhap`
--

CREATE TABLE `phieunhap` (
  `mapn` varchar(50) NOT NULL,
  `tenpn` varchar(50) NOT NULL,
  `ngaylap` datetime NOT NULL,
  `maql` varchar(50) DEFAULT NULL,
  `manv` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phieunhap`
--

INSERT INTO `phieunhap` (`mapn`, `tenpn`, `ngaylap`, `maql`, `manv`) VALUES
('17416193638471', 'Chăm sóc da mặt', '2025-03-10 22:09:00', 'RPA67S', NULL),
('17416194804432', 'Chăm sóc cơ thể', '2025-03-10 22:11:00', 'RPA67S', NULL),
('17416195974997', 'Phụ kiện', '2025-03-10 22:13:00', 'RPA67S', NULL),
('17416198026875', 'Trang điểm', '2025-03-10 22:16:00', 'RPA67S', NULL),
('17416198805948', 'Thực phẩm chức năng', '2025-03-10 22:18:00', 'RPA67S', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quanly`
--

CREATE TABLE `quanly` (
  `maql` varchar(50) NOT NULL,
  `tenql` varchar(50) NOT NULL,
  `sdt` varchar(11) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `matkhau` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quanly`
--

INSERT INTO `quanly` (`maql`, `tenql`, `sdt`, `diachi`, `email`, `matkhau`) VALUES
('RPA67S', 'Admin', '0123456789', 'Cần Thơ', 'admin@gmail.com', '$2b$10$.DnoP4yZALr4L7XJ1UatuOlIPE8ywCprE2ursg20LYVlW0mku.8CS');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` varchar(50) NOT NULL,
  `tensp` varchar(50) NOT NULL,
  `maloai` varchar(50) NOT NULL,
  `ttct` varchar(500) NOT NULL,
  `soluongsp` int(11) NOT NULL,
  `gia` int(11) NOT NULL,
  `mansx` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masp`, `tensp`, `maloai`, `ttct`, `soluongsp`, `gia`, `mansx`) VALUES
('BG65772325', 'Bông giọt nước', 'PK637124', 'Mềm gấp 2.3 lần chỉ trong 5s ngậm nước bông hoạt động hoàn hảo với mọi chất liệu nền (kem, lỏng, phấn), ít hút kem nền', 255, 55000, 'VS630289'),
('BT87230912', 'Set 3 bông makeup', 'PK637124', 'Cải tiến từ chất liệu Latex-free theo công nghệ Bouncyx2 Blender giúp bông hoạt động hoàn hảo với mọi chất liệu nền', 135, 58000, 'VS630289'),
('CB28365738', 'Bộ cọ và Bóp da', 'PK637124', 'Được thiết kế chuyên biệt với nhiều kích thước và công dụng khác nhau, dễ dàng sử dụng tùy theo mục đích trang điểm', 45, 340000, 'VS630289'),
('EC45263431', 'Son kem siêu lì', 'TD902642', 'Với 8 gam màu bắt kịp xu hướng làm đẹp của chị em, sẵn sàng đốn tim nàng từ cái nhìn đầu tiên', 85, 435000, 'CE567824'),
('GP65237653', 'Gel rửa mặt dưỡng ẩm', 'CS874523', 'Làm mềm da và giúp duy trì làn da luôn sạch khỏe và tràn đầy sức sống; giúp giảm cảm giác da khô căng khó chịu', 50, 135000, 'SV657632'),
('KL32639864', 'Kem lót', 'TD902642', 'Hiệu chỉnh làm đều màu da, sáng da đồng thời cấp ẩm giúp da bạn sẵn sàng trước khi đi tới bước tán kem nền', 25, 199000, 'FC125768'),
('KN66424567', 'Kem nền che phủ', 'TD902642', 'Độ che phủ cao nhưng nền lại cực kì mỏng nhẹ, chúng ta không thể bỏ qua hãng Catrice đã rất thành công với kem nền dạng lỏng', 95, 259000, 'CT325671'),
('NH09812527', 'Nước hoa Tesori', 'CT368716', 'Hương thơm quyến rũ, gợi cảm của xạ hương và gỗ đàn hương, hương vani và hổ phách ấm áp, cuốn hút', 80, 425000, 'TL842324'),
('RM98723245', 'Kem rửa mặt', 'CS874523', 'Kem tạo bọt mịn, giúp nhẹ nhàng len lỏi sâu vào bên trong từng lỗ chân lông để loại bỏ bụi bẩn, bã nhờn bên trong da', 70, 83000, 'HL213276'),
('SG62587431', 'Gel rửa mặt cho da dầu', 'CS874523', 'Tạo bọt mịn sẽ nhẹ nhàng đánh bay những tác nhân gây hại sâu bên trong lỗ chân lông, trả lại cho bạn làn da sạch đẹp', 120, 140000, 'SV657632'),
('SR65478231', 'Son kem Airfit Velvet', 'TD902642', 'Các sắc đỏ trendy đã tạo nên một làn sóng cho các cô gái đam mê son Hàn với thiết kế sang chảnh cùng bảng màu siêu đẹp. ', 105, 299000, 'BR563283'),
('ST56383818', 'Sữa tắm nước hoa', 'CT368716', 'Hương cao cấp độc đáo, mà thường chỉ áp dụng để sản xuất nước hoa cao cấp, và có khả năng lưu hương 6 tiếng trên da.', 75, 72000, 'TL842324'),
('TC97412232', 'Tẩy tế bào chết', 'CS874523', 'Chiết xuất rau má, rau sam và diếp cá giúp làm sạch tế bào chết, giảm dầu thừa và hỗ trợ giảm mụn trứng cá, ngăn mụn tái phát', 55, 210000, 'HJ354107'),
('TT75643232', 'Nước tẩy trang', 'CS874523', 'Làm dịu da, dưỡng ẩm cho da từ cây olive vô cùng lành tính giúp làm sạch sâu cho làn da một cách nhanh chóng', 120, 170000, 'HJ354107'),
('UC62194372', 'Viên Uống Bổ Sung Vitamin C', 'TP378676', 'Giúp bảo vệ da khỏi tác hại của môi trường, đồng thời mang đến làn da đều màu, căng mịn và khỏe mạnh', 350, 85000, 'DC456782'),
('UE84463029', 'Viên bổ sung Vitamin E', 'TP378676', 'Làm chậm quá trình lão hóa và mang lại làn da sáng mịn. Đã đến lúc bạn khám phá bí quyết của vẻ đẹp bền vững', 315, 130000, 'DC456782');

-- --------------------------------------------------------

--
-- Table structure for table `thanhtoan`
--

CREATE TABLE `thanhtoan` (
  `matt` varchar(50) NOT NULL,
  `phuongthuctt` varchar(50) NOT NULL,
  `sotaikhoan` varchar(50) NOT NULL,
  `tentaikhoan` varchar(50) NOT NULL,
  `makh` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calam`
--
ALTER TABLE `calam`
  ADD PRIMARY KEY (`maca`),
  ADD KEY `manv` (`manv`);

--
-- Indexes for table `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD PRIMARY KEY (`madh`,`masp`),
  ADD KEY `madh` (`madh`),
  ADD KEY `masp` (`masp`);

--
-- Indexes for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD KEY `mahd` (`mahd`);

--
-- Indexes for table `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD PRIMARY KEY (`masp`,`mapn`),
  ADD KEY `masp` (`masp`),
  ADD KEY `mapn` (`mapn`);

--
-- Indexes for table `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`madh`),
  ADD KEY `makh` (`makh`),
  ADD KEY `madvvc` (`madvvc`),
  ADD KEY `maform` (`maform`);

--
-- Indexes for table `donvivanchuyen`
--
ALTER TABLE `donvivanchuyen`
  ADD PRIMARY KEY (`madvvc`);

--
-- Indexes for table `formdathang`
--
ALTER TABLE `formdathang`
  ADD PRIMARY KEY (`maform`);

--
-- Indexes for table `giaonhanca`
--
ALTER TABLE `giaonhanca`
  ADD PRIMARY KEY (`manv`,`maca`),
  ADD KEY `manv` (`manv`),
  ADD KEY `maca` (`maca`);

--
-- Indexes for table `hinhanhsanpham`
--
ALTER TABLE `hinhanhsanpham`
  ADD KEY `masp` (`masp`,`hinhanh`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`mahd`),
  ADD KEY `matt` (`matt`),
  ADD KEY `maql` (`maql`),
  ADD KEY `madvvc` (`madvvc`),
  ADD KEY `manv` (`manv`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`makh`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `sdt` (`sdt`);

--
-- Indexes for table `khohang`
--
ALTER TABLE `khohang`
  ADD PRIMARY KEY (`makho`);

--
-- Indexes for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD PRIMARY KEY (`makm`),
  ADD KEY `masp` (`masp`);

--
-- Indexes for table `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`maloai`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`manv`);

--
-- Indexes for table `nhasanxuat`
--
ALTER TABLE `nhasanxuat`
  ADD PRIMARY KEY (`mansx`);

--
-- Indexes for table `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`mapn`),
  ADD KEY `maql` (`maql`),
  ADD KEY `manv` (`manv`);

--
-- Indexes for table `quanly`
--
ALTER TABLE `quanly`
  ADD PRIMARY KEY (`maql`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`masp`),
  ADD KEY `maloai` (`maloai`),
  ADD KEY `mansx` (`mansx`);

--
-- Indexes for table `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD PRIMARY KEY (`matt`),
  ADD KEY `makh` (`makh`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`madh`) REFERENCES `donhang` (`madh`),
  ADD CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

--
-- Constraints for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `chitiethoadon_ibfk_1` FOREIGN KEY (`mahd`) REFERENCES `hoadon` (`mahd`);

--
-- Constraints for table `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD CONSTRAINT `chitietphieunhap_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`),
  ADD CONSTRAINT `chitietphieunhap_ibfk_2` FOREIGN KEY (`mapn`) REFERENCES `phieunhap` (`mapn`);

--
-- Constraints for table `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`),
  ADD CONSTRAINT `donhang_ibfk_3` FOREIGN KEY (`madvvc`) REFERENCES `donvivanchuyen` (`madvvc`),
  ADD CONSTRAINT `donhang_ibfk_4` FOREIGN KEY (`maform`) REFERENCES `formdathang` (`maform`);

--
-- Constraints for table `giaonhanca`
--
ALTER TABLE `giaonhanca`
  ADD CONSTRAINT `giaonhanca_ibfk_1` FOREIGN KEY (`maca`) REFERENCES `calam` (`maca`),
  ADD CONSTRAINT `giaonhanca_ibfk_2` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`matt`) REFERENCES `thanhtoan` (`matt`),
  ADD CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`maql`) REFERENCES `quanly` (`maql`),
  ADD CONSTRAINT `hoadon_ibfk_3` FOREIGN KEY (`madvvc`) REFERENCES `donvivanchuyen` (`madvvc`),
  ADD CONSTRAINT `hoadon_ibfk_4` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`);

--
-- Constraints for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD CONSTRAINT `khuyenmai_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

--
-- Constraints for table `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `phieunhap_ibfk_1` FOREIGN KEY (`maql`) REFERENCES `quanly` (`maql`),
  ADD CONSTRAINT `phieunhap_ibfk_2` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`maloai`) REFERENCES `loaisanpham` (`maloai`),
  ADD CONSTRAINT `sanpham_ibfk_3` FOREIGN KEY (`mansx`) REFERENCES `nhasanxuat` (`mansx`);

--
-- Constraints for table `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD CONSTRAINT `thanhtoan_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
