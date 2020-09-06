-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: project_two
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Electronics','2020-09-03 22:34:44','2020-09-03 22:34:44'),(2,'Furniture','2020-09-03 22:34:55','2020-09-03 22:34:55'),(3,'Clothing','2020-09-03 22:35:08','2020-09-03 22:35:08'),(4,'Outdoors','2020-09-03 22:35:20','2020-09-03 22:35:20'),(5,'Automotive','2020-09-03 22:35:34','2020-09-03 22:35:34');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Vintage Car','https://storage.googleapis.com/project2filebucket/f17deae0-ee35-11ea-9c18-45fa61a8c5c9-broken-car-vehicle-vintage.jpg','productName','Old rusty project car, bring trailer.',500,'Fair','Austin',5,1,'2020-09-03 22:36:44','2020-09-03 22:36:44'),(2,'Boombox','https://storage.googleapis.com/project2filebucket/168570b0-ee36-11ea-9c18-45fa61a8c5c9-ghettoblaster-radio-recorder-boombox-old-school-159613.jpg','productName','36in vintage boombox in working condition',35,'Excellent','Austin',1,1,'2020-09-03 22:37:46','2020-09-03 22:37:46'),(3,'Recliner','https://storage.googleapis.com/project2filebucket/3bb27fe0-ee36-11ea-9c18-45fa61a8c5c9-pexels-photo-105004.jpg','productName','Yellow 90s recliner. Still reclines.',20,'Decent','Austin',2,1,'2020-09-03 22:38:49','2020-09-03 22:38:49'),(4,'Tent','https://storage.googleapis.com/project2filebucket/db747ab0-ee36-11ea-9c18-45fa61a8c5c9-pexels-photo-111362.jpg','productName','Hardly used tent. All pieces are included.',20,'Good','Austin',4,1,'2020-09-03 22:43:17','2020-09-03 22:43:17'),(5,'Wood Chair','https://storage.googleapis.com/project2filebucket/f9d87a60-ee36-11ea-9c18-45fa61a8c5c9-pexels-photo-116910.jpg','productName','Wooden chair. Could use re-staining.',10,'Fair','Austin',4,1,'2020-09-03 22:44:08','2020-09-03 22:44:08'),(6,'Heels','https://storage.googleapis.com/project2filebucket/13aabcf0-ee37-11ea-9c18-45fa61a8c5c9-pexels-photo-134064.jpg','productName','Nice pair of dress shoes',15,'Good','Austin',3,1,'2020-09-03 22:44:51','2020-09-03 22:44:51'),(7,'PS4 Controller','https://storage.googleapis.com/project2filebucket/4dd6dbc0-ee37-11ea-9c18-45fa61a8c5c9-pexels-photo-275033.jpg','productName','PS4 controller. X button doesnt work.',5,'Fair','Austin',1,2,'2020-09-03 22:46:28','2020-09-03 22:46:28'),(8,'Dress Shoes','https://storage.googleapis.com/project2filebucket/731501f0-ee37-11ea-9c18-45fa61a8c5c9-pexels-photo-292999.jpg','productName','Mens dress shoes',20,'Excellent','Austin',3,2,'2020-09-03 22:47:31','2020-09-03 22:47:31'),(9,'Dress Shirt','https://storage.googleapis.com/project2filebucket/93eebc90-ee37-11ea-9c18-45fa61a8c5c9-pexels-photo-297933.jpg','productName','Collared mens dress shirt',10,'Good','Austin',3,2,'2020-09-03 22:48:26','2020-09-03 22:48:26'),(10,'Blue Car','https://storage.googleapis.com/project2filebucket/b2e58660-ee37-11ea-9c18-45fa61a8c5c9-pexels-photo-845405.jpg','productName','Old blue car. Still runs',1000,'Excellent','Austin',5,2,'2020-09-03 22:49:18','2020-09-03 22:49:18'),(11,'Straw Hat','https://storage.googleapis.com/project2filebucket/cfbd19b0-ee37-11ea-9c18-45fa61a8c5c9-pexels-photo-984619.jpg','productName','Tan and black straw hat',5,'Excellent','Austin',3,2,'2020-09-03 22:50:06','2020-09-03 22:50:06'),(12,'Camping Grill','https://storage.googleapis.com/project2filebucket/ecc90370-ee37-11ea-9c18-45fa61a8c5c9-pexels-photo-1038515.jpg','productName','Homemade camping grill',30,'Excellent','Austin',4,2,'2020-09-03 22:50:55','2020-09-03 22:50:55'),(13,'Toyota Tacoma','https://storage.googleapis.com/project2filebucket/55af42f0-ee38-11ea-9c18-45fa61a8c5c9-pexels-photo-1149137.jpg','productName','Very nice lifted Toyota Tacoma',15000,'Excellent','Austin',5,3,'2020-09-03 22:53:51','2020-09-03 22:53:51'),(14,'Chest','https://storage.googleapis.com/project2filebucket/7cb44670-ee38-11ea-9c18-45fa61a8c5c9-pexels-photo-1210018.jpg','productName','Small treasure chest',100,'Excellent','Austin',2,3,'2020-09-03 22:54:57','2020-09-03 22:54:57'),(15,'Nikes','https://storage.googleapis.com/project2filebucket/98de5bb0-ee38-11ea-9c18-45fa61a8c5c9-pexels-photo-1598505.jpg','productName','Never been worn before',30,'Excellent','Austin',3,3,'2020-09-03 22:55:44','2020-09-03 22:55:44'),(16,'Flip Flops','https://storage.googleapis.com/project2filebucket/b9134ad0-ee38-11ea-9c18-45fa61a8c5c9-pexels-photo-1756086.jpg','productName','Only worn a couple times.',2,'Excellent','Austin',3,3,'2020-09-03 22:56:38','2020-09-03 22:56:38'),(17,'Leather Couch','https://storage.googleapis.com/project2filebucket/d78e06d0-ee38-11ea-9c18-45fa61a8c5c9-pexels-photo-1866149.jpg','productName','Nice colored leather couch',100,'Good','Austin',2,3,'2020-09-03 22:57:29','2020-09-03 22:57:29'),(18,'Record Player','https://storage.googleapis.com/project2filebucket/08ba8710-ee39-11ea-9c18-45fa61a8c5c9-pexels-photo-1958841.jpg','productName','Comes with incense holder.',50,'Excellent','Austin',1,3,'2020-09-03 22:58:52','2020-09-03 22:58:52'),(19,'Cadillac','https://storage.googleapis.com/project2filebucket/3919cc40-ee39-11ea-9c18-45fa61a8c5c9-pexels-photo-1974520.jpg','productName','Very nice white Cadillac',5000,'Excellent','Austin',5,4,'2020-09-03 23:00:13','2020-09-03 23:00:13'),(20,'Picnic Table','https://storage.googleapis.com/project2filebucket/5db1ee70-ee39-11ea-9c18-45fa61a8c5c9-pexels-photo-2108725.jpg','productName','Hand crafted wooden picnic table',125,'Excellent','Austin',2,4,'2020-09-03 23:01:14','2020-09-03 23:01:14'),(21,'Lamborghini','https://storage.googleapis.com/project2filebucket/9661f490-ee39-11ea-9c18-45fa61a8c5c9-pexels-photo-2127733.jpg','productName','Brand new Lamborghini',200000,'Excellent','Austin',5,4,'2020-09-03 23:02:49','2020-09-03 23:02:49'),(22,'Big Tent','https://storage.googleapis.com/project2filebucket/acbc4e70-ee39-11ea-9c18-45fa61a8c5c9-pexels-photo-2376989.jpg','productName','Very nice group tent',200,'Excellent','Austin',4,4,'2020-09-03 23:03:27','2020-09-03 23:03:27'),(23,'Magellan Tent','https://storage.googleapis.com/project2filebucket/c9baa3a0-ee39-11ea-9c18-45fa61a8c5c9-pexels-photo-2398220.jpg','productName','Very nice unused Magellan tent',30,'Excellent','Austin',4,4,'2020-09-03 23:04:16','2020-09-03 23:04:16'),(24,'Volkswagon Bus','https://storage.googleapis.com/project2filebucket/058c8330-ee3a-11ea-9c18-45fa61a8c5c9-pexels-photo-2533092.jpg','productName','VW hippie van',3000,'Excellent','Austin',5,4,'2020-09-03 23:05:56','2020-09-03 23:05:56'),(25,'GoPro','https://storage.googleapis.com/project2filebucket/191e7c00-ee3f-11ea-9c18-45fa61a8c5c9-pexels-photo-2613501.jpg','productName','GoPro Hero 4 with some accessories',45,'Excellent','Austin',1,5,'2020-09-03 23:42:16','2020-09-03 23:42:16'),(26,'Table and Bench','https://storage.googleapis.com/project2filebucket/354005c0-ee3f-11ea-9c18-45fa61a8c5c9-pexels-photo-2974427.jpg','productName','Wooden table and bench',60,'Excellent','Austin',4,5,'2020-09-03 23:43:03','2020-09-03 23:43:03'),(27,'Spherical Swing Chair','https://storage.googleapis.com/project2filebucket/517c4370-ee3f-11ea-9c18-45fa61a8c5c9-pexels-photo-3614085.jpg','productName','Very cool looking, swinging chair',100,'Excellent','Austin',2,5,'2020-09-03 23:43:51','2020-09-03 23:43:51'),(28,'Nintendo DS','https://storage.googleapis.com/project2filebucket/752c2880-ee3f-11ea-9c18-45fa61a8c5c9-pexels-photo-3702458.jpg','productName','Gray Nintendo DS. Comes with Pokemon',40,'Excellent','Austin',1,5,'2020-09-03 23:44:51','2020-09-03 23:44:51'),(29,'Lawn Chair','https://storage.googleapis.com/project2filebucket/9934b4e0-ee3f-11ea-9c18-45fa61a8c5c9-pexels-photo-4727922.jpg','productName','Plastic red lawn chair.',10,'Good','Austin',4,5,'2020-09-03 23:45:51','2020-09-03 23:45:51'),(30,'DSLR Camera','https://storage.googleapis.com/project2filebucket/b02fe2a0-ee3f-11ea-9c18-45fa61a8c5c9-photo-camera-subject-photographer-51383.jpg','productName','Nikon DSLR camera. Still in box.',500,'Excellent','Austin',1,5,'2020-09-03 23:46:30','2020-09-03 23:46:30');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rated_by` int NOT NULL,
  `user_id` int NOT NULL,
  `rating_value` int NOT NULL,
  `rating_comment` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rated_by` (`rated_by`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`rated_by`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,5,2,5,'Very professional seller!'),(2,5,1,1,'Wanted to meet in dark alley. Would not meet again.'),(3,5,3,5,'Very fast response time. Pleasure to work with.'),(4,5,4,1,'Sold me a broken power tool'),(5,4,5,5,'Very nice! Product was as described!'),(6,6,1,1,'Wanted to meet in a sketchy area'),(7,6,1,5,'Great experience'),(8,6,2,5,'jkelahFSKH'),(9,6,1,5,'kfjaslhfhkjsa'),(10,6,3,5,'Leave comment for seller');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'user1','user1@gmail.com','$2b$10$ipswdjrMkDnZ75efiNu/p.UHexsvJs4sBoCnX1xjsoe5VnLNh5dpG'),(2,'user2','user2@gmail.com','$2b$10$Dqiye5Sn26rhxdz6BWZeKefVkvxlEU1y8nvm.vbrcM87foszoj2Hm'),(3,'user3','user3@gmail.com','$2b$10$g4.rrUiT8nJk47fklok2LuAqg9I8WRRxv9UvbM7.tygMmVzHj03/2'),(4,'user4','user4@gmail.com','$2b$10$fxgUixIJ1Sj4n2wv4/6IveiSnjxyogW2ncg9/ZSQrJIMZnJdphqEO'),(5,'user5','user5@gmail.com','$2b$10$EFTkWuEXdnnuUCrcvu27UuEmf5kXcjRf5fji8NXwmorsYBf2oerPC'),(6,'user6@gmail.com','user6@gmail.com','$2b$10$shCpVUQ3e0dJdKeD85vZD.wRW31APg9lUP6iDasezQj2JFmMydqsi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-05 21:21:55
