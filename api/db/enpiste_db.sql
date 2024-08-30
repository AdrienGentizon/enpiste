-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.1.3
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: postgres | type: DATABASE --
-- DROP DATABASE IF EXISTS postgres;
CREATE DATABASE postgres
	OWNER = postgres;
-- ddl-end --


-- object: public."user" | type: TABLE --
-- DROP TABLE IF EXISTS public."user" CASCADE;
CREATE TABLE public."user" (
	id serial NOT NULL,
	clerk_id varchar(32) NOT NULL,
	email varchar(255) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT clerk_id_uq UNIQUE (clerk_id),
	CONSTRAINT email_uq UNIQUE (email)
);
-- ddl-end --
ALTER TABLE public."user" OWNER TO postgres;
-- ddl-end --


