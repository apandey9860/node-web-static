CREATE OR REPLACE PROCEDURE PERSON.create_user(
    IN p_user_name VARCHAR(100),
    IN p_user_fullname VARCHAR(100),
    IN p_user_password TEXT,
    IN p_user_phone VARCHAR(50),
    IN p_user_email VARCHAR(50),
    IN p_user_address VARCHAR(100),
    IN p_user_access_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO PERSON.USERS (USER_NAME, USER_FULLNAME, USER_PASSWORD, USER_PHONE, USER_EMAIL, USER_ADDRESS, USER_ACCESS_ID)
    VALUES (p_user_name, p_user_fullname, p_user_password, p_user_phone, p_user_email, p_user_address, p_user_access_id);
END;
$$;


-- Test Case
CALL PERSON.create_user('johndoe', 'John Doe', 'password123', '123-456-7890', 'johndoe@example.com', '123 Main St', 2);

select * from person.users;

CREATE OR REPLACE PROCEDURE PERSON.update_user(
    IN p_user_id INT,
    IN p_user_name VARCHAR(100),
    IN p_user_fullname VARCHAR(100),
    IN p_user_password TEXT,
    IN p_user_phone VARCHAR(50),
    IN p_user_email VARCHAR(50),
    IN p_user_address VARCHAR(100),
    IN p_old_password TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM PERSON.USERS
        WHERE USER_ID = p_user_id AND USER_PASSWORD = p_old_password
    ) THEN
        UPDATE PERSON.USERS
        SET USER_NAME = p_user_name,
            USER_FULLNAME = p_user_fullname,
            USER_PASSWORD = p_user_password,
            USER_PHONE = p_user_phone,
            USER_EMAIL = p_user_email,
            USER_ADDRESS = p_user_address,
            LAST_UPDATED_DATE = CURRENT_TIMESTAMP
        WHERE USER_ID = p_user_id;
    ELSE
        RAISE EXCEPTION 'Invalid credentials';
    END IF;
END;
$$;

-- Test Case
CALL PERSON.update_user(2, 'johndoe', 'Johnathan Doe', 'newpassword123', '987-654-3210', 'john.doe@example.com', '456 Elm St', 'password123');


CREATE OR REPLACE PROCEDURE PERSON.delete_user(
    IN p_user_id INT,
    IN p_password TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM PERSON.USERS
        WHERE USER_ID = p_user_id AND USER_PASSWORD = p_password
    ) THEN
        DELETE FROM PERSON.USERS WHERE USER_ID = p_user_id;
    ELSE
        RAISE EXCEPTION 'Invalid credentials';
    END IF;
END;
$$;

-- Test Case
CALL PERSON.delete_user(3, 'newpassword123');


CREATE OR REPLACE FUNCTION PERSON.verify_user_credentials(
    p_user_name INT,
    p_password TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM PERSON.USERS
        WHERE USER_ID = p_user_id AND USER_PASSWORD = p_password
    );
END;
$$;

-- Test Case
SELECT PERSON.verify_user_credentials('dataEntry', '12345');