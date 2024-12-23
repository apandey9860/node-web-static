CREATE ROLE admin WITH
    LOGIN
    SUPERUSER
    CREATEDB
    CREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD 'tooshort';

CREATE ROLE "Viewer" WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'tooshort';

CREATE ROLE "Customer" WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'tooshort';

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

CREATE SCHEMA PERSON AUTHORIZATION admin;
CREATE SCHEMA TRADE AUTHORIZATION admin;
CREATE SCHEMA REPAIR AUTHORIZATION admin;
CREATE SCHEMA MISC AUTHORIZATION admin;
CREATE SCHEMA INVENTORY AUTHORIZATION admin;

DROP SCHEMA public CASCADE;

-- Create a table to store user access levels and descriptions
CREATE TABLE PERSON.USER_ACCESS (
    USER_ACCESS_ID SERIAL PRIMARY KEY,
    USER_ACCESS_LEVEL VARCHAR(200) NOT NULL,
    USER_ACCESS_DESCRIPTION VARCHAR(200)
);

INSERT INTO PERSON.USER_ACCESS (USER_ACCESS_ID,USER_ACCESS_LEVEL, USER_ACCESS_DESCRIPTION) VALUES
    (1, 'Viewer', 'Can View Website'),
    (2, 'Customer', 'Can use buy or repair services'),
    (3, 'Admin','All privilege and can create other users');

-- Create a table to store user information including hashed passwords
CREATE TABLE PERSON.USERS (
    USER_ID SERIAL PRIMARY KEY,
    USER_NAME VARCHAR(100) NOT NULL,
    USER_FULLNAME VARCHAR(100) NOT NULL,
    USER_PASSWORD TEXT NOT NULL,
    USER_PHONE VARCHAR(50) NOT NULL,
    USER_EMAIL VARCHAR(50) NOT NULL,
    USER_ADDRESS VARCHAR(100) NOT NULL,
    USER_ACCESS_ID INT NOT NULL,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_access FOREIGN KEY (USER_ACCESS_ID) REFERENCES PERSON.USER_ACCESS(USER_ACCESS_ID)
);

-- Create a table to log events associated with user actions
CREATE TABLE MISC.EVENT_LOG (
    EVENT_LOG_ID SERIAL PRIMARY KEY,
    USER_ID INT,
    ACTION_DONE TEXT NOT NULL,
    EVENT_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (USER_ID) REFERENCES PERSON.USERS(USER_ID)
);

