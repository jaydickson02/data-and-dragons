CREATE TABLE Characters (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  CampaignID INT,
  Name VARCHAR(255),
  Image VARCHAR(255),
  Player BOOLEAN,
  Background TEXT,
  Class VARCHAR(255),
  Race VARCHAR(255),
  PlayerName VARCHAR(255),
  Favourited BOOLEAN,
  Status VARCHAR(255),
  Level INT,
  Affiliation VARCHAR(255),
  Alignment VARCHAR(255),
  Location VARCHAR(255)
);

CREATE TABLE Campaign (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255),
  DM VARCHAR(255),
  Background TEXT,
  CoverImage VARCHAR(255)
);

CREATE TABLE Notes (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  ObjectID INT,
  Content TEXT,
  Session INT
);

CREATE TABLE Locations (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  CampaignID INT,
  Name VARCHAR(255),
  Background TEXT,
  Image VARCHAR(255),
  Favourited BOOLEAN
);
