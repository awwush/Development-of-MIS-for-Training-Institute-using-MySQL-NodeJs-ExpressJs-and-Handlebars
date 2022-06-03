-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: mis
-- ------------------------------------------------------
-- Server version	8.0.19

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
INSERT INTO `admin` VALUES ('bmvpt3312g','Pratik Tiwari','Pratik classes','123456789009','pratiktiwari2001@gmail.com','Abc@4321','1','2022-03-30 05:59:00','2022-03-30 05:59:39','7506405495'),('ERP1234561','ranjeet','TCET','535667831074','ranjeet112pandey@gmail.com','12345678','1','2022-03-25 07:01:35','2022-03-25 07:10:43','7303002608'),('ERP1234567','ranjit pandey','thakur','535667831075','ranjit112pandey@gmail.com','106ca637a3f9e2','0','2022-03-25 07:09:08','2022-03-25 07:09:08','7303002609');
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
  `behaviour` enum('good','attentive','dull','careless') DEFAULT NULL,
  KEY `attendance_behaviour_attendance_inforrmation_fk_idx` (`id`),
  KEY `student_id_status` (`student_id`,`status`),
  CONSTRAINT `attendance_behaviour_attendance_inforrmation_fk` FOREIGN KEY (`id`) REFERENCES `attendance_information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `attendance_behaviour_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  CONSTRAINT `attendance_information_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  UNIQUE KEY `shortname_institute_id_unique` (`short_form`,`institute_id`),
  KEY `boards_admin_fk_idx` (`institute_id`),
  CONSTRAINT `boards_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards_available`
--

LOCK TABLES `boards_available` WRITE;
/*!40000 ALTER TABLE `boards_available` DISABLE KEYS */;
INSERT INTO `boards_available` VALUES (1,'CBSE','Central Board of Secondary Education','ERP1234561'),(2,'SSC Maharashtra','State board of Maharashtra','ERP1234561'),(3,'ICSE','INDIAN CERTIFICATE OF SECONDARY EDUCATION','ERP1234561'),(4,'CBSE2','Central Board of Secondary Education2','ERP1234561'),(10,'CBSE3','','ERP1234561'),(13,'SSC2','State board 2','ERP1234561'),(14,'SSC','State board of Maharashtra','ERP1234561'),(15,'SSC3','','ERP1234561'),(16,'ssc4','','ERP1234561'),(22,'SSC 4','State','bmvpt3312g'),(23,'SSC 2','State','bmvpt3312g'),(24,'SSC 3','State','bmvpt3312g'),(32,'CBSE','Central board of Secondary education','bmvpt3312g'),(34,'UPPSC','uTTAR PRADESH','bmvpt3312g'),(35,'MPSC','MADHYA PRADESH  STATE BOARD','bmvpt3312g');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (16,33,'class 6 chemistryy',3,11,4,'2000','ERP1234561'),(17,33,'class 7 biology',3,2,1,'2000','ERP1234561'),(18,34,'class 9 geography',14,3,9,'3000','ERP1234561'),(28,43,'class 10 English',32,25,19,'3000','bmvpt3312g');
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
  PRIMARY KEY (`class_id`,`student_id`),
  UNIQUE KEY `class_student_unique` (`class_id`,`student_id`),
  KEY `class_student_details_class_fk` (`class_id`),
  KEY `class_student_details_student_fk_idx` (`student_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `class_student_details_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_student_details_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  UNIQUE KEY `standard_institute_id_unique` (`name`,`institute_id`),
  KEY `standards_admin_fk_idx` (`institute_id`),
  CONSTRAINT `standards_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standards_available`
--

LOCK TABLES `standards_available` WRITE;
/*!40000 ALTER TABLE `standards_available` DISABLE KEYS */;
INSERT INTO `standards_available` VALUES (25,'10','bmvpt3312g'),(9,'10','ERP1234561'),(10,'6','bmvpt3312g'),(11,'6','ERP1234561'),(2,'7','ERP1234561'),(21,'8','bmvpt3312g'),(1,'8','ERP1234561'),(12,'9','bmvpt3312g'),(3,'9','ERP1234561'),(5,'arts','ERP1234561'),(7,'drawing','ERP1234561'),(24,'XI','bmvpt3312g');
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
  CONSTRAINT `student_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  CONSTRAINT `fee_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `father_name` varchar(50) NOT NULL,
  `mother_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(12) NOT NULL,
  KEY `student_parent_details_student_fk_idx` (`student_id`),
  CONSTRAINT `student_parent_details_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  UNIQUE KEY `name_institute_id_unique` (`name`,`institute_id`),
  KEY `subjects_admin_fk_idx` (`institute_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `subjects_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects_available`
--

LOCK TABLES `subjects_available` WRITE;
/*!40000 ALTER TABLE `subjects_available` DISABLE KEYS */;
INSERT INTO `subjects_available` VALUES (16,'ARTS','bmvpt3312g'),(20,'Biology','bmvpt3312g'),(1,'Biology','ERP1234561'),(10,'CHEM','bmvpt3312g'),(4,'Chemistry','ERP1234561'),(19,'English','bmvpt3312g'),(5,'English','ERP1234561'),(11,'Geography','bmvpt3312g'),(9,'Geography','ERP1234561'),(3,'physics','ERP1234561');
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
  CONSTRAINT `teacher_admin_fk` FOREIGN KEY (`institute_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (33,'Pratik Tiwarii',NULL,'7506405495','pratiktiwari2001@gmail.com','0','76d70c152a1a16','ERP1234561','30000'),(34,'Arya Tiwari',NULL,'8369130319','aryatiwari2003@gmail.com','0','d925a56cf21a9b','ERP1234561','23000'),(37,'Arya Shukla',NULL,'8369130320','aryu.me07@gmail.com','0','c2610b8d3e415e','bmvpt3312g','25000'),(38,'Pratik Dubey',NULL,'9869760179','s1032180256@gmail.com','0','0a2c201e7a8cf2','bmvpt3312g','25000'),(41,'Pratik Tiwari',NULL,'7506405496','teestgmaail2@gmail.com','0','99699e7da3d977','bmvpt3312g','30000'),(43,'Nidhi Arora',NULL,'7506405497','tiwari.manvi@yahoo.co.in','0','532a54a4ff7516','bmvpt3312g','20000');
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
  CONSTRAINT `teacher_payment_teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  PRIMARY KEY (`teacher_id`,`subject_id`),
  KEY `teacher_subject_teacher_fk_idx` (`teacher_id`),
  KEY `teacher_subject_subject_fk_idx` (`subject_id`),
  CONSTRAINT `teacher_subject_subject_fk` FOREIGN KEY (`subject_id`) REFERENCES `subjects_available` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher_subject_teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_subject_details`
--

LOCK TABLES `teacher_subject_details` WRITE;
/*!40000 ALTER TABLE `teacher_subject_details` DISABLE KEYS */;
INSERT INTO `teacher_subject_details` VALUES (33,1),(33,4),(33,5),(34,9),(37,10),(38,10),(41,11),(43,19);
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
  CONSTRAINT `topper_information_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `topper_information_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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

-- Dump completed on 2022-04-06 21:21:33
