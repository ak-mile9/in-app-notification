-- public.notifications_for_user definition

-- Drop table

-- DROP TABLE public.notifications_for_user;

CREATE TABLE public.notifications_for_user (
	id serial4 NOT NULL,
	title varchar NOT NULL,
	"user" varchar NOT NULL,
	for_role varchar NOT NULL DEFAULT ''::character varying,
	created_at timestamp NOT NULL DEFAULT now(),
	is_aware_of bool NOT NULL DEFAULT false,
	CONSTRAINT "PK_65942f498087fa78692abed7a3f" PRIMARY KEY (id)
);