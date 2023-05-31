USE immohabitat;
drop database if EXISTS immohabitat;
create database if not EXISTS immohabitat;

SET FOREIGN_KEY_CHECKS = 0; -- Désactive la vérification des clés étrangères pour permettre le TRUNCATE

TRUNCATE TABLE users;
TRUNCATE TABLE types;
TRUNCATE TABLE locations;
TRUNCATE TABLE properties;

SET FOREIGN_KEY_CHECKS = 1; -- Réactive la vérification des clés étrangères

-- users.sql

INSERT INTO users (email, password)
VALUES
  ('wetterene@msn.com', '$2b$10$5DRrBoe.YE4Z4Zbav4cRuOxjiPe0hBBkiYYgMvva8.S8heX1u89eO','wetterene','remy'), -- Mot de passe : password1
  ('legoarant@gmail.com', '$2b$10$5DRrBoe.YE4Z4Zbav4cRuOxjiPe0hBBkiYYgMvva8.S8heX1u89eO','legoarant','Chloé'), -- Mot de passe : password2
  ('urbain@hotmail.com', '$2b$10$5DRrBoe.YE4Z4Zbav4cRuOxjiPe0hBBkiYYgMvva8.S8heX1u89eO','urbain','ludovic'); -- Mot de passe : password3
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