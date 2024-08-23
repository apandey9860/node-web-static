-- Update the image type (Add main image)

CREATE OR REPLACE PROCEDURE TRADE.add_trade_category(
    IN p_category_name VARCHAR(200),
    IN p_category_desc TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO TRADE.T_CATEGORY (T_CATEGORY_NAME, T_CATEGORY_DESC)
    VALUES (p_category_name, p_category_desc);
END;
$$;

-- Test Case
CALL TRADE.add_trade_category('Electronics', 'Electronic goods and accessories');


CREATE OR REPLACE PROCEDURE TRADE.update_trade_category(
    IN p_category_id INT,
    IN p_category_name VARCHAR(200),
    IN p_category_desc TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE TRADE.T_CATEGORY
    SET T_CATEGORY_NAME = p_category_name,
        T_CATEGORY_DESC = p_category_desc,
        LAST_UPDATED_DATE = CURRENT_TIMESTAMP
    WHERE T_CATEGORY_ID = p_category_id;
END;
$$;

-- Test Case
CALL TRADE.update_trade_category(1, 'Updated Electronics', 'Updated description');


CREATE OR REPLACE PROCEDURE TRADE.delete_trade_category(
    IN p_category_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM TRADE.T_CATEGORY WHERE T_CATEGORY_ID = p_category_id;
END;
$$;

-- Test Case
CALL TRADE.delete_trade_category(1);


CREATE OR REPLACE PROCEDURE TRADE.add_trade_product(
    IN p_product_name VARCHAR(200),
    IN p_product_price VARCHAR(100),
    IN p_product_short_desc TEXT,
    IN p_product_desc TEXT,
    IN p_category_id INT,
    IN p_prod_pic_name VARCHAR(200),
    IN p_prod_pic_data VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_product_id INT;
BEGIN
    INSERT INTO TRADE.T_PRODUCT (T_PRODUCT_NAME, T_PRODUCT_PRICE, T_PRODUCT_SHORT_DESC, T_PRODUCT_DESC, T_CATEGORY_ID)
    VALUES (p_product_name, p_product_price, p_product_short_desc, p_product_desc, p_category_id)
    RETURNING T_PRODUCT_ID INTO v_product_id;

    INSERT INTO TRADE.T_PROD_PIC (T_PROD_PIC_NAME, T_PROD_PIC_DATA, T_PRODUCT_ID)
    VALUES (p_prod_pic_name, p_prod_pic_data, v_product_id);
END;
$$;

-- Test Case
CALL TRADE.add_trade_product('Smartphone', '500', 'Latest model', 'High-end smartphone', 2, 'phone.jpg', 'phone.jpg');


CREATE OR REPLACE PROCEDURE TRADE.update_trade_product(
    IN p_product_id INT,
    IN p_product_name VARCHAR(200),
    IN p_product_price VARCHAR(100),
    IN p_product_short_desc TEXT,
    IN p_product_desc TEXT,
    IN p_category_id INT,
    IN p_prod_pic_name VARCHAR(200),
    IN p_prod_pic_data VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE TRADE.T_PRODUCT
    SET T_PRODUCT_NAME = p_product_name,
        T_PRODUCT_PRICE = p_product_price,
        T_PRODUCT_SHORT_DESC = p_product_short_desc,
        T_PRODUCT_DESC = p_product_desc,
        T_CATEGORY_ID = p_category_id,
        LAST_UPDATED_DATE = CURRENT_TIMESTAMP
    WHERE T_PRODUCT_ID = p_product_id;

    UPDATE TRADE.T_PROD_PIC
    SET T_PROD_PIC_NAME = p_prod_pic_name,
        T_PROD_PIC_DATA = p_prod_pic_data,
        LAST_UPDATED_DATE = CURRENT_TIMESTAMP
    WHERE T_PRODUCT_ID = p_product_id;
END;
$$;

-- Test Case
CALL TRADE.update_trade_product(1, 'Updated Smartphone', '450', 'Updated model', 'Updated description', 1, 'updated_phone.jpg', 'phone.jpg');


CREATE OR REPLACE PROCEDURE TRADE.delete_trade_product(
    IN p_product_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM TRADE.T_PROD_PIC WHERE T_PRODUCT_ID = p_product_id;
    DELETE FROM TRADE.T_PRODUCT WHERE T_PRODUCT_ID = p_product_id;
END;
$$;

-- Test Case
CALL TRADE.delete_trade_product(1);


