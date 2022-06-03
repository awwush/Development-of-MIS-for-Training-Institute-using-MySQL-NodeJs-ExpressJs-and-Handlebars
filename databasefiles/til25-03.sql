-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mis
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
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('ERP1234561','ranjeet','TCET','535667831074','ranjeet112pandey@gmail.com','12345678','1','2022-03-25 07:01:35','2022-03-25 07:10:43','7303002608'),('ERP1234567','ranjit pandey','thakur','535667831075','ranjit112pandey@gmail.com','106ca637a3f9e2','0','2022-03-25 07:09:08','2022-03-25 07:09:08','7303002609');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

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
  `behaviour` enum('good','attentive','dull','careless') DEFAULT NULL COMMENT 'Good\nAttentive\nDull\n',
  UNIQUE KEY `student_id_UNIQUE` (`student_id`),
  KEY `attendance_behaviour_attendance_inforrmation_fk_idx` (`id`),
  KEY `student_id_status` (`student_id`,`status`),
  CONSTRAINT `attendance_behaviour_attendance_inforrmation_fk` FOREIGN KEY (`id`) REFERENCES `attendance_information` (`id`),
  CONSTRAINT `attendance_behaviour_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='att';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_and_behaviour`
--

LOCK TABLES `attendance_and_behaviour` WRITE;
/*!40000 ALTER TABLE `attendance_and_behaviour` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance_and_behaviour` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `attendance_information_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_information`
--

LOCK TABLES `attendance_information` WRITE;
/*!40000 ALTER TABLE `attendance_information` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance_information` ENABLE KEYS */;
UNLOCK TABLES;

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
  UNIQUE KEY `short_form_UNIQUE` (`short_form`),
  KEY `boards_admin_fk_idx` (`institute_id`),
  CONSTRAINT `boards_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards_available`
--

LOCK TABLES `boards_available` WRITE;
/*!40000 ALTER TABLE `boards_available` DISABLE KEYS */;
INSERT INTO `boards_available` VALUES (1,'CBSE','Central Board of Secondary Education','ERP1234561');
/*!40000 ALTER TABLE `boards_available` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `board_id` int DEFAULT NULL,
  `standard_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `fees` varchar(45) DEFAULT NULL,
  `institute_id` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `class_teacher_fk` (`teacher_id`),
  KEY `class_board_fk_idx` (`board_id`),
  KEY `class_standard_fk_idx` (`standard_id`),
  KEY `class_subject_fk_idx` (`subject_id`),
  KEY `class_admin_fk_idx` (`institute_id`),
  CONSTRAINT `class_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`),
  CONSTRAINT `class_board_fk` FOREIGN KEY (`board_id`) REFERENCES `boards_available` (`id`),
  CONSTRAINT `class_standard_fk` FOREIGN KEY (`standard_id`) REFERENCES `standards_available` (`id`),
  CONSTRAINT `class_subject_fk` FOREIGN KEY (`subject_id`) REFERENCES `subjects_available` (`id`),
  CONSTRAINT `class_teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (3,1,'class 8 - Biology',1,1,1,'2000','ERP1234561'),(5,1,'class 6 - physics',1,1,1,'2000','ERP1234561'),(10,1,'class 6 - physics1',1,1,1,'2000','ERP1234561');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_student_details`
--

DROP TABLE IF EXISTS `class_student_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_student_details` (
  `class_id` int NOT NULL,
  `student_id` int NOT NULL,
  KEY `class_student_details_class_fk` (`class_id`),
  KEY `class_student_details_student_fk_idx` (`student_id`),
  CONSTRAINT `class_student_details_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `class_student_details_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_student_details`
--

LOCK TABLES `class_student_details` WRITE;
/*!40000 ALTER TABLE `class_student_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_student_details` ENABLE KEYS */;
UNLOCK TABLES;

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
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `standards_admin_fk_idx` (`institute_id`),
  CONSTRAINT `standards_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standards_available`
--

LOCK TABLES `standards_available` WRITE;
/*!40000 ALTER TABLE `standards_available` DISABLE KEYS */;
INSERT INTO `standards_available` VALUES (1,'8','ERP1234561');
/*!40000 ALTER TABLE `standards_available` ENABLE KEYS */;
UNLOCK TABLES;

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
  `verification` char(1) NOT NULL,
  `password` varchar(64) NOT NULL,
  `institute_id` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contact_UNIQUE` (`contact`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `student_admin_fk` (`institute_id`),
  CONSTRAINT `student_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `fee_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_fee_details`
--

LOCK TABLES `student_fee_details` WRITE;
/*!40000 ALTER TABLE `student_fee_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_fee_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_parent_details`
--

DROP TABLE IF EXISTS `student_parent_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_parent_details` (
  `student_id` int NOT NULL,
  `father_name` varchar(50) DEFAULT NULL,
  `mother_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(12) NOT NULL,
  KEY `student_parent_details_student_fk_idx` (`student_id`),
  CONSTRAINT `student_parent_details_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_parent_details`
--

LOCK TABLES `student_parent_details` WRITE;
/*!40000 ALTER TABLE `student_parent_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_parent_details` ENABLE KEYS */;
UNLOCK TABLES;

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
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `subjects_admin_fk_idx` (`institute_id`),
  CONSTRAINT `subjects_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects_available`
--

LOCK TABLES `subjects_available` WRITE;
/*!40000 ALTER TABLE `subjects_available` DISABLE KEYS */;
INSERT INTO `subjects_available` VALUES (1,'Biology','ERP1234561'),(3,'physics','ERP1234561');
/*!40000 ALTER TABLE `subjects_available` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `teacher_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'Ranjit','2000-05-16 00:00:00','7303002608','ranjit112pandey@gmail.com','1','12345678','ERP1234561','10000'),(2,'pratik ','2000-02-28 00:00:00','9892417974','pratiktiwari2001@gmail.com','1','12345678','ERP1234561','50000');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `teacher_payment_teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_payment`
--

LOCK TABLES `teacher_payment` WRITE;
/*!40000 ALTER TABLE `teacher_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_subject_details`
--

DROP TABLE IF EXISTS `teacher_subject_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_subject_details` (
  `teacher_id` int NOT NULL,
  `subject_id` int NOT NULL,
  KEY `teacher_subject_teacher_fk_idx` (`teacher_id`),
  KEY `teacher_subject_subject_fk_idx` (`subject_id`),
  CONSTRAINT `teacher_subject_subject_fk` FOREIGN KEY (`subject_id`) REFERENCES `subjects_available` (`id`),
  CONSTRAINT `teacher_subject_teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_subject_details`
--

LOCK TABLES `teacher_subject_details` WRITE;
/*!40000 ALTER TABLE `teacher_subject_details` DISABLE KEYS */;
INSERT INTO `teacher_subject_details` VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `teacher_subject_details` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `topper_information_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `topper_information_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topper_information`
--

LOCK TABLES `topper_information` WRITE;
/*!40000 ALTER TABLE `topper_information` DISABLE KEYS */;
/*!40000 ALTER TABLE `topper_information` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-25 15:22:54
