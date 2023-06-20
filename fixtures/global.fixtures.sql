-- Insérer les propriétés
use immohabitat;
-- drop database if EXISTS immohabitat;
-- create database if not EXISTS immohabitat;
INSERT INTO users (email, password,firstname,lastname)
VALUES
  ('wetterene@msn.com', '$2b$10$5DRrBoe.YE4Z4Zbav4cRuOxjiPe0hBBkiYYgMvva8.S8heX1u89eO','wetterene','remy'), -- Mot de passe : password1
  ('legoarant@gmail.com', '$2b$10$5DRrBoe.YE4Z4Zbav4cRuOxjiPe0hBBkiYYgMvva8.S8heX1u89eO','legoarant','Chloé'), -- Mot de passe : password2
  ('urbain@hotmail.com', '$2b$10$5DRrBoe.YE4Z4Zbav4cRuOxjiPe0hBBkiYYgMvva8.S8heX1u89eO','urbain','ludovic'); -- Mot de passe : password3
-- Ajoutez d'autres valeurs pour les autres utilisateurs ici


-- types.sql
INSERT INTO types (title, description) VALUES
  ('Maison', 'Une maison résidentielle'),
  ('Appartement', 'Un appartement en copropriété');
-- Insérer les localisations
INSERT INTO locations (street, cityId)
VALUES
  ('Chemin de Montignies 22', 1),
  ('Rue de la Liberté 10', 2),
  ('Avenue des Roses 5', 3),
  ('Boulevard Saint-Michel 8', 4),
  ('Rue de la Paix 15', 5),
  ('Avenue du Soleil 12', 1),
  ('Rue du Commerce 7', 2),
  ('Boulevard de la Gare 20', 3),
  ('Avenue des Champs 3', 4),
  ('Rue de la Fontaine 9', 5),
  ('Chemin des Lilas 4', 1),
  ('Rue du Moulin 6', 2),
  ('Boulevard Victor Hugo 17', 3),
  ('Avenue du Lac 2', 4),
  ('Rue de la Plage 14', 5),
  ('Chemin de la Forêt 11', 1),
  ('Rue des Fleurs 8', 2),
  ('Boulevard des Alpes 6', 3),
  ('Avenue du Parc 19', 4),
  ('Rue du Coteau 13', 5);

-- Insérer les propriétés


