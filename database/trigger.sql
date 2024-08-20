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

-- Function to update LAST_UPDATED_DATE before any row in MISC.EVENT_LOG table is updated.
CREATE OR REPLACE FUNCTION MISC.update_last_updated_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.LAST_UPDATED_DATE = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the update_last_updated_date function before updating any row in MISC.EVENT_LOG table.
CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON MISC.EVENT_LOG
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
CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON TRADE.T_CATEGORY
FOR EACH ROW EXECUTE FUNCTION TRADE.update_last_updated_date();

CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON TRADE.T_PRODUCT
FOR EACH ROW EXECUTE FUNCTION TRADE.update_last_updated_date();

CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON TRADE.T_PROD_PIC
FOR EACH ROW EXECUTE FUNCTION TRADE.update_last_updated_date();

CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON TRADE.T_PROD_TIMELINE
FOR EACH ROW EXECUTE FUNCTION TRADE.update_last_updated_date();

CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON TRADE.T_HISTORY
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
CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_CATEGORY
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();

CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_PRODUCT
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();

CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_PROD_PIC
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();

CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_PROD_TIMELINE
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();

CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_PROD_VIEW
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();

CREATE TRIGGER users_last_updated_trigger
BEFORE UPDATE ON REPAIR.R_HISTORY
FOR EACH ROW EXECUTE FUNCTION REPAIR.update_last_updated_date();