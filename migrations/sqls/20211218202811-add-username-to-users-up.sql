ALTER TABLE users
    ADD COLUMN username character varying(1000);

ALTER TABLE users
    ADD CONSTRAINT uk_username unique (username);