-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2025 at 05:24 PM
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
('17404137421839', 'BZ-954', 25, 26000, 'Jaaped'),
('17404137421839', 'KC-642', 16, 72000, 'Jaaped'),
('17404137421839', 'KD-137', 36, 46000, 'Kaiiz'),
('17404137421839', 'KD-422', 54, 15000, 'Jaaped'),
('17404137421839', 'MM-841', 120, 22000, 'Daiseque'),
('17404137421839', 'SC-501', 60, 62000, '3CE'),
('17404138348128', 'SC-745', 20, 68000, '3CE'),
('17404138348128', 'TE-256', 35, 48000, 'Daiseque');

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `madh` varchar(50) NOT NULL,
  `makh` varchar(50) NOT NULL,
  `ngaydat` datetime NOT NULL,
  `trangthai` varchar(50) NOT NULL,
  `tonggia` int(11) NOT NULL,
  `madvvc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donvivanchuyen`
--

CREATE TABLE `donvivanchuyen` (
  `madvvc` varchar(50) NOT NULL,
  `tendvvc` varchar(255) NOT NULL,
  `phivanchuyen` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donvivanchuyen`
--

INSERT INTO `donvivanchuyen` (`madvvc`, `tendvvc`, `phivanchuyen`) VALUES
('EX-9712', 'EXPRESS', 50000);

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
('tran', 'KHMCKG10KJ', 'tran11@gmail.com', '0123456788', 'Ninh Kieu, Cần Thơ', '$2b$10$FODeUCGwdJCwFndH/5M5v.IV79fwWqD2Asl9zNYBrHZMr88VBc38W'),
('gb', 'KHQYG6DL0M', NULL, '0123453289', NULL, '$2b$10$.DnoP4yZALr4L7XJ1UatuOlIPE8ywCprE2ursg20LYVlW0mku.8CS'),
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
  `thoigiankm` datetime NOT NULL,
  `makh` varchar(50) NOT NULL,
  `masp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('MD-451', 'Miếng dán'),
('PM-515', 'Phấn'),
('SK-642', 'Sức khỏe'),
('SS-036', 'Son'),
('TT-942', 'Phụ kiện');

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
('MJBJA12341', 'Nguyễn Văn Pha', '84510020', 'Pha@gmail.com', 'NinhThuan', 'Nhân viên', 10);

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
('JP-985', 'Jaaped', 'Jappend@gmail.com', 'Hà Nội'),
('KK-035', 'Kaiiz', 'Kaiiz123@gmail.com', 'Cần Thơ'),
('NS-567', '3CE', '3CE@gmail.com', 'Hồ Chí Minh'),
('PK-520', 'Kim Đô', 'Kimmdo@gmail.com', 'Đồng Nai'),
('PS-784', 'Daiseque', 'daiseque@gmail.com', 'Đà Nẵng');

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
('17403822670187', 'Mỹ phẩm', '2025-02-24 14:31:00', NULL, 'MJBJA12341'),
('17404137421839', 'Mỹ phẩm', '2025-02-24 23:15:00', NULL, 'MJBJA12341'),
('17404138348128', 'Mỹ phẩm', '2025-02-24 23:17:00', NULL, 'MJBJA12341');

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
  `hinhanh` varchar(255) DEFAULT NULL,
  `gia` int(11) NOT NULL,
  `mansx` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masp`, `tensp`, `maloai`, `ttct`, `soluongsp`, `hinhanh`, `gia`, `mansx`) VALUES
('BZ-954', 'Bột uống Collagen', 'SK-642', 'Bột Uống Collagen chứa collagen và elastin sẽ giúp tăng độ đàn hồi cho làn da', 25, 'Botuongcolagen.png', 399000, 'JP-985'),
('KC-642', 'Kem chống nắng', 'SK-642', 'Bảo vệ da khỏi tác hại của tia UVA và UVB từ ánh nắng mặt trời, cung cấp độ ẩm', 16, 'Kemtamtrangda.png', 425000, 'JP-985'),
('KD-137', 'Kem dưỡng giảm mụn', 'SK-642', 'Giúp giảm tình trạng mụn viêm, hiện nay có rất nhiều các sản phẩm trị mụn', 36, 'Kemduonggiammun.png', 517000, 'KK-035'),
('KD-422', 'Khăn đa năng', 'TT-942', 'Sản phẩm khăn khô đa năng, dùng một lần được làm từ sợi Viscose cực bền nhưng mềm mại và an toàn cho da', 54, 'Khandanang.png', 39000, 'JP-985'),
('MM-841', 'Miếng dán mụn', 'MD-451', 'Tác dụng điều trị mụn hiệu quả nhanh chóng làm giảm mụn với lớp màng siêu mỏng', 120, 'Miengdanmun.png', 45000, 'PS-784'),
('SC-501', 'Son 3Ce', 'SS-036', 'Son kem lì có độ bám cực cao và khả năng lên màu cực chuẩn, son mỏng nhẹ', 60, 'Son3CE.png', 249000, 'NS-567'),
('SC-745', 'Son kem lì', 'SS-036', 'Một loại son bền màu, đa dạng màu sắc, không gây khô môi hay nứt nẻ', 20, 'Sonkemli.png', 169000, 'NS-567'),
('TE-256', 'Tẩy trang', 'SK-642', 'Giúp se khít lỗ chân lông, ngăn ngừa mụn và cải thiện tình trạng da sần sùi', 35, 'Taytrang.png', 312500, 'PS-784');

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
  ADD KEY `madvvc` (`madvvc`);

--
-- Indexes for table `donvivanchuyen`
--
ALTER TABLE `donvivanchuyen`
  ADD PRIMARY KEY (`madvvc`);

--
-- Indexes for table `giaonhanca`
--
ALTER TABLE `giaonhanca`
  ADD PRIMARY KEY (`manv`,`maca`),
  ADD KEY `manv` (`manv`),
  ADD KEY `maca` (`maca`);

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
  ADD KEY `makh` (`makh`),
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
  ADD CONSTRAINT `donhang_ibfk_3` FOREIGN KEY (`madvvc`) REFERENCES `donvivanchuyen` (`madvvc`);

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
  ADD CONSTRAINT `khuyenmai_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`),
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
