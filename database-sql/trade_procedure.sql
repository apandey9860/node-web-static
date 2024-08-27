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
CALL TRADE.add_trade_product('Smartphone', '500', 'Latest model', 'High-end smartphone', 1, 'phone.jpg', 'phone.jpg');


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


-- Procedure to add a new product timeline record
CREATE OR REPLACE PROCEDURE TRADE.add_prod_timeline(
    IN p_prod_tline_interval INTERVAL,
    IN p_prod_tline_finish TIMESTAMP,
    IN p_prod_tline_delivery TIMESTAMP,
    IN p_prod_del_status BOOLEAN,
    IN p_product_id INT,
    IN p_user_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO TRADE.T_PROD_TIMELINE (
        T_PROD_TLINE_INTERVAL,
        T_PROD_TLINE_FINISH,
        T_PROD_TLINE_DELIVERY,
        T_PROD_DEL_STATUS,
        T_PRODUCT_ID,
        USER_ID,
        CREATION_DATE
    )
    VALUES (
        p_prod_tline_interval,
        p_prod_tline_finish,
        p_prod_tline_delivery,
        p_prod_del_status,
        p_product_id,
        p_user_id,
        CURRENT_TIMESTAMP
    );
END;
$$;

-- Test call to add a new product timeline record
CALL TRADE.add_prod_timeline(
    '2 days',
    '2024-09-10 15:00:00',
    '2024-09-08 10:00:00',
    TRUE,
    1,
    1
);

-- Procedure to delete a product timeline record by ID
CREATE OR REPLACE PROCEDURE TRADE.delete_prod_timeline(
    IN p_t_prod_tline_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM TRADE.T_PROD_TIMELINE
    WHERE T_PROD_TLINE_ID = p_t_prod_tline_id;
END;
$$;

-- Test call to delete a product timeline record
CALL TRADE.delete_prod_timeline(1);

-- Procedure to update an existing product timeline record
CREATE OR REPLACE PROCEDURE TRADE.update_prod_timeline(
    IN p_t_prod_tline_id INT,
    IN p_prod_tline_interval INTERVAL,
    IN p_prod_tline_finish TIMESTAMP,
    IN p_prod_tline_delivery TIMESTAMP,
    IN p_prod_del_status BOOLEAN,
    IN p_product_id INT,
    IN p_user_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE TRADE.T_PROD_TIMELINE
    SET 
        T_PROD_TLINE_INTERVAL = p_prod_tline_interval,
        T_PROD_TLINE_FINISH = p_prod_tline_finish,
        T_PROD_TLINE_DELIVERY = p_prod_tline_delivery,
        T_PROD_DEL_STATUS = p_prod_del_status,
        T_PRODUCT_ID = p_product_id,
        USER_ID = p_user_id,
        LAST_UPDATED_DATE = CURRENT_TIMESTAMP
    WHERE T_PROD_TLINE_ID = p_t_prod_tline_id;
END;
$$;

-- Test call to update a product timeline record
CALL TRADE.update_prod_timeline(
    1,
    '3 days',
    '2024-09-12 18:00:00',
    '2024-09-09 12:00:00',
    FALSE,
    1,
    1
);


CREATE OR REPLACE FUNCTION TRADE.get_product_details()
RETURNS TABLE (
    product_name VARCHAR,
    product_short_desc TEXT,
    product_pic VARCHAR,
    category_name VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.T_PRODUCT_NAME,
        p.T_PRODUCT_SHORT_DESC,
        p.T_PRODUCT_PIC,
        c.T_CATEGORY_NAME
    FROM
        TRADE.T_PRODUCT p
    JOIN
        TRADE.T_CATEGORY c
    ON
        p.T_CATEGORY_ID = c.T_CATEGORY_ID;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE PROCEDURE TRADE.GetAllProductDetails()
LANGUAGE plpgsql
AS $$
BEGIN
    -- Return a set of records with all product details, including products with or without pictures
    RETURN QUERY
    SELECT 
        p.T_PRODUCT_NAME AS product_name,
        p.T_PRODUCT_SHORT_DESC AS short_description,
        pp.T_PROD_PIC_NAME AS picture_name,
        pp.T_PROD_PIC_DATA AS picture_data,
        c.T_CATEGORY_NAME AS category_name
    FROM 
        TRADE.T_PRODUCT p
    LEFT JOIN 
        TRADE.T_PROD_PIC pp ON p.T_PRODUCT_ID = pp.T_PRODUCT_ID
    LEFT JOIN 
        TRADE.T_CATEGORY c ON p.T_CATEGORY_ID = c.T_CATEGORY_ID;
END;
$$;


CREATE OR REPLACE FUNCTION TRADE.GetAllProductDetails()
RETURNS TABLE (
    product_id INT,
    product_name VARCHAR(200),
    short_description TEXT,
    picture_name VARCHAR(200),
    picture_data VARCHAR(100), -- Adjust length as needed
    category_name VARCHAR(200)
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.T_PRODUCT_ID::INT AS product_id,
        p.T_PRODUCT_NAME::VARCHAR(200) AS product_name,
        p.T_PRODUCT_SHORT_DESC::TEXT AS short_description,
        pp.T_PROD_PIC_NAME::VARCHAR(200) AS picture_name,
        pp.T_PROD_PIC_DATA::VARCHAR(100) AS picture_data, -- Cast to VARCHAR(100)
        c.T_CATEGORY_NAME::VARCHAR(200) AS category_name
    FROM 
        TRADE.T_PRODUCT p
    LEFT JOIN 
        TRADE.T_PROD_PIC pp ON p.T_PRODUCT_ID = pp.T_PRODUCT_ID
    LEFT JOIN 
        TRADE.T_CATEGORY c ON p.T_CATEGORY_ID = c.T_CATEGORY_ID;
END;
$$;

-- DROP FUNCTION trade.getallproductdetails()


SELECT * FROM TRADE.get_product_details();
SELECT * FROM TRADE.GetAllProductDetails();


CREATE OR REPLACE FUNCTION TRADE.GetProductDetailsById(
    p_product_id INT
)
RETURNS TABLE (
    product_id INT,
    product_name VARCHAR(200),
    product_price VARCHAR(200),
    short_description TEXT,
    full_description VARCHAR(200),
    picture_name VARCHAR(200),
    picture_data VARCHAR(100),
    category_name VARCHAR(200),
    category_id INT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.T_PRODUCT_ID::INT AS product_id,
        p.T_PRODUCT_NAME::VARCHAR(200) AS product_name,
        p.T_PRODUCT_PRICE::VARCHAR(200) as product_price,
        p.T_PRODUCT_SHORT_DESC::TEXT AS short_description,
        p.T_PRODUCT_DESC::VARCHAR(200) AS full_description,
        pp.T_PROD_PIC_NAME::VARCHAR(200) AS picture_name,
        pp.T_PROD_PIC_DATA::VARCHAR(100) AS picture_data,
        c.T_CATEGORY_NAME::VARCHAR(200) AS category_name,
        p.T_CATEGORY_ID::INT AS category_id
    FROM 
        TRADE.T_PRODUCT p
    LEFT JOIN 
        TRADE.T_PROD_PIC pp ON p.T_PRODUCT_ID = pp.T_PRODUCT_ID
    LEFT JOIN 
        TRADE.T_CATEGORY c ON p.T_CATEGORY_ID = c.T_CATEGORY_ID
    WHERE 
        p.T_PRODUCT_ID = p_product_id;
END;
$$;

--DROP FUNCTION trade.getproductdetailsbyid(integer);

SELECT * FROM TRADE.GetProductDetailsById(13);