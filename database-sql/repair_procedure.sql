CREATE OR REPLACE PROCEDURE REPAIR.add_repair_category(
    IN p_category_name VARCHAR(200),
    IN p_category_desc TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO REPAIR.R_CATEGORY (R_CATEGORY_NAME, R_CATEGORY_DESC)
    VALUES (p_category_name, p_category_desc);
END;
$$;

-- Test Case
CALL REPAIR.add_repair_category('Electronics', 'Electronic goods and accessories');

CREATE OR REPLACE PROCEDURE REPAIR.update_repair_category(
    IN p_category_id INT,
    IN p_category_name VARCHAR(200),
    IN p_category_desc TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE REPAIR.R_CATEGORY
    SET R_CATEGORY_NAME = p_category_name,
        R_CATEGORY_DESC = p_category_desc,
        LAST_UPDATED_DATE = CURRENT_TIMESTAMP
    WHERE R_CATEGORY_ID = p_category_id;
END;
$$;

-- Test Case
CALL REPAIR.update_repair_category(1, 'Updated Electronics', 'Updated description');


CREATE OR REPLACE PROCEDURE REPAIR.delete_repair_category(
    IN p_category_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM REPAIR.R_CATEGORY WHERE R_CATEGORY_ID = p_category_id;
END;
$$;

-- Test Case
CALL REPAIR.delete_repair_category(1);

CREATE OR REPLACE PROCEDURE REPAIR.add_repair_product(
    IN p_product_name VARCHAR(200),
    IN p_product_price VARCHAR(100),
    IN p_product_short_desc TEXT,
    IN p_product_desc TEXT,
    IN p_category_id INT,
    IN p_prod_pic_name VARCHAR(200),
    IN p_prod_pic_data VARCHAR(100),
    IN p_user_id INT,
	IN p_prod_tline_interval INTERVAL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_product_id INT;
BEGIN
    INSERT INTO REPAIR.R_PRODUCT (R_PRODUCT_NAME, R_PRODUCT_PRICE, R_PRODUCT_SHORT_DESC, R_PRODUCT_DESC, R_CATEGORY_ID, R_REPAIR_STATUS)
    VALUES (p_product_name, p_product_price, p_product_short_desc, p_product_desc, p_category_id, FALSE)
    RETURNING R_PRODUCT_ID INTO v_product_id;

    INSERT INTO REPAIR.R_PROD_PIC (R_PROD_PIC_NAME, R_PROD_PIC_DATA, R_PRODUCT_ID)
    VALUES (p_prod_pic_name, p_prod_pic_data, v_product_id);

    INSERT INTO REPAIR.R_PROD_TIMELINE (R_PRODUCT_ID, USER_ID, R_PROD_TLINE_INTERVAL, R_PROD_TLINE_FINISH)
    VALUES (v_product_id, p_user_id, p_prod_tline_interval, NULL);
END;
$$;

-- Test Case
CALL REPAIR.add_repair_product('Laptop Repair', '150', 'Basic laptop repair', 'Repairing screen and battery', 1, 'laptop_repair.jpg', 'laptop_repair.jpg', 1, '3');


CREATE OR REPLACE PROCEDURE REPAIR.update_repair_product(
    IN p_product_id INT,
    IN p_product_name VARCHAR(200),
    IN p_product_price VARCHAR(100),
    IN p_product_short_desc TEXT,
    IN p_product_desc TEXT,
    IN p_category_id INT,
    IN p_prod_pic_name VARCHAR(200),
    IN p_prod_pic_data VARCHAR(100),
    IN p_repair_status BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE REPAIR.R_PRODUCT
    SET R_PRODUCT_NAME = p_product_name,
        R_PRODUCT_PRICE = p_product_price,
        R_PRODUCT_SHORT_DESC = p_product_short_desc,
        R_PRODUCT_DESC = p_product_desc,
        R_CATEGORY_ID = p_category_id,
        R_REPAIR_STATUS = p_repair_status,
        LAST_UPDATED_DATE = CURRENT_TIMESTAMP
    WHERE R_PRODUCT_ID = p_product_id;

    UPDATE REPAIR.R_PROD_PIC
    SET R_PROD_PIC_NAME = p_prod_pic_name,
        R_PROD_PIC_DATA = p_prod_pic_data,
        LAST_UPDATED_DATE = CURRENT_TIMESTAMP
    WHERE R_PRODUCT_ID = p_product_id;

END;
$$;

-- Test Case
CALL REPAIR.update_repair_product(5, 'Updated Laptop Repair', '140', 'Updated repair details', 'Repairing screen, battery, and keyboard', 2, 'updated_laptop_repair.jpg', 'updated_laptop_repair.jpg'), TRUE);


CREATE OR REPLACE PROCEDURE REPAIR.delete_repair_product(
    IN p_product_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM REPAIR.R_PROD_PIC WHERE R_PRODUCT_ID = p_product_id;
    DELETE FROM REPAIR.R_PRODUCT WHERE R_PRODUCT_ID = p_product_id;
    DELETE FROM REPAIR.R_PROD_TIMELINE WHERE R_PRODUCT_ID = p_product_id;
END;
$$;

-- Test Case
CALL REPAIR.delete_repair_product(1);


CREATE OR REPLACE PROCEDURE REPAIR.add_to_repair_history(
    IN p_product_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_product RECORD;
BEGIN
    SELECT ct.R_CATEGORY_ID ,rp.R_PRODUCT_NAME, rp.R_PRODUCT_PRICE, rpp.R_PROD_PIC_DATA, rpt.R_PROD_TLINE_INTERVAL, rpt.R_PROD_TLINE_FINISH, u.USER_NAME, u.USER_FULLNAME, u.USER_PHONE, u.USER_EMAIL, u.USER_ADDRESS
    INTO v_product
    FROM REPAIR.R_PRODUCT rp
    JOIN REPAIR.R_PROD_PIC rpp ON rp.R_PRODUCT_ID = rpp.R_PRODUCT_ID
    JOIN REPAIR.R_PROD_TIMELINE rpt ON rp.R_PRODUCT_ID = rpt.R_PRODUCT_ID
    JOIN PERSON.USERS u ON rpt.USER_ID = u.USER_ID
	JOIN REPAIR.R_CATEGORY ct on ct.R_CATEGORY_ID = rp.R_CATEGORY_ID 
    WHERE rp.R_PRODUCT_ID = p_product_id AND rp.R_REPAIR_STATUS = TRUE;

    IF FOUND THEN
        INSERT INTO REPAIR.R_HISTORY (
            R_CATEGORY_NAME, R_PRODUCT_NAME, R_PROD_PIC_DATA, R_PRODUCT_PRICE,
            R_PROD_TLINE_INTERVAL, R_PROD_TLINE_FINISH, USER_NAME, USER_FULLNAME,
            USER_PHONE, USER_EMAIL, USER_ADDRESS
        )
        VALUES (
            (SELECT R_CATEGORY_NAME FROM REPAIR.R_CATEGORY WHERE R_CATEGORY_ID = v_product.R_CATEGORY_ID),
            v_product.R_PRODUCT_NAME, v_product.R_PROD_PIC_DATA, v_product.R_PRODUCT_PRICE,
            v_product.R_PROD_TLINE_INTERVAL, v_product.R_PROD_TLINE_FINISH, v_product.USER_NAME,
            v_product.USER_FULLNAME, v_product.USER_PHONE, v_product.USER_EMAIL, v_product.USER_ADDRESS
        );
    END IF;
END;
$$;

-- Test Case
CALL REPAIR.add_to_repair_history(5);

