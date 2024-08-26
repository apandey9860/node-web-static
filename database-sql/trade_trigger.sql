CREATE OR REPLACE FUNCTION populate_history_on_delivery()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert a record into T_HISTORY when delivery status is TRUE
    IF NEW.T_PROD_DEL_STATUS = TRUE THEN
        INSERT INTO TRADE.T_HISTORY (
            T_CATEGORY_NAME,
            T_PRODUCT_NAME,
            T_PROD_PIC_DATA,
            T_PRODUCT_PRICE,
            T_PROD_TLINE_INTERVAL,
            T_PROD_TLINE_FINISH,
            USER_NAME,
            USER_FULLNAME,
            USER_PHONE,
            USER_EMAIL,
            USER_ADDRESS
        )
        SELECT
            C.T_CATEGORY_NAME,
            P.T_PRODUCT_NAME,
            PP.T_PROD_PIC_DATA,
            P.T_PRODUCT_PRICE,
            T.T_PROD_TLINE_INTERVAL,
            T.T_PROD_TLINE_FINISH,
            U.USER_NAME,
            U.USER_FULLNAME,
            U.USER_PHONE,
            U.USER_EMAIL,
            U.USER_ADDRESS
        FROM
            TRADE.T_PRODUCT P
            JOIN TRADE.T_CATEGORY C ON P.T_CATEGORY_ID = C.T_CATEGORY_ID
            LEFT JOIN TRADE.T_PROD_PIC PP ON PP.T_PRODUCT_ID = P.T_PRODUCT_ID
            JOIN PERSON.USERS U ON T.USER_ID = U.USER_ID
            JOIN TRADE.T_PROD_TIMELINE T ON T.T_PRODUCT_ID = P.T_PRODUCT_ID
        WHERE
            T.T_PROD_TLINE_ID = NEW.T_PROD_TLINE_ID;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_populate_history
AFTER UPDATE OF T_PROD_DEL_STATUS
ON TRADE.T_PROD_TIMELINE
FOR EACH ROW
WHEN (NEW.T_PROD_DEL_STATUS = TRUE)
EXECUTE FUNCTION populate_history_on_delivery();