CREATE DATABASE IF NOT EXISTS `together`;
USE `together`;

DROP TABLE IF EXISTS  `user`;
CREATE TABLE `user` (
    `idUser` INT(255) NOT NULL AUTO_INCREMENT,
    `avatarUser` VARCHAR(255),
    `pseudoUser` VARCHAR(33) NOT NULL,
    `mailUser` VARCHAR(33) NOT NULL,
    `passwordUser` VARCHAR(255) NOT NULL,
    `birthdayUser` DATE NOT NULL,
    `roleUser` VARCHAR(33) NOT NULL,

    PRIMARY KEY (`idUser`)
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
    `id` INT(255) NOT NULL AUTO_INCREMENT,
    `id_User` INT(255) NOT NULL,
    `id_Friend` INT(255) NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_User`) REFERENCES user(`idUser`),
    FOREIGN KEY (`id_Friend`) REFERENCES user(`idUser`)
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `feed`;
CREATE TABLE `feed` (
    `idFeed` INT(255) NOT NULL AUTO_INCREMENT,
    `contentFeed` VARCHAR(255) NOT NULL,
    `idUser` INT(255) NOT NULL,
    `likes` INT(255) DEFAULT 0,

    PRIMARY KEY (`idFeed`),
    FOREIGN KEY(`idUser`) REFERENCES user(`idUser`) ON DELETE CASCADE
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
    `idLike` INT(255) NOT NULL AUTO_INCREMENT,
    `idFeed` INT(255) NOT NULL,
    `idUser` INT(255) NOT NULL,
    `type` ENUM('like', 'dislike') NOT NULL,

    PRIMARY KEY (`idLike`),
    FOREIGN KEY (`idFeed`) REFERENCES feed(`idFeed`) ON DELETE CASCADE,
    FOREIGN KEY (`idUser`) REFERENCES user(`idUser`) ON DELETE CASCADE
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `feedCommentary`;
CREATE TABLE `feedCommentary` (
    `idFeedCommentary` INT(255) NOT NULL AUTO_INCREMENT,
    `commentary` VARCHAR(255) NOT NULL,
    `idFeed` INT(255) NOT NULL,
    `idUser` INT(255) NOT NULL,
    `create` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`idFeedCommentary`),
    FOREIGN KEY(`idFeed`) REFERENCES feed(`idFeed`) ON DELETE CASCADE,
    FOREIGN KEY (`idUser`) REFERENCES user(`idUser`) ON DELETE CASCADE
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
    `idMessage` INT(255) NOT NULL AUTO_INCREMENT,
    `idUser` INT(255) NOT NULL,
    `idSender` INT(255) NOT NULL,
    `contentMessage` VARCHAR(255) NOT NULL,
    `timeMessage` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`idMessage`),
    FOREIGN KEY(`idUser`) REFERENCES user(`idUser`) ON DELETE CASCADE
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
    `idReport` INT(255) NOT NULL AUTO_INCREMENT,
    `contentReport` VARCHAR(255) NOT NULL,
    `timeReport` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `idUser` INT(255) NOT NULL,
    `idFeed` INT(255) NOT NULL,

    PRIMARY KEY (`idReport`),
    FOREIGN KEY(`idUser`) REFERENCES user(`idUser`) ON DELETE CASCADE,
    FOREIGN KEY (`idFeed`) REFERENCES feed(`idFeed`) ON DELETE CASCADE
)
ENGINE = InnoDB;