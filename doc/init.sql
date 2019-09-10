SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `auth_account`;
CREATE TABLE `auth_account`  (
  `UID` bigint(20) UNSIGNED NOT NULL,
  `Account` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Type` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Wechat,QQ,PWD,',
  `Status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '-1禁用1启用',
  PRIMARY KEY (`UID`) USING BTREE,
  UNIQUE INDEX `u_account`(`Account`) USING BTREE,
  INDEX `account_where`(`Account`, `Type`, `Status`) USING BTREE,
  CONSTRAINT `FK_account_user` FOREIGN KEY (`UID`) REFERENCES `auth_users` (`UID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `auth_account` VALUES (1, 'admin', 'PWD', 1);

-- ----------------------------
-- Table structure for contact
-- ----------------------------
DROP TABLE IF EXISTS `auth_contact`;
CREATE TABLE `auth_contact`  (
  `UID` bigint(20) UNSIGNED NOT NULL,
  `Nick` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `T` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `V` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `C` char(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`UID`, `Nick`, `T`, `V`) USING BTREE,
  CONSTRAINT `FK_auth_8` FOREIGN KEY (`UID`) REFERENCES `auth_users` (`UID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用于支持各种通信方式的验证、通知等，需要配置C字段，根据不同人和不同的驱动来定义' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pwd
-- ----------------------------
DROP TABLE IF EXISTS `auth_pwd`;
CREATE TABLE `auth_pwd`  (
  `UID` bigint(20) UNSIGNED NOT NULL,
  `PWD` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`UID`) USING BTREE,
  CONSTRAINT `FK_auth_7` FOREIGN KEY (`UID`) REFERENCES `auth_users` (`UID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pwd
-- ----------------------------
INSERT INTO `auth_pwd` VALUES (1, '');

-- ----------------------------
-- Table structure for rule
-- ----------------------------
DROP TABLE IF EXISTS `auth_rule`;
CREATE TABLE `auth_rule`  (
  `RID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `RGID` bigint(20) UNSIGNED NOT NULL,
  `Title` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Type` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'F前端权限,B后端权限,P公用，',
  `Rule` char(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Memo` char(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Sort` bigint(20) NOT NULL,
  PRIMARY KEY (`RID`) USING BTREE,
  UNIQUE INDEX `u_rule_rgid`(`RGID`, `Title`) USING BTREE,
  CONSTRAINT `FK_rule_group` FOREIGN KEY (`RGID`) REFERENCES `auth_rule_group` (`RGID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rule
-- ----------------------------
INSERT INTO `auth_rule` VALUES (1, 3, '登陆', 'P', 'Auth/login', '登陆权限', 1);
INSERT INTO `auth_rule` VALUES (2, 3, '注册', 'P', 'Auth/regist', '注册权限', 1);
INSERT INTO `auth_rule` VALUES (3, 3, '重置密码', 'P', 'Auth/forget', '重置密码', 1);

-- ----------------------------
-- Table structure for rule_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_rule_group`;
CREATE TABLE `auth_rule_group`  (
  `RGID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Title` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Memo` char(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PRGID` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `Sort` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用于排序',
  PRIMARY KEY (`RGID`) USING BTREE,
  UNIQUE INDEX `u_rule_group_title`(`Title`) USING BTREE,
  INDEX `AK_rule_group_sort`(`Sort`) USING BTREE
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rule_group
-- ----------------------------
INSERT INTO `auth_rule_group` VALUES (1, '默认分组', '默认分组', 0, 1);
INSERT INTO `auth_rule_group` VALUES (2, '账户管理', '系统账户操作', 0, 1);
INSERT INTO `auth_rule_group` VALUES (3, '基础权限', '基础类权限含登陆注册等', 0, 1);

-- ----------------------------
-- Table structure for user_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_group`;
CREATE TABLE `auth_user_group`  (
  `UGID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Title` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Sort` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用于排序',
  `PUGID` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `Memo` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `EUGID` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用于实现基于递归算法的简单权限配置',
  PRIMARY KEY (`UGID`) USING BTREE,
  UNIQUE INDEX `u_group_title`(`Title`) USING BTREE,
  INDEX `AK_user_group_sort`(`Sort`) USING BTREE
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_group
-- ----------------------------
INSERT INTO `auth_user_group` VALUES (1, '默认分组', 1, 0, '默认分组', 0);
INSERT INTO `auth_user_group` VALUES (2, '系统管理员', 1, 0, '系统管理员，所有权限', 1);
INSERT INTO `auth_user_group` VALUES (3, '管理员', 1, 0, '标准管理员', 1);
INSERT INTO `auth_user_group` VALUES (4, '普通账户', 1, 0, '普通用户', 1);
INSERT INTO `auth_user_group` VALUES (5, '禁用账户', 1, 0, '禁用', 0);

-- ----------------------------
-- Table structure for user_group_link
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_group_link`;
CREATE TABLE `auth_user_group_link`  (
  `UGLID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `UID` bigint(20) UNSIGNED NOT NULL,
  `UGID` bigint(20) UNSIGNED NOT NULL,
  `CTime` datetime(0) NULL,
  `Memo` char(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`UGLID`) USING BTREE,
  UNIQUE INDEX `u_ugl`(`UID`, `UGID`) USING BTREE,
  INDEX `FK_user_group_group`(`UGID`) USING BTREE,
  CONSTRAINT `FK_user_group_group` FOREIGN KEY (`UGID`) REFERENCES `auth_user_group` (`UGID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_group_user` FOREIGN KEY (`UID`) REFERENCES `auth_users` (`UID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_group_link
-- ----------------------------
INSERT INTO `auth_user_group_link` VALUES (1, 1, 2, '2019-05-03 11:43:39', '系统内置');

-- ----------------------------
-- Table structure for user_group_rule_link
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_group_rule_link`;
CREATE TABLE `auth_user_group_rule_link`  (
  `UGRL` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `UGID` bigint(20) UNSIGNED NOT NULL,
  `RID` bigint(20) UNSIGNED NOT NULL,
  `U` tinyint(1) UNSIGNED NOT NULL DEFAULT 15,
  `G` tinyint(1) UNSIGNED NOT NULL DEFAULT 15,
  `O` tinyint(1) UNSIGNED NOT NULL DEFAULT 15,
  PRIMARY KEY (`UGRL`) USING BTREE,
  UNIQUE INDEX `u_ugrl`(`UGID`, `RID`) USING BTREE,
  INDEX `FK_user_group_rule_rule`(`RID`) USING BTREE,
  CONSTRAINT `FK_user_group_rule_link` FOREIGN KEY (`UGID`) REFERENCES `auth_user_group` (`UGID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_group_rule_rule` FOREIGN KEY (`RID`) REFERENCES `auth_rule` (`RID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_group_rule_link
-- ----------------------------
INSERT INTO `auth_user_group_rule_link` VALUES (1, 1, 1,15,15,15);
INSERT INTO `auth_user_group_rule_link` VALUES (2, 1, 2,15,15,15);
INSERT INTO `auth_user_group_rule_link` VALUES (3, 1, 3,15,15,15);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `auth_users`;
CREATE TABLE `auth_users`  (
  `UID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` char(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Nick` char(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Sex` tinyint(1) NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '-1禁用，1正常',
  `Channel` char(20) NOT NULL DEFAULT "",
  `PUID`  bigint(20) NOT NULL DEFAULT 1,
  `TNum`  bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`UID`) USING BTREE,
  UNIQUE INDEX `u_nick`(`Nick`) USING BTREE
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `auth_users` VALUES (1, 'admin', 'admin', 1, 1,"",1,0);

-- ----------------------------
-- View structure for login_check
-- ----------------------------
DROP VIEW IF EXISTS `auth_login_check`;
CREATE VIEW `auth_login_check` AS select `auth_account`.`Account` AS `Account`,`auth_pwd`.`PWD` AS `PWD`,`auth_account`.`Type` AS `Type`,`auth_account`.`Status` AS `Status`,`auth_account`.`UID` AS `UID` from (`auth_account` join `auth_pwd` on((`auth_pwd`.`UID` = `auth_account`.`UID`)));

-- ----------------------------
-- View structure for user_group_rules
-- ----------------------------
DROP VIEW IF EXISTS `auth_user_group_rules`;
CREATE VIEW `auth_user_group_rules` AS select `auth_user_group_rule_link`.`UGID` AS `UGID`,`auth_rule`.`RID` AS `RID`,`auth_rule`.`Title` AS `Title`,`auth_rule`.`Type` AS `Type`,`auth_rule`.`Rule` AS `Rule`,`auth_rule`.`Sort` AS `Sort` from ((`auth_user_group` join `auth_user_group_rule_link` on((`auth_user_group_rule_link`.`UGID` = `auth_user_group`.`UGID`))) join `auth_rule` on((`auth_rule`.`RID` = `auth_user_group_rule_link`.`RID`)));

-- ----------------------------
-- View structure for user_rules
-- ----------------------------
DROP VIEW IF EXISTS `auth_user_rules`;
CREATE VIEW `auth_user_rules` AS select `auth_user_group_link`.`UGID` AS `UGID`,`auth_user_group_link`.`UID` AS `UID`,`auth_rule`.`RID` AS `RID`,`auth_rule`.`Title` AS `Title`,`auth_rule`.`Type` AS `Type`,`auth_rule`.`Rule` AS `Rule` from ((`auth_user_group_link` join `auth_user_group_rule_link` on((`auth_user_group_rule_link`.`UGID` = `auth_user_group_link`.`UGID`))) join `auth_rule` on((`auth_user_group_rule_link`.`RID` = `auth_rule`.`RID`)));

SET FOREIGN_KEY_CHECKS = 1;
