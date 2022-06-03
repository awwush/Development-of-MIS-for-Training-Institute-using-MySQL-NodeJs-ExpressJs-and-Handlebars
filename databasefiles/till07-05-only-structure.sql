-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: mis.c7zw0gnocfta.ap-south-1.rds.amazonaws.com    Database: mis
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
-- SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

-- SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `institute_name` varchar(50) NOT NULL,
  `aadhaar` varchar(12) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `verification` char(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `aadhaar_UNIQUE` (`aadhaar`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attendance_and_behaviour`
--

DROP TABLE IF EXISTS `attendance_and_behaviour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_and_behaviour` (
  `id` int NOT NULL,
  `student_id` int NOT NULL,
  `status` enum('absent','present') NOT NULL,
  `behaviour` enum('good','attentive','dull','careless') DEFAULT NULL,
  KEY `attendance_behaviour_attendance_inforrmation_fk_idx` (`id`),
  KEY `student_id_status` (`student_id`,`status`),
  CONSTRAINT `attendance_behaviour_attendance_inforrmation_fk` FOREIGN KEY (`id`) REFERENCES `attendance_information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `attendance_behaviour_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='att';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attendance_information`
--

DROP TABLE IF EXISTS `attendance_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_information` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `scheduled_on` datetime NOT NULL,
  `attendance_took_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attendance_information_class_fk_idx` (`class_id`),
  CONSTRAINT `attendance_information_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boards_available`
--

DROP TABLE IF EXISTS `boards_available`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boards_available` (
  `id` int NOT NULL AUTO_INCREMENT,
  `short_form` varchar(20) NOT NULL,
  `full_form` varchar(255) DEFAULT NULL,
  `institute_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shortname_institute_id_unique` (`short_form`,`institute_id`),
  KEY `boards_admin_fk_idx` (`institute_id`),
  CONSTRAINT `boards_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `board_id` int NOT NULL,
  `standard_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `fees` varchar(45) NOT NULL,
  `institute_id` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_institute_id_unique` (`name`,`institute_id`),
  KEY `class_teacher_fk` (`teacher_id`),
  KEY `class_board_fk_idx` (`board_id`),
  KEY `class_standard_fk_idx` (`standard_id`),
  KEY `class_subject_fk_idx` (`subject_id`),
  KEY `class_admin_fk_idx` (`institute_id`),
  CONSTRAINT `class_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_board_fk` FOREIGN KEY (`board_id`) REFERENCES `boards_available` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_standard_fk` FOREIGN KEY (`standard_id`) REFERENCES `standards_available` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_subject_fk` FOREIGN KEY (`subject_id`) REFERENCES `subjects_available` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_content`
--

DROP TABLE IF EXISTS `class_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `by_student` tinyint DEFAULT NULL,
  `by_teacher` tinyint DEFAULT NULL,
  `uploaded_by_id` int NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uploaders_id` (`uploaded_by_id`),
  CONSTRAINT `class_content_class_fk` FOREIGN KEY (`id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_file_content`
--

DROP TABLE IF EXISTS `class_file_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_file_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_content_id` int NOT NULL,
  `class_content_uploaders_id` int NOT NULL,
  `file_url` varchar(2048) DEFAULT NULL,
  `file_content` longblob,
  PRIMARY KEY (`id`),
  KEY `file_class_content_fk_idx` (`class_content_id`),
  KEY `class_file_content_uploaded_by_id_fk_idx` (`class_content_uploaders_id`),
  CONSTRAINT `class_file_content_uploaded_by_id_fk` FOREIGN KEY (`class_content_uploaders_id`) REFERENCES `class_content` (`uploaded_by_id`),
  CONSTRAINT `file_class_content_fk` FOREIGN KEY (`class_content_id`) REFERENCES `class_content` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_student_details`
--

DROP TABLE IF EXISTS `class_student_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_student_details` (
  `class_id` int NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`class_id`,`student_id`),
  UNIQUE KEY `class_student_unique` (`class_id`,`student_id`),
  KEY `class_student_details_class_fk` (`class_id`),
  KEY `class_student_details_student_fk_idx` (`student_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `class_student_details_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_student_details_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `standards_available`
--

DROP TABLE IF EXISTS `standards_available`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `standards_available` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `institute_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `standard_institute_id_unique` (`name`,`institute_id`),
  KEY `standards_admin_fk_idx` (`institute_id`),
  CONSTRAINT `standards_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `contact` varchar(12) NOT NULL,
  `email` varchar(50) NOT NULL,
  `standard_id` int DEFAULT NULL,
  `board_id` int DEFAULT NULL,
  `verification` char(1) NOT NULL,
  `password` varchar(64) NOT NULL,
  `institute_id` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contact_UNIQUE` (`contact`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `student_admin_fk` (`institute_id`),
  KEY `student_board_fk_idx` (`board_id`),
  KEY `student_standard_fk_idx` (`standard_id`),
  CONSTRAINT `student_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_board_fk` FOREIGN KEY (`board_id`) REFERENCES `boards_available` (`id`),
  CONSTRAINT `student_standard_fk` FOREIGN KEY (`standard_id`) REFERENCES `standards_available` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_fee_details`
--

DROP TABLE IF EXISTS `student_fee_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_fee_details` (
  `student_id` int NOT NULL,
  `total_amount` varchar(10) NOT NULL,
  `paid` varchar(10) DEFAULT NULL,
  `due` varchar(10) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  KEY `fee_student_fk_idx` (`student_id`),
  CONSTRAINT `fee_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_parent_details`
--

DROP TABLE IF EXISTS `student_parent_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_parent_details` (
  `student_id` int NOT NULL,
  `father_name` varchar(50) NOT NULL,
  `mother_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(12) NOT NULL,
  KEY `student_parent_details_student_fk_idx` (`student_id`),
  CONSTRAINT `student_parent_details_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subjects_available`
--

DROP TABLE IF EXISTS `subjects_available`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects_available` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `institute_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_institute_id_unique` (`name`,`institute_id`),
  KEY `subjects_admin_fk_idx` (`institute_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `subjects_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `mobile` varchar(12) NOT NULL,
  `email` varchar(50) NOT NULL,
  `verification` char(1) NOT NULL,
  `password` varchar(64) NOT NULL,
  `institute_id` varchar(20) NOT NULL,
  `salary` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `teacher_admin_fk` (`institute_id`),
  CONSTRAINT `teacher_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teacher_payment`
--

DROP TABLE IF EXISTS `teacher_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_payment` (
  `teacher_id` int NOT NULL,
  `amount_paid` varchar(10) NOT NULL,
  `date` datetime NOT NULL,
  KEY `teacher_payment_teacher_fk` (`teacher_id`),
  CONSTRAINT `teacher_payment_teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teacher_subject_details`
--

DROP TABLE IF EXISTS `teacher_subject_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_subject_details` (
  `teacher_id` int NOT NULL,
  `subject_id` int NOT NULL,
  PRIMARY KEY (`teacher_id`,`subject_id`),
  KEY `teacher_subject_teacher_fk_idx` (`teacher_id`),
  KEY `teacher_subject_subject_fk_idx` (`subject_id`),
  CONSTRAINT `teacher_subject_subject_fk` FOREIGN KEY (`subject_id`) REFERENCES `subjects_available` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher_subject_teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topper_information`
--

DROP TABLE IF EXISTS `topper_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topper_information` (
  `class_id` int DEFAULT NULL,
  `student_id` int NOT NULL,
  `image_url` varchar(2083) DEFAULT NULL,
  KEY `topper_information_class_fk_idx` (`class_id`),
  KEY `topper_information_student_fk_idx` (`student_id`),
  CONSTRAINT `topper_information_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `topper_information_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
-- SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-07  0:14:48
