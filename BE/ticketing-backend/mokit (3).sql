-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 21 Jun 2022 pada 04.51
-- Versi Server: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mokit`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `show_time_id` int(11) NOT NULL,
  `booking_ticket` int(11) NOT NULL,
  `booking_total_price` int(11) NOT NULL,
  `booking_payment_method` varchar(150) NOT NULL,
  `booking_status` enum('succes','failed') NOT NULL,
  `booking_updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `booking_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`booking_id`, `user_id`, `premiere_id`, `show_time_id`, `booking_ticket`, `booking_total_price`, `booking_payment_method`, `booking_status`, `booking_updated_at`, `booking_created_at`) VALUES
(67, 44, 13, 25, 2, 12, 'paypal', 'succes', '2021-07-06 22:05:45', '2021-07-06 22:05:45'),
(68, 44, 13, 25, 9, 54, 'paypal', 'succes', '2021-07-06 22:07:45', '2021-07-06 22:07:45'),
(69, 44, 13, 25, 2, 12, 'paypal', 'succes', '2021-07-07 08:23:18', '2021-07-07 08:23:18'),
(70, 44, 2, 8, 2, 12, 'gopay', 'succes', '2021-07-13 02:37:47', '2021-07-13 02:37:47'),
(71, 44, 2, 10, 1, 6, 'dana', 'succes', '2021-07-13 02:44:04', '2021-07-13 02:44:04'),
(72, 44, 13, 23, 1, 6, 'ovo', 'succes', '2021-07-13 03:33:07', '2021-07-13 03:33:07'),
(73, 44, 13, 23, 1, 6, 'ovo', 'succes', '2021-07-13 03:33:08', '2021-07-13 03:33:08'),
(74, 44, 2, 7, 2, 12, 'Bank BRI', 'succes', '2021-07-14 07:46:03', '2021-07-14 07:46:03'),
(75, 44, 2, 7, 2, 12, 'Bank BRI', 'succes', '2021-07-14 07:46:30', '2021-07-14 07:46:30'),
(76, 44, 2, 7, 2, 12, 'Bank BRI', 'succes', '2021-07-14 07:46:52', '2021-07-14 07:46:52'),
(77, 44, 2, 7, 2, 12, 'Bank BRI', 'succes', '2021-07-14 07:47:21', '2021-07-14 07:47:21'),
(78, 44, 2, 7, 2, 12, 'Bank BRI', 'succes', '2021-07-14 07:47:31', '2021-07-14 07:47:31'),
(79, 44, 2, 7, 2, 12, 'Bank BRI', 'succes', '2021-07-14 07:47:39', '2021-07-14 07:47:39'),
(80, 44, 2, 7, 2, 12, 'Bank BRI', 'succes', '2021-07-14 07:47:44', '2021-07-14 07:47:44'),
(81, 44, 2, 7, 2, 12, 'Bank BRI', 'succes', '2021-07-14 07:47:45', '2021-07-14 07:47:45'),
(82, 44, 2, 6, 1, 6, 'Bank BRI', 'succes', '2021-07-14 07:48:52', '2021-07-14 07:48:52'),
(83, 44, 2, 6, 1, 6, 'Bank BRI', 'succes', '2021-07-14 07:50:40', '2021-07-14 07:50:40'),
(84, 44, 2, 6, 1, 6, 'Bank BRI', 'succes', '2021-07-14 07:50:51', '2021-07-14 07:50:51'),
(85, 44, 2, 7, 1, 6, 'Bank BRI', 'succes', '2021-07-14 07:51:29', '2021-07-14 07:51:29'),
(86, 44, 2, 7, 2, 12, 'ovo', 'succes', '2021-07-15 03:09:45', '2021-07-15 03:09:45'),
(87, 44, 2, 7, 1, 6, 'paypal', 'succes', '2021-07-18 14:42:27', '2021-07-18 14:42:27'),
(88, 44, 2, 7, 1, 6, 'ovo', 'succes', '2021-07-19 02:40:33', '2021-07-19 02:40:33'),
(89, 44, 54, 74, 2, 224466, 'gopay', 'succes', '2022-05-11 06:37:42', '2022-05-11 06:37:42'),
(90, 44, 54, 74, 1, 112233, 'ovo', 'succes', '2022-05-17 14:01:00', '2022-05-17 14:01:00'),
(91, 44, 54, 74, 1, 112233, 'ovo', 'succes', '2022-05-17 14:14:17', '2022-05-17 14:14:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking_ruangan`
--

