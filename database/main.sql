-- Database: EERO

-- DROP DATABASE IF EXISTS "EERO";

CREATE DATABASE "EERO"
    WITH
    OWNER = admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Connect to the newly created database
\c "EERO" admin;
--tooshort

CREATE SCHEMA PERSON
    AUTHORIZATION admin;

CREATE SCHEMA TRADE
    AUTHORIZATION admin;

CREATE SCHEMA REPAIR
    AUTHORIZATION admin;  

CREATE SCHEMA MISC
    AUTHORIZATION admin;    

CREATE SCHEMA REPAIR
    AUTHORIZATION admin;  

CREATE SCHEMA INVENTORY
    AUTHORIZATION admin;  

DROP SCHEMA public CASCADE;