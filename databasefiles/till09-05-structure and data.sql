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
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('ERBP8129HR','Ranjit Pandey','Ranjit\'s coaching classes','535667891076','ranjeet112pandey@gmail.com','R@njeet112','1','2022-05-06 19:15:51','2022-05-06 19:17:30','7303002608');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `attendance_and_behaviour`
--

LOCK TABLES `attendance_and_behaviour` WRITE;
/*!40000 ALTER TABLE `attendance_and_behaviour` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance_and_behaviour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `attendance_information`
--

LOCK TABLES `attendance_information` WRITE;
/*!40000 ALTER TABLE `attendance_information` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `boards_available`
--

LOCK TABLES `boards_available` WRITE;
/*!40000 ALTER TABLE `boards_available` DISABLE KEYS */;
INSERT INTO `boards_available` VALUES (37,'CBSE','Central Board of Secondary Education','ERBP8129HR'),(38,'ICSE','International Board','ERBP8129HR'),(39,'HSC','Higher secondary ','ERBP8129HR');
/*!40000 ALTER TABLE `boards_available` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (34,48,'class 11 Physics CBSE',37,26,22,'2000','ERBP8129HR'),(35,44,'class 11 biology CBSE',37,26,25,'4000','ERBP8129HR'),(36,48,'class 11 Physics HSC',39,26,22,'1500','ERBP8129HR'),(37,46,'class 11 chem ICSE',38,26,23,'5000','ERBP8129HR');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `class_content`
--

LOCK TABLES `class_content` WRITE;
/*!40000 ALTER TABLE `class_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `class_file_content`
--

LOCK TABLES `class_file_content` WRITE;
/*!40000 ALTER TABLE `class_file_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_file_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `class_student_details`
--

LOCK TABLES `class_student_details` WRITE;
/*!40000 ALTER TABLE `class_student_details` DISABLE KEYS */;
INSERT INTO `class_student_details` VALUES (34,14),(34,21),(35,14),(36,17),(36,19),(37,15),(37,18),(37,22);
/*!40000 ALTER TABLE `class_student_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `standards_available`
--

LOCK TABLES `standards_available` WRITE;
/*!40000 ALTER TABLE `standards_available` DISABLE KEYS */;
INSERT INTO `standards_available` VALUES (26,'11','ERBP8129HR'),(27,'12','ERBP8129HR');
/*!40000 ALTER TABLE `standards_available` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (14,'Arya Stark','2006-07-26 00:00:00','7303002609','parshuram1971pandey@gmail.com',26,37,'0','ef7076a79e5c17','ERBP8129HR'),(15,'Emma Watson','2022-05-05 00:00:00','1234567898','s1032180848@gmail.com',26,38,'0','2ff4aa85280e3f','ERBP8129HR'),(17,'Pratik tiwari','1998-09-14 00:00:00','7829221202','1032180848@tcetmumbai.in',26,39,'0','ee9acc68711fd7','ERBP8129HR'),(18,'Aaron Rodrigues','2002-10-07 00:00:00','5655433345','ranjit112pandey@gmail.com',26,38,'0','20a72487a0ec04','ERBP8129HR'),(19,'Yash mistry','2007-10-23 00:00:00','4567566534','aryu.me07@gmail.com',26,39,'0','8cb0bed47df6e5','ERBP8129HR'),(20,'Jasmin mistry','1999-10-13 00:00:00','3456653434','manvi.tiwari@ghs.edu.in',27,37,'0','fed767961c8a3b','ERBP8129HR'),(21,'gandhar sakhpal','2013-10-15 00:00:00','5465467789','25ayush.s.tiwari@gmail.com',26,37,'0','31d6a03604eba2','ERBP8129HR'),(22,'avalon rego','2016-06-21 00:00:00','3456654421','pratiktiwari2001@yahoo.com',26,38,'0','f6abf222af3b07','ERBP8129HR');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `student_fee_details`
--

LOCK TABLES `student_fee_details` WRITE;
/*!40000 ALTER TABLE `student_fee_details` DISABLE KEYS */;
INSERT INTO `student_fee_details` VALUES (14,'0','0','0','2022-08-07 00:00:00'),(15,'0','0','0','2022-08-07 00:00:00'),(17,'0','0','0','2022-08-07 00:00:00'),(18,'0','0','0','2022-08-07 00:00:00'),(19,'0','0','0','2022-08-07 00:00:00'),(20,'0','0','0','2022-08-07 00:00:00'),(21,'0','0','0','2022-08-07 00:00:00'),(22,'0','0','0','2022-08-07 00:00:00');
/*!40000 ALTER TABLE `student_fee_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `student_parent_details`
--

LOCK TABLES `student_parent_details` WRITE;
/*!40000 ALTER TABLE `student_parent_details` DISABLE KEYS */;
INSERT INTO `student_parent_details` VALUES (14,'XYZ','ABC','sunillife1@gmail.com','7353992085'),(15,'random','random','sunillife1@gmail.com','1232134432'),(17,'ABC','XYZ','sunillife2@gmail.com','2342212134'),(18,'ABC','ssd','sunillife21@gmail.com','1233214433'),(19,'lmn','pqr','aryu.meq7@gmail.com','7658543345'),(20,'asd','ssd','manvi.tiwari1@ghs.edu.in','4324453344'),(21,'dfr','ghty','25ayush.s.2iwari@gmail.com','54643344'),(22,'dse','ffds','pratiktiwari200z1@yahoo.com','6643451234');
/*!40000 ALTER TABLE `student_parent_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `subjects_available`
--

LOCK TABLES `subjects_available` WRITE;
/*!40000 ALTER TABLE `subjects_available` DISABLE KEYS */;
INSERT INTO `subjects_available` VALUES (25,'Biology','ERBP8129HR'),(23,'Chemistry','ERBP8129HR'),(24,'Maths','ERBP8129HR'),(22,'Physics','ERBP8129HR');
/*!40000 ALTER TABLE `subjects_available` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (44,'jon Arryn',NULL,'7303002608','pratiktiwari2001@gmail.com','0','53fdbac09e1fac','ERBP8129HR','25000'),(46,'John Snow',NULL,'7303002609','pratik.tiwari3@gmail.com','0','a79921214104ca','ERBP8129HR','22000'),(47,'Tyrian lanister',NULL,'7303002708','s1032180256@gmail.com','0','f93245f1eeda51','ERBP8129HR','21000'),(48,'Ned Stark',NULL,'7404002608','1032180256@tcetmumbai.in','0','2f4f3dfb0a757b','ERBP8129HR','19000');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `teacher_payment`
--

LOCK TABLES `teacher_payment` WRITE;
/*!40000 ALTER TABLE `teacher_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `teacher_subject_details`
--

LOCK TABLES `teacher_subject_details` WRITE;
/*!40000 ALTER TABLE `teacher_subject_details` DISABLE KEYS */;
INSERT INTO `teacher_subject_details` VALUES (44,25),(46,23),(47,24),(48,22);
/*!40000 ALTER TABLE `teacher_subject_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `topper_information`
--

LOCK TABLES `topper_information` WRITE;
/*!40000 ALTER TABLE `topper_information` DISABLE KEYS */;
/*!40000 ALTER TABLE `topper_information` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-09 18:59:22
