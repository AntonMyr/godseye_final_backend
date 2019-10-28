DELETE FROM Camera WHERE camera_id IS NOT NULL;
DELETE FROM Vehicles WHERE vehicle_id IS NOT NULL;

LOAD DATA LOCAL INFILE './camera_insert.csv'
INTO TABLE Camera
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(name, camera_url, description)
;

LOAD DATA LOCAL INFILE './vehicles_insert.csv'
INTO TABLE Vehicles
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(name, description)
;