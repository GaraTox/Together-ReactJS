-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 27 juin 2025 à 00:16
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `togetherjs`
--

-- --------------------------------------------------------

--
-- Structure de la table `feed`
--

DROP TABLE IF EXISTS `feed`;
CREATE TABLE IF NOT EXISTS `feed` (
  `idFeed` int NOT NULL AUTO_INCREMENT,
  `contentFeed` varchar(255) DEFAULT NULL,
  `idUser` int NOT NULL,
  `create` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idFeed`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `feed`
--

INSERT INTO `feed` (`idFeed`, `contentFeed`, `idUser`, `create`) VALUES
(4, 'La coupe du monde des clubs commence bientôt', 1, '2025-06-12 22:33:44'),
(5, 'C\'était une belle journée', 2, '2025-06-13 19:50:42');

-- --------------------------------------------------------

--
-- Structure de la table `feedcommentary`
--

DROP TABLE IF EXISTS `feedcommentary`;
CREATE TABLE IF NOT EXISTS `feedcommentary` (
  `idFeedCommentary` int NOT NULL AUTO_INCREMENT,
  `commentary` varchar(255) NOT NULL,
  `idFeed` int NOT NULL,
  `idUser` int NOT NULL,
  `create` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idFeedCommentary`),
  KEY `idFeed` (`idFeed`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `feedcommentary`
--

INSERT INTO `feedcommentary` (`idFeedCommentary`, `commentary`, `idFeed`, `idUser`, `create`) VALUES
(1, 'J\'ai hâte', 4, 3, '2025-06-13 19:37:35');

-- --------------------------------------------------------

--
-- Structure de la table `friend`
--

DROP TABLE IF EXISTS `friend`;
CREATE TABLE IF NOT EXISTS `friend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_User` int NOT NULL,
  `id_Friend` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_User` (`id_User`),
  KEY `id_Friend` (`id_Friend`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `friend`
--

INSERT INTO `friend` (`id`, `id_User`, `id_Friend`) VALUES
(1, 1, 2),
(2, 1, 3),
(9, 3, 1),
(10, 2, 1),
(11, 2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `idLike` int NOT NULL AUTO_INCREMENT,
  `idFeed` int NOT NULL,
  `idUser` int NOT NULL,
  PRIMARY KEY (`idLike`),
  KEY `idFeed` (`idFeed`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`idLike`, `idFeed`, `idUser`) VALUES
(1, 4, 3),
(2, 4, 2);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `idMessage` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `idSender` int NOT NULL,
  `contentMessage` varchar(255) NOT NULL,
  `timeMessage` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idMessage`),
  KEY `idUser` (`idUser`),
  KEY `idSender` (`idSender`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`idMessage`, `idUser`, `idSender`, `contentMessage`, `timeMessage`) VALUES
(1, 2, 2, 'Salut', '2025-06-27 00:12:03'),
(2, 2, 1, 'Hey', '2025-06-27 00:12:08'),
(3, 2, 2, 'Ca va ?', '2025-06-27 00:12:20'),
(5, 2, 1, 'Oui', '2025-06-27 00:13:15');

-- --------------------------------------------------------

--
-- Structure de la table `report`
--

DROP TABLE IF EXISTS `report`;
CREATE TABLE IF NOT EXISTS `report` (
  `idReport` int NOT NULL AUTO_INCREMENT,
  `contentReport` varchar(255) NOT NULL,
  `timeReport` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idUser` int NOT NULL,
  `idFeed` int NOT NULL,
  PRIMARY KEY (`idReport`),
  KEY `idUser` (`idUser`),
  KEY `idFeed` (`idFeed`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `report`
--

INSERT INTO `report` (`idReport`, `contentReport`, `timeReport`, `idUser`, `idFeed`) VALUES
(1, 'y\'a un problème', '2025-06-13 20:42:49', 3, 4),
(2, 'gros problème', '2025-06-13 20:43:51', 3, 4),
(3, 'enorme problème', '2025-06-13 20:49:29', 3, 4);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `avatarUser` varchar(255) DEFAULT NULL,
  `pseudoUser` varchar(33) NOT NULL,
  `mailUser` varchar(33) NOT NULL,
  `passwordUser` varchar(255) NOT NULL,
  `birthdayUser` date NOT NULL,
  `roleUser` varchar(33) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `avatarUser`, `pseudoUser`, `mailUser`, `passwordUser`, `birthdayUser`, `roleUser`) VALUES
(1, '1-1749766681699-icon1.png', 'GaraTox', 'garcia.cyril@outlook.com', '$2b$10$T75RYz7FlW2TAf0tPFmjw.Qg1v7E4OC0kIZzuiOjyk7j.IsroxFou', '2000-01-24', 'admin'),
(2, '2-1749766715794-icon2.png', 'Yukozzz', 'alexis@gmail.com', '$2b$10$f6LeLUo9inrUtlb8LvPc6OBlchuyYiP/fsLDE6bGDyCHgDGqrHnfS', '2000-03-08', 'user'),
(3, '3-1749767092311-icon3.png', 'Heki', 'louis@gmail.com', '$2b$10$IU4aCeroMieLLLcNZh4qH.RdjSVEuiLEfEeXPUwZn8dLbGcA2Xe0u', '2000-01-18', 'user');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `feed`
--
ALTER TABLE `feed`
  ADD CONSTRAINT `feed_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE;

--
-- Contraintes pour la table `feedcommentary`
--
ALTER TABLE `feedcommentary`
  ADD CONSTRAINT `feedcommentary_ibfk_1` FOREIGN KEY (`idFeed`) REFERENCES `feed` (`idFeed`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedcommentary_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE;

--
-- Contraintes pour la table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`id_User`) REFERENCES `user` (`idUser`),
  ADD CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`id_Friend`) REFERENCES `user` (`idUser`);

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`idFeed`) REFERENCES `feed` (`idFeed`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`idSender`) REFERENCES `user` (`idUser`) ON DELETE CASCADE;

--
-- Contraintes pour la table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE,
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`idFeed`) REFERENCES `feed` (`idFeed`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
