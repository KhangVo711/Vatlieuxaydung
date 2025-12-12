-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 12, 2025 lúc 01:00 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vatlieuxaydung`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--
-- Error reading structure for table vatlieuxaydung.admin: #1932 - Table &#039;vatlieuxaydung.admin&#039; doesn&#039;t exist in engine
-- Error reading data for table vatlieuxaydung.admin: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `vatlieuxaydung`.`admin`&#039; at line 1

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binhluan`
--

CREATE TABLE `binhluan` (
  `id` int(11) NOT NULL,
  `makh` varchar(50) NOT NULL,
  `masp` varchar(50) NOT NULL,
  `sosao` varchar(50) NOT NULL,
  `noidung` varchar(255) NOT NULL,
  `ngaydang` datetime NOT NULL,
  `trangthai` enum('chờ duyệt','hiển thị','ẩn') NOT NULL DEFAULT 'hiển thị'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `binhluan`
--

INSERT INTO `binhluan` (`id`, `makh`, `masp`, `sosao`, `noidung`, `ngaydang`, `trangthai`) VALUES
(8, 'KHI5NCFJFF', 'BT89102384', '3', 'Sản phẩm tốt\n', '2025-11-08 15:23:22', 'hiển thị'),
(9, 'KHI5NCFJFF', 'BT89102384', '5', 'Sản phẩm dùng rất ok\nỦng hộ shop nhiều', '2025-11-08 19:26:44', 'hiển thị');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cacbienthe`
--

CREATE TABLE `cacbienthe` (
  `mabienthe` varchar(50) NOT NULL,
  `masp` varchar(50) NOT NULL,
  `gia` float NOT NULL,
  `soluongtonkho` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cacbienthe`
--

INSERT INTO `cacbienthe` (`mabienthe`, `masp`, `gia`, `soluongtonkho`) VALUES
('B-345765', 'TT045673323', 280000, 100),
('G-567787', 'SN49361763', 5000, 0),
('I0972', 'SL23981364', 168000, 0),
('I3423', 'SL23981364', 168000, 0),
('I4682', 'SL23981364', 158000, 0),
('I5128', 'SL23981364', 168000, 0),
('I5362', 'SL23981364', 168000, 0),
('l8112', 'SL23981364', 178000, 0),
('M-086548', 'SN49361763', 145000, 0),
('p6127', 'SB052736412', 189000, 100),
('p6182', 'SB052736412', 189000, 100),
('p7192', 'SB052736412', 189000, 100),
('R-6372', 'SM75414127', 75000, 100),
('R-6883', 'SM75414127', 72000, 100),
('R-9732', 'SM75414127', 78000, 100),
('S-754325', 'TT045673323', 210000, 100),
('V-3645', 'VZ092736451', 46000, 0),
('V-8945', 'VZ092736451', 54000, 0),
('V-9382', 'VZ092736451', 68000, 0),
('X-354662', 'SN49361763', 320000, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `calam`
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
-- Đang đổ dữ liệu cho bảng `calam`
--

INSERT INTO `calam` (`maca`, `tenca`, `luongmoica`, `thuong`, `chiphiphatsinh`, `giovaoca`, `gioraca`, `soluongCheckin`, `soluongCheckout`) VALUES
('CA_24bdcbcc', 'Ca Tối', 15000, 0, 0, '2025-11-23 17:00:00', '2025-11-23 22:00:00', 3, 1),
('CA_269f62fa', 'Ca Sáng', 15000, 0, 0, '2025-07-11 06:00:00', '2025-07-11 12:00:00', 0, 0),
('CA_3c97b454', 'Ca Chiều', 15000, 0, 0, '2025-07-11 12:00:00', '2025-07-11 17:00:00', 0, 0),
('CA_49f66aa1', 'Ca Tối', 15000, 0, 0, '2025-10-02 17:00:00', '2025-10-02 22:00:00', 2, 8),
('CA_5075e3ea', 'Ca Tối', 15000, 0, 0, '2025-12-08 17:00:00', '2025-12-08 22:00:00', 1, 1),
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
-- Cấu trúc bảng cho bảng `chinhanh`
--

CREATE TABLE `chinhanh` (
  `id` varchar(50) NOT NULL,
  `tencuahang` varchar(255) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `kinhdo` varchar(255) NOT NULL,
  `vido` varchar(255) NOT NULL,
  `giohoatdong` varchar(50) NOT NULL,
  `created_at` date NOT NULL,
  `maql` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chinhanh`
--

INSERT INTO `chinhanh` (`id`, `tencuahang`, `diachi`, `kinhdo`, `vido`, `giohoatdong`, `created_at`, `maql`) VALUES
('CH-6623', 'MyPhamHTCT 1', '225 Đ. 3 Tháng 2, Hưng Lợi, Ninh Kiều, Cần Thơ', '105.765794', '10.022291', '07:30 - 22:00', '2025-03-21', 'RPA67S'),
('CN-8732', 'MyPhamHTCT 2', '46 Đ. Trường Chinh, Tân Thới Nhất, Quận 12, Hồ Chí Minh', '106.616308', '10.840561', '08:00 - 22:00', '2025-03-21', 'RPA67S');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietchamcong`
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
-- Đang đổ dữ liệu cho bảng `chitietchamcong`
--

INSERT INTO `chitietchamcong` (`id`, `manv`, `maca`, `checkin`, `checkout`, `giolam`) VALUES
(4, 'NV-001', 'CA_49f66aa1', '2025-10-02 18:34:14', '2025-10-02 21:34:43', 3.01),
(9, 'KS-005', 'CA_8f26ef81', '2025-10-15 07:17:44', NULL, 0),
(13, 'NV-001', 'CA_24bdcbcc', '2025-11-23 19:27:19', '2025-11-23 19:31:35', 0.08),
(14, 'NV-001', 'CA_5075e3ea', '2025-12-08 21:05:46', '2025-12-08 21:06:10', 0.01);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietdonhang`
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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `ngaylaphd` date NOT NULL,
  `giolaphd` time NOT NULL,
  `ghichu` varchar(500) NOT NULL,
  `mahd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietphieunhap`
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
-- Đang đổ dữ liệu cho bảng `chitietphieunhap`
--

INSERT INTO `chitietphieunhap` (`mapn`, `masp`, `mabienthe`, `soluongnhap`, `gianhap`, `tennsx`) VALUES
('17655393052307', 'SM15414124', NULL, 100, 95000, 'SVR'),
('17655393052307', 'CR37462789', NULL, 100, 170000, 'CeraVe'),
('17655393052307', 'SM28364812', NULL, 100, 40000, 'Hadalabo'),
('17655393052307', 'CN76782423', NULL, 100, 120000, 'Espoir'),
('17655402256915', 'TT045673323', 'B-345765', 100, 135000, 'DrCeutics'),
('17655402256915', 'TT045673323', 'S-754325', 100, 110000, 'DrCeutics'),
('17655403218029', 'NH87231123', NULL, 100, 120000, 'Tesori DOriente'),
('17655403218029', 'ST45632797', NULL, 100, 220000, 'Cocoon'),
('17655403218029', 'NH47627821', NULL, 100, 120000, 'Tesori DOriente'),
('17655404365465', 'BT89102384', NULL, 100, 5000, 'Focallure'),
('17655404365465', 'BZ34219876', NULL, 100, 10000, 'Asakusa'),
('17655405528667', 'SM75414127', 'R-6883', 100, 35000, '3CE'),
('17655405528667', 'SM75414127', 'R-6372', 100, 35000, '3CE'),
('17655405528667', 'SB052736412', 'p6127', 100, 85000, 'Black Rouge'),
('17655405528667', 'SB052736412', 'p6182', 100, 85000, 'Black Rouge'),
('17655405528667', 'SB052736412', 'p7192', 100, 85000, 'Black Rouge'),
('17655405528667', 'SM75414127', 'R-9732', 100, 35000, '3CE'),
('17655406058327', 'BN65677123', NULL, 100, 355000, 'Gilaa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donhang`
--

CREATE TABLE `donhang` (
  `madh` varchar(50) NOT NULL,
  `makh` varchar(50) DEFAULT NULL,
  `ngaydat` datetime NOT NULL,
  `magiamgia` varchar(50) DEFAULT NULL,
  `trangthai` varchar(50) NOT NULL,
  `tonggia` int(11) NOT NULL,
  `madvvc` varchar(50) NOT NULL,
  `maform` varchar(50) DEFAULT NULL,
  `quangduong` float NOT NULL,
  `hinhthucthanhtoan` varchar(255) NOT NULL,
  `trangthaithanhtoan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donvivanchuyen`
--

CREATE TABLE `donvivanchuyen` (
  `madvvc` varchar(50) NOT NULL,
  `tendvvc` varchar(255) NOT NULL,
  `phivanchuyen` float NOT NULL,
  `songayvanchuyen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `donvivanchuyen`
--

INSERT INTO `donvivanchuyen` (`madvvc`, `tendvvc`, `phivanchuyen`, `songayvanchuyen`) VALUES
('EXP-787', 'EXPRESS', 3000, 'Tiêu chuẩn'),
('GHT-812', 'GHTKSS', 2000, 'Chậm'),
('NHS-146', 'GHNDS', 4500, 'Nhanh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `formdathang`
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
-- Cấu trúc bảng cho bảng `giamgia`
--

CREATE TABLE `giamgia` (
  `magiamgia` varchar(20) NOT NULL,
  `makh` varchar(50) NOT NULL,
  `phantramgiam` int(11) NOT NULL,
  `dieukien` int(11) NOT NULL,
  `soluongconlai` int(11) NOT NULL,
  `mota` varchar(255) NOT NULL,
  `ngaytao` datetime NOT NULL,
  `ngayketthuc` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `giamgia`
--

INSERT INTO `giamgia` (`magiamgia`, `makh`, `phantramgiam`, `dieukien`, `soluongconlai`, `mota`, `ngaytao`, `ngayketthuc`) VALUES
('NEW10KHQMMV3J60', 'KHQMMV3J60', 10, 500000, 0, 'Giảm 10% cho đơn hàng trên 500.000đ', '2025-11-07 18:03:46', '2025-11-14 18:03:46'),
('NEW30KHQMMV3J60', 'KHQMMV3J60', 30, 1200000, 0, 'Giảm 30% cho đơn hàng trên 1.200.000đ', '2025-11-07 18:03:46', '2025-11-14 18:03:46'),
('NEW50KHQMMV3J60', 'KHQMMV3J60', 50, 2500000, 0, 'Giảm 50% cho đơn hàng trên 2.500.000đ', '2025-11-07 18:03:46', '2025-11-14 18:03:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giaonhanca`
--

CREATE TABLE `giaonhanca` (
  `manv` varchar(50) NOT NULL,
  `maca` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `giaonhanca`
--

INSERT INTO `giaonhanca` (`manv`, `maca`) VALUES
('BV-009', 'CA_763c1fe7'),
('BV-009', 'CA_f2e15657'),
('KS-005', 'CA_3c97b454'),
('KS-005', 'CA_6872cea8'),
('KS-005', 'CA_8f26ef81'),
('NV-001', 'CA_24bdcbcc'),
('NV-001', 'CA_269f62fa'),
('NV-001', 'CA_49f66aa1'),
('NV-001', 'CA_5075e3ea'),
('NV-001', 'CA_656e87e6'),
('NV-001', 'CA_67c7c133'),
('NV-001', 'CA_ec84247c'),
('QL-003', 'CA_b0f0be9d'),
('QL-003', 'CA_b9dc0aee');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hinhanhsanpham`
--

CREATE TABLE `hinhanhsanpham` (
  `masp` varchar(50) NOT NULL,
  `hinhanh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hinhanhsanpham`
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
('CN76782423', 'kcn_nangtone_espoir2.jpg'),
('TT045673323', 'tay_trang_Olive_1.png'),
('TT045673323', 'tay_trang_Olive_2.png'),
('ST45632797', 'sua_tam_thot_not1.png'),
('SN49361763', 'SuatamTL2.png'),
('SN49361763', 'SuatamTL3.png'),
('SN49361763', 'SuatamTL1.png'),
('NH87231123', 'NuochoaD\'O1.png'),
('NH47627821', 'NuochoaD\'O3.png'),
('BN65677123', 'botngamtrangda.png'),
('BZ34219876', 'bongtaytrang.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
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
-- Cấu trúc bảng cho bảng `hoso`
--
-- Error reading structure for table vatlieuxaydung.hoso: #1932 - Table &#039;vatlieuxaydung.hoso&#039; doesn&#039;t exist in engine
-- Error reading data for table vatlieuxaydung.hoso: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `vatlieuxaydung`.`hoso`&#039; at line 1

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `tenkh` varchar(50) NOT NULL,
  `makh` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sdt` varchar(50) DEFAULT NULL,
  `diachi` varchar(255) DEFAULT NULL,
  `matkhau` varchar(255) NOT NULL,
  `anhdaidien` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`tenkh`, `makh`, `email`, `sdt`, `diachi`, `matkhau`, `anhdaidien`) VALUES
('Võ Huỳnh Minh Khang', 'KHI5NCFJFF', 'vokhang123@gmail.com', '0983251652', '15 Bùi Hữu Nghĩa, Bình Thủy, Cần Thơ', '$2b$10$GSND6KV.mIWXw5/l3NN1QOEQLZR0o8vUYBUbuUxOaVBqjTuKLOBDq', NULL),
('Hoàng Minh Kha', 'KHQMMV3J60', 'HoangKha@gmail.com', '0741852963', '52 Trần Phú, phường Cái Khế, quận Ninh Kiều, Cần Thơ', '$2b$10$hcRjC6H0Htky5M0JsqkVIekNGYt1Kn4cLvmDMTWpszjvW4t/F8XBm', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khuyenmai`
--

CREATE TABLE `khuyenmai` (
  `makm` varchar(550) NOT NULL,
  `tenkm` varchar(50) NOT NULL,
  `km` float NOT NULL,
  `thoigianbatdaukm` datetime NOT NULL,
  `thoigianketthuckm` datetime NOT NULL,
  `masp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lienhe`
--

CREATE TABLE `lienhe` (
  `malienhe` varchar(255) NOT NULL,
  `hoten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sodienthoai` varchar(255) NOT NULL,
  `chude` varchar(255) NOT NULL,
  `noidung` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `maloai` varchar(50) NOT NULL,
  `tenloai` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loaisanpham`
--

INSERT INTO `loaisanpham` (`maloai`, `tenloai`) VALUES
('CS874523', 'Chăm sóc da mặt'),
('CT368716', 'Chăm sóc cơ thể'),
('PK637124', 'Phụ kiện'),
('TD902642', 'Trang điểm'),
('TP378676', 'Thực phẩm chức năng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `manv` varchar(50) NOT NULL,
  `tennv` varchar(50) NOT NULL,
  `sdtnv` varchar(50) NOT NULL,
  `emailnv` varchar(50) NOT NULL,
  `diachinv` varchar(200) NOT NULL,
  `chucvunv` varchar(50) NOT NULL,
  `tongluong` float NOT NULL,
  `matkhau` varchar(255) NOT NULL,
  `anhdaidien` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`manv`, `tennv`, `sdtnv`, `emailnv`, `diachinv`, `chucvunv`, `tongluong`, `matkhau`, `anhdaidien`) VALUES
('BV-009', 'Trần Vĩ Gia Thành', '0987456321', 'giathanh@gmail.com', '589 Trần Phú, Phường 7, Bạc Liêu', 'Nhân viên', 0, '$2b$10$oZzxDV3grsFI37r3TJxA5..fHvXmvhuSWSb/dNXHCYO.SCrsm1cx2', NULL),
('KS-005', 'Đinh Thị Ngọc Hân', '0852456973', 'ngochan@gmail.com', '10 Lưu Hữu Phước, Phường 8, Cà Mau', 'Nhân viên', 156000, '$2b$10$vMnn6AnwBCVArHcb67hjReVZkdBKpHQ7rXWfIBbY2fDipGFYli49u', NULL),
('NV-001', 'Nguyễn Hà Đông', '0887552431', 'hadong@gmail.com', '208A, Khóm 3, H. Lai Vung, Đồng Tháp', 'Nhân viên', 125000, '$2b$10$8q.VPmXee/XFtknBy7SmWeXy1Cqwc1MWBZq6DGixkgv9k4OuDrf7S', '/uploads/avatar/1762855717837.jpg'),
('QL-003', 'Lý Ngọc Ngân', '0963258741', 'ngocngan@gmail.com', '22 Đường Mạc Tử Hoàng, Bình San, Kiên Giang', 'Nhân viên', 0, '$2b$10$47YccxVNbkIYzUTGYu2W7.gT9TtNRF8kS5YtklsltIHgZ1ZAULpYi', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhasanxuat`
--

CREATE TABLE `nhasanxuat` (
  `mansx` varchar(50) NOT NULL,
  `tennsx` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `diachi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhasanxuat`
--

INSERT INTO `nhasanxuat` (`mansx`, `tennsx`, `email`, `diachi`) VALUES
('AS562189', 'Asakusa', 'asakusa@gmail.com', '71B/52 Lý Thường Kiệt, An Thới, Đà Nẵng'),
('BR563283', 'Black Rouge', 'Blackrouge@gmail.com', '43 Phan Đình Phùng, Hải Phòng'),
('CE567824', '3CE', '3CE@gmail.com', '52 Trần Phú, Quận 12, Hồ Chí Minh'),
('CO875434', 'Cocoon', 'Cocoon656@gmail.com', '27/5 Cao Bá Quát, Hoàn Kiếm, Hà Nội'),
('CT325671', 'Catrice', 'catrice@gmail.com', '51 Phạm Thái Học, Quận 5, Hồ Chí Minh'),
('CV602871', 'CeraVe', 'CeraVe@gmail.com', '78 Cao Bá Quát, Hoàn Kiếm, Hà Nội'),
('DC456782', 'DHC', 'DHC@gmail.com', '95 Trần Phú, Quận 1, Hồ Chí Minh'),
('ES216821', 'Espoir', 'espoir@gmail.com', '71 Lý Thường Kiệt, An Thới, Đà Nẵng'),
('FC125768', 'Focallure', 'Focall@gmail.com', '23 Võ Văn Kiệt, Đà Nẵng'),
('GL671238', 'Gilaa', 'gilla@gmail.com', '722/2B Trường Định Của, An Hòa, Ninh Kiều, Cần Thơ'),
('HJ354107', 'DrCeutics', 'DrCeutics241@gmail.com', '298 Đồng Khởi, Hoàn Kiếm, Hà Nội'),
('HL213276', 'Hadalabo', 'Hadalabo@gmail.com', '67 Trần Hưng Đạo, Bình Dương, Hồ Chí Minh'),
('LY837221', 'Lilybyred', 'lilybyred@gmail.com', '72/2A Trường Định Của, An Hòa, Ninh Kiều, Cần Thơ'),
('SV657632', 'SVR', 'SVR@gmail.com', '73 Trần Hoàng Na, Ninh Kiều, Cần Thơ'),
('TL842324', 'Tesori DOriente', 'TesDorite@gmail.com', '94 Trần Bạch Đằng, An Khánh, Ninh Kiều, Cần Thơ'),
('VS630289', 'Vacosi', 'vacosi@gmail.com', '67 Nam Kỳ Khởi Nghĩa, An Hòa, Đồng Nai');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phanhoi`
--

CREATE TABLE `phanhoi` (
  `maphanhoi` int(11) NOT NULL,
  `malienhe` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `chude` varchar(255) NOT NULL,
  `noidung` varchar(255) NOT NULL,
  `maql` varchar(50) DEFAULT NULL,
  `manv` varchar(50) DEFAULT NULL,
  `ngaygui` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieunhap`
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
-- Đang đổ dữ liệu cho bảng `phieunhap`
--

INSERT INTO `phieunhap` (`mapn`, `tenpn`, `ngaylap`, `maql`, `manv`, `tonggia`) VALUES
('17655393052307', 'Chăm sóc da mặt', '2025-12-12 18:35:00', 'RPA67S', NULL, 42500000),
('17655402256915', 'Chăm sóc da', '2025-12-12 18:50:00', 'RPA67S', NULL, 24500000),
('17655403218029', 'Chăm sóc cơ thể', '2025-12-12 18:52:00', 'RPA67S', NULL, 46000000),
('17655404365465', 'Phụ kiện', '2025-12-12 18:53:00', 'RPA67S', NULL, 1500000),
('17655405528667', 'Trang điểm', '2025-12-12 18:55:00', 'RPA67S', NULL, 36000000),
('17655406058327', 'Thực phẩm chức năng', '2025-12-12 18:56:00', 'RPA67S', NULL, 35500000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quanly`
--

CREATE TABLE `quanly` (
  `maql` varchar(50) NOT NULL,
  `tenql` varchar(50) NOT NULL,
  `sdt` varchar(11) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `matkhau` varchar(255) NOT NULL,
  `anhdaidien` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `quanly`
--

INSERT INTO `quanly` (`maql`, `tenql`, `sdt`, `diachi`, `email`, `matkhau`, `anhdaidien`) VALUES
('RPA67S', 'Admin', '01112111', 'Cần Thơ 111', 'admin@gmail.com', '$2b$10$riEGDktK2p8/xl6hDStPBuuqLTgluMpAUprpbeaSetq9M/bQ1z8Fy', '/uploads/avatar/1762855639758.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
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
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`masp`, `tensp`, `maloai`, `ttct`, `mansx`, `loaibienthe`, `cobienthe`, `gia`, `soluongsp`) VALUES
('BN65677123', 'Bột Ngậm Hỗ Trợ Trắng Da', 'TP378676', 'Gilaa Glow White Premium Glutathione C kết hợp Glutathione, Vitamin C, Elastin và Cà Chua Trắng giúp dưỡng trắng da toàn thân hiệu quả chỉ sau 28 ngày. Với Glutathione 75% từ Hoa Kỳ, sản phẩm mang lại hiệu quả rõ rệt và an toàn. Công nghệ Melting giúp bột ngậm hấp thụ trực tiếp qua niêm mạc miệng, tối ưu hóa hiệu quả mà không bị phân hủy bởi dạ dày.', 'GL671238', NULL, 0, 600000, 100),
('BT89102384', 'Bông Makeup', 'PK637124', 'Bông makeup là miếng mút mềm làm từ bọt polyurethane với cấu trúc lỗ khí nhỏ giúp tán mỹ phẩm mịn và đều. Thiết kế dạng giọt nước hoặc đầu vát giúp tiếp cận cả vùng rộng lẫn các góc nhỏ trên khuôn mặt. Sản phẩm được dùng để tán kem nền, che khuyết điểm, contour và giúp lớp trang điểm tự nhiên, bền màu hơn.', 'FC125768', NULL, 0, 15000, 100),
('BZ34219876', 'Bông tẩy trang', 'PK637124', 'Khám phá Bông Tẩy Trang Asakusa Soft Hygienic Skin Cotton Pads – 100% cotton tự nhiên, siêu mềm mịn, không xơ bông, bảo vệ da nhạy cảm.', 'AS562189', NULL, 0, 30000, 100),
('CN76782423', 'Kem chống nắng', 'CS874523', 'Kem Chống Nắng hỗ trợ nâng tone tự nhiên Espoir Water Splash Sun Cream SPF50+ PA++++ vừa dưỡng ẩm tốt cho da khô, da bình thường, vừa bảo vệ làn da dưới tác động của ánh nắng có thể sử dụng như lớp kem lót, giúp da thêm rạng rỡ.', 'ES216821', NULL, 0, 265000, 100),
('CR37462789', 'Sữa rửa mặt CeraVe', 'CS874523', 'Với làn da dầu, nhạy cảm, sữa rửa mặt giúp làm sạch sâu, giúp loại bỏ dầu thừa, bụi bẩn mà không phá vỡ cấu trúc hàng rào bảo vệ tự nhiên của da.', 'CV602871', NULL, 0, 320000, 100),
('NH47627821', 'Nước hoa Hoa Sen', 'CT368716', 'Nước Hoa Hương Hoa Sen Tesori D\'oriente Lotus Flower And Acacia\'S Milk là dòng nước hoa thuộc nhóm Oriental Floral (Hương hoa cỏ). Sản phẩm được lấy cảm hứng từ hoa sen - loài hoa biểu tượng đầy cuốn hút của văn hóa phương Đông. Loài hoa có sức sống mãnh liệt, vươn lên từ bùn đất, mang trên mình vẻ đẹp hoang sơ và kiêu hãnh cùng hương thơm say đắm, mang lại cảm giác bình yên, an vui, hạnh phúc và sảng khoái.', 'TL842324', NULL, 0, 350000, 100),
('NH87231123', 'Nước hoa Thanh Long', 'CT368716', 'Nước Hoa Hương Thanh Long Italia Tesori D\'Oriente Dragon Flower là một mùi hương được kết hợp từ hương hạnh nhân ngọt ngào, hương thơm mãnh liệt sang trọng của hoa nhài Sambac, hương thơm quyến rũ, gợi cảm của xạ hương và gỗ đàn hương, hương vani và hổ phách ấm áp, cuốn hút.', 'TL842324', NULL, 0, 350000, 100),
('SB052736412', 'Son Bóng Black Rouge', 'TD902642', 'Son Bóng Black Rouge với độ bóng cực cao giúp môi căng mọng như jelly cùng lớp phủ màu trong trẻo phù hợp với da ngâm, da sáng và môi khô, môi mỏng, sống động tạo hiệu ứng 3D ấn tượng mang đến một đôi môi căng.', 'BR563283', 'Màu sắc', 1, NULL, NULL),
('SL23981364', 'Son Tint Lilybyred', 'TD902642', 'Son Tint Lilybyred có công thức tint nước, lỏng nhẹ cho phép bạn dễ dàng điều chỉnh màu cũng như lượng son thích hợp khi trang điểm cho làn da bình thường, da sáng và các loại môi bình thường, môi thâm và môi dày. Cho đôi môi trong veo mọng nước, son lên môi đều màu, bên ngoài được phủ một lớp màng bóng tăng sự quyến rũ cho phái đẹp.', 'LY837221', 'Màu sắc', 1, NULL, NULL),
('SM15414124', 'Sữa rửa mặt SVR', 'CS874523', 'Chuyên dùng cho da dầu và da nhiều mụn giúp làm sạch tốt lỗ chân lông', 'SV657632', NULL, 0, 225000, 100),
('SM28364812', 'Sữa rửa mặt Hadalabo', 'CS874523', 'Làm sạch sâu tốt phù hợp cho da nhạy cảm', 'HL213276', NULL, 0, 95000, 100),
('SM75414127', 'Son kem lì 3CE ', 'TD902642', 'Son kem lì 3CE Velvet Lip là dòng son nổi tiếng từ Hàn Quốc với chất son mềm mịn như nhung, phù hợp với môi khô, da sáng. Son có độ bám màu tầm 4–6 tiếng, mùi dịu nhẹ, dễ chịu.\r\n', 'CE567824', 'Màu sắc', 1, NULL, NULL),
('SN49361763', 'Sữa tắm nước hoa', 'CT368716', 'Đặc biệt về mùi hương, Sữa Tắm Nước Hoa Thanh Long Tesori D\'Oriente Dragon Flower Bath Cream có nguyên tắc ba lớp hương cao cấp độc đáo, mà thường chỉ áp dụng để sản xuất nước hoa cao cấp, và có khả năng lưu hương 6 tiếng trên da.', 'TL842324', 'Dung tích', 1, NULL, NULL),
('ST45632797', 'Sữa tắm thốt nốt', 'CT368716', 'Mang trong mình tinh túy từ thốt nốt An Giang, Gel Tắm Cocoon Palmyra Sugar nhẹ nhàng làm sạch, dưỡng ẩm và nuôi dưỡng làn da mịn màng. Hương thơm ngọt dịu, thuần khiết đánh thức mọi giác quan, như một bản tình ca từ miền Tây nắng gió.', 'CO875434', NULL, 0, 335000, 100),
('TT045673323', 'Nước tẩy trang dạng sữa', 'CS874523', 'Sản phẩm tẩy trang không chỉ làm sạch mà còn nâng niu, bảo vệ làn da, thì Nước Tẩy Trang Dạng Sữa Drceutics Gentle Olive Milky Micellar Water chính là lựa chọn lý tưởng, mang đến bạn một làn da sạch sâu, mềm mịn và tràn đầy sức sống.', 'HJ354107', 'Dung tích', 1, NULL, NULL),
('VZ092736451', 'Viên uống Vitamin C', 'TP378676', 'Bổ sung Vitamin C', 'DC456782', 'Số viên', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanhtoan`
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
-- Cấu trúc bảng cho bảng `thuoctinhbienthe`
--

CREATE TABLE `thuoctinhbienthe` (
  `mathuoctinh` varchar(50) NOT NULL,
  `mabienthe` varchar(50) NOT NULL,
  `loaithuoctinh` varchar(50) NOT NULL,
  `thuoc_tinh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thuoctinhbienthe`
--

INSERT INTO `thuoctinhbienthe` (`mathuoctinh`, `mabienthe`, `loaithuoctinh`, `thuoc_tinh`) VALUES
('B-345765_1765532567037', 'B-345765', 'Dung tích', '500ml'),
('G-567787_1765533274431', 'G-567787', 'Dung tích', '9ml'),
('I0972_1753782812229', 'I0972', 'Màu sắc', 'Đỏ hồng'),
('I3423_1753782812269', 'I3423', 'Màu sắc', 'Nâu đất'),
('I4682_1753782812286', 'I4682', 'Màu sắc', 'Nâu đỏ'),
('I5128_1753782812240', 'I5128', 'Màu sắc', 'Đỏ đất'),
('I5362_1753782812256', 'I5362', 'Màu sắc', 'Cam đất'),
('l8112_1753782812221', 'l8112', 'Màu sắc', 'Hồng đào'),
('M-086548_1765533274437', 'M-086548', 'Dung tích', '250ml'),
('p6127_1753718269464', 'p6127', 'Màu sắc', 'Đỏ đất'),
('p6182_1753718269471', 'p6182', 'Màu sắc', 'Đỏ hồng'),
('p7192_1753718269455', 'p7192', 'Màu sắc', 'Hồng đào'),
('R-6372_1751551414471', 'R-6372', 'Màu sắc', 'Đỏ đô'),
('R-6883_1751551414481', 'R-6883', 'Màu sắc', 'Đỏ tía'),
('R-9732_1751551414475', 'R-9732', 'Màu sắc', 'Đỏ thẩm'),
('S-754325_1765532567017', 'S-754325', 'Dung tích', '310ml'),
('V-3645_1752333614899', 'V-3645', 'Số viên', '30'),
('V-8945_1752333614890', 'V-8945', 'Số viên', '60'),
('V-9382_1752333614911', 'V-9382', 'Số viên', '90'),
('X-354662_1765533274444', 'X-354662', 'Dung tích', '500ml');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `traloi_binhluan`
--

CREATE TABLE `traloi_binhluan` (
  `id` int(11) NOT NULL,
  `id_binhluan` int(11) NOT NULL,
  `maql` varchar(50) DEFAULT NULL,
  `manv` varchar(50) DEFAULT NULL,
  `noidung` varchar(255) NOT NULL,
  `ngaytraloi` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `traloi_binhluan`
--

INSERT INTO `traloi_binhluan` (`id`, `id_binhluan`, `maql`, `manv`, `noidung`, `ngaytraloi`) VALUES
(2, 9, 'RPA67S', NULL, 'Cảm ơn bạn đã tin tưởng và ủng hộ shop', '2025-11-08 19:35:22'),
(4, 8, NULL, 'NV-001', 'Cảm ơn bạn\n', '2025-11-08 19:37:57');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `masp` (`masp`,`makh`,`id`) USING BTREE,
  ADD KEY `makh` (`makh`);

--
-- Chỉ mục cho bảng `cacbienthe`
--
ALTER TABLE `cacbienthe`
  ADD PRIMARY KEY (`mabienthe`),
  ADD KEY `mabienthe` (`mabienthe`,`masp`),
  ADD KEY `masp` (`masp`);

--
-- Chỉ mục cho bảng `calam`
--
ALTER TABLE `calam`
  ADD PRIMARY KEY (`maca`);

--
-- Chỉ mục cho bảng `chinhanh`
--
ALTER TABLE `chinhanh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `maql` (`maql`);

--
-- Chỉ mục cho bảng `chitietchamcong`
--
ALTER TABLE `chitietchamcong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `manv` (`manv`),
  ADD KEY `maca` (`maca`);

--
-- Chỉ mục cho bảng `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD KEY `madh` (`madh`,`masp`,`mabienthe`),
  ADD KEY `mabienthe` (`mabienthe`);

--
-- Chỉ mục cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD KEY `mahd` (`mahd`);

--
-- Chỉ mục cho bảng `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD KEY `mabienthe` (`mabienthe`),
  ADD KEY `mapn` (`mapn`,`mabienthe`,`masp`) USING BTREE,
  ADD KEY `masp` (`masp`);

--
-- Chỉ mục cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`madh`),
  ADD KEY `makh` (`makh`),
  ADD KEY `madvvc` (`madvvc`),
  ADD KEY `maform` (`maform`);

--
-- Chỉ mục cho bảng `donvivanchuyen`
--
ALTER TABLE `donvivanchuyen`
  ADD PRIMARY KEY (`madvvc`);

--
-- Chỉ mục cho bảng `formdathang`
--
ALTER TABLE `formdathang`
  ADD PRIMARY KEY (`maform`);

--
-- Chỉ mục cho bảng `giamgia`
--
ALTER TABLE `giamgia`
  ADD KEY `magiamgia` (`magiamgia`,`makh`),
  ADD KEY `makh` (`makh`);

--
-- Chỉ mục cho bảng `giaonhanca`
--
ALTER TABLE `giaonhanca`
  ADD PRIMARY KEY (`manv`,`maca`),
  ADD KEY `manv` (`manv`),
  ADD KEY `maca` (`maca`);

--
-- Chỉ mục cho bảng `hinhanhsanpham`
--
ALTER TABLE `hinhanhsanpham`
  ADD KEY `masp` (`masp`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`mahd`),
  ADD KEY `matt` (`matt`),
  ADD KEY `maql` (`maql`),
  ADD KEY `madvvc` (`madvvc`),
  ADD KEY `manv` (`manv`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`makh`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `sdt` (`sdt`);

--
-- Chỉ mục cho bảng `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD PRIMARY KEY (`makm`),
  ADD KEY `masp` (`masp`);

--
-- Chỉ mục cho bảng `lienhe`
--
ALTER TABLE `lienhe`
  ADD PRIMARY KEY (`malienhe`);

--
-- Chỉ mục cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`maloai`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`manv`);

--
-- Chỉ mục cho bảng `nhasanxuat`
--
ALTER TABLE `nhasanxuat`
  ADD PRIMARY KEY (`mansx`);

--
-- Chỉ mục cho bảng `phanhoi`
--
ALTER TABLE `phanhoi`
  ADD PRIMARY KEY (`maphanhoi`),
  ADD KEY `maql` (`maql`,`manv`,`malienhe`) USING BTREE,
  ADD KEY `manv` (`manv`);

--
-- Chỉ mục cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`mapn`),
  ADD KEY `maql` (`maql`),
  ADD KEY `manv` (`manv`);

--
-- Chỉ mục cho bảng `quanly`
--
ALTER TABLE `quanly`
  ADD PRIMARY KEY (`maql`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`masp`),
  ADD KEY `maloai` (`maloai`),
  ADD KEY `mansx` (`mansx`);

--
-- Chỉ mục cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD PRIMARY KEY (`matt`),
  ADD KEY `makh` (`makh`);

--
-- Chỉ mục cho bảng `thuoctinhbienthe`
--
ALTER TABLE `thuoctinhbienthe`
  ADD PRIMARY KEY (`mathuoctinh`),
  ADD KEY `mathuoctinh` (`mathuoctinh`,`mabienthe`),
  ADD KEY `mabienthe` (`mabienthe`);

--
-- Chỉ mục cho bảng `traloi_binhluan`
--
ALTER TABLE `traloi_binhluan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`,`id_binhluan`,`manv`),
  ADD KEY `id` (`id`,`id_binhluan`,`maql`),
  ADD KEY `id_binhluan` (`id_binhluan`),
  ADD KEY `maql` (`maql`),
  ADD KEY `manv` (`manv`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `chitietchamcong`
--
ALTER TABLE `chitietchamcong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `phanhoi`
--
ALTER TABLE `phanhoi`
  MODIFY `maphanhoi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `traloi_binhluan`
--
ALTER TABLE `traloi_binhluan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  ADD CONSTRAINT `binhluan_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`),
  ADD CONSTRAINT `binhluan_ibfk_2` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`);

--
-- Các ràng buộc cho bảng `cacbienthe`
--
ALTER TABLE `cacbienthe`
  ADD CONSTRAINT `cacbienthe_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

--
-- Các ràng buộc cho bảng `chinhanh`
--
ALTER TABLE `chinhanh`
  ADD CONSTRAINT `chinhanh_ibfk_1` FOREIGN KEY (`maql`) REFERENCES `quanly` (`maql`);

--
-- Các ràng buộc cho bảng `chitietchamcong`
--
ALTER TABLE `chitietchamcong`
  ADD CONSTRAINT `chitietchamcong_ibfk_1` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`),
  ADD CONSTRAINT `chitietchamcong_ibfk_2` FOREIGN KEY (`maca`) REFERENCES `calam` (`maca`);

--
-- Các ràng buộc cho bảng `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`madh`) REFERENCES `donhang` (`madh`),
  ADD CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`mabienthe`) REFERENCES `cacbienthe` (`mabienthe`);

--
-- Các ràng buộc cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `chitiethoadon_ibfk_1` FOREIGN KEY (`mahd`) REFERENCES `hoadon` (`mahd`);

--
-- Các ràng buộc cho bảng `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD CONSTRAINT `chitietphieunhap_ibfk_1` FOREIGN KEY (`mapn`) REFERENCES `phieunhap` (`mapn`),
  ADD CONSTRAINT `chitietphieunhap_ibfk_2` FOREIGN KEY (`mabienthe`) REFERENCES `cacbienthe` (`mabienthe`),
  ADD CONSTRAINT `chitietphieunhap_ibfk_3` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

--
-- Các ràng buộc cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`),
  ADD CONSTRAINT `donhang_ibfk_3` FOREIGN KEY (`madvvc`) REFERENCES `donvivanchuyen` (`madvvc`),
  ADD CONSTRAINT `donhang_ibfk_4` FOREIGN KEY (`maform`) REFERENCES `formdathang` (`maform`);

--
-- Các ràng buộc cho bảng `giamgia`
--
ALTER TABLE `giamgia`
  ADD CONSTRAINT `giamgia_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`);

--
-- Các ràng buộc cho bảng `giaonhanca`
--
ALTER TABLE `giaonhanca`
  ADD CONSTRAINT `giaonhanca_ibfk_1` FOREIGN KEY (`maca`) REFERENCES `calam` (`maca`),
  ADD CONSTRAINT `giaonhanca_ibfk_2` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`);

--
-- Các ràng buộc cho bảng `hinhanhsanpham`
--
ALTER TABLE `hinhanhsanpham`
  ADD CONSTRAINT `hinhanhsanpham_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`matt`) REFERENCES `thanhtoan` (`matt`),
  ADD CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`maql`) REFERENCES `quanly` (`maql`),
  ADD CONSTRAINT `hoadon_ibfk_3` FOREIGN KEY (`madvvc`) REFERENCES `donvivanchuyen` (`madvvc`),
  ADD CONSTRAINT `hoadon_ibfk_4` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`);

--
-- Các ràng buộc cho bảng `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD CONSTRAINT `khuyenmai_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`);

--
-- Các ràng buộc cho bảng `phanhoi`
--
ALTER TABLE `phanhoi`
  ADD CONSTRAINT `phanhoi_ibfk_1` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`),
  ADD CONSTRAINT `phanhoi_ibfk_2` FOREIGN KEY (`maql`) REFERENCES `quanly` (`maql`);

--
-- Các ràng buộc cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `phieunhap_ibfk_1` FOREIGN KEY (`maql`) REFERENCES `quanly` (`maql`),
  ADD CONSTRAINT `phieunhap_ibfk_2` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`maloai`) REFERENCES `loaisanpham` (`maloai`),
  ADD CONSTRAINT `sanpham_ibfk_3` FOREIGN KEY (`mansx`) REFERENCES `nhasanxuat` (`mansx`);

--
-- Các ràng buộc cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD CONSTRAINT `thanhtoan_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`);

--
-- Các ràng buộc cho bảng `thuoctinhbienthe`
--
ALTER TABLE `thuoctinhbienthe`
  ADD CONSTRAINT `thuoctinhbienthe_ibfk_1` FOREIGN KEY (`mabienthe`) REFERENCES `cacbienthe` (`mabienthe`);

--
-- Các ràng buộc cho bảng `traloi_binhluan`
--
ALTER TABLE `traloi_binhluan`
  ADD CONSTRAINT `traloi_binhluan_ibfk_3` FOREIGN KEY (`id_binhluan`) REFERENCES `binhluan` (`id`),
  ADD CONSTRAINT `traloi_binhluan_ibfk_4` FOREIGN KEY (`maql`) REFERENCES `quanly` (`maql`),
  ADD CONSTRAINT `traloi_binhluan_ibfk_5` FOREIGN KEY (`manv`) REFERENCES `nhanvien` (`manv`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
