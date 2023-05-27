-- drop database if EXISTS immohabitat;
-- create database if not EXISTS immohabitat;
USE immohabitat;

SET FOREIGN_KEY_CHECKS = 0; -- Désactive la vérification des clés étrangères pour permettre le TRUNCATE

TRUNCATE TABLE users;
TRUNCATE TABLE types;
TRUNCATE TABLE locations;
TRUNCATE TABLE properties;

SET FOREIGN_KEY_CHECKS = 1; -- Réactive la vérification des clés étrangères

-- users.sql

INSERT INTO users (email, password)
VALUES
  ('user1@example.com', '$2b$10$5DRrBoe.YE4Z4Zbav4cRuOxjiPe0hBBkiYYgMvva8.S8heX1u89eO'), -- Mot de passe : password1
  ('user2@example.com', '$2b$10$5DRrBoe.YE4Z4Zbav4cRuOxjiPe0hBBkiYYgMvva8.S8heX1u89eO'), -- Mot de passe : password2
  ('user3@example.com', '$2b$10$5DRrBoe.YE4Z4Zbav4cRuOxjiPe0hBBkiYYgMvva8.S8heX1u89eO'); -- Mot de passe : password3
-- Ajoutez d'autres valeurs pour les autres utilisateurs ici


-- types.sql
INSERT INTO types (title, description) VALUES
  ('Maison', 'Une maison résidentielle'),
  ('Appartement', 'Un appartement en copropriété');

-- location.sql
INSERT INTO locations (street, city, post_code) VALUES
  ('123 Rue de la Maison', 'Paris', '75000'),
  ('456 Avenue de l\'Appartement', 'Lyon', '69000');

-- properties.sql

insert into properties (`title`, `description`, `slug`, `price`, `yearBuilt`, `room`, `floor`, `bedrooms`, `bathrooms`, `kitchenType`, `locationId`, `userId`, `typeId`) VALUES('test','description','proprite-1',60000,now(),2,1,1,1,'équipée',1,1,1);