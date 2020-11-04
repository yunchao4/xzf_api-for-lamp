/*
Navicat MySQL Data Transfer

Source Server         : lamp
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : sys

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2020-10-31 15:55:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `orderID` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `storeID` varchar(255) DEFAULT NULL,
  `imgID` varchar(255) DEFAULT NULL,
  `number` tinyint(4) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `money` double(32,0) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `create_at` datatime NOT NULL,
  PRIMARY KEY (`orderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
