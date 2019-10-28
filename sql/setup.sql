CREATE DATABASE IF NOT EXISTS warehouse;

USE warehouse;

CREATE USER IF NOT EXISTS 'admin'@'%'
    IDENTIFIED BY 'pass'
;

GRANT ALL PRIVILEGES
    ON warehouse.*
    TO 'admin'@'%'
;