-- Table storing product categories with details and timestamps.
CREATE TABLE TRADE.T_CATEGORY (
    T_CATEGORY_ID SERIAL PRIMARY KEY,
    T_CATEGORY_NAME VARCHAR(200) NOT NULL,
    T_CATEGORY_DESC TEXT,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table storing product details including a reference to categories.
CREATE TABLE TRADE.T_PRODUCT (
    T_PRODUCT_ID SERIAL PRIMARY KEY,
    T_PRODUCT_NAME VARCHAR(200) NOT NULL,
    T_PRODUCT_PRICE VARCHAR(100),
    T_PRODUCT_PIC VARCHAR(100),
    T_PRODUCT_SHORT_DESC TEXT,
    T_PRODUCT_DESC TEXT,
    T_CATEGORY_ID INT,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (T_CATEGORY_ID) REFERENCES TRADE.T_CATEGORY(T_CATEGORY_ID)
);

-- Table storing product pictures with a reference to products.
CREATE TABLE TRADE.T_PROD_PIC (
    T_PROD_PIC_ID SERIAL PRIMARY KEY,
    T_PROD_PIC_NAME VARCHAR(200) NOT NULL,
    T_PROD_PIC_DATA VARCHAR(100),
    T_PRODUCT_ID INT,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (T_PRODUCT_ID) REFERENCES TRADE.T_PRODUCT(T_PRODUCT_ID)
);

-- Table tracking product-related timeline events and user interactions.
CREATE TABLE TRADE.T_PROD_TIMELINE (
    T_PROD_TLINE_ID SERIAL PRIMARY KEY,
    T_PROD_TLINE_INTERVAL INTERVAL,
    T_PROD_TLINE_FINISH TIMESTAMP,
    T_PROD_TLINE_DELIVERY TIMESTAMP,
    T_PROD_DEL_STATUS BOOLEAN,
    T_PRODUCT_ID INT,
    USER_ID INT NOT NULL,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (T_PRODUCT_ID) REFERENCES TRADE.T_PRODUCT(T_PRODUCT_ID),
    FOREIGN KEY (USER_ID) REFERENCES PERSON.USERS(USER_ID)
);

-- Table storing historical data including product and user details.
CREATE TABLE TRADE.T_HISTORY (
    T_HISTORY_ID SERIAL PRIMARY KEY,
    T_CATEGORY_NAME VARCHAR(200),
    T_PRODUCT_NAME VARCHAR(200),
    T_PROD_PIC_DATA VARCHAR(100),
    T_PRODUCT_PRICE VARCHAR(100),
    T_PROD_TLINE_INTERVAL INTERVAL,
    T_PROD_TLINE_FINISH TIMESTAMP,
    USER_NAME VARCHAR(100) NOT NULL,
    USER_FULLNAME VARCHAR(100) NOT NULL,
    USER_PHONE VARCHAR(50) NOT NULL,
    USER_EMAIL VARCHAR(50) NOT NULL,
    USER_ADDRESS VARCHAR(100) NOT NULL,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table storing repair categories with details and timestamps.
CREATE TABLE REPAIR.R_CATEGORY (
    R_CATEGORY_ID SERIAL PRIMARY KEY,
    R_CATEGORY_NAME VARCHAR(200) NOT NULL,
    R_CATEGORY_DESC TEXT,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table storing repair product details including a reference to categories.
CREATE TABLE REPAIR.R_PRODUCT (
    R_PRODUCT_ID SERIAL PRIMARY KEY,
    R_PRODUCT_NAME VARCHAR(200) NOT NULL,
    R_PRODUCT_PRICE VARCHAR(100),
    R_PRODUCT_SHORT_DESC TEXT,
    R_PRODUCT_DESC TEXT,
    R_CATEGORY_ID INT,
    R_REPAIR_STATUS BOOLEAN,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (R_CATEGORY_ID) REFERENCES REPAIR.R_CATEGORY(R_CATEGORY_ID)
);

-- Table storing repair product pictures with a reference to products.
CREATE TABLE REPAIR.R_PROD_PIC (
    R_PROD_PIC_ID SERIAL PRIMARY KEY,
    R_PROD_PIC_NAME VARCHAR(200) NOT NULL,
    R_PROD_PIC_DATA VARCHAR(100),
    R_PRODUCT_ID INT,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (R_PRODUCT_ID) REFERENCES REPAIR.R_PRODUCT(R_PRODUCT_ID)
);

-- Table tracking repair product-related timeline events and user interactions.
CREATE TABLE REPAIR.R_PROD_TIMELINE (
    R_PROD_TLINE_ID SERIAL PRIMARY KEY,
    R_PROD_TLINE_INTERVAL INTERVAL,
    R_PROD_TLINE_FINISH TIMESTAMP,
    R_PROD_TLINE_DELIVERY INT,
    R_PRODUCT_ID INT,
    USER_ID INT NOT NULL,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (R_PRODUCT_ID) REFERENCES REPAIR.R_PRODUCT(R_PRODUCT_ID),
    FOREIGN KEY (USER_ID) REFERENCES PERSON.USERS(USER_ID)
);

-- Table associating repair products with timeline events.
CREATE TABLE REPAIR.R_PROD_VIEW (
    R_PROD_VIEW_ID SERIAL PRIMARY KEY,
    R_PRODUCT_ID INT,
    R_PROD_TLINE_ID INT,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (R_PRODUCT_ID) REFERENCES REPAIR.R_PRODUCT(R_PRODUCT_ID),
    FOREIGN KEY (R_PROD_TLINE_ID) REFERENCES REPAIR.R_PROD_TIMELINE(R_PROD_TLINE_ID)
);

-- Table storing historical data including repair products and user details.
CREATE TABLE REPAIR.R_HISTORY (
    R_HISTORY_ID SERIAL PRIMARY KEY,
    R_CATEGORY_NAME VARCHAR(200),
    R_PRODUCT_NAME VARCHAR(200),
    R_PROD_PIC_DATA VARCHAR(100),
    R_PRODUCT_PRICE VARCHAR(100),
    R_PROD_TLINE_INTERVAL INTERVAL,
    R_PROD_TLINE_FINISH TIMESTAMP,
    USER_NAME VARCHAR(100) NOT NULL,
    USER_FULLNAME VARCHAR(100) NOT NULL,
    USER_PHONE VARCHAR(50) NOT NULL,
    USER_EMAIL VARCHAR(50) NOT NULL,
    USER_ADDRESS VARCHAR(100) NOT NULL,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table to feedback associated with user 
CREATE TABLE MISC.FEEDBACK (
    FEEDBACK_ID SERIAL PRIMARY KEY,
    FEEDBACK_TEXT TEXT,
    FEEDBACK_IMG VARCHAR(200),
    USER_ID INT,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LAST_UPDATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (USER_ID) REFERENCES PERSON.USERS(USER_ID)
);

-- Function to update LAST_UPDATED_DATE before any row in PERSON.USERS table is updated.
CREATE OR REPLACE FUNCTION PERSON.update_last_updated_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.LAST_UPDATED_DATE = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the update_last_updated_date function before updating any row in PERSON.USERS table.
CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON PERSON.USERS
FOR EACH ROW EXECUTE FUNCTION PERSON.update_last_updated_date();

-- Function to update LAST_UPDATED_DATE before any row in MISC.FEEDBACK table is updated.
CREATE OR REPLACE FUNCTION MISC.update_last_updated_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.LAST_UPDATED_DATE = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the update_last_updated_date function before updating any row in MISC.FEEDBACK table.
CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON MISC.FEEDBACK
FOR EACH ROW EXECUTE FUNCTION MISC.update_last_updated_date();

-- Function to update LAST_UPDATED_DATE before any row in TRADE tables is updated.
CREATE OR REPLACE FUNCTION TRADE.update_last_updated_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.LAST_UPDATED_DATE = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to call the update_last_updated_date function before updating rows in various TRADE tables.
CREATE TRIGGER trade_category_last_updated_trigger
BEFORE UPDATE ON TRADE.T_CATEGORY
FOR EACH ROW EXECUTE FUNCTION TRADE.update_last_updated_date();

CREATE TRIGGER trade_product_last_updated_trigger
BEFORE UPDATE ON TRADE.T_PRODUCT
FOR EACH ROW EXECUTE FUNCTION TRADE.update_last_updated_date();

CREATE TRIGGER trade_prod_pic_last_updated_trigger
BEFORE UPDATE ON TRADE.T_PROD_PIC
FOR EACH ROW EXECUTE FUNCTION TRADE.update_last_updated_date();

CREATE TRIGGER trade_prod_timeline_last_updated_trigger
BEFORE UPDATE ON TRADE.T_PROD_TIMELINE
FOR EACH ROW EXECUTE FUNCTION TRADE.update_last_updated_date();

-- Function to update LAST_UPDATED_DATE before any row in REPAIR tables is updated.
CREATE OR REPLACE FUNCTION REPAIR.update_last_updated_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.LAST_UPDATED_DATE = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to call the update_last_updated_date function before updating rows in various REPAIR tables.
CREATE TRIGGER repair_category_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_CATEGORY
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();

CREATE TRIGGER repair_product_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_PRODUCT
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();

CREATE TRIGGER repair_prod_pic_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_PROD_PIC
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();

CREATE TRIGGER repair_prod_timeline_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_PROD_TIMELINE
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();

