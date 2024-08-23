CREATE OR REPLACE FUNCTION populate_repair_history()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert a record into R_HISTORY when the repair status is TRUE
    IF NEW.R_REPAIR_STATUS = TRUE THEN
        INSERT INTO REPAIR.R_HISTORY (
            R_CATEGORY_NAME,
            R_PRODUCT_NAME,
            R_PROD_PIC_DATA,
            R_PRODUCT_PRICE,
            R_PROD_TLINE_INTERVAL,
            R_PROD_TLINE_FINISH,
            USER_NAME,
            USER_FULLNAME,
            USER_PHONE,
            USER_EMAIL,
            USER_ADDRESS
        )
        SELECT
            C.R_CATEGORY_NAME,
            P.R_PRODUCT_NAME,
            PP.R_PROD_PIC_DATA,
            P.R_PRODUCT_PRICE,
            T.R_PROD_TLINE_INTERVAL,
            T.R_PROD_TLINE_FINISH,
            U.USER_NAME,
            U.USER_FULLNAME,
            U.USER_PHONE,
            U.USER_EMAIL,
            U.USER_ADDRESS
        FROM
            REPAIR.R_PRODUCT P
            JOIN REPAIR.R_CATEGORY C ON P.R_CATEGORY_ID = C.R_CATEGORY_ID
            LEFT JOIN REPAIR.R_PROD_PIC PP ON PP.R_PRODUCT_ID = P.R_PRODUCT_ID
            JOIN REPAIR.R_PROD_TIMELINE T ON T.R_PRODUCT_ID = P.R_PRODUCT_ID
            JOIN PERSON.USERS U ON T.USER_ID = U.USER_ID
        WHERE
            P.R_PRODUCT_ID = NEW.R_PRODUCT_ID;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER trg_populate_repair_history
AFTER UPDATE OF R_REPAIR_STATUS
ON REPAIR.R_PRODUCT
FOR EACH ROW
WHEN (NEW.R_REPAIR_STATUS = TRUE)
EXECUTE FUNCTION populate_repair_history();