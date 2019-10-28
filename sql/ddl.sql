USE warehouse;

/* DROP TABLE IF EXISTS Controls;
CREATE TABLE Controls
(
    control_id INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(20) UNIQUE,
    PRIMARY KEY(control_id)
)
ENGINE INNODB
CHARSET UTF8
COLLATE UTF8_SWEDISH_CI
;
 */
DROP TABLE IF EXISTS Vehicle_to_control;
/* CREATE TABLE Vehicle_to_control
(
    vehicle_id INT NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id),
    control_id INT NOT NULL,
    FOREIGN KEY (control_id) REFERENCES Controls(control_id),
    control_action_url varchar(100),
    PRIMARY KEY(vehicle_id, control_id)
)
ENGINE INNODB
CHARSET UTF8
COLLATE UTF8_SWEDISH_CI
; */
DROP TABLE IF EXISTS Camera;
CREATE TABLE Camera
(
    camera_id INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(20) UNIQUE,
    camera_url VARCHAR(100),
    `description` VARCHAR(100),
    PRIMARY KEY(camera_id)
)
ENGINE INNODB
CHARSET UTF8
COLLATE UTF8_SWEDISH_CI
;

DROP TABLE IF EXISTS Vehicles;
CREATE TABLE Vehicles
(
    vehicle_id INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(20) UNIQUE,
    `description` VARCHAR(100),
    PRIMARY KEY(vehicle_id)
)
ENGINE INNODB
CHARSET UTF8
COLLATE UTF8_SWEDISH_CI
;

DROP TABLE IF EXISTS Notifications;
CREATE TABLE Notifications
(
    receiptant_id INT AUTO_INCREMENT NOT NULL,
    phone_number VARCHAR(15) UNIQUE,
    PRIMARY KEY(receiptant_id)
)
ENGINE INNODB
CHARSET UTF8
COLLATE UTF8_SWEDISH_CI
;