CREATE TABLE `booking_ruangan` (
  `id` int(11) NOT NULL,
  `id_peminjam` varchar(150) NOT NULL,
  `booking_ruangan_nama` varchar(150) NOT NULL,
  `booking_ruangan_nip` varchar(150) NOT NULL,
  `booking_ruangan_unitkerja` varchar(150) NOT NULL,
  `booking_ruangan_tanggal` varchar(50) NOT NULL,
  `booking_ruangan_nohp` varchar(150) NOT NULL,
  `booking_ruangan_direktorat` varchar(150) NOT NULL,
  `booking_ruangan_email` varchar(150) NOT NULL,
  `booking_ruangan_penaggung_jawab` varchar(150) NOT NULL,
  `booking_ruangan_keterangan_kegiatan_acara` varchar(150) NOT NULL,
  `booking_ruangan_ruangan` varchar(150) NOT NULL,
  `booking_ruangan_waktu_penggunaan_awal` time NOT NULL,
  `booking_ruangan_waktu_penggunaan_akhir` time NOT NULL,
  `booking_ruangan_surat_dinas` varchar(150) NOT NULL,
  `booking_ruangan_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `booking_ruangan_updated_at` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `booking_ruangan`
--

INSERT INTO `booking_ruangan` (`id`, `id_peminjam`, `booking_ruangan_nama`, `booking_ruangan_nip`, `booking_ruangan_unitkerja`, `booking_ruangan_tanggal`, `booking_ruangan_nohp`, `booking_ruangan_direktorat`, `booking_ruangan_email`, `booking_ruangan_penaggung_jawab`, `booking_ruangan_keterangan_kegiatan_acara`, `booking_ruangan_ruangan`, `booking_ruangan_waktu_penggunaan_awal`, `booking_ruangan_waktu_penggunaan_akhir`, `booking_ruangan_surat_dinas`, `booking_ruangan_created_at`, `booking_ruangan_updated_at`) VALUES
(40, '62', 'Bambang', '12345', 'Tu. Dirjen', '1667260800000', '0852', 'Sekertariat P2P', 'test08@gmail.com', 'bambang', 'rapat besar', 'Direktor P2PTM 1', '08:00:00', '12:00:00', '', '2022-06-05 16:00:27', ''),
(42, '62', 'Bambang', '12345', 'Tu. Dirjen', '1667260800000', '0852', 'Sekertariat P2P', 'test08@gmail.com', 'bambang', 'rapat besar', 'Direktor P2PTM 1', '08:00:00', '12:00:00', '', '2022-06-05 16:00:27', ''),
(64, '44', 'fety erlina', '111110990908', 'Gangguan Indra Dan Funsional', '1656115200000', '000087986899', 'P2PTM', 'fetyfety2@gmail.com', 'asmi ', 'penegahan mata minus pada ana usia dini', 'Direktorat P2PM ', '11:00:00', '15:00:00', '2022-06-10T05-32-45.378Z16f5ffb7-6943-4ae1-8016-77d375f4e709.jpg', '2022-06-10 05:45:32', ''),
(69, '44', 'qwqw', '12', 'Subag Adum P2PM', '1657756800000', '0129', 'P2PM', 'g@gmail.com', 'asss', 'zxcv', 'Ruang Rapat 503 ', '08:00:00', '09:56:00', '2022-06-14T02-54-23.773Z26658de1-a2df-4946-968e-a8f2a75cc83a.jpg', '2022-06-14 02:54:34', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `booking_seat_location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `booking_seat`
--

INSERT INTO `booking_seat` (`booking_seat_id`, `booking_id`, `booking_seat_location`) VALUES
(106, 67, 'E11'),
(107, 67, 'E12'),
(108, 68, 'F11'),
(109, 68, 'F12'),
(110, 68, 'G12'),
(111, 68, 'G13'),
(112, 68, 'G14'),
(113, 68, 'D10'),
(114, 68, 'C10'),
(115, 68, 'B10'),
(116, 68, 'A10'),
(117, 69, 'D12'),
(118, 69, 'C12'),
(119, 70, 'E11'),
(120, 70, 'D11'),
(121, 71, 'D9'),
(122, 72, 'B3'),
(123, 73, 'B3'),
(124, 84, 'G9'),
(125, 85, 'E12'),
(126, 86, 'D12'),
(127, 86, 'C12'),
(128, 87, 'E11'),
(129, 88, 'B12'),
(130, 89, 'E9'),
(131, 89, 'E10'),
(132, 90, 'G8'),
(133, 91, 'G11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `laporan`
--

CREATE TABLE `laporan` (
  `id_laporan` int(20) NOT NULL,
  `namaruang_r` varchar(15) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `jumlahkursi` int(3) NOT NULL,
  `nama_p` varchar(100) NOT NULL,
  `jabatan` varchar(100) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `tgl_pinjam` date NOT NULL,
  `jam_pinjam` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `laporan_ruangan`
--

CREATE TABLE `laporan_ruangan` (
  `id` int(11) NOT NULL,
  `id_peminjam` varchar(100) NOT NULL,
  `booking_ruangan_nama` varchar(150) NOT NULL,
  `booking_ruangan_nip` varchar(150) NOT NULL,
  `booking_ruangan_unitkerja` varchar(150) NOT NULL,
  `booking_ruangan_tanggal` varchar(50) NOT NULL,
  `booking_ruangan_nohp` varchar(150) NOT NULL,
  `booking_ruangan_direktorat` varchar(150) NOT NULL,
  `booking_ruangan_email` varchar(150) NOT NULL,
  `booking_ruangan_penaggung_jawab` varchar(150) NOT NULL,
  `booking_ruangan_keterangan_kegiatan_acara` varchar(150) NOT NULL,
  `booking_ruangan_ruangan` varchar(150) NOT NULL,
  `booking_ruangan_waktu_penggunaan_awal` varchar(250) NOT NULL,
  `booking_ruangan_waktu_penggunaan_akhir` varchar(250) NOT NULL,
  `status_booking_ruangan` varchar(15) NOT NULL,
  `booking_ruangan_surat_dinas` varchar(150) NOT NULL,
  `booking_ruangan_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `booking_ruangan_updated_at` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `laporan_ruangan`
--

INSERT INTO `laporan_ruangan` (`id`, `id_peminjam`, `booking_ruangan_nama`, `booking_ruangan_nip`, `booking_ruangan_unitkerja`, `booking_ruangan_tanggal`, `booking_ruangan_nohp`, `booking_ruangan_direktorat`, `booking_ruangan_email`, `booking_ruangan_penaggung_jawab`, `booking_ruangan_keterangan_kegiatan_acara`, `booking_ruangan_ruangan`, `booking_ruangan_waktu_penggunaan_awal`, `booking_ruangan_waktu_penggunaan_akhir`, `status_booking_ruangan`, `booking_ruangan_surat_dinas`, `booking_ruangan_created_at`, `booking_ruangan_updated_at`) VALUES
(40, '44', 'bambang', '34561', 'Tu. Dirjen', '1656633600000', '23456', 'Sekertariat P2P', 'test@gmail.com', 'bambang', 'rapat besar', 'Ruang Rapat 503 ', '13:00:00', '16:00:00', 'Selesai', '', '2022-06-05 15:36:41', ''),
(65, '62', 'Bambang', '12345', 'Tu. Dirjen', '1667260800000', '0852', 'Sekertariat P2P', 'test08@gmail.com', 'bambang', 'rapat besar sangat sangat sangatsangat sangat sangatsangat sangat sangatsangat sangat sangat', 'Direktor P2PTM 1', '08:00:00', '12:00:00', 'Dibatalkan', '', '2022-06-10 05:35:02', ''),
(66, '44', 'fety erlina', '111110990908', 'Gangguan Indra Dan Funsional', '1656115200000', '000087986899', 'P2PTM', 'fetyfety2@gmail.com', 'asmi ', 'penegahan mata minus pada ana usia dini', 'Direktorat P2PM ', '11:00:00', '15:00:00', 'Selesai', '2022-06-10T05-32-45.378Z16f5ffb7-6943-4ae1-8016-77d375f4e709.jpg', '2022-06-10 05:35:07', ''),
(68, '62', 'syaiful jamil', '111110900007658', 'Subag Adum Pengelolaan Imunisasi', '1643068800000', '098765475769', 'Pengelolaan  Imunisasi', 'syaifuljamil@gmail.com', 'adum imunisasi', 'sosialisas pentingnya imunisasi terhadap anasosialisas pentingnya imunisasi terhadap anasosialisas pentingnya imunisasi terhadap anasosialisas ', 'Ruang Rapat 503 ', '08:00:00', '11:00:00', 'Selesai', '2022-06-10T01-23-39.765Z16f5ffb7-6943-4ae1-8016-77d375f4e709.jpg', '2022-06-10 05:50:11', ''),
(105, '44', 'risqi', '12930', 'Tu. Dirjen', '1655078400000', '0928', 'Sekertariat P2P', 'g@gmail.com', 'saya', 'hehehe', 'Direktor P2PTM 1', '12:00:00', '14:39:00', 'Selesai', '2022-06-13T07-37-08.761Z26658de1-a2df-4946-968e-a8f2a75cc83a.jpg', '2022-06-13 07:40:22', ''),
(106, '44', 'nama saya', '1234', 'Tu. Dirjen', '1643760000000', '087361', 'Sekertariat P2P', 'w@gmail.com', 'saya juga', 'buat rapat besar dengan menteri mendada ini ya', 'Direktor P2PTM 1', '01:00:00', '13:00:00', 'Dibatalkan', '2022-06-19T13-45-46.230Z26658de1-a2df-4946-968e-a8f2a75cc83a.jpg', '2022-06-19 13:46:02', ''),
(107, '62', 'mas wahyu', '012345', 'Tu. Dirjen', '1655769600000', '085123456', 'Sekertariat P2P', 'test@gmail.com', 'pa Adum', 'rapat penting', 'Direktorat P2PM ', '08:00:00', '09:00:00', 'Selesai', '2022-06-21T01-28-11.513Z26658de1-a2df-4946-968e-a8f2a75cc83a.jpg', '2022-06-21 01:30:13', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location_city` varchar(250) NOT NULL,
  `location_addres` varchar(250) NOT NULL,
  `location_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `location`
--

INSERT INTO `location` (`location_id`, `location_city`, `location_addres`, `location_created_at`, `location_updated_at`) VALUES
(1, 'purwokerto', 'Whatever street', '2021-04-26 05:05:24', '2021-04-26 05:05:24'),
(2, 'Jakarta', 'Jl. Pondok Gede', '2021-04-26 05:05:24', '2021-04-26 05:05:24'),
(3, 'Semarang', 'Jl. Pattimura', '2021-04-26 05:05:59', '2021-04-26 05:05:59'),
(4, 'Surabaya', 'Jl. Jend. Sudirman', '2021-04-28 15:44:01', '2021-04-28 15:44:01'),
(6, 'Depok', 'Jl. Ahmad Yani', '2021-04-30 12:47:54', '2021-04-30 12:47:54'),
(7, 'Tangerang', 'Jl. Sutopo', '2021-04-30 12:47:54', '2021-04-30 12:47:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `login_adm`
--

CREATE TABLE `login_adm` (
  `id` int(15) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(250) NOT NULL,
  `movie_category` varchar(100) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_directed_by` varchar(150) NOT NULL,
  `movie_casts` varchar(150) NOT NULL,
  `movie_synopsis` varchar(250) NOT NULL,
  `movie_duration` time NOT NULL,
  `movie_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movie_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movie_image` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_category`, `movie_release_date`, `movie_directed_by`, `movie_casts`, `movie_synopsis`, `movie_duration`, `movie_created_at`, `movie_updated_at`, `movie_image`) VALUES
(2, 'Naruto', 'ewwe', '2021-04-08', '', 'wf', 'ewe', '00:00:12', '2021-04-26 04:59:54', '2021-07-08 03:33:13', '2021-07-07T08-14-52.481Zbca.png'),
(3, 'Jhon Wick', 'Action', '2021-04-02', 'Chad Stahelski', 'Chad Stahelski', 'The third series "John Wick" will tell the continuation of the fate of the assassin after killing the members of the High Table in The Continental. He himself was hunted and his life was valued at USD 14 million (approximately Rp 201 billion). Hunted', '03:01:00', '2021-04-26 05:01:48', '2021-07-06 12:47:06', '2021-04-30T13-52-43.824Zg6.png'),
(5, 'Lion King', 'Action, slice of life, drama', '2021-05-02', 'Jon Favreau', 'Jon Favreau cast', 'After death, the young lion Simba saves himself from his group only to learn the true meaning of responsibility and courage.', '01:31:00', '2021-04-26 05:50:22', '2021-07-06 12:47:23', '2021-04-30T13-54-47.665Zg5.png'),
(21, 'The Witches 123', 'Adventure, Comedy, Family', '2021-06-01', 'sinemac', 'sinemac cast', 'The Witches is a British children''s dark fantasy novel by the British writer Roald Dahl. The story is set partly in Norway and partly in England, and features the experiences of a young English boy and his Norwegian grandmother in a world where child', '02:10:00', '2021-07-06 12:41:04', '2021-07-07 08:24:56', '2021-07-06T12-41-04.747Zcard5.png'),
(23, 'Rurouni Kenshin: The Final', 'Action, Drama', '2021-08-04', 'Mackenyu Arata', ' Rurouni Kenshin', 'Sama seperti serial sebelumnya, film Rurouni Kenshin The Final ini akan mengisahkan tentang Kenshin Himura (Takeru Satoh) yang merupakan seorang pendekar pedang legendaris. Usai restorasi Meiji, Kenshin memilih untuk berhenti membunuh dengan pedangny', '01:05:00', '2021-07-06 13:23:01', '2021-07-06 19:35:05', '2021-07-06T19-35-05.460Zinddex.jpg'),
(25, 'bakugan', 'anime', '2021-07-06', 'asddsa', 'asdas', 'asdsadsd', '02:12:00', '2021-07-07 08:28:31', '2021-07-07 08:28:31', '2021-07-07T08-28-31.434Zcard1.png'),
(26, 'ygygd', 'vghv', '2021-03-16', 'jjd', 'sssss', 'w', '00:00:12', '2022-05-17 04:50:16', '2022-05-17 04:50:16', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `paket`
--

CREATE TABLE `paket` (
  `paket_id` int(11) NOT NULL,
  `paket_name` varchar(250) NOT NULL,
  `paket_harga` varchar(250) NOT NULL,
  `paket_total` varchar(250) NOT NULL,
  `paket_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `paket_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `paket`
--

INSERT INTO `paket` (`paket_id`, `paket_name`, `paket_harga`, `paket_total`, `paket_created_at`, `paket_updated_at`) VALUES
(1, 'indosat 2gb', '20000', '100', '2021-08-26 15:33:03', '2021-08-26 15:33:03');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjam`
--

CREATE TABLE `peminjam` (
  `id_p` int(20) NOT NULL,
  `nama_p` varchar(100) NOT NULL,
  `nip_peminjam` varchar(150) NOT NULL,
  `jabatan` varchar(100) NOT NULL,
  `instasi_peminjam` varchar(100) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` varchar(150) NOT NULL,
  `location_id` int(11) NOT NULL,
  `premiere_name` varchar(250) NOT NULL,
  `premiere_price` int(11) NOT NULL,
  `premiere_logo` varchar(150) NOT NULL,
  `premiere_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `premiere_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `premiere_name`, `premiere_price`, `premiere_logo`, `premiere_created_at`, `premiere_updated_at`) VALUES
(1, '2', 1, 'Ebv.Id', 3, '2021-04-30T13-41-23.136Zlogo_2.png', '2021-04-26 05:10:01', '2021-04-30 13:41:23'),
(2, '2', 2, 'Hiflix', 6, '2021-04-30T13-43-45.638Zlogo_4.png', '2021-04-26 05:10:01', '2021-04-30 13:42:24'),
(3, '2', 3, 'Cinema21', 10, '2021-04-30T13-42-24.022Zlogo_3.png', '2021-04-26 05:11:09', '2021-04-30 13:43:45'),
(12, '2', 4, 'Ebv.Id', 3, '2021-04-30T13-41-23.136Zlogo_2.png', '2021-04-26 05:10:01', '2021-04-30 13:41:23'),
(13, '2', 6, 'Hiflix', 6, '2021-04-30T13-43-45.638Zlogo_4.png', '2021-04-26 05:10:01', '2021-04-30 13:42:24'),
(14, '2', 7, 'Cinema21', 10, '2021-04-30T13-42-24.022Zlogo_3.png', '2021-04-26 05:11:09', '2021-04-30 13:43:45'),
(15, '3', 1, 'Ebv.Id', 3, '2021-04-30T13-41-23.136Zlogo_2.png', '2021-04-26 05:10:01', '2021-04-30 13:41:23'),
(16, '3', 2, 'Hiflix', 6, '2021-04-30T13-43-45.638Zlogo_4.png', '2021-04-26 05:10:01', '2021-04-30 13:42:24'),
(17, '3', 3, 'Cinema21', 10, '2021-04-30T13-42-24.022Zlogo_3.png', '2021-04-26 05:11:09', '2021-04-30 13:43:45'),
(18, '3', 4, 'Ebv.Id', 3, '2021-04-30T13-41-23.136Zlogo_2.png', '2021-04-26 05:10:01', '2021-04-30 13:41:23'),
(19, '3', 6, 'Hiflix', 6, '2021-04-30T13-43-45.638Zlogo_4.png', '2021-04-26 05:10:01', '2021-04-30 13:42:24'),
(20, '3', 7, 'Cinema21', 10, '2021-04-30T13-42-24.022Zlogo_3.png', '2021-04-26 05:11:09', '2021-04-30 13:43:45'),
(21, '3', 1, 'Ebv.Id', 3, '2021-04-30T13-41-23.136Zlogo_2.png', '2021-04-26 05:10:01', '2021-04-30 13:41:23'),
(23, '3', 3, 'Cinema21', 10, '2021-04-30T13-42-24.022Zlogo_3.png', '2021-04-26 05:11:09', '2021-04-30 13:43:45'),
(24, '3', 4, 'Ebv.Id', 3, '2021-04-30T13-41-23.136Zlogo_2.png', '2021-04-26 05:10:01', '2021-04-30 13:41:23'),
(25, '3', 6, 'Hiflix', 6, '2021-04-30T13-43-45.638Zlogo_4.png', '2021-04-26 05:10:01', '2021-04-30 13:42:24'),
(26, '3', 7, 'Cinema21', 10, '2021-04-30T13-42-24.022Zlogo_3.png', '2021-04-26 05:11:09', '2021-04-30 13:43:45'),
(27, '4', 1, 'Ebv.Id', 3, '2021-04-30T13-41-23.136Zlogo_2.png', '2021-04-26 05:10:01', '2021-04-30 13:41:23'),
(29, '4', 3, 'Cinema21', 10, '2021-04-30T13-42-24.022Zlogo_3.png', '2021-04-26 05:11:09', '2021-04-30 13:43:45'),
(30, '4', 4, 'Ebv.Id', 3, '2021-04-30T13-41-23.136Zlogo_2.png', '2021-04-26 05:10:01', '2021-04-30 13:41:23'),
(31, '4', 6, 'Hiflix', 6, '2021-04-30T13-43-45.638Zlogo_4.png', '2021-04-26 05:10:01', '2021-04-30 13:42:24'),
(32, '4', 7, 'Cinema21', 10, '2021-04-30T13-42-24.022Zlogo_3.png', '2021-04-26 05:11:09', '2021-04-30 13:43:45'),
(54, '2', 1, 'hiflix', 112233, '2021-04-30T13-43-45.638Zlogo_4.png', '2021-07-21 03:55:41', '2021-07-21 03:55:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ruangan`
--

CREATE TABLE `ruangan` (
  `id_r` int(11) NOT NULL,
  `namaruang_r` varchar(50) NOT NULL,
  `ruangan_lantai` varchar(150) NOT NULL,
  `alamat_gedung` varchar(100) NOT NULL,
  `jumlah_kursi` int(5) NOT NULL,
  `image_ruangan` varchar(150) NOT NULL,
  `ruangan_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ruangan_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `ruangan`
--

INSERT INTO `ruangan` (`id_r`, `namaruang_r`, `ruangan_lantai`, `alamat_gedung`, `jumlah_kursi`, `image_ruangan`, `ruangan_created_at`, `ruangan_updated_at`) VALUES
(11, 'Ruang Rapat 503 ', '5', 'Gedung dr. Adhyatma', 35, 'RuangRapat503.jpg', '2022-05-17 00:31:24', '2022-05-17 00:31:24'),
(12, 'Direktorat Imunisasi', '8', 'Gedung dr. Adhyatma', 25, 'imunisasi.jpg', '2022-05-17 00:33:40', '2022-05-17 00:33:40'),
(13, 'Direktorat P2PM ', '5', 'Gedung dr. Adhyatma', 25, 'RUANG RAPAT P2PM LT 6.jpeg', '2022-05-17 00:35:12', '2022-05-17 00:35:12'),
(14, 'Direktor P2PTM 1', '11', 'Gedung Prof. Sujudi', 25, 'RUANG RAPAT GD SUJUDI P2PTM LT 11 (2).jpeg', '2022-05-17 00:36:35', '2022-05-17 00:36:35'),
(15, 'Direktorat Surkarkes', '6', 'Gedung dr. Adhyatma', 25, 'RUANG RAPAT SUKARKES LT 6.jpeg', '2022-05-17 00:37:56', '2022-05-17 00:37:56'),
(16, 'Ex ULP', '9', 'Gedung dr. Adhyatma', 5, 'exULP.jpg', '2022-05-17 00:37:56', '2022-05-17 00:37:56'),
(17, 'Ex BPK', '9', 'Gedung dr. Adhyatma', 10, 'exBPK.jpg', '2022-05-17 00:39:33', '2022-05-17 00:39:33'),
(18, 'Percetakan Negara no29', '2', 'Gedung D', 25, 'RUANG RAPAT P2PTM SIJUDI LT 11 (1).jpeg', '2022-05-17 00:39:33', '2022-05-17 00:39:33'),
(19, 'Direktor P2PTM  2', '11', 'Gedung Prof. Sujudi', 25, '', '2022-05-17 00:36:35', '2022-05-17 00:36:35'),
(20, 'bnnb', 'nn', 'n', 1, '2022-06-13T02-48-20.597Z26658de1-a2df-4946-968e-a8f2a75cc83a.jpg', '2022-06-13 02:48:20', '2022-06-13 02:48:20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `show_time`
--

CREATE TABLE `show_time` (
  `show_time_id` int(11) NOT NULL,
  `show_time_date` date NOT NULL,
  `show_time_date_end` date NOT NULL,
  `show_time_clock` varchar(100) NOT NULL,
  `show_time_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `show_time_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `premiere_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `show_time`
--

INSERT INTO `show_time` (`show_time_id`, `show_time_date`, `show_time_date_end`, `show_time_clock`, `show_time_created_at`, `show_time_updated_at`, `premiere_id`) VALUES
(1, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 1),
(2, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 1),
(3, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 1),
(4, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 1),
(5, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 1),
(6, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 2),
(7, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 2),
(8, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 2),
(9, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 2),
(10, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 2),
(11, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 3),
(12, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 3),
(13, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 3),
(14, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 3),
(15, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 3),
(16, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 12),
(17, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 12),
(18, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 12),
(19, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 12),
(20, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 12),
(21, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 13),
(22, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 13),
(23, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 13),
(24, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 13),
(25, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 13),
(26, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 14),
(27, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 14),
(28, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 14),
(29, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 14),
(30, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 14),
(31, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 15),
(32, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 15),
(33, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 15),
(34, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 15),
(35, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 15),
(36, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 16),
(37, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 16),
(38, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 16),
(39, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 16),
(40, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 16),
(41, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 17),
(42, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 17),
(43, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 17),
(44, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 17),
(45, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 17),
(46, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 18),
(47, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 18),
(48, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 18),
(49, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 18),
(50, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 18),
(51, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 19),
(52, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 19),
(53, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 19),
(54, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 19),
(55, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 19),
(56, '2021-04-22', '0000-00-00', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 20),
(57, '2021-04-15', '0000-00-00', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 20),
(58, '2021-04-22', '0000-00-00', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 20),
(59, '2021-04-22', '0000-00-00', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 20),
(60, '2021-07-07', '0000-00-00', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 20),
(61, '0000-00-00', '0000-00-00', '12', '2021-07-15 02:47:07', '2021-07-15 02:47:07', 41),
(62, '0000-00-00', '0000-00-00', '12', '2021-07-18 10:14:42', '2021-07-18 10:14:42', 42),
(63, '0000-00-00', '2021-12-12', '12', '2021-07-18 10:17:55', '2021-07-18 10:17:55', 43),
(64, '2021-07-01', '2021-07-18', '1', '2021-07-18 12:09:02', '2021-07-18 12:09:02', 44),
(65, '2021-07-02', '2021-07-18', '12', '2021-07-18 13:14:10', '2021-07-18 13:14:10', 45),
(66, '2021-07-02', '2021-07-14', '1', '2021-07-18 13:20:02', '2021-07-18 13:20:02', 46),
(67, '2021-06-29', '2021-07-14', '12', '2021-07-18 13:24:18', '2021-07-18 13:24:18', 47),
(68, '2021-07-01', '2021-07-28', '2', '2021-07-18 13:27:17', '2021-07-18 13:27:17', 48),
(69, '2021-07-01', '2021-07-31', '4', '2021-07-18 13:28:32', '2021-07-18 13:28:32', 49),
(70, '2021-06-29', '2021-07-22', '2', '2021-07-18 13:30:52', '2021-07-18 13:30:52', 50),
(71, '2021-07-02', '2021-07-14', '12', '2021-07-18 14:21:10', '2021-07-18 14:21:10', 51),
(72, '2021-06-29', '2021-07-21', '3', '2021-07-18 14:22:41', '2021-07-18 14:22:41', 52),
(73, '2021-08-13', '2021-07-02', '456', '2021-07-18 15:39:45', '2021-07-18 15:39:45', 53),
(74, '2021-07-21', '2021-07-30', '12.00 am', '2021-07-21 03:55:41', '2021-07-21 03:55:41', 54);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user_role` enum('basic','admin') NOT NULL,
  `user_verification` enum('pending','succes') NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_nip` varchar(30) NOT NULL,
  `user_unit_kerja` varchar(100) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_phone_number` varchar(13) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_profile_image` varchar(150) DEFAULT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `user_role`, `user_verification`, `user_name`, `user_nip`, `user_unit_kerja`, `user_email`, `user_phone_number`, `user_password`, `user_profile_image`, `user_created_at`, `user_updated_at`) VALUES
(44, 'admin', 'succes', 'Ricky Syahputra', '', '', 'asd@gmail.com', '123', '$2b$10$9x9CbVg8QV.B9yCQRQ.ZNOwSTMROtiLKx82rfKwidQEHm7CjDbbYS', '2021-08-11T11-01-30.220ZEllipse 11.png', '2021-07-04 11:36:53', NULL),
(62, 'basic', 'succes', 'dada', '123123', 'kemenkes', 'abc@gmail.com', '08512763', '$2b$10$gFzvl51N2YRIbHI49vBVN.JsK9j.j1Xt9fqBI6uMMGy7rT8X8LU2O', NULL, '2022-05-20 04:35:04', NULL),
(63, 'basic', 'succes', 'fety erlina', '3421234', 'Subag Adum PL', 'test07@gmail.com', '08977', '$2b$10$FuCh3/XKHyu7SEq29l5/jO0G7Bmn52VjtfC7/IZRT9hs2Foyec3ZO', NULL, '2022-05-22 13:26:09', NULL),
(65, 'basic', 'succes', 'Bambang sabirin', '123456', 'Kangker dan Kelainan Darah', 'test09@gmail.com', '4321', '$2b$10$NOVJwqzsI2/Y72yBDaX4lejA5d.iRFaWCFhgW.8h7Ok2FWa61Bomq', '2021-08-09T07-56-53.893Z2021-07-27T03-55-16.969ZEllipse 11.png', '2021-07-04 10:46:34', '2022-05-22 15:00:40'),
(66, 'admin', 'succes', 'aripiansyah', '342485', 'Tu. Dirjen', 'test08@gmail.com', '08573281', '$2b$10$9x9CbVg8QV.B9yCQRQ.ZNOwSTMROtiLKx82rfKwidQEHm7CjDbbYS', '2021-08-11T11-01-30.220ZEllipse 11.png', '2021-07-04 11:36:53', NULL),
(67, 'basic', 'succes', 'ricky syahputra', '748374', 'Sekertariat P2P (Program dan Informasi)', 'g@gmail.com', '08932847', '$2b$10$g364seEZr5dEkk5JApy2EuuYouvfvPp3iokpR4nd6kRsptxBKapni', '', '2021-07-07 07:53:11', '2022-05-22 15:03:05'),
(68, 'admin', 'succes', 'fety', '1234', 'Sekertariat P2P (Program dan Informasi)', 'fety@gmail.com', '085263512', '$2b$10$YfZGfU/pnjR.IHd2.ebEb.MHvKXZD73bZTwRb6cJeJow0E4AMtvDS', NULL, '2022-06-21 01:43:28', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `usertickitz`
--

CREATE TABLE `usertickitz` (
  `user_id` int(11) NOT NULL,
  `user_role` enum('basic','admin') NOT NULL,
  `user_verification` enum('pending','succes') NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_phone_number` varchar(13) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_profile_image` varchar(150) DEFAULT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `usertickitz`
--

INSERT INTO `usertickitz` (`user_id`, `user_role`, `user_verification`, `user_name`, `user_email`, `user_phone_number`, `user_password`, `user_profile_image`, `user_created_at`, `user_updated_at`) VALUES
(43, 'basic', 'succes', 'rickyda putra', 'syahputraricky2@gmail.com', '4321', '$2b$10$Kp9O/JBdc6tfxEZinki13./Fv.HtMK8EhHz4XiGXfgWwtGqGavAMu', '2021-08-09T07-56-53.893Z2021-07-27T03-55-16.969ZEllipse 11.png', '2021-07-04 10:46:34', NULL),
(44, 'admin', 'succes', 'Ricky Syahputra', 'asd@gmail.com', '123', '$2b$10$9x9CbVg8QV.B9yCQRQ.ZNOwSTMROtiLKx82rfKwidQEHm7CjDbbYS', '2021-08-11T11-01-30.220ZEllipse 11.png', '2021-07-04 11:36:53', NULL),
(45, 'basic', 'succes', 'asd asd', 'g@gmail.com', '231', '$2b$10$g44/iZfGWoV0u/T6q.JYvemY3SonEFbsY2fMid/nWwQOpIMXBNCoi', '', '2021-07-07 07:53:11', NULL),
(46, 'basic', 'succes', 'undefined undefined', 'kintilbakang@gmail.com', '085712287514', '$2b$10$D3IKqAh9FS3iCJ0xhhyPo.bbj5l0iBOxHlY8GPmfBk1lfMrYT8lya', '', '2021-07-07 08:17:11', NULL),
(47, 'basic', 'succes', 'asdad Syahputra', 'as22d@gmail.com', '08618283', '$2b$10$4ab8vMVkm/OUIRcjO7cyU.2Rr1Qcd.e9G..XBuFfNrublR08AXspi', '', '2021-08-17 11:03:10', NULL),
(48, 'basic', 'pending', 'undefined undefined', 'gtrd2rd2@gmail.com', '085712287514', '$2b$10$DeNYRInLXlayDk9zinFYo.LVQAhCjaNZvUrR9nz/b6A0jhmwkYMsC', NULL, '2021-08-17 12:06:09', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `waitinglist_ruangan`
--

CREATE TABLE `waitinglist_ruangan` (
  `id` int(11) NOT NULL,
  `id_peminjam` varchar(150) NOT NULL,
  `booking_ruangan_nama` varchar(150) NOT NULL,
  `booking_ruangan_nip` varchar(150) NOT NULL,
  `booking_ruangan_unitkerja` varchar(150) NOT NULL,
  `booking_ruangan_tanggal` varchar(50) NOT NULL,
  `booking_ruangan_nohp` varchar(150) NOT NULL,
  `booking_ruangan_direktorat` varchar(150) NOT NULL,
  `booking_ruangan_email` varchar(150) NOT NULL,
  `booking_ruangan_penaggung_jawab` varchar(150) NOT NULL,
  `booking_ruangan_keterangan_kegiatan_acara` varchar(150) NOT NULL,
  `booking_ruangan_ruangan` varchar(150) NOT NULL,
  `booking_ruangan_waktu_penggunaan_awal` time NOT NULL,
  `booking_ruangan_waktu_penggunaan_akhir` time NOT NULL,
  `booking_ruangan_surat_dinas` varchar(150) NOT NULL,
  `booking_ruangan_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `booking_ruangan_updated_at` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `booking_ruangan`
--
ALTER TABLE `booking_ruangan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`booking_seat_id`);

--
-- Indexes for table `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`id_laporan`);

--
-- Indexes for table `laporan_ruangan`
--
ALTER TABLE `laporan_ruangan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `login_adm`
--
ALTER TABLE `login_adm`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`paket_id`);

--
-- Indexes for table `peminjam`
--
ALTER TABLE `peminjam`
  ADD PRIMARY KEY (`id_p`);

--
-- Indexes for table `premiere`
--
ALTER TABLE `premiere`
  ADD PRIMARY KEY (`premiere_id`);

--
-- Indexes for table `ruangan`
--
ALTER TABLE `ruangan`
  ADD PRIMARY KEY (`id_r`);

--
-- Indexes for table `show_time`
--
ALTER TABLE `show_time`
  ADD PRIMARY KEY (`show_time_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usertickitz`
--
ALTER TABLE `usertickitz`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `waitinglist_ruangan`
--
ALTER TABLE `waitinglist_ruangan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;
--
-- AUTO_INCREMENT for table `booking_ruangan`
--
ALTER TABLE `booking_ruangan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT for table `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;
--
-- AUTO_INCREMENT for table `laporan`
--
ALTER TABLE `laporan`
  MODIFY `id_laporan` int(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `laporan_ruangan`
--
ALTER TABLE `laporan_ruangan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `login_adm`
--
ALTER TABLE `login_adm`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `paket`
--
ALTER TABLE `paket`
  MODIFY `paket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `peminjam`
--
ALTER TABLE `peminjam`
  MODIFY `id_p` int(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `ruangan`
--
ALTER TABLE `ruangan`
  MODIFY `id_r` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `show_time`
--
ALTER TABLE `show_time`
  MODIFY `show_time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `usertickitz`
--
ALTER TABLE `usertickitz`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `waitinglist_ruangan`
--
ALTER TABLE `waitinglist_ruangan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
