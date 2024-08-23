-- Procedure to add a new feedback record and return the FEEDBACK_ID
CREATE OR REPLACE PROCEDURE MISC.add_feedback(
    IN p_feedback_text TEXT,
    IN p_feedback_img VARCHAR(200),
    IN p_user_id INT,
    OUT p_feedback_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO MISC.FEEDBACK (
        FEEDBACK_TEXT,
        FEEDBACK_IMG,
        USER_ID,
        CREATION_DATE
    )
    VALUES (
        p_feedback_text,
        p_feedback_img,
        p_user_id,
        CURRENT_TIMESTAMP
    )
    RETURNING FEEDBACK_ID INTO p_feedback_id;
END;
$$;


DO $$
DECLARE
    v_feedback_id INT;
BEGIN
    -- Call the procedure and get the feedback ID
    CALL MISC.add_feedback(
        'Great service and support!',
        'feedback_image.jpg',
        1,
        v_feedback_id
    );
    -- Print the feedback ID (for debugging or verification)
    RAISE NOTICE 'New Feedback ID: %', v_feedback_id;
END;
$$;