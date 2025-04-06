-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2025 at 03:11 PM
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
  `gioraca` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `calam`
--

INSERT INTO `calam` (`maca`, `tenca`, `luongmoica`, `thuong`, `chiphiphatsinh`, `giovaoca`, `gioraca`) VALUES
('CA_0097125b', 'Ca Chiều', 15000, 0, 0, '2025-03-27 12:00:00', '2025-03-27 17:00:00'),
('CA_0a9851d9', 'Ca Tối', 15000, 0, 0, '2025-03-27 17:00:00', '2025-03-27 22:00:00'),
('CA_2eba58fa', 'Ca Tối', 15000, 0, 0, '2025-03-30 17:00:00', '2025-03-30 22:00:00'),
('CA_3be679e1', 'Ca Sáng', 15000, 0, 0, '2025-03-27 06:00:00', '2025-03-27 12:00:00'),
('CA_8010d8a8', 'Ca Chiều', 15000, 0, 0, '2025-03-28 12:00:00', '2025-03-28 17:00:00'),
('CA_826af730', 'Ca Tối', 15000, 0, 0, '2025-03-25 17:00:00', '2025-03-25 22:00:00'),
('CA_97a88dfa', 'Ca Sáng', 15000, 0, 0, '2025-03-30 06:00:00', '2025-03-30 12:00:00'),
('CA_9906de44', 'Ca Chiều', 15000, 0, 0, '2025-03-26 12:00:00', '2025-03-26 17:00:00'),
('CA_9bda898a', 'Ca Tối', 15000, 0, 0, '2025-03-31 17:00:00', '2025-03-31 22:00:00'),
('CA_bdb50fef', 'Ca Chiều', 15000, 0, 0, '2025-03-25 12:00:00', '2025-03-25 17:00:00'),
('CA_c23ca526', 'Ca Chiều', 15000, 0, 0, '2025-03-31 12:00:00', '2025-03-31 17:00:00'),
('CA_c6909afc', 'Ca Sáng', 15000, 0, 0, '2025-03-31 06:00:00', '2025-03-31 12:00:00'),
('CA_c99fb7a7', 'Ca Chiều', 15000, 0, 0, '2025-03-30 12:00:00', '2025-03-30 17:00:00'),
('CA_d368cea9', 'Ca Sáng', 15000, 0, 0, '2025-03-25 06:00:00', '2025-03-25 12:00:00'),
('CA_ddb21c78', 'Ca Sáng', 15000, 0, 0, '2025-03-29 06:00:00', '2025-03-29 12:00:00'),
('CA_df374302', 'Ca Sáng', 15000, 0, 0, '2025-03-26 06:00:00', '2025-03-26 12:00:00'),
('CA_e2be116f', 'Ca Sáng', 15000, 0, 0, '2025-03-28 06:00:00', '2025-03-28 12:00:00'),
('CA_e5e10661', 'Ca Tối', 15000, 0, 0, '2025-03-29 17:00:00', '2025-03-29 22:00:00'),
('CA_f0411dfb', 'Ca Tối', 15000, 0, 0, '2025-03-28 17:00:00', '2025-03-28 22:00:00'),
('CA_fc921094', 'Ca Tối', 15000, 0, 0, '2025-03-26 17:00:00', '2025-03-26 22:00:00'),
('CA_fef942c5', 'Ca Chiều', 15000, 0, 0, '2025-03-29 12:00:00', '2025-03-29 17:00:00');

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
-- Table structure for table `chitietdonhang`
--

