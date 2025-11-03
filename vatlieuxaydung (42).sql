-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2025 at 04:25 PM
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
-- Table structure for table `binhluan`
--

CREATE TABLE `binhluan` (
  `id` int(11) NOT NULL,
  `masp` varchar(50) NOT NULL,
  `tenkh` varchar(255) NOT NULL,
  `sosao` varchar(50) NOT NULL,
  `noidung` varchar(255) NOT NULL,
  `ngaydang` datetime NOT NULL,
  `trangthai` enum('chờ duyệt','hiển thị','ẩn') NOT NULL DEFAULT 'hiển thị'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `binhluan`
--

INSERT INTO `binhluan` (`id`, `masp`, `tenkh`, `sosao`, `noidung`, `ngaydang`, `trangthai`) VALUES
(1, 'BT89102384', 'Võ Huỳnh Minh Khang', '4', 'Tốt', '2025-10-31 00:00:00', 'hiển thị'),
(2, 'BT89102384', 'Võ Huỳnh Minh Khang', '5', 'Good\n', '2025-10-31 19:47:19', 'hiển thị'),
(3, 'BT89102384', 'Võ Huỳnh Minh Khang', '3', 'Sản phẩm ổn', '2025-10-31 21:52:04', 'hiển thị'),
(4, 'BT89102384', 'Võ Huỳnh Minh Khang', '2', 'Lỗi', '2025-10-31 21:52:14', 'ẩn'),
(5, 'BT89102384', 'Võ Huỳnh Minh Khang', '1', 'Sản phẩm lỗi', '2025-10-31 21:54:07', 'ẩn'),
(6, 'BT89102384', 'Võ Huỳnh Minh Khang', '5', 'Sản phẩm rất tốt', '2025-10-31 21:58:42', 'hiển thị'),
(7, 'CN76782423', 'Trần Khánh Nam', '3', 'Sản phẩm dùng tạm được', '2025-11-02 18:21:16', 'hiển thị');

-- --------------------------------------------------------

--
-- Table structure for table `cacbienthe`
--

CREATE TABLE `cacbienthe` (
  `mabienthe` varchar(50) NOT NULL,
  `masp` varchar(50) NOT NULL,
  `gia` float NOT NULL,
  `soluongtonkho` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cacbienthe`
--

INSERT INTO `cacbienthe` (`mabienthe`, `masp`, `gia`, `soluongtonkho`) VALUES
('I0972', 'SL23981364', 168000, 0),
('I3423', 'SL23981364', 168000, 0),
('I4682', 'SL23981364', 158000, 0),
('I5128', 'SL23981364', 168000, 0),
('I5362', 'SL23981364', 168000, 0),
('l8112', 'SL23981364', 178000, 0),
('p6127', 'SB052736412', 189000, 0),
('p6182', 'SB052736412', 189000, 0),
('p7192', 'SB052736412', 189000, 0),
('R-6372', 'SM75414127', 75000, 3),
('R-6883', 'SM75414127', 72000, 3),
('R-9732', 'SM75414127', 78000, 5),
('V-3645', 'VZ092736451', 46000, 10),
('V-8945', 'VZ092736451', 54000, 0),
('V-9382', 'VZ092736451', 68000, 0);

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
  `soluongCheckin` int(11) DEFAULT NULL,
  `soluongCheckout` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `calam`
--

INSERT INTO `calam` (`maca`, `tenca`, `luongmoica`, `thuong`, `chiphiphatsinh`, `giovaoca`, `gioraca`, `soluongCheckin`, `soluongCheckout`) VALUES
('CA_269f62fa', 'Ca Sáng', 15000, 0, 0, '2025-07-11 06:00:00', '2025-07-11 12:00:00', 0, 0),
('CA_3c97b454', 'Ca Chiều', 15000, 0, 0, '2025-07-11 12:00:00', '2025-07-11 17:00:00', 0, 0),
('CA_49f66aa1', 'Ca Tối', 15000, 0, 0, '2025-10-02 17:00:00', '2025-10-02 22:00:00', 2, 8),
('CA_656e87e6', 'Ca Sáng', 15000, 0, 0, '2025-07-09 06:00:00', '2025-07-09 12:00:00', 0, 0),
('CA_67c7c133', 'Ca Tối', 15000, 0, 0, '2025-09-12 17:00:00', '2025-09-12 22:00:00', 1, 1),
('CA_6872cea8', 'Ca Tối', 15000, 0, 0, '2025-07-01 17:00:00', '2025-07-01 22:00:00', 0, 0),
('CA_763c1fe7', 'Ca Tối', 15000, 0, 0, '2025-07-09 17:00:00', '2025-07-09 22:00:00', 0, 0),
('CA_8f26ef81', 'Ca Sáng', 150000, 0, 0, '2025-10-15 06:00:00', '2025-10-15 12:00:00', 2, 1),
('CA_b0f0be9d', 'Ca Tối', 15000, 0, 0, '2025-07-11 17:00:00', '2025-07-11 22:00:00', 0, 0),
('CA_b9dc0aee', 'Ca Chiều', 15000, 0, 0, '2025-07-09 12:00:00', '2025-07-09 17:00:00', 0, 0),
('CA_ec84247c', 'Ca Sáng', 15000, 0, 0, '2025-07-01 06:00:00', '2025-07-01 12:00:00', 0, 0),
('CA_f2e15657', 'Ca Chiều', 15000, 0, 0, '2025-07-01 12:00:00', '2025-07-01 17:00:00', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `chinhanh`
--

CREATE TABLE `chinhanh` (
  `id` varchar(50) NOT NULL,
  `tencuahang` varchar(255) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `kinhdo` varchar(255) NOT NULL,
  `vido` varchar(255) NOT NULL,
  `giohoatdong` varchar(50) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chinhanh`
--

INSERT INTO `chinhanh` (`id`, `tencuahang`, `diachi`, `kinhdo`, `vido`, `giohoatdong`, `created_at`) VALUES
('CH-6623', 'MyPhamHTCT 1', '225 Đ. 3 Tháng 2, Hưng Lợi, Ninh Kiều, Cần Thơ', '105.765794', '10.022291', '07:30 - 22:00', '2025-03-21'),
('CN-8732', 'MyPhamHTCT 2', '46 Đ. Trường Chinh, Tân Thới Nhất, Quận 12, Hồ Chí Minh', '106.616308', '10.840561', '08:00 - 22:00', '2025-03-21');

-- --------------------------------------------------------

--
-- Table structure for table `chitietchamcong`
--

CREATE TABLE `chitietchamcong` (
  `id` int(11) NOT NULL,
  `manv` varchar(50) NOT NULL,
  `maca` varchar(50) NOT NULL,
  `checkin` datetime NOT NULL,
  `checkout` datetime DEFAULT NULL,
  `giolam` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitietchamcong`
--

INSERT INTO `chitietchamcong` (`id`, `manv`, `maca`, `checkin`, `checkout`, `giolam`) VALUES
(4, 'NV-001', 'CA_49f66aa1', '2025-10-02 18:34:14', '2025-10-02 21:34:43', 3.01),
(9, 'KS-005', 'CA_8f26ef81', '2025-10-15 07:17:44', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `chitietdonhang`
--

CREATE TABLE `chitietdonhang` (
  `madh` varchar(50) NOT NULL,
  `masp` varchar(50) NOT NULL,
  `mabienthe` varchar(50) DEFAULT NULL,
  `soluongsanpham` int(11) NOT NULL,
  `km` float NOT NULL,
  `dongia` float NOT NULL,
  `thanhtien` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitietdonhang`
--

INSERT INTO `chitietdonhang` (`madh`, `masp`, `mabienthe`, `soluongsanpham`, `km`, `dongia`, `thanhtien`) VALUES
('17594022001131', 'BT89102384', NULL, 1, 0, 15000, 15000),
('17594022887937', 'BT89102384', NULL, 1, 0, 15000, 15000),
('17594029634091', 'BT89102384', NULL, 2, 0, 15000, 30000),
('17594030403047', 'BT89102384', NULL, 2, 0, 15000, 30000),
('17594766647532', 'CR37462789', NULL, 1, 0, 320000, 320000);

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
  `mabienthe` varchar(50) DEFAULT NULL,
  `soluongnhap` int(11) NOT NULL,
  `gianhap` float NOT NULL,
  `tennsx` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitietphieunhap`
--

INSERT INTO `chitietphieunhap` (`mapn`, `masp`, `mabienthe`, `soluongnhap`, `gianhap`, `tennsx`) VALUES
('17517945560296', 'BT89102384', NULL, 2, 5000, 'Focallure'),
('17517945560296', 'SM75414127', 'R-9732', 2, 20000, '3CE'),
('17517948144814', 'BT89102384', NULL, 1, 5000, 'Focallure'),
('17517948144814', 'SM75414127', 'R-6883', 2, 25000, '3CE'),
('17517953907691', 'BT89102384', NULL, 1, 5000, 'Focallure'),
('17517955103991', 'BT89102384', NULL, 1, 5000, 'Focallure'),
('17517955103991', 'SM75414127', 'R-6372', 3, 25000, '3CE'),
('17517955103991', 'SM75414127', 'R-9732', 3, 20000, '3CE'),
('17517955103991', 'SM75414127', 'R-6883', 3, 25000, '3CE'),
('17523342839159', 'VZ092736451', 'V-3645', 10, 26000, 'DHC'),
('17526568248217', 'SM28364812', NULL, 15, 35000, 'Hada Labo'),
('17526568248217', 'SM15414124', NULL, 10, 65000, 'SVR'),
('17621834635787', 'CR37462789', NULL, 10, 30000, 'CeraVe'),
('17621834635787', 'SM28364812', NULL, 25, 27000, 'Hadalabo'),
('17621834635787', 'SM15414124', NULL, 5, 22000, 'SVR');

-- --------------------------------------------------------

--
-- Table structure for table `danhgiacuahang`
--

CREATE TABLE `danhgiacuahang` (
  `name` varchar(50) NOT NULL,
  `rating` varchar(50) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `danhgiacuahang`
--

INSERT INTO `danhgiacuahang` (`name`, `rating`, `comment`, `date`) VALUES
('Võ Huỳnh Minh Khang', '5', 'Dịch vụ chăm sóc khách hàng tuyệt vời, sản phẩm đúng như mô tả. Rất đáng để thử!', '2025-03-17'),
('Nguyễn Thị Hương', '5', 'Sản phẩm chất lượng, giao hàng nhanh. Tôi đã trở thành khách hàng thân thiết của MyPhamHTCT được 2 năm và chưa bao giờ thất vọng.', '2025-03-17'),
('Lê Văn Hùng', '4', 'Sản phẩm tốt, nhưng tôi mong có thêm nhiều ưu đãi cho khách hàng mới.', '2025-03-17');

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
  `maform` varchar(50) DEFAULT NULL,
  `quangduong` float NOT NULL,
  `hinhthucthanhtoan` varchar(255) NOT NULL,
  `trangthaithanhtoan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donhang`
--

INSERT INTO `donhang` (`madh`, `makh`, `ngaydat`, `trangthai`, `tonggia`, `madvvc`, `maform`, `quangduong`, `hinhthucthanhtoan`, `trangthaithanhtoan`) VALUES
('17594022001131', 'KHI5NCFJFF', '2025-10-02 17:50:00', 'Đã xác nhận', 32679, 'EXP-787', NULL, 5.89315, 'qr', 'Đã thanh toán'),
('17594022887937', NULL, '2025-10-02 17:51:00', 'Chờ xác nhận', 27665, 'NHS-146', 'FO17594022649426', 2.81443, 'qr', 'Đã thanh toán'),
('17594029634091', NULL, '2025-10-02 18:02:00', 'Chờ xác nhận', 38443, 'EXP-787', 'FO17594029471987', 2.81443, 'cod', 'Chưa thanh toán'),
('17594030403047', NULL, '2025-10-02 18:04:00', 'Đã xác nhận', 35629, 'GHT-812', 'FO17594030147983', 2.81443, 'qr', 'Đã thanh toán'),
('17594766647532', 'KHI5NCFJFF', '2025-10-03 14:31:00', 'Chờ xác nhận', 337679, 'EXP-787', NULL, 5.89315, 'cod', 'Chưa thanh toán');

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

--
-- Dumping data for table `formdathang`
--

INSERT INTO `formdathang` (`maform`, `tenkh`, `sdt`, `diachi`, `email`) VALUES
('FO17522108558797', 'Khang', '0123456789', 'Cần Thơ', 'khangvvo0711@gmail.com'),
('FO17522110987167', 'Hung', '0963741852', 'Cà Mau', 'hunh@gmail.com'),
('FO17522302303450', 'khang', '0963741853', 'Cần Thơ', 'Khang@gmail.com'),
('FO17583812603295', 'Khang', '0123456789', '15 Bùi Hữu Nghĩa, Bình Thủy, Cần Thơ', 'khangvvo0711@gmail.com'),
('FO17584521312014', 'Khang', '0886005451', '15 Bùi Hữu Nghĩa, Bình Thủy, Cần Thơ', 'khangvvo0711@gmail.com'),
('FO17584525719945', 'Khang', '0123456789', 'Cần Thơ', 'khangvvo0711@gmail.com'),
('FO17593985089658', 'VO HUYNH MINH KHANG', '0123456789', 'Cần Thơ', 'khangvo0711@gmail.com'),
('FO17593985762055', 'MINH KHANG', '0983251652', 'Bình Thủy, Cần Thơ', 'vokhang123@gmail.com'),
('FO17593988849141', 'Khang', '0983251654', 'Can Tho', 'vokhang123@gmail.com'),
('FO17594010038779', 'Khang', '0147258369', 'Cần Thơ', 'vokhang123@gmail.com'),
('FO17594011025557', 'VO HUYNH MINH KHANG', '0983251652', 'Cần Thơ', 'vokhang123@gmail.com'),
('FO17594022649426', 'Khang Vo', '0983251652', 'Cần Thơ', 'vokhang123@gmail.com'),
('FO17594029471987', 'VO HUYNH MINH KHANG', '0123456789', 'can tho', 'khangvvo0711@gmail.com'),
('FO17594030147983', 'VO HUYNH MINH KHANG', '0123456789', 'Can Tho', 'khangvvo0711@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `giaonhanca`
--

CREATE TABLE `giaonhanca` (
  `manv` varchar(50) NOT NULL,
  `maca` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `giaonhanca`
--

INSERT INTO `giaonhanca` (`manv`, `maca`) VALUES
('BV-009', 'CA_763c1fe7'),
('BV-009', 'CA_f2e15657'),
('KS-005', 'CA_3c97b454'),
('KS-005', 'CA_6872cea8'),
('KS-005', 'CA_8f26ef81'),
('NV-001', 'CA_269f62fa'),
('NV-001', 'CA_49f66aa1'),
('NV-001', 'CA_656e87e6'),
('NV-001', 'CA_67c7c133'),
('NV-001', 'CA_ec84247c'),
('QL-003', 'CA_b0f0be9d'),
('QL-003', 'CA_b9dc0aee');

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
('SM75414127', 'Son3CE1.png'),
('SM75414127', 'Son3CE2.png'),
('SM75414127', 'Son3CE3.png'),
('SM75414127', 'Son3CE4.png'),
('SM75414127', 'Son3CE5.png'),
('BT89102384', 'BongGiotNuoc1.png'),
('BT89102384', 'BongGiotNuoc2.png'),
('VZ092736451', 'BSVitaminC1.png'),
('VZ092736451', 'BSVitaminC2.png'),
('VZ092736451', 'BSVitaminC3.png'),
('SM28364812', 'srmhdlb2.png'),
('SM28364812', 'srmhdlb3.png'),
('SM28364812', 'srmhdlb1.png'),
('SM15414124', 'svgGreen2.png'),
('SM15414124', 'svgGreen3.png'),
('SM15414124', 'svgGreen1.png'),
('CR37462789', 'cerave1.jpg'),
('CR37462789', 'cerave3.jpg'),
('CR37462789', 'cerave2.jpg'),
('SB052736412', 'SonbongBR1.png'),
('SB052736412', 'SonbongBR2.png'),
('SB052736412', 'SonbongBR3.png'),
('SB052736412', 'SonbongBR4.png'),
('SB052736412', 'SonbongBR5.png'),
('SB052736412', 'SonbongBR6.png'),
('SB052736412', 'SonbongBR7.png'),
('SB052736412', 'SonbongBR8.png'),
('SL23981364', 'sonLilybyred6.jpg'),
('SL23981364', 'sonLilybyred7.jpg'),
('SL23981364', 'sonLilybyred8.jpg'),
('SL23981364', 'sonLilybyred9.jpg'),
('SL23981364', 'sonLilybyred10.jpg'),
('SL23981364', 'sonLilybyred11.jpg'),
('SL23981364', 'sonLilybyred12.jpg'),
('SL23981364', 'sonLilybyred13.jpg'),
('SL23981364', 'sonLilybyred14.jpg'),
('SL23981364', 'sonLilybyred1.jpg'),
('SL23981364', 'sonLilybyred2.jpg'),
('SL23981364', 'sonLilybyred3.jpg'),
('SL23981364', 'sonLilybyred4.jpg'),
('SL23981364', 'sonLilybyred5.jpg'),
('CN76782423', 'kcn_nangtone_espoir1.jpg'),
('CN76782423', 'kcn_nangtone_espoir2.jpg');

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
('Nguyễn Văn Hoàng', 'KHEQCH0YQU', 'hoangvan@gmail.com', '0897005658', '9 Đ. Nguyễn Văn Quá, Tân Thới Hiệp, Quận 12, Hồ Chí Minh', '$2b$10$X8EmvRiTmElyQ.mgvaMWJO6hrylppR6cItn68QOYbfpHg.e37vElm'),
('Võ Huỳnh Minh Khang', 'KHI5NCFJFF', 'vokhang123@gmail.com', '0983251652', '15 Bùi Hữu Nghĩa, Bình Thủy, Cần Thơ', '$2b$10$GSND6KV.mIWXw5/l3NN1QOEQLZR0o8vUYBUbuUxOaVBqjTuKLOBDq'),
('Khang', 'KHJQBFOFDP', 'kv@gmail.com', '0983251654', 'Cần Thơ', '$2b$10$3aI1OhzHTNVKDBUOBa6u/.TjsehFnY0.3O8jCYwW3mKhydEekMeJi'),
('Lý Thi Mai', 'KHM7V08AMM', 'maithi@gmail.com', '0987654321', '236 Mạc Cửu, Vĩnh Thanh, Rạch Giá, Kiên Giang', '$2b$10$w1LeJsoWvo0GrhaxxoE4yuaKyTnHcH4vLdFfXE6LGqJTpDNIA0p9y'),
('Trần Khánh Nam', 'KHONUVAZ7W', 'khanhnam@gmail.com', '0123456789', '40 Nguyễn Văn Cừ, TT. Tân Phú, Đồng Phú, Bình Phước', '$2b$10$sgCkY8KGj4y9ixVzs4DQmOeG8C3w7gWWycoq2d2T1Tujv2xl.9o9O'),
('Ngô Gia Minh', 'KHR26SAV0Y', 'minhgia@gmail.com', '0227789675', 'Hà Nội', '$2b$10$KtEAm.oQN7TsjgZ4QaQlbu/wNrshkPVXtUfRdUWvidg0e74Fi0jmi'),
('Trần Thị Thanh Xuân', 'KHUHSHLE73', 'thanhxuantran@gmail.com', '0775221459', '44 Đ. Quang Trung, Phường 11, Gò Vấp, Hồ Chí Minh', '$2b$10$AFdfMcASK9V6ht9TCNhxD.aEJIwB7RvbGc9HCMm961WmGW3YYNf4i');

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
('KM-781', 'Giảm 5%', 5, '2025-10-31 13:58:00', '2025-11-05 13:58:00', 'BT89102384');

-- --------------------------------------------------------

--
-- Table structure for table `lienhe`
--

CREATE TABLE `lienhe` (
  `malienhe` varchar(255) NOT NULL,
  `hoten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sodienthoai` varchar(255) NOT NULL,
  `chude` varchar(255) NOT NULL,
  `noidung` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lienhe`
--

INSERT INTO `lienhe` (`malienhe`, `hoten`, `email`, `sodienthoai`, `chude`, `noidung`) VALUES
('FO17439412499539', 'Trần Bảo Thanh', 'baothanh@gmail.com', '0123456789', 'Sản phẩm lỗi', 'Sản phẩm tôi nhận được hiện tại có dung tích thấp hơn trên bao bì ghi'),
('FO17439415218054', 'Nguyễn Hà An', 'haan@gmail.com', '0963741852', 'Giao hàng sai', 'Sản phẩm được giao không đúng sản phẩm mà tôi đã đặt'),
('FO17439416362117', 'Vũ Thành Nam', 'thnam@gmail.com', '0147258369', 'Thiếu sản phẩm', 'Hàng giao đến hiện không đủ các sản phẩm mà tôi đã đặt\n'),
('FO17439417613942', 'Hà Uyên', 'hauyen@gmail.com', '0546789123', 'Hàng chưa đến', 'Đã hơn khoảng thời gian dự kiến nhưng vẫn chưa thấy hàng được giao đến'),
('FO17594749543658', 'VO HUYNH MINH KHANG', 'tonycenvip@gmail.com', '0983251652', 'Sản phẩm lỗi', 'Báo');

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
  `tongluong` float NOT NULL,
  `matkhau` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`manv`, `tennv`, `sdtnv`, `emailnv`, `diachinv`, `chucvunv`, `tongluong`, `matkhau`) VALUES
('BV-009', 'Trần Vĩ Gia Thành', '0987456321', 'giathanh@gmail.com', '589 Trần Phú, Phường 7, Bạc Liêu', 'Nhân viên', 0, '$2b$10$oZzxDV3grsFI37r3TJxA5..fHvXmvhuSWSb/dNXHCYO.SCrsm1cx2'),
('KS-005', 'Đinh Thị Ngọc Hân', '0852456973', 'ngochan@gmail.com', '10 Lưu Hữu Phước, Phường 8, Cà Mau', 'Nhân viên', 156000, '$2b$10$vMnn6AnwBCVArHcb67hjReVZkdBKpHQ7rXWfIBbY2fDipGFYli49u'),
('NV-001', 'Nguyễn Trúc Mai', '0976431258', 'trucmai@gmail.com', '208A, Khóm 3, H. Lai Vung, Đồng Tháp', 'Nhân viên', 124000, '$2b$10$O.Uo900vWkEwng0/Ap68ge4OnTRoj.3PZmKK8bIfBpxdZQBOpHoAO'),
('QL-003', 'Lý Ngọc Ngân', '0963258741', 'ngocngan@gmail.com', '22 Đường Mạc Tử Hoàng, Bình San, Kiên Giang', 'Nhân viên', 0, '$2b$10$47YccxVNbkIYzUTGYu2W7.gT9TtNRF8kS5YtklsltIHgZ1ZAULpYi');

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
('CV602871', 'CeraVe', 'CeraVe@gmail.com', '78 Cao Bá Quát, Hoàn Kiếm, Hà Nội'),
('DC456782', 'DHC', 'DHC@gmail.com', '95 Trần Phú, Quận 1, Hồ Chí Minh'),
('ES216821', 'Espoir', 'espoir@gmail.com', '71 Lý Thường Kiệt, An Thới, Đà Nẵng'),
('FC125768', 'Focallure', 'Focall@gmail.com', '23 Võ Văn Kiệt, Đà Nẵng'),
('HJ354107', 'DrCeutics', 'DrCeutics241@gmail.com', '298 Đồng Khởi, Hoàn Kiếm, Hà Nội'),
('HL213276', 'Hadalabo', 'Hadalabo@gmail.com', '67 Trần Hưng Đạo, Bình Dương, Hồ Chí Minh'),
('LY837221', 'Lilybyred', 'lilybyred@gmail.com', '72/2A Trường Định Của, An Hòa, Ninh Kiều, Cần Thơ'),
('SV657632', 'SVR', 'SVR@gmail.com', '73 Trần Hoàng Na, Ninh Kiều, Cần Thơ'),
('TL842324', 'Tesori DOriente', 'TesDorite@gmail.com', '94 Trần Bạch Đằng, An Khánh, Ninh Kiều, Cần Thơ'),
('VS630289', 'Vacosi', 'vacosi@gmail.com', '67 Nam Kỳ Khởi Nghĩa, An Hòa, Đồng Nai');

-- --------------------------------------------------------

--
-- Table structure for table `phanhoi`
--

CREATE TABLE `phanhoi` (
  `maphanhoi` varchar(255) NOT NULL,
  `malienhe` varchar(255) NOT NULL,
  `manv` varchar(50) NOT NULL,
  `noidungphanhoi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phieunhap`
--

CREATE TABLE `phieunhap` (
  `mapn` varchar(50) NOT NULL,
  `tenpn` varchar(50) NOT NULL,
  `ngaylap` datetime NOT NULL,
  `maql` varchar(50) DEFAULT NULL,
  `manv` varchar(50) DEFAULT NULL,
  `tonggia` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phieunhap`
--

INSERT INTO `phieunhap` (`mapn`, `tenpn`, `ngaylap`, `maql`, `manv`, `tonggia`) VALUES
('17517945560296', 'Mỹ phẩm', '2025-07-06 16:35:00', 'RPA67S', NULL, 50000),
('17517948144814', 'Nhập hàng test', '2025-07-06 16:40:00', 'RPA67S', NULL, 55000),
('17517953907691', 'TH', '2025-07-06 16:49:00', 'RPA67S', NULL, 5000),
('17517955103991', 'Mỹ phẩm mới', '2025-07-06 16:51:00', 'RPA67S', NULL, 215000),
('17523342839159', 'Viên uống', '2025-07-12 22:31:00', 'RPA67S', NULL, 260000),
('17526568248217', 'SRM', '2025-07-16 16:07:00', 'RPA67S', NULL, 1175000),
('17621834635787', 'Sữa rửa mặt', '2025-11-03 22:24:00', 'RPA67S', NULL, 1085000);

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
  `mansx` varchar(50) NOT NULL,
  `loaibienthe` varchar(50) DEFAULT NULL,
  `cobienthe` tinyint(1) NOT NULL,
  `gia` float DEFAULT NULL,
  `soluongsp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masp`, `tensp`, `maloai`, `ttct`, `mansx`, `loaibienthe`, `cobienthe`, `gia`, `soluongsp`) VALUES
('BT89102384', 'Bông Makeup', 'PK637124', 'Dùng makeup', 'FC125768', NULL, 0, 15000, 1),
('CN76782423', 'Kem chống nắng', 'CS874523', 'Kem Chống Nắng hỗ trợ nâng tone tự nhiên Espoir Water Splash Sun Cream SPF50+ PA++++ vừa dưỡng ẩm tốt cho da khô, da bình thường, vừa bảo vệ làn da dưới tác động của ánh nắng có thể sử dụng như lớp kem lót, giúp da thêm rạng rỡ.', 'ES216821', NULL, 0, 265000, 0),
('CR37462789', 'Sữa rửa mặt CeraVe', 'CS874523', 'Với làn da dầu, nhạy cảm, sữa rửa mặt giúp làm sạch sâu, giúp loại bỏ dầu thừa, bụi bẩn mà không phá vỡ cấu trúc hàng rào bảo vệ tự nhiên của da.', 'CV602871', NULL, 0, 320000, 10),
('SB052736412', 'Son Bóng Black Rouge', 'TD902642', 'Son Bóng Black Rouge với độ bóng cực cao giúp môi căng mọng như jelly cùng lớp phủ màu trong trẻo phù hợp với da ngâm, da sáng và môi khô, môi mỏng, sống động tạo hiệu ứng 3D ấn tượng mang đến một đôi môi căng.', 'BR563283', 'Màu sắc', 1, NULL, NULL),
('SL23981364', 'Son Tint Lilybyred', 'TD902642', 'Son Tint Lilybyred có công thức tint nước, lỏng nhẹ cho phép bạn dễ dàng điều chỉnh màu cũng như lượng son thích hợp khi trang điểm cho làn da bình thường, da sáng và các loại môi bình thường, môi thâm và môi dày. Cho đôi môi trong veo mọng nước, son lên môi đều màu, bên ngoài được phủ một lớp màng bóng tăng sự quyến rũ cho phái đẹp.', 'LY837221', 'Màu sắc', 1, NULL, NULL),
('SM15414124', 'Sữa rửa mặt SVR', 'CS874523', 'Chuyên dùng cho da dầu và da nhiều mụn giúp làm sạch tốt lỗ chân lông', 'SV657632', NULL, 0, 225000, 15),
('SM28364812', 'Sữa rửa mặt Hadalabo', 'CS874523', 'Làm sạch sâu tốt phù hợp cho da nhạy cảm', 'HL213276', NULL, 0, 95000, 40),
('SM75414127', 'Son kem lì 3CE ', 'TD902642', 'Son kem lì 3CE Velvet Lip là dòng son nổi tiếng từ Hàn Quốc với chất son mềm mịn như nhung, phù hợp với môi khô, da sáng. Son có độ bám màu tầm 4–6 tiếng, mùi dịu nhẹ, dễ chịu.\r\n', 'CE567824', 'Màu sắc', 1, NULL, NULL),
('VZ092736451', 'Viên uống Vitamin C', 'TP378676', 'Bổ sung Vitamin C', 'DC456782', 'Số viên', 1, NULL, NULL);

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

-- --------------------------------------------------------

--
-- Table structure for table `thuoctinhbienthe`
--

CREATE TABLE `thuoctinhbienthe` (
  `mathuoctinh` varchar(50) NOT NULL,
  `mabienthe` varchar(50) NOT NULL,
  `loaithuoctinh` varchar(50) NOT NULL,
  `thuoc_tinh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thuoctinhbienthe`
--

INSERT INTO `thuoctinhbienthe` (`mathuoctinh`, `mabienthe`, `loaithuoctinh`, `thuoc_tinh`) VALUES
('I0972_1753782812229', 'I0972', 'Màu sắc', 'Đỏ hồng'),
('I3423_1753782812269', 'I3423', 'Màu sắc', 'Nâu đất'),
('I4682_1753782812286', 'I4682', 'Màu sắc', 'Nâu đỏ'),
('I5128_1753782812240', 'I5128', 'Màu sắc', 'Đỏ đất'),
('I5362_1753782812256', 'I5362', 'Màu sắc', 'Cam đất'),
('l8112_1753782812221', 'l8112', 'Màu sắc', 'Hồng đào'),
('p6127_1753718269464', 'p6127', 'Màu sắc', 'Đỏ đất'),
('p6182_1753718269471', 'p6182', 'Màu sắc', 'Đỏ hồng'),
('p7192_1753718269455', 'p7192', 'Màu sắc', 'Hồng đào'),
('R-6372_1751551414471', 'R-6372', 'Màu sắc', 'Đỏ đô'),
('R-6883_1751551414481', 'R-6883', 'Màu sắc', 'Đỏ tía'),
('R-9732_1751551414475', 'R-9732', 'Màu sắc', 'Đỏ thẩm'),
('V-3645_1752333614899', 'V-3645', 'Số viên', '30'),
('V-8945_1752333614890', 'V-8945', 'Số viên', '60'),
('V-9382_1752333614911', 'V-9382', 'Số viên', '90');

-- --------------------------------------------------------

--
-- Table structure for table `traloi_binhluan`
--

CREATE TABLE `traloi_binhluan` (
  `id` int(11) NOT NULL,
  `id_binhluan` int(11) NOT NULL,
  `ten_admin` varchar(255) NOT NULL,
  `noidung` varchar(255) NOT NULL,
  `ngaytraloi` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `traloi_binhluan`
--

INSERT INTO `traloi_binhluan` (`id`, `id_binhluan`, `ten_admin`, `noidung`, `ngaytraloi`) VALUES
(1, 7, 'Admin', 'Cảm ơn bạn', '2025-11-02 19:01:44'),
(5, 6, 'Admin', 'Shop cảm ơn', '2025-11-02 19:42:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `masp` (`masp`,`tenkh`);

--
-- Indexes for table `cacbienthe`
--
ALTER TABLE `cacbienthe`
  ADD PRIMARY KEY (`mabienthe`),
  ADD KEY `mabienthe` (`mabienthe`,`masp`),
  ADD KEY `masp` (`masp`);

--
-- Indexes for table `calam`
--
ALTER TABLE `calam`
  ADD PRIMARY KEY (`maca`);

--
-- Indexes for table `chitietchamcong`
--
ALTER TABLE `chitietchamcong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `manv` (`manv`),
  ADD KEY `maca` (`maca`);

--
-- Indexes for table `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD KEY `madh` (`madh`,`masp`,`mabienthe`),
  ADD KEY `mabienthe` (`mabienthe`);

--
-- Indexes for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD KEY `mahd` (`mahd`);

--
-- Indexes for table `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD KEY `mabienthe` (`mabienthe`),
  ADD KEY `mapn` (`mapn`,`mabienthe`,`masp`) USING BTREE,
  ADD KEY `masp` (`masp`);

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
  ADD KEY `masp` (`masp`);

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
-- Indexes for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD PRIMARY KEY (`makm`),
  ADD KEY `masp` (`masp`);

--
-- Indexes for table `lienhe`
--
ALTER TABLE `lienhe`
  ADD PRIMARY KEY (`malienhe`);

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
-- Indexes for table `phanhoi`
--
ALTER TABLE `phanhoi`
  ADD PRIMARY KEY (`maphanhoi`),
  ADD KEY `phanhoi` (`maphanhoi`,`malienhe`,`manv`),
  ADD KEY `malienhe` (`malienhe`);

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
-- Indexes for table `thuoctinhbienthe`
--
ALTER TABLE `thuoctinhbienthe`
  ADD PRIMARY KEY (`mathuoctinh`),
  ADD KEY `mathuoctinh` (`mathuoctinh`,`mabienthe`),
  ADD KEY `mabienthe` (`mabienthe`);

--
-- Indexes for table `traloi_binhluan`
--
ALTER TABLE `traloi_binhluan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`id_binhluan`),
  ADD KEY `id_binhluan` (`id_binhluan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `chitietchamcong`
--
ALTER TABLE `chitietchamcong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `traloi_binhluan`
--
ALTER TABLE `traloi_binhluan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD CONSTRAINT `binhluan_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

--
-- Constraints for table `cacbienthe`
--
ALTER TABLE `cacbienthe`
  ADD CONSTRAINT `cacbienthe_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

--
-- Constraints for table `chitietchamcong`
--
ALTER TABLE `chitietchamcong`
  ADD CONSTRAINT `chitietchamcong_ibfk_1` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`),
  ADD CONSTRAINT `chitietchamcong_ibfk_2` FOREIGN KEY (`maca`) REFERENCES `calam` (`maca`);

--
-- Constraints for table `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`madh`) REFERENCES `donhang` (`madh`),
  ADD CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`mabienthe`) REFERENCES `cacbienthe` (`mabienthe`);

--
-- Constraints for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `chitiethoadon_ibfk_1` FOREIGN KEY (`mahd`) REFERENCES `hoadon` (`mahd`);

--
-- Constraints for table `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD CONSTRAINT `chitietphieunhap_ibfk_1` FOREIGN KEY (`mapn`) REFERENCES `phieunhap` (`mapn`),
  ADD CONSTRAINT `chitietphieunhap_ibfk_2` FOREIGN KEY (`mabienthe`) REFERENCES `cacbienthe` (`mabienthe`),
  ADD CONSTRAINT `chitietphieunhap_ibfk_3` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

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
-- Constraints for table `hinhanhsanpham`
--
ALTER TABLE `hinhanhsanpham`
  ADD CONSTRAINT `hinhanhsanpham_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

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

--
-- Constraints for table `thuoctinhbienthe`
--
ALTER TABLE `thuoctinhbienthe`
  ADD CONSTRAINT `thuoctinhbienthe_ibfk_1` FOREIGN KEY (`mabienthe`) REFERENCES `cacbienthe` (`mabienthe`);

--
-- Constraints for table `traloi_binhluan`
--
ALTER TABLE `traloi_binhluan`
  ADD CONSTRAINT `traloi_binhluan_ibfk_1` FOREIGN KEY (`id_binhluan`) REFERENCES `binhluan` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
