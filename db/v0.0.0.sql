CREATE TABLE pilots
(
    data jsonb
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE pilots
    OWNER to postgres;

CREATE TABLE upgrades
(
    data jsonb
)
WITH (
    OIDS = false
)
TABLESPACE pg_default;

ALTER TABLE upgrades
    OWNER to postgres;