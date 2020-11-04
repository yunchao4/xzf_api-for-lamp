/*
Navicat MySQL Data Transfer

Source Server         : lamp
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : sys

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2020-11-04 21:11:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for photo
-- ----------------------------
DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo` (
  `imgID` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` tinyint(4) DEFAULT NULL,
  `size` tinyint(4) DEFAULT NULL,
  `bgc` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`imgID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