CREATE TABLE `chitietdonhang` (
  `madh` varchar(50) NOT NULL,
  `masp` varchar(50) NOT NULL,
  `soluongsanpham` int(11) NOT NULL,
  `km` float NOT NULL,
  `dongia` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitietdonhang`
--

INSERT INTO `chitietdonhang` (`madh`, `masp`, `soluongsanpham`, `km`, `dongia`) VALUES
('OD17427322261342', 'RC83943432', 3, 12, 224400),
('OD17427322261342', 'SG62587431', 2, 7, 130200),
('OD17427322261342', 'UC62194372', 1, 0, 85000),
('OD17427330741295', 'SG62587431', 3, 7, 130200),
('OD17427330741295', 'ST65523738', 1, 0, 309000),
('OD17427330741295', 'TC97412232', 1, 20, 168000),
('OD17427330741295', 'TD47237523', 2, 0, 132000),
('OD17427331558154', 'GP65237653', 2, 0, 135000),
('OD17427331558154', 'RM98723245', 1, 0, 83000),
('OD17427331558154', 'UC62194372', 1, 0, 85000),
('OD17427333463520', 'BT87230912', 2, 0, 58000),
('OD17427333463520', 'CB28365738', 1, 0, 340000),
('OD17427333463520', 'KL32639864', 1, 0, 199000),
('OD17427333777796', 'KL32639864', 1, 0, 199000),
('OD17427333777796', 'NH09812527', 1, 0, 425000),
('OD17427333777796', 'ST56383818', 3, 0, 72000),
('OD17427333777796', 'UE84463029', 2, 0, 130000),
('OD17427334173275', 'KL32639864', 1, 0, 199000),
('OD17427334173275', 'RC83943432', 1, 12, 224400),
('OD17427334173275', 'SK35467745', 1, 10, 292500),
('OD17427334173275', 'ST65523738', 1, 0, 309000),
('OD17427334173275', 'TD47237523', 1, 0, 132000),
('OD17427334173275', 'UC62194372', 1, 0, 85000),
('OD17427345537678', 'BT87230912', 2, 0, 58000),
('OD17427345537678', 'GP65237653', 1, 0, 135000),
('OD17427345537678', 'RM98723245', 1, 0, 83000),
('OD17427345537678', 'ST65523738', 2, 0, 309000),
('OD17427364262312', 'CB28365738', 1, 0, 340000),
('OD17427364262312', 'EC45263431', 2, 0, 435000),
('OD17427364262312', 'NH09812527', 1, 0, 425000),
('OD17427364262312', 'ST56383818', 1, 0, 72000),
('OD17427365044512', 'BG65772325', 1, 0, 55000),
('OD17427365044512', 'KL32639864', 1, 0, 199000),
('OD17427365044512', 'KN66424567', 1, 25, 194250),
('OD17427365044512', 'TC97412232', 1, 20, 168000),
('OD17427365044512', 'TD47237523', 2, 0, 132000),
('OD17427403643267', 'KN66424567', 2, 25, 194250),
('OD17427403643267', 'RC83943432', 4, 12, 224400),
('OD17427403643267', 'RM98723245', 3, 0, 83000),
('OD17427403643267', 'SG62587431', 3, 7, 130200),
('OD17427403643267', 'SK35467745', 3, 10, 292500),
('OD17427403643267', 'TC97412232', 2, 20, 168000),
('OD17427403643267', 'UC62194372', 2, 0, 85000),
('OD17427410449087', 'GP65237653', 2, 0, 135000),
('OD17427410449087', 'SG62587431', 2, 7, 130200),
('OD17427410449087', 'TC97412232', 1, 20, 168000),
('OD17427410449087', 'TD47237523', 3, 0, 132000),
('OD17427979055732', 'SK35467745', 9, 10, 292500),
('OD17427982690481', 'SK35467745', 1, 10, 292500),
('OD17433400064511', 'SG62587431', 2, 7, 130200),
('OD17433400064511', 'SK35467745', 1, 10, 292500);

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
('17427311071102', 'RC83943432', 120, 31000, 'DHC'),
('17416193638471', 'RM98723245', 70, 33000, 'Hada Labo'),
('17416193638471', 'SG62587431', 120, 46000, 'SVR'),
('17427311071102', 'SK35467745', 65, 39000, '3CE'),
('17416198026875', 'SR65478231', 105, 105000, 'Black Rouge'),
('17416194804432', 'ST56383818', 75, 35000, 'Tesori DOriente'),
('17427311071102', 'ST65523738', 75, 36000, 'Black Rouge'),
('17416193638471', 'TC97412232', 55, 52000, 'DrCeutics'),
('17427311071102', 'TD47237523', 105, 27000, 'DHC'),
('17416193638471', 'TT75643232', 120, 48000, 'DrCeutics'),
('17416198805948', 'UC62194372', 350, 20000, 'DHC'),
('17416198805948', 'UE84463029', 315, 30000, 'DHC');

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
  `quangduong` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donhang`
--

INSERT INTO `donhang` (`madh`, `makh`, `ngaydat`, `trangthai`, `tonggia`, `madvvc`, `maform`, `quangduong`) VALUES
('OD17427322261342', 'KHI5NCFJFF', '2025-03-23 19:17:00', 'Đã xác nhận', 1039588, 'NHS-146', NULL, 4.664),
('OD17427330741295', 'KHEQCH0YQU', '2025-03-23 19:31:00', 'Đã xác nhận', 1137357, 'GHT-812', NULL, 2.87834),
('OD17427331558154', 'KHEQCH0YQU', '2025-03-23 19:32:00', 'Đã xác nhận', 450953, 'NHS-146', NULL, 2.87834),
('OD17427333463520', 'KHUHSHLE73', '2025-03-23 19:35:00', 'Đã xác nhận', 664184, 'GHT-812', NULL, 4.59176),
('OD17427333777796', 'KHUHSHLE73', '2025-03-23 19:36:00', 'Đã xác nhận', 1113775, 'EXP-787', NULL, 4.59176),
('OD17427334173275', 'KHUHSHLE73', '2025-03-25 19:36:00', 'Đã xác nhận', 1262563, 'NHS-146', NULL, 4.59176),
('OD17427345537678', 'KHM7V08AMM', '2025-03-23 19:55:00', 'Đã xác nhận', 982000, 'EXP-787', NULL, 73.8454),
('OD17427364262312', 'KHONUVAZ7W', '2025-03-25 20:27:00', 'Đã xác nhận', 1737000, 'NHS-146', NULL, 73.1965),
('OD17427365044512', 'KHONUVAZ7W', '2025-03-23 20:28:00', 'Đã xác nhận', 910250, 'GHT-812', NULL, 73.1965),
('OD17427403643267', 'KHONUVAZ7W', '2025-03-23 21:32:00', 'Đã xác nhận', 3339200, 'EXP-787', NULL, 73.1965),
('OD17427410449087', 'KHI5NCFJFF', '2025-03-23 21:44:00', 'Đã xác nhận', 1115388, 'NHS-146', NULL, 4.664),
('OD17427979055732', NULL, '2025-03-24 13:31:00', 'Đã xác nhận', 2662500, 'EXP-787', 'FO17427978586483', 104.2),
('OD17427982690481', 'KHR26SAV0Y', '2025-03-24 13:37:00', 'Đã xác nhận', 322500, 'NHS-146', NULL, 1135.75),
('OD17433400064511', 'KHM7V08AMM', '2025-03-30 20:06:00', 'Đã xác nhận', 582900, 'NHS-146', NULL, 73.8454);

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
('FO17427978586483', 'Hoàng Gia Nghiêm', '0668799645', 'Châu Đốc, An Giang', 'nghiemgia@gmail.com');

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
('BV-009', 'CA_3be679e1'),
('BV-009', 'CA_8010d8a8'),
('BV-009', 'CA_826af730'),
('BV-009', 'CA_c6909afc'),
('BV-009', 'CA_e5e10661'),
('KS-005', 'CA_0097125b'),
('KS-005', 'CA_97a88dfa'),
('KS-005', 'CA_bdb50fef'),
('KS-005', 'CA_c23ca526'),
('KS-005', 'CA_df374302'),
('KS-005', 'CA_f0411dfb'),
('NV-001', 'CA_0a9851d9'),
('NV-001', 'CA_9906de44'),
('NV-001', 'CA_9bda898a'),
('NV-001', 'CA_c99fb7a7'),
('NV-001', 'CA_d368cea9'),
('NV-001', 'CA_ddb21c78'),
('QL-003', 'CA_2eba58fa'),
('QL-003', 'CA_e2be116f'),
('QL-003', 'CA_fc921094'),
('QL-003', 'CA_fef942c5');

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
('RC83943432', 'Vienuongraucu1.png'),
('RC83943432', 'Vienuongraucu2.png'),
('RM98723245', 'srmhdlb1.png'),
('RM98723245', 'srmhdlb2.png'),
('RM98723245', 'srmhdlb3.png'),
('SG62587431', 'svgGreen1.png'),
('SG62587431', 'svgGreen2.png'),
('SG62587431', 'svgGreen3.png'),
('SK35467745', 'Sonk3CE1.png'),
('SK35467745', 'Sonk3CE2.png'),
('SK35467745', 'Sonk3CE3.png'),
('SK35467745', 'Sonk3CE4.png'),
('SK35467745', 'Sonk3CE5.png'),
('SK35467745', 'Sonk3CE6.png'),
('SK35467745', 'Sonk3CE7.png'),
('SK35467745', 'Sonk3CE8.png'),
('SK35467745', 'Sonk3CE9.png'),
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
('ST65523738', 'SonbongBR1.png'),
('ST65523738', 'SonbongBR2.png'),
('ST65523738', 'SonbongBR3.png'),
('ST65523738', 'SonbongBR4.png'),
('ST65523738', 'SonbongBR5.png'),
('ST65523738', 'SonbongBR6.png'),
('ST65523738', 'SonbongBR7.png'),
('ST65523738', 'SonbongBR8.png'),
('TC97412232', 'Loaibotebaochet1.png'),
('TC97412232', 'Loaibotebaochet2.png'),
('TC97412232', 'Loaibotebaochet3.png'),
('TD47237523', 'Vienuongtrangda1.png'),
('TD47237523', 'Vienuongtrangda2.png'),
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
('Nguyễn Văn Hoàng', 'KHEQCH0YQU', 'hoangvan@gmail.com', '0897005658', '9 Đ. Nguyễn Văn Quá, Tân Thới Hiệp, Quận 12, Hồ Chí Minh', '$2b$10$X8EmvRiTmElyQ.mgvaMWJO6hrylppR6cItn68QOYbfpHg.e37vElm'),
('Võ Huỳnh Minh Khang', 'KHI5NCFJFF', 'vokhang123@gmail.com', '0983251652', '15 Bùi Hữu Nghĩa, Bình Thủy, Cần Thơ', '$2b$10$GSND6KV.mIWXw5/l3NN1QOEQLZR0o8vUYBUbuUxOaVBqjTuKLOBDq'),
('Lý Thi Mai', 'KHM7V08AMM', 'maithi@gmail.com', '0987654321', '236 Mạc Cửu, Vĩnh Thanh, Rạch Giá, Kiên Giang', '$2b$10$w1LeJsoWvo0GrhaxxoE4yuaKyTnHcH4vLdFfXE6LGqJTpDNIA0p9y'),
('Trần Khánh Nam', 'KHONUVAZ7W', 'khanhnam@gmail.com', '0123456789', '40 Nguyễn Văn Cừ, TT. Tân Phú, Đồng Phú, Bình Phước', '$2b$10$sgCkY8KGj4y9ixVzs4DQmOeG8C3w7gWWycoq2d2T1Tujv2xl.9o9O'),
('Ngô Gia Minh', 'KHR26SAV0Y', 'minhgia@gmail.com', '0227789675', 'Hà Nội', '$2b$10$KtEAm.oQN7TsjgZ4QaQlbu/wNrshkPVXtUfRdUWvidg0e74Fi0jmi'),
('Trần Thị Thanh Xuân', 'KHUHSHLE73', 'thanhxuantran@gmail.com', '0775221459', '44 Đ. Quang Trung, Phường 11, Gò Vấp, Hồ Chí Minh', '$2b$10$AFdfMcASK9V6ht9TCNhxD.aEJIwB7RvbGc9HCMm961WmGW3YYNf4i');

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
('KM-108', 'Giảm 27%', 27, '2025-04-06 20:02:00', '2025-04-30 20:02:00', 'TD47237523'),
('KM-426', 'Giảm 12%', 12, '0000-00-00 00:00:00', '2025-04-25 20:03:00', 'SG62587431'),
('KM-562', 'Giảm 9%', 9, '2025-04-06 20:04:00', '2025-04-23 20:05:00', 'ST56383818'),
('KM-781', 'Giảm 5%', 5, '2025-04-06 20:01:00', '2025-04-28 20:02:00', 'RM98723245'),
('KM-972', 'Giảm 33%', 33, '0000-00-00 00:00:00', '2025-04-27 20:03:00', 'GP65237653');

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
('FO17439417613942', 'Hà Uyên', 'hauyen@gmail.com', '0546789123', 'Hàng chưa đến', 'Đã hơn khoảng thời gian dự kiến nhưng vẫn chưa thấy hàng được giao đến');

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
('KS-005', 'Đinh Thị Ngọc Hân', '0852456973', 'ngochan@gmail.com', '10 Lưu Hữu Phước, Phường 8, Cà Mau', 'Nhân viên', 0, '$2b$10$vMnn6AnwBCVArHcb67hjReVZkdBKpHQ7rXWfIBbY2fDipGFYli49u'),
('NV-001', 'Nguyễn Trúc Mai', '0976431258', 'trucmai@gmail.com', '208A, Khóm 3, H. Lai Vung, Đồng Tháp', 'Nhân viên', 0, '$2b$10$O.Uo900vWkEwng0/Ap68ge4OnTRoj.3PZmKK8bIfBpxdZQBOpHoAO'),
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
('DC456782', 'DHC', 'DHC@gmail.com', '95 Trần Phú, Quận 1, Hồ Chí Minh'),
('FC125768', 'Focallure', 'Focall@gmail.com', '23 Võ Văn Kiệt, Đà Nẵng'),
('HJ354107', 'DrCeutics', 'DrCeutics241@gmail.com', '298 Đồng Khởi, Hoàn Kiếm, Hà Nội'),
('HL213276', 'Hada Labo', 'Hadalabo@gmail.com', '67 Trần Hưng Đạo, Bình Dương, Hồ Chí Minh'),
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
('17416198805948', 'Thực phẩm chức năng', '2025-03-10 22:18:00', 'RPA67S', NULL),
('17427311071102', 'Mỹ phẩm và thực phẩm chức năng', '2025-03-23 18:58:00', 'RPA67S', NULL);

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
('BG65772325', 'Bông giọt nước', 'PK637124', 'Mềm gấp 2.3 lần chỉ trong 5s ngậm nước bông hoạt động hoàn hảo với mọi chất liệu nền (kem, lỏng, phấn), ít hút kem nền', 254, 55000, 'VS630289'),
('BT87230912', 'Set 3 bông makeup', 'PK637124', 'Cải tiến từ chất liệu Latex-free theo công nghệ Bouncyx2 Blender giúp bông hoạt động hoàn hảo với mọi chất liệu nền', 131, 58000, 'VS630289'),
('CB28365738', 'Bộ cọ và Bóp da', 'PK637124', 'Được thiết kế chuyên biệt với nhiều kích thước và công dụng khác nhau, dễ dàng sử dụng tùy theo mục đích trang điểm', 43, 340000, 'VS630289'),
('EC45263431', 'Son kem siêu lì', 'TD902642', 'Với 8 gam màu bắt kịp xu hướng làm đẹp của chị em, sẵn sàng đốn tim nàng từ cái nhìn đầu tiên', 83, 435000, 'CE567824'),
('GP65237653', 'Gel rửa mặt dưỡng ẩm', 'CS874523', 'Làm mềm da và giúp duy trì làn da luôn sạch khỏe và tràn đầy sức sống; giúp giảm cảm giác da khô căng khó chịu', 41, 135000, 'SV657632'),
('KL32639864', 'Kem lót', 'TD902642', 'Hiệu chỉnh làm đều màu da, sáng da đồng thời cấp ẩm giúp da bạn sẵn sàng trước khi đi tới bước tán kem nền', 20, 199000, 'FC125768'),
('KN66424567', 'Kem nền che phủ', 'TD902642', 'Độ che phủ cao nhưng nền lại cực kì mỏng nhẹ, chúng ta không thể bỏ qua hãng Catrice đã rất thành công với kem nền dạng lỏng', 92, 259000, 'CT325671'),
('NH09812527', 'Nước hoa Tesori', 'CT368716', 'Hương thơm quyến rũ, gợi cảm của xạ hương và gỗ đàn hương, hương vani và hổ phách ấm áp, cuốn hút', 77, 425000, 'TL842324'),
('RC83943432', 'Viên uống rau củ Nhật', 'TP378676', 'Viên uống DHC Perfect Vegetable Premium giúp bạn dễ dàng cung cấp vitamin, khoáng chất và chất xơ cần thiết cho cơ thể', 112, 255000, 'DC456782'),
('RM98723245', 'Kem rửa mặt', 'CS874523', 'Kem tạo bọt mịn, giúp nhẹ nhàng len lỏi sâu vào bên trong từng lỗ chân lông để loại bỏ bụi bẩn, bã nhờn bên trong da', 64, 83000, 'HL213276'),
('SG62587431', 'Gel rửa mặt cho da dầu', 'CS874523', 'Tạo bọt mịn sẽ nhẹ nhàng đánh bay những tác nhân gây hại sâu bên trong lỗ chân lông, trả lại cho bạn làn da sạch đẹp', 106, 140000, 'SV657632'),
('SK35467745', 'Son kem 3CE', 'TD902642', 'Sở hữu chất gel nước mềm mịn, có chứa các dưỡng chất giúp cung cấp độ ẩm cũng như tạo một lớp son lì trên môi', 50, 325000, 'CE567824'),
('SR65478231', 'Son kem Airfit Velvet', 'TD902642', 'Các sắc đỏ trendy đã tạo nên một làn sóng cho các cô gái đam mê son Hàn với thiết kế sang chảnh cùng bảng màu siêu đẹp. ', 105, 299000, 'BR563283'),
('ST56383818', 'Sữa tắm nước hoa', 'CT368716', 'Hương cao cấp độc đáo, mà thường chỉ áp dụng để sản xuất nước hoa cao cấp, và có khả năng lưu hương 6 tiếng trên da.', 68, 72000, 'TL842324'),
('ST65523738', 'Son Tint bóng', 'TD902642', 'Chia thành 3 concept Original - Rose - Soy. Mỗi concept sẽ cho một phong cách trang điểm khác nhau với những màu son khác nhau', 71, 309000, 'BR563283'),
('TC97412232', 'Tẩy tế bào chết', 'CS874523', 'Chiết xuất rau má, rau sam và diếp cá giúp làm sạch tế bào chết, giảm dầu thừa và hỗ trợ giảm mụn trứng cá, ngăn mụn tái phát', 49, 210000, 'HJ354107'),
('TD47237523', 'Viên uống trắng da', 'TP378676', 'Hoàn toàn phù hợp cho mọi đối tượng, kể cả những người có làn da cực kỳ nhạy cảm, da mụn, da vừa trị liệu', 94, 132000, 'DC456782'),
('TT75643232', 'Nước tẩy trang', 'CS874523', 'Làm dịu da, dưỡng ẩm cho da từ cây olive vô cùng lành tính giúp làm sạch sâu cho làn da một cách nhanh chóng', 120, 170000, 'HJ354107'),
('UC62194372', 'Viên Uống Bổ Sung Vitamin C', 'TP378676', 'Giúp bảo vệ da khỏi tác hại của môi trường, đồng thời mang đến làn da đều màu, căng mịn và khỏe mạnh', 344, 85000, 'DC456782'),
('UE84463029', 'Viên bổ sung Vitamin E', 'TP378676', 'Làm chậm quá trình lão hóa và mang lại làn da sáng mịn. Đã đến lúc bạn khám phá bí quyết của vẻ đẹp bền vững', 311, 130000, 'DC456782');

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
  ADD PRIMARY KEY (`maca`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