INSERT INTO properties (title, description, slug, price, yearBuilt, room, floor, bedrooms, bathrooms, livingRoom, diningRoom, kitchenType, garden, pool, terrace, balcony, garage, parking, courtyard, locationId, userId, typeId)
VALUES
  ('Property 1', 'Description of Property 1', 'property-44', 100000, '2000-01-01', 3, 1, 2, 2, TRUE, TRUE, 'Type A', FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, 1, 1, 1),
  ('Property 2', 'Description of Property 2', 'property-2', 200000, '2005-01-01', 4, 2, 3, 2, TRUE, FALSE, 'Type B', TRUE, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, 2, 2, 2),
  ('Property 3', 'Description of Property 3', 'property-3', 150000, '2010-01-01', 2, 1, 1, 1, TRUE, FALSE, 'Type A', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, TRUE, 3, 3, 1),
  ('Property 4', 'Description of Property 4', 'property-4', 180000, '2008-01-01', 5, 3, 4, 3, TRUE, TRUE, 'Type B', TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, 4, 2, 2),
  ('Property 5', 'Description of Property 5', 'property-5', 120000, '1995-01-01', 3, 2, 2, 1, FALSE, FALSE, 'Type A', TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, 5, 1, 1),
  ('Property 6', 'Description of Property 6', 'property-6', 250000, '2015-01-01', 4, 3, 3, 2, TRUE, TRUE, 'Type B', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 6, 2, 2),
  ('Property 7', 'Description of Property 7', 'property-7', 170000, '2003-01-01', 2, 1, 1, 1, FALSE, FALSE, 'Type A', TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, 7, 3, 1),
  ('Property 8', 'Description of Property 8', 'property-8', 190000, '2012-01-01', 5, 2, 4, 2, TRUE, FALSE, 'Type B', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 8, 1, 2),
  ('Property 9', 'Description of Property 9', 'property-9', 140000, '1998-01-01', 3, 1, 3, 2, TRUE, TRUE, 'Type A', TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, 9, 1, 1),
  ('Property 10', 'Description of Property 10', 'property-10', 220000, '2018-01-01', 4, 2, 2, 2, FALSE, FALSE, 'Type B', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 10, 1, 2),
  ('Property 11', 'Description of Property 11', 'property-11', 160000, '2006-01-01', 2, 1, 1, 1, TRUE, FALSE, 'Type A', TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, 11, 3, 1),
  ('Property 12', 'Description of Property 12', 'property-12', 230000, '2016-01-01', 5, 3, 4, 3, TRUE, TRUE, 'Type B', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 12, 1, 2),
  ('Property 13', 'Description of Property 13', 'property-13', 130000, '1999-01-01', 3, 2, 2, 1, FALSE, FALSE, 'Type A', TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, 13, 1, 1),
  ('Property 14', 'Description of Property 14', 'property-14', 260000, '2019-01-01', 4, 3, 3, 2, TRUE, TRUE, 'Type B', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 14, 2, 2),
  ('Property 15', 'Description of Property 15', 'property-15', 180000, '2004-01-01', 2, 1, 1, 1, FALSE, FALSE, 'Type A', TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, 15, 3, 1),
  ('Property 16', 'Description of Property 16', 'property-16', 210000, '2014-01-01', 5, 2, 4, 2, TRUE, FALSE, 'Type B', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 16, 2, 2),
  ('Property 17', 'Description of Property 17', 'property-17', 150000, '1997-01-01', 3, 1, 3, 2, TRUE, TRUE, 'Type A', TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, 17, 1, 1),
  ('Property 18', 'Description of Property 18', 'property-18', 240000, '2017-01-01', 4, 2, 2, 2, FALSE, FALSE, 'Type B', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 18, 2, 2),
  ('Property 19', 'Description of Property 19', 'property-19', 170000, '2002-01-01', 2, 1, 1, 1, TRUE, FALSE, 'Type A', TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, 19, 3, 1),
  ('Property 20', 'Description of Property 20', 'property-20', 200000, '2013-01-01', 5, 3, 4, 3, TRUE, TRUE, 'Type B', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 20, 1, 2);





INSERT INTO images (path, propertyId) VALUES
  ('https://images.unsplash.com/photo-1521737711868-74a5b72bdc7d', 1),
  ('https://images.unsplash.com/photo-1512917774080-9991f1c4c750', 1),
  
  ('https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 1),
  ('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 1),
  ('https://unsplash.com/fr/photos/maison-en-beton-marron-et-blanc-pres-dun-champ-dherbe-verte-pendant-la-journee-aren8nutd1Q', 2),
  ('https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 2),
  ('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 2),
  ('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80', 2),
  ('https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 3),
  ('https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 3),
  ('https://images.unsplash.com/photo-1560026301-88340cf16be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80', 3),
  ('https://images.unsplash.com/photo-1430285561322-7808604715df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 3),
  ('https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 4),
  ('https://plus.unsplash.com/premium_photo-1663126312373-b2d5264c2edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1183&q=80', 4),
  ('https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 4),
  ('https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1213&q=80', 4),
  ('https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 5),
  ('https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1213&q=80', 5),
  ('https://plus.unsplash.com/premium_photo-1672252617502-a0622171d5a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 5),
  ('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80', 6),
  ('https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 6),
  ('https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 6),
  ('https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1213&q=80', 7),
  ('https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 7),
  ('https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1213&q=80', 7),
  ('https://plus.unsplash.com/premium_photo-1672252617502-a0622171d5a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 7),
  ('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80', 8),
  ('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 8),
  ('https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 8),
  ('https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 8),
  ('https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 9),
  ('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 9),
 ('https://images.unsplash.com/photo-1560026301-88340cf16be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80', 10),
  ('https://images.unsplash.com/photo-1430285561322-7808604715df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 10),
  ('https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 10),
  ('https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 10);