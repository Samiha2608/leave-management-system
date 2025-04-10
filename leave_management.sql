-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2025 at 02:16 PM
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
-- Database: `leave_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `class_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `class_name`) VALUES
(11, '2019-CS-A'),
(10, '2019-SE-A'),
(13, '2020-SE-F'),
(6, '2021-CS-A'),
(5, '2021-CS-D'),
(9, '2021-CS-E'),
(1, '2021-SE-A'),
(2, '2021-SE-B'),
(3, '2021-SE-C'),
(4, '2021-SE-D'),
(12, '2021-SE-F'),
(14, '2022-SE-E'),
(8, '2023-CS-D'),
(7, '2024-SE-A'),
(15, '2025-SE-A');

-- --------------------------------------------------------

--
-- Table structure for table `hods`
--

CREATE TABLE `hods` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(100) NOT NULL,
  `role` varchar(50) DEFAULT 'HOD'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hods`
--

INSERT INTO `hods` (`id`, `first_name`, `last_name`, `email`, `password`, `department`, `role`) VALUES
(1, 'Shahzad', 'Asif', 'Shahzad@gmail.com', '$2a$10$5LFWl2M1HaCkIUyuKQrweufZiqvRBWPUpbEQTKE5rSETN/SWjjZf6', 'Computer Science', 'HOD'),
(2, 'Shahzad', 'Asif', 'ShahzadAsif@gmail.com', '$2a$10$qv6eiZMB0GEq1nOIj61ZH.OQIazlZxS0JNB1PYfWeLpXaCHBvNVTC', 'Computer Science', 'HOD');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'student',
  `registration_number` varchar(100) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `first_name`, `last_name`, `email`, `password`, `department`, `role`, `registration_number`, `class_id`, `created_at`) VALUES
(1, 'Samiha', 'Shahzad', 'shahzadsamiha@gmail.com', '$2a$10$Nz704uqkVdg3QTPeA8Z/reJ/No6myIzTBEgCozU4YeqG6AEKUD5ha', 'Computer science', 'student', '2021-SE-33', 2, '2024-10-11 09:16:31'),
(2, 'Nabiha', 'Shahzad', 'nabihashahzad7002@gmail.com', '$2a$10$DoHNLKvtScoGqKUQ9LXgduDyDVzNcnCmGJ0Hxq/wYuewcANPwn3O.', 'Computer science', 'student', '2021-SE-22', 2, '2024-10-11 09:17:18'),
(3, 'azma', 'Hammad', 'Azma@gmail.com', '$2a$10$gqDEoMHOhyi/eyr1KVp3M.3HU.VosjXESH.97JGFTugZi2E2j1M/y', 'Computer science', 'student', '2021-SE-01', 3, '2024-10-11 09:30:59'),
(4, 'hafeez', 'tariq', 'hafeez@gmail.com', '$2a$10$uxkF84fgH2hk2d89Q7hdAepkEJV0h.zHI2IY0jsYXGZT6afij83mW', 'Computer science', 'student', '2021-SE-30', 3, '2024-10-11 09:31:36'),
(5, 'Areeba', 'Tariq', 'Areeba@gmail.com', '$2a$10$M4XPADkt7Vq/88vkXtaUC.HSJ8J9CONoT/zTUoj7tCvMppm/7f3d2', 'Computer science', 'student', '2021-SE-01', 4, '2024-10-11 09:32:12'),
(6, 'huziafa', 'rashid', 'Huzaifa@gmail.com', '$2a$10$EyIDt2RD4cs1RaP11gk4Yukd/QaIJ6JwCoWkWehacqNEGi11OsDbi', 'Computer science', 'student', '2021-SE-89', 3, '2024-10-12 07:32:45'),
(8, 'Areeba', 'Amjad', 'AreebaAmjad@gmail.com', '$2a$10$hnNyu3lxSxEs39pb3FGTyeP4OLCA/huXdrkrOzlWdtOSVj94GG1kK', 'Computer science', 'student', '2021-SE-03', 3, '2024-10-12 12:27:21'),
(9, 'bilal', 'abbas', 'bilal@gmail.com', '$2a$10$6InrdJ6XSEcG2ht/rZDpGOULb5u2tJhHzdL/EGXtJkOHST/femGR6', 'Computer science', 'student', '2021-SE-05', 3, '2024-10-12 12:27:59'),
(10, 'amjad', 'Ali', 'amjad@gmail.com', '$2a$10$KMH8Wde9k48QTDn.G/VkKOu/6vZXNCuo8z4xM0iufedbYkTaVN2b6', 'Computer science', 'student', '2021-SE-6', 3, '2024-10-12 12:29:32'),
(11, 'raza', 'ali', 'raza@gmail.com', '$2a$10$Rv1zVJa5F2xzUG6.q/ROqO2zl6ISAiZ5ONly3O0LMrdgaiwNV3Kbi', 'Computer science', 'student', '2021-SE-8', 3, '2024-10-12 12:30:23'),
(12, 'Farah', 'Batool', 'FarahBatool@gmail.com', '$2a$10$wRODseErvX8MUgBivaoBEOkaQvMHvtzyr0ACR8foJZNxYzau1H/oW', 'Computer science', 'student', '2024-SE-78', 7, '2024-10-14 02:59:58'),
(13, 'Aima', 'Baig', 'Aima@gmail.com', '$2a$10$CNOy7/CToQS6KuuxdgfFPOMKCQhlZxB/BNnGVAzk0FXssHvZ2uTZ.', 'Computer science', 'student', '2024-SE-6', 7, '2024-10-14 03:00:40'),
(14, 'Kokab', 'Fatima', 'Kokab@gmail.com', '$2a$10$hIdYfkk1ihS2j4k0njrG0OlH2g5OBaR1z36KrIjBs6VE.4BUC0bvu', 'Computer science', 'student', '2023-CS-8', 8, '2024-10-15 04:23:43'),
(15, 'Nabiha', 'Ali', 'NabihaAli@gmail.com', '$2a$10$2tSziD3ocvySVwhIA88ipuB2TGiH0Md9SRSVWX0tlI5Vl651qQd3y', 'Computer science', 'student', '2019-SE-01', 10, '2024-10-15 19:01:32'),
(16, 'Shaista', 'Shahzad', 'Shaista@gmail.com', '$2a$10$5t.0O.Slwww8ONrSn2fwFejCLC..DgGokeuLO0WUEPAcyLWXQ7wby', 'Computer science', 'student', '2019-CS-01', 11, '2024-11-10 08:09:21'),
(17, 'Tayyba', 'Hammad', 'Tayyba@gmail.com', '$2a$10$/j.pw8/FwUJJG/1YPiy6e.UYtyHDsSV3TpOyV6cy8MDGWjEmaT3HG', 'Computer science', 'student', '2019-CS-02', 11, '2024-11-10 08:11:14'),
(18, 'Ali', 'Imtyaz', 'AliImtyaz@gmail.com', '$2a$10$YXo2vmywV0xCiqtZOAxk6uXxhbq7sfkwpJbiCcdulhE2skwOCQcN2', 'Computer science', 'student', '2021-SE-66', 12, '2024-11-23 11:02:52'),
(19, 'Abeeha', 'Ijaz', 'Abeeha@gmail.com', '$2a$10$4q5tQRthICA6x7DATaiyeOqN6xLRZvhSK/XLNyuQyxISlbe/HvvVC', 'Computer science', 'student', '2020-SE-88', 13, '2024-11-23 11:08:04'),
(20, 'Iqbal', 'Ali', 'Iqbal@gmail.com', '$2a$10$yfqEBgUkKOervKjR1YbKD.msv0e26HM/w5ZBWoPZsx95Cw6WViLGy', 'Computer science', 'student', '2022-SE-44', 14, '2024-11-23 11:12:41'),
(21, 'Noor ul Huda', 'Saleem', 'NoorulHuda@gmail.com', '$2a$10$Fh5A5AyTtRfhyRkWTmUQk.v3t3cuYwLvSD8SkntFdN.IsBWLBL7c6', 'Computer science', 'student', '2025-SE-33', 15, '2024-12-10 18:32:01'),
(22, 'Usama', 'Jatt', 'Usama@gmail.com', '$2a$10$nxyts8ReVO2MyI35ckLAq.1TRJzVrFpX5FBAmSRwUvCC4IJtziwBm', 'Computer science', 'student', '2025-SE-1', 15, '2024-12-10 18:33:17');

-- --------------------------------------------------------

--
-- Table structure for table `student_leaves`
--

CREATE TABLE `student_leaves` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `reason` text NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `leave_type` varchar(50) NOT NULL,
  `rejoining_date` date NOT NULL,
  `medical_file_attachments` varchar(255) DEFAULT NULL,
  `application_status` varchar(20) DEFAULT 'pending',
  `submitted_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `no_of_leaves` int(11) NOT NULL,
  `manager_remarks` varchar(255) DEFAULT 'none',
  `director_remarks` varchar(255) DEFAULT 'none',
  `hr_remarks` varchar(255) DEFAULT 'none',
  `assigned_to` enum('tutor','hod') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_leaves`
--

INSERT INTO `student_leaves` (`id`, `email`, `class_id`, `reason`, `from_date`, `to_date`, `leave_type`, `rejoining_date`, `medical_file_attachments`, `application_status`, `submitted_on`, `no_of_leaves`, `manager_remarks`, `director_remarks`, `hr_remarks`, `assigned_to`) VALUES
(18, 'Azma@gmail.com', NULL, 'Azma applied for leave', '2024-10-14', '2024-10-15', 'casual', '2024-10-16', '/uploads/1728918399214-Screenshot (175).png', 'rejected', '2024-10-14 15:06:39', 2, 'none', 'none', 'none', NULL),
(19, 'FarahBatool@gmail.com', NULL, 'Farah is ill', '2024-10-15', '2024-10-16', 'medical', '2024-10-17', '/uploads/1728962861363-Campus Portal (2).docx', 'pending', '2024-10-15 03:27:41', 2, 'none', 'none', 'none', NULL),
(20, 'Aima@gmail.com', NULL, 'Aima has work at home', '2024-10-15', '2024-10-16', 'casual', '0000-00-00', NULL, 'pending', '2024-10-15 04:19:22', 2, 'none', 'none', 'none', 'tutor'),
(21, 'Kokab@gmail.com', NULL, 'Kokab is ill', '2024-10-15', '2024-10-16', 'medical', '2024-10-17', '/uploads/1728966819566-Samiha CV.pdf', 'pending', '2024-10-15 04:33:39', 2, 'none', 'none', 'none', 'tutor'),
(22, 'Kokab@gmail.com', NULL, 'kokab has fever', '2024-10-17', '2024-10-23', 'casual', '2024-10-24', '/uploads/1728966871910-Campus Portal (2).docx', 'rejected', '2024-10-15 04:34:31', 7, 'none', 'none', 'none', 'hod'),
(23, 'Kokab@gmail.com', NULL, 'Kokab apply for another leave', '2024-10-24', '2024-10-25', 'casual', '2024-10-26', '/uploads/1728967732488-Samiha CV.pdf', 'pending', '2024-10-15 04:48:52', 2, 'none', 'none', 'none', 'tutor'),
(24, 'Kokab@gmail.com', NULL, 'Cough and fever', '2024-10-16', '2024-10-22', 'medical', '2024-10-18', '/uploads/1729019025726-Samiha CV.docx', 'approved', '2024-10-15 19:03:45', 7, 'none', 'none', 'none', 'hod'),
(25, 'Azma@gmail.com', NULL, 'Fever', '2024-10-16', '2024-10-17', 'medical', '2024-10-18', '/uploads/1729055373915-Samiha CV.pdf', 'pending', '2024-10-16 05:09:33', 2, 'none', 'none', 'none', 'tutor'),
(26, 'Azma@gmail.com', NULL, 'some work at home', '2024-10-16', '2024-10-21', 'casual', '2024-10-22', '/uploads/1729055701564-samiha1.jpg', 'approved', '2024-10-16 05:15:01', 6, 'none', 'none', 'none', 'hod'),
(27, 'Azma@gmail.com', NULL, 'Azma has some issue at home', '2024-10-18', '2024-10-19', 'medical', '2024-10-20', '/uploads/1729236715284-file.pdf', 'pending', '2024-10-18 07:31:55', 2, 'none', 'none', 'none', 'tutor'),
(28, 'Azma@gmail.com', NULL, 'Azma applied for the leave that HOD will accept', '2024-10-18', '2024-10-22', 'casual', '2024-10-23', '/uploads/1729236757806-Samiha CV.pdf', 'approved', '2024-10-18 07:32:37', 5, 'none', 'none', 'none', 'hod'),
(29, 'Azma@gmail.com', NULL, 'Ama HOD', '2024-10-18', '2024-10-24', 'medical', '2024-10-25', '/uploads/1729236885736-Samiha CV.docx', 'rejected', '2024-10-18 07:34:45', 7, 'none', 'none', 'none', 'hod'),
(30, 'Kokab@gmail.com', NULL, 'Kokab HoD', '2024-10-18', '2024-10-22', 'medical', '2024-10-23', NULL, 'approved', '2024-10-18 08:51:49', 5, 'none', 'none', 'none', 'hod'),
(31, 'Kokab@gmail.com', NULL, 'Kokab got food poisoning', '2024-10-22', '2024-10-23', 'casual', '2024-10-24', '/uploads/1729566729360-zara.png', 'pending', '2024-10-22 03:12:09', 2, 'none', 'none', 'none', 'tutor'),
(32, 'Azma@gmail.com', NULL, 'azma food poisoning', '2024-10-22', '2024-10-23', 'medical', '2024-10-24', NULL, 'pending', '2024-10-22 04:24:36', 2, 'none', 'none', 'none', 'tutor'),
(33, 'Azma@gmail.com', NULL, 'Azma is ill', '2024-10-23', '2024-10-24', 'medical', '2024-10-25', '/uploads/1729655355944-zara.png', 'pending', '2024-10-23 03:49:15', 2, 'none', 'none', 'none', 'tutor'),
(34, 'Azma@gmail.com', NULL, 'Azma applied for formal leave', '2024-11-05', '2024-11-06', 'casual', '2024-11-07', '/uploads/1730776769338-zara.png', 'pending', '2024-11-05 03:19:29', 2, 'none', 'none', 'none', 'tutor'),
(35, 'Azma@gmail.com', NULL, 'Azma again applied for formal leave', '2024-11-05', '2024-11-06', 'casual', '2024-11-07', '/uploads/1730776805272-zara.png', 'pending', '2024-11-05 03:20:05', 2, 'none', 'none', 'none', 'tutor'),
(36, 'Azma@gmail.com', NULL, 'Fever', '2024-11-15', '2024-11-06', 'casual', '2024-11-07', NULL, 'pending', '2024-11-05 03:42:20', -8, 'none', 'none', 'none', 'tutor'),
(37, 'Azma@gmail.com', NULL, 'Fever', '2024-11-21', '2024-11-22', 'casual', '2024-11-07', NULL, 'pending', '2024-11-05 03:45:17', 2, 'none', 'none', 'none', 'tutor'),
(38, 'Azma@gmail.com', NULL, 'Fever', '2024-11-27', '2024-11-30', 'annual', '2024-12-01', NULL, 'approved', '2024-11-05 03:46:42', 4, 'none', 'none', 'none', 'hod'),
(39, 'Azma@gmail.com', NULL, 'Fever', '2024-11-10', '2024-11-11', 'casual', '2024-11-12', NULL, 'pending', '2024-11-10 07:17:45', 2, 'none', 'none', 'none', 'tutor'),
(40, 'Azma@gmail.com', 3, 'Azma has some issue at home', '2024-11-14', '2024-11-15', 'casual', '2024-11-12', NULL, 'pending', '2024-11-10 07:53:30', 2, 'none', 'none', 'none', 'tutor'),
(41, 'Aima@gmail.com', 7, 'Aima applied for leave', '2024-11-10', '2024-11-11', 'casual', '2024-11-12', NULL, 'pending', '2024-11-10 08:00:26', 2, 'none', 'none', 'none', ''),
(42, 'Azma@gmail.com', 3, 'a', '2024-12-05', '2024-12-06', 'casual', '2024-11-28', NULL, 'pending', '2024-11-10 08:05:28', 2, 'none', 'none', 'none', 'tutor'),
(43, 'FarahBatool@gmail.com', 7, 'Farah is ill', '2024-11-10', '2024-11-11', 'casual', '2024-11-12', NULL, 'pending', '2024-11-10 08:06:39', 2, 'none', 'none', 'none', ''),
(44, 'Shaista@gmail.com', 11, 'Shaista applied for leave', '2024-11-10', '2024-11-11', 'medical', '2024-11-12', '/uploads/1731226426199-samiha.jpg', 'approved', '2024-11-10 08:13:46', 2, 'none', 'none', 'none', 'tutor'),
(45, 'Tayyba@gmail.com', 11, 'Tayyba applied for leave', '2024-11-10', '2024-11-11', 'casual', '2024-11-12', NULL, 'approved', '2024-11-10 08:14:37', 2, 'none', 'none', 'none', 'tutor'),
(46, 'Azma@gmail.com', 3, 'Azma applied for the leave that HOD will accept', '2024-12-01', '2024-12-04', 'casual', '2024-12-05', NULL, 'approved', '2024-11-12 04:57:53', 4, 'none', 'none', 'none', 'hod'),
(47, 'Azma@gmail.com', 3, 'Food Poisoning', '2024-12-22', '2024-12-27', 'casual', '2024-12-28', NULL, 'rejected', '2024-11-12 05:15:52', 6, 'none', 'none', 'none', 'hod'),
(48, 'Azma@gmail.com', 3, 'Azma applied for leave', '2024-12-15', '2024-12-16', 'medical', '2024-12-17', NULL, 'pending', '2024-11-13 03:49:30', 2, 'none', 'none', 'none', 'tutor'),
(49, 'Kokab@gmail.com', 8, 'Cough and fever', '2024-11-23', '2024-11-24', 'casual', '2024-11-25', '/uploads/1732339294213-2021 SE-33,25,17.docx', 'rejected', '2024-11-23 05:21:34', 2, 'none', 'none', 'none', 'tutor'),
(50, 'FarahBatool@gmail.com', 7, 'Farah is ill', '2024-11-24', '2024-11-25', 'casual', '2024-11-26', NULL, 'pending', '2024-11-23 05:22:20', 2, 'none', 'none', 'none', ''),
(51, 'Shaista@gmail.com', 11, 'Shaista applied for leave on 11:10', '2024-11-23', '2024-11-24', 'casual', '2024-11-25', NULL, 'rejected', '2024-11-23 06:10:39', 2, 'none', 'none', 'none', 'tutor'),
(52, 'Tayyba@gmail.com', 11, 'Tayyba applied for leave on 11:11', '2024-11-27', '2024-11-28', 'casual', '2024-11-29', NULL, 'approved', '2024-11-23 06:11:23', 2, 'none', 'none', 'none', 'tutor'),
(53, 'Kokab@gmail.com', 8, 'Cough and fever', '2024-11-30', '2024-12-01', 'casual', '2024-12-02', NULL, 'rejected', '2024-11-23 09:09:33', 2, 'none', 'none', 'none', 'tutor'),
(54, 'Shaista@gmail.com', 11, 'apply leave shaista', '2024-12-03', '2024-12-04', 'casual', '2024-12-05', '/uploads/1732354665945-Screenshot (174).png', 'approved', '2024-11-23 09:37:45', 2, 'none', 'none', 'none', 'tutor'),
(55, 'Shaista@gmail.com', 11, 'shaista', '2025-01-10', '2025-01-11', 'medical', '2025-01-12', '/uploads/1732355132424-Screenshot (176).png', 'approved', '2024-11-23 09:45:32', 2, 'no remarks from manager', 'no remarks from director', 'none', 'tutor'),
(56, 'Shaista@gmail.com', 11, 'Food Poisoning', '2024-11-27', '2024-11-27', 'medical', '2024-11-28', '/uploads/1732355860743-Screenshot (177).png', 'approved', '2024-11-23 09:57:40', 1, 'none', 'none', 'none', 'tutor'),
(57, 'Shaista@gmail.com', 11, 'Shaista tutor leave', '2024-12-01', '2024-12-01', 'casual', '2024-12-02', '/uploads/1732356133946-Screenshot (176).png', 'approved', '2024-11-23 10:02:13', 1, 'no tutor remarks', 'no hod remarks', 'none', 'tutor'),
(58, 'Shaista@gmail.com', 11, 'shaista hod approval', '2024-12-02', '2024-12-02', 'medical', '2024-12-03', '/uploads/1732356259073-Screenshot (177).png', 'pending', '2024-11-23 10:04:19', 1, 'none', 'none', 'none', 'tutor'),
(59, 'Shaista@gmail.com', 11, 'hod shaista', '2024-12-06', '2024-12-08', 'medical', '2024-12-09', '/uploads/1732356302661-Screenshot (171).png', 'pending', '2024-11-23 10:05:02', 3, 'none', 'none', 'none', 'tutor'),
(60, 'Shaista@gmail.com', 11, 'Shaista applied for leave and hod will approve it', '2025-01-01', '2025-01-05', 'casual', '2025-01-06', '/uploads/1732356415791-zara.png', 'approved', '2024-11-23 10:06:55', 5, 'none', 'no remarks from hod', 'none', 'hod'),
(61, 'Abeeha@gmail.com', 13, 'Abeeha applied for leave', '2024-11-23', '2024-11-23', 'medical', '2024-11-24', '/uploads/1732360178358-Screenshot (169).png', 'pending', '2024-11-23 11:09:38', 1, 'none', 'none', 'none', 'tutor'),
(62, 'Iqbal@gmail.com', 14, 'Iqbal applied for leave', '2024-11-23', '2024-11-23', 'medical', '2024-11-24', '/uploads/1732360542981-zara.png', 'approved', '2024-11-23 11:15:42', 1, 'no remarks from tutor', 'none', 'none', 'tutor'),
(63, 'Iqbal@gmail.com', 14, 'Iqbal applied for leave that hod will approve', '2024-11-25', '2024-11-30', 'casual', '2024-12-01', '/uploads/1732360792610-Screenshot (176).png', 'rejected', '2024-11-23 11:19:52', 6, 'none', 'none', 'none', 'hod'),
(64, 'Usama@gmail.com', 15, 'Usama had fever', '2024-12-10', '2024-12-11', 'medical', '2024-12-12', '/uploads/1733855737295-corrected_campus_portal_architecture.png', 'rejected', '2024-12-10 18:35:37', 2, 'application rejected due to fake medical file', 'none', 'none', 'tutor'),
(65, 'Usama@gmail.com', 15, 'Fever', '2024-12-26', '2024-12-30', 'casual', '2024-12-31', '/uploads/1733856040152-WhatsApp Image 2024-12-07 at 2.06.04 PM.jpeg', 'approved', '2024-12-10 18:40:40', 5, 'none', 'no remarks from hod', 'none', 'hod'),
(66, 'Usama@gmail.com', 15, 'Food Poisoning', '2025-01-01', '2025-01-04', 'casual', '2025-01-05', '/uploads/1733899700934-zara.png', 'approved', '2024-12-11 06:48:20', 4, 'none', 'none', 'none', 'hod'),
(67, 'Usama@gmail.com', 15, 'Fever', '2024-12-17', '2024-12-18', 'medical', '2024-12-19', '/uploads/1733902613428-zara.png', 'approved', '2024-12-11 07:36:53', 2, 'none', 'none', 'none', 'tutor'),
(68, 'Usama@gmail.com', 15, 'Usama applied for leave', '2025-01-10', '2025-01-11', 'casual', '2025-01-12', '/uploads/1734108225902-architecture (1).jpg', 'approved', '2024-12-13 16:43:45', 2, 'none', 'none', 'none', 'tutor'),
(69, 'Azma@gmail.com', 3, '4:49', '2025-04-10', '2025-04-11', 'medical', '2025-04-18', '/uploads/1744285770147-Work break down structure.drawio.png', 'pending', '2025-04-10 11:49:30', 2, 'none', 'none', 'none', 'tutor');

-- --------------------------------------------------------

--
-- Table structure for table `superadmins`
--

CREATE TABLE `superadmins` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(50) DEFAULT 'Computer Science',
  `role` varchar(50) DEFAULT 'superadmin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `superadmins`
--

INSERT INTO `superadmins` (`id`, `first_name`, `last_name`, `email`, `password`, `department`, `role`, `created_at`) VALUES
(1, 'hamza', 'Asif', 'Hamza@gmail.com', '$2a$10$pX.7YoM1u2Pr3Mk1Ldij3OsnJdat7xhxCjttGpDdLbkO0igqkIIO6', 'Computer science', 'superadmin', '2024-10-12 13:11:01');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(100) DEFAULT 'Computer Science',
  `role` varchar(50) DEFAULT 'teacher',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `class_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `first_name`, `last_name`, `email`, `password`, `department`, `role`, `created_at`, `class_id`) VALUES
(1, 'Aliha', 'Ali', 'Aliha@gmail.com', '$2a$10$Jri/etnKgiphZP0b4.FTo.eNaVt/f7yKUsEtrrZm6HQzSoCiRN7Ni', 'Computer science', 'tutor', '2024-10-12 07:31:19', NULL),
(2, 'Samiha', 'Shahzad', 'Samiha@gmail.com', '$2a$10$8ta8U5XiAK5FMo9FocRdeenhQdyajes.8yOJk/90RRUQjGqWzZtJG', 'Computer science', 'tutor', '2024-10-12 12:19:46', NULL),
(3, 'ali', 'imtyaz', 'Ali@gmail.com', '$2a$10$5.xMT2ALLUsgn8xuQ9NZI.t/Pf0o5MfOajh06bkkaqEPvnoVakKWW', 'Computer science', 'teacher', '2024-10-12 12:45:35', NULL),
(4, 'Usman', 'Ghani', 'UsmanGhani@gmail.com', '$2a$10$lLUAB/HPrjnT9wDQdnC.mO9OmBPmzwD/0USevV1R/GgUeaoYkUHUi', 'Computer science', 'tutor', '2024-10-13 18:10:30', NULL),
(5, 'Ahmed', 'Raza', 'Ahmed@gmail.com', '$2a$10$Vxjrp6ns1Qbn6J2.FZ30fesBcuqET/5bXGJWHdS5QsMfS/CKoTKVi', 'Computer science', 'tutor', '2024-10-14 02:48:04', NULL),
(6, 'Umar', 'Qasim', 'UmarQasim@gmail.com', '$2a$10$2t35vuEwEbv9Adypi2.M9uhj11gGl0UHEu/ls4A.OxHqXZuh5/WrO', 'Computer science', 'tutor', '2024-10-15 04:21:54', NULL),
(7, 'Darakhshan', 'Bokhat', 'Darakhshan@gmail.com', '$2a$10$zA5JxiijI3BYwSkMtfYL6u4RX0VS8i4vsETxgmZALSW03y8ZR3ko.', 'Computer science', 'tutor', '2024-10-15 05:15:33', 7),
(8, 'Maryam', 'Mukhtar', 'Maryam@gmail.com', '$2a$10$tUkkzrKtACvf2wJoEvWAo.SoQDGm0jRRu/944bols734xsedQqLna', 'Computer science', 'tutor', '2024-10-15 07:01:48', NULL),
(9, 'Farah', 'Adeeba', 'Farah@gmail.com', '$2a$10$PHO3LXTWWxiM5ROqVYgYoutgAX1iZgVk0AePjUmbMin/dLmGnTQY6', 'Computer science', 'tutor', '2024-10-15 19:00:27', NULL),
(10, 'Aizaz', 'Akmal', 'Aizaz@gmail.com', '$2a$10$htidVR0PN8jJf8dHNh6hR.Ek2unKh.FSOmX2kRTMcsGpWJWdRCfyG', 'Computer science', 'tutor', '2024-11-10 08:12:19', NULL),
(11, 'laraib', 'Aftab', 'Laraib@gmail.com', '$2a$10$nu3NY/vNjlZx5eUiWwA9weK0T23jy38kFYkGmzM9SAJOoc06MogW2', 'Computer science', 'tutor', '2024-11-23 11:01:35', NULL),
(12, 'Fahad', 'Ibad', 'Fahad@gmail.com', '$2a$10$/KBQKI2PjiL/.YdjGI6Hmuvqya9BZXzZXuX1dZa9xV3nX8UIZnBje', 'Computer science', 'tutor', '2024-11-23 11:07:09', NULL),
(13, 'Kamran', 'Ali', 'Kamran@gmail.com', '$2a$10$nbzFmZbePyuKOUte6KqH4eYk2HbIKa/2ZDjtcEuVxD11gxPwyGtn.', 'Computer science', 'tutor', '2024-11-23 11:11:43', NULL),
(14, 'Kamal', 'Aftab', 'Kamal@gmail.com', '$2a$10$7nUvcpNMePy7zoNkxYHysupfwCaap.i7IPcuS/g0jZGTyN3gikKHO', 'Computer science', 'teacher', '2024-11-23 11:21:53', NULL),
(15, 'Armab', 'Saeed', 'Armab@gmail.com', '$2a$10$JkKxnMxPIYIYndY8jEnmA.QX573cvEzfuFal7cb4H2AiA/Ha31O56', 'Computer science', 'tutor', '2024-12-10 18:29:41', NULL),
(16, 'Ahmed ', 'Butt', 'Butt@gmail.com', '$2a$10$SFkDMgLAaOD5qTotUC0zo.w9PMh0RKm00QP.bh9uCwoMk9plPdfRm', 'Computer science', 'tutor', '2025-04-10 11:47:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_leaves`
--

CREATE TABLE `teacher_leaves` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `reason` text NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `leave_type` varchar(50) NOT NULL,
  `rejoining_date` date NOT NULL,
  `medical_file_attachments` varchar(255) DEFAULT NULL,
  `application_status` varchar(20) DEFAULT 'pending',
  `submitted_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `no_of_leaves` int(11) NOT NULL,
  `manager_remarks` varchar(255) DEFAULT 'none',
  `director_remarks` varchar(255) DEFAULT 'none',
  `hr_remarks` varchar(255) DEFAULT 'none',
  `assigned_to` enum('hod') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_leaves`
--

INSERT INTO `teacher_leaves` (`id`, `email`, `reason`, `from_date`, `to_date`, `leave_type`, `rejoining_date`, `medical_file_attachments`, `application_status`, `submitted_on`, `no_of_leaves`, `manager_remarks`, `director_remarks`, `hr_remarks`, `assigned_to`) VALUES
(7, 'Ali@gmail.com', 'Ali applied for leave', '2024-10-14', '2024-10-15', 'casual', '2024-10-16', '/uploads/1728918560086-Screenshot (175).png', 'pending', '2024-10-14 15:09:20', 2, 'none', 'none', 'none', NULL),
(8, 'Aliha@gmail.com', 'Aliha is ill', '2024-10-15', '2024-10-16', 'medical', '2024-10-17', '/uploads/1728967645104-file.pdf', 'approved', '2024-10-15 04:47:25', 2, 'none', 'none', 'none', 'hod'),
(9, 'Darakhshan@gmail.com', 'Darakhsahn applied for leave', '2024-10-15', '2024-10-16', 'casual', '2024-10-17', '/uploads/1728969944748-Samiha CV.pdf', 'rejected', '2024-10-15 05:25:44', 2, 'none', 'none', 'none', 'hod'),
(10, 'Aliha@gmail.com', 'Aliha applied for leave', '2024-10-15', '2024-10-16', 'medical', '2024-10-17', '/uploads/1729001560568-samiha1.jpg', 'approved', '2024-10-15 14:12:40', 2, 'none', 'none', 'none', 'hod'),
(11, 'Ali@gmail.com', 'Ali HOD', '2024-10-18', '2024-10-19', 'casual', '2024-10-20', '/uploads/1729238741571-Samiha CV.docx', 'approved', '2024-10-18 08:05:41', 2, 'none', 'none', 'none', 'hod'),
(12, 'Darakhshan@gmail.com', 'Darakhshan HOD', '2024-10-18', '2024-10-19', 'casual', '2024-10-20', '/uploads/1729240836274-Samiha CV.pdf', 'approved', '2024-10-18 08:40:36', 2, 'none', 'none', 'none', 'hod'),
(13, 'Darakhshan@gmail.com', 'Darakhsahn applied for leave transfer to HOD', '2024-10-18', '2024-10-20', 'medical', '2024-10-21', '/uploads/1729242436107-Samiha CV.docx', 'approved', '2024-10-18 09:07:16', 3, 'none', 'none', 'none', 'hod'),
(14, 'Ali@gmail.com', 'Ali laeve', '2024-10-18', '2024-10-19', 'casual', '2024-10-20', '/uploads/1729248818200-Samiha CV.docx', 'approved', '2024-10-18 10:53:38', 2, 'none', 'none', 'none', 'hod'),
(15, 'Aliha@gmail.com', 'some work at home', '2024-10-18', '2024-10-19', 'medical', '2024-10-20', '/uploads/1729248916109-Samiha CV.docx', 'rejected', '2024-10-18 10:55:16', 2, 'none', 'none', 'none', 'hod'),
(16, 'Aliha@gmail.com', 'aliha got food poisoning', '2024-10-22', '2024-10-23', 'medical', '2024-10-24', '/uploads/1729566158269-zara.png', 'approved', '2024-10-22 03:02:38', 2, 'none', 'none', 'none', 'hod'),
(17, 'Darakhshan@gmail.com', 'Darkhshan got food poisoning', '2024-10-22', '2024-10-23', 'medical', '2024-10-24', '/uploads/1729566657572-zara.png', 'approved', '2024-10-22 03:10:57', 2, 'none', 'none', 'none', 'hod'),
(18, 'Aliha@gmail.com', 'casual leave', '2024-10-22', '2024-10-23', 'casual', '2024-10-24', NULL, 'pending', '2024-10-22 04:01:12', 2, 'none', 'none', 'none', 'hod'),
(19, 'Aliha@gmail.com', 'medical leave', '2024-10-23', '2024-10-24', 'medical', '2024-10-25', NULL, 'approved', '2024-10-22 04:02:02', 2, 'none', 'none', 'none', 'hod'),
(20, 'Aliha@gmail.com', 'Food Poisoning', '2024-10-30', '2024-10-31', 'medical', '2024-11-01', '/uploads/1729571035818-zara.png', 'approved', '2024-10-22 04:23:55', 2, 'none', 'none', 'none', 'hod'),
(21, 'Darakhshan@gmail.com', 'Darakhshan is ill', '2024-10-23', '2024-10-24', 'medical', '2024-10-25', NULL, 'rejected', '2024-10-23 03:48:25', 2, 'none', 'none', 'none', 'hod'),
(22, 'Darakhshan@gmail.com', 'Darakhshan applied leave for the same date', '2024-11-01', '2024-11-02', 'annual', '2024-11-03', '/uploads/1729655845089-zara.png', 'pending', '2024-10-23 03:57:25', 2, 'none', 'none', 'none', 'hod'),
(23, 'Darakhshan@gmail.com', 'some work at home', '2024-10-25', '2024-10-26', 'casual', '2024-10-27', NULL, 'approved', '2024-10-23 04:05:47', 2, 'no tutor remarks', 'none', 'none', 'hod'),
(24, 'Aliha@gmail.com', 'Aliha applied for formal leave', '2024-11-05', '2024-11-06', 'casual', '2024-11-07', '/uploads/1730776882314-zara.png', 'pending', '2024-11-05 03:21:22', 2, 'none', 'none', 'none', 'hod'),
(25, 'Aliha@gmail.com', 'Aliha again applied for formal leave', '2024-11-05', '2024-11-06', 'casual', '2024-11-07', '/uploads/1730776914272-zara.png', 'pending', '2024-11-05 03:21:54', 2, 'none', 'none', 'none', 'hod'),
(26, 'Aliha@gmail.com', 'Aliha', '2024-11-05', '2024-11-06', 'casual', '2024-11-07', '/uploads/1730777010232-zara.png', 'pending', '2024-11-05 03:23:30', 2, 'none', 'none', 'none', 'hod'),
(27, 'Aliha@gmail.com', 'Fever', '2024-11-09', '2024-11-10', 'casual', '2024-11-07', '/uploads/1730777285428-zara.png', 'pending', '2024-11-05 03:28:05', 2, 'none', 'none', 'none', 'hod'),
(28, 'Aizaz@gmail.com', 'Fever', '2024-11-10', '2024-11-11', 'casual', '2024-11-12', NULL, 'pending', '2024-11-10 09:22:29', 2, 'none', 'none', 'none', 'hod'),
(29, 'Darakhshan@gmail.com', 'Cough and fever', '2024-11-12', '2024-11-16', 'casual', '2024-11-17', NULL, 'pending', '2024-11-12 03:32:38', 5, 'none', 'none', 'none', 'hod'),
(30, 'Aliha@gmail.com', 'Aliha applied for leave on 12 november', '2024-11-12', '2024-11-14', 'casual', '2024-11-15', NULL, 'pending', '2024-11-12 04:39:09', 3, 'none', 'none', 'none', 'hod'),
(31, 'Kamran@gmail.com', 'Kamran applied for leave', '2024-11-23', '2024-11-23', 'casual', '2024-11-24', '/uploads/1732360668434-Screenshot (174).png', 'rejected', '2024-11-23 11:17:48', 1, 'none', 'no remarks from hod', 'none', 'hod'),
(32, 'Armab@gmail.com', 'Food Poisoning', '2024-12-10', '2024-12-11', 'casual', '2024-12-12', '/uploads/1733856174123-architecture.jpg', 'approved', '2024-12-10 18:42:54', 2, 'none', 'none', 'none', 'hod');

-- --------------------------------------------------------

--
-- Table structure for table `tutors`
--

CREATE TABLE `tutors` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tutors`
--

INSERT INTO `tutors` (`id`, `teacher_id`, `class_id`) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 1, 4),
(4, 1, 3),
(5, 2, 3),
(6, 1, 5),
(7, 4, 1),
(8, 5, 7),
(9, 6, 8),
(10, 7, 8),
(11, 7, 7),
(12, 8, 8),
(13, 9, 10),
(14, 8, 2),
(15, 10, 11),
(16, 11, 12),
(17, 12, 13),
(18, 13, 14),
(19, 15, 15),
(20, 13, 14),
(21, 16, 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `class_name` (`class_name`),
  ADD UNIQUE KEY `class_name_2` (`class_name`);

--
-- Indexes for table `hods`
--
ALTER TABLE `hods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `student_leaves`
--
ALTER TABLE `student_leaves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `superadmins`
--
ALTER TABLE `superadmins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_class` (`class_id`);

--
-- Indexes for table `teacher_leaves`
--
ALTER TABLE `teacher_leaves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `tutors`
--
ALTER TABLE `tutors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `class_id` (`class_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `hods`
--
ALTER TABLE `hods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `student_leaves`
--
ALTER TABLE `student_leaves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `superadmins`
--
ALTER TABLE `superadmins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `teacher_leaves`
--
ALTER TABLE `teacher_leaves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tutors`
--
ALTER TABLE `tutors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`);

--
-- Constraints for table `student_leaves`
--
ALTER TABLE `student_leaves`
  ADD CONSTRAINT `student_leaves_ibfk_1` FOREIGN KEY (`email`) REFERENCES `students` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `fk_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`);

--
-- Constraints for table `teacher_leaves`
--
ALTER TABLE `teacher_leaves`
  ADD CONSTRAINT `teacher_leaves_ibfk_1` FOREIGN KEY (`email`) REFERENCES `teachers` (`email`);

--
-- Constraints for table `tutors`
--
ALTER TABLE `tutors`
  ADD CONSTRAINT `tutors_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tutors_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
