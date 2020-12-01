--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE Me;
ALTER ROLE Me WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "Me" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Me; Type: DATABASE; Schema: -; Owner: Me
--

CREATE DATABASE Me WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE Me OWNER TO Me;

\connect Me

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: eater; Type: TABLE; Schema: public; Owner: Me
--

CREATE TABLE public.eater (
    predatorid smallint NOT NULL,
    preyid smallint,
    plant text
);


ALTER TABLE public.eater OWNER TO Me;

--
-- Name: endangeredlevel; Type: TABLE; Schema: public; Owner: Me
--

CREATE TABLE public.endangeredlevel (
    speciesid smallint NOT NULL,
    level smallint,
    population integer,
    dateofendager date
);


ALTER TABLE public.endangeredlevel OWNER TO Me;

--
-- Name: location; Type: TABLE; Schema: public; Owner: Me
--

CREATE TABLE public.location (
    city text,
    county text NOT NULL,
    habitat text,
    weather text,
    regionid smallint NOT NULL
);


ALTER TABLE public.location OWNER TO Me;

--
-- Name: physicaldescription; Type: TABLE; Schema: public; Owner: Me
--

CREATE TABLE public.physicaldescription (
    speciesid smallint NOT NULL,
    size text,
    color text,
    weight text,
    ispoisonous boolean,
    isvenomous boolean,
    lifespan integer
);


ALTER TABLE public.physicaldescription OWNER TO Me;

--
-- Name: species; Type: TABLE; Schema: public; Owner: Me
--

CREATE TABLE public.species (
    class text,
    family text,
    speciesid smallint NOT NULL,
    speciesname text,
    regionid smallint
);


ALTER TABLE public.species OWNER TO Me;

--
-- Data for Name: eater; Type: TABLE DATA; Schema: public; Owner: Me
--

COPY public.eater (predatorid, preyid, plant) FROM stdin;
9	\N	Grass
18	\N	Grass
9	\N	Flowers
18	\N	Roots
17	18	\N
16	18	\N
6	9	\N
12	\N	Cacti
6	12	\N
3	\N	\N
4	7	\N
4	10	\N
4	19	\N
5	7	\N
5	9	\N
5	14	\N
5	15	\N
7	\N	\N
8	11	\N
10	\N	\N
11	\N	\N
13	\N	\N
14	\N	\N
15	\N	\N
16	\N	\N
19	\N	Grass
20	\N	\N
21	\N	\N
22	\N	\N
\.


--
-- Data for Name: endangeredlevel; Type: TABLE DATA; Schema: public; Owner: Me
--

COPY public.endangeredlevel (speciesid, level, population, dateofendager) FROM stdin;
3	6	143	1976-04-28
4	7	10	1972-03-28
5	7	5	1972-03-28
6	4	2000	1993-03-16
7	5	\N	1986-03-31
8	5	440	1967-03-11
9	5	\N	2014-07-10
10	5	500	2012-02-05
11	5	\N	1967-03-11
12	2	100000	2015-03-23
13	5	\N	1997-01-06
14	3	3500	2014-07-08
15	2	15000	2016-10-01
19	3	190000	1980-07-01
20	3	10000	1998-07-20
21	5	\N	1996-08-01
22	1	\N	2018-09-20
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: Me
--

COPY public.location (city, county, habitat, weather, regionid) FROM stdin;
Tempe	Maricopa	Desert	Dry	2
Mesa	Maricopa	Desert	Dry	3
Tuscon	Maricopa	Desert	Dry	4
Scottsdale	Pima	Desert	Dry	5
Sedona	Maricopa	Desert	Dry	6
Flagstaff	Yavapai	Desert	Dry	7
Prescott	Coconino	Desert	Dry	8
Gilbert	Yavapai	Desert	Dry	9
Glendale	Maricopa	Desert	Dry	10
Peoria	Maricopa	Desert	Dry	11
Yuma	Yuma County	Desert	Dry	12
Duncan	Greenlee	Desert	Dry	13
Aubrey Valley	Yavapai	Desert	Dry	14
Sonoran Desert	Pima	Desert	Dry	15
White Mountains	Greenlee	Desert	Dry	16
Phoenix	Maricopa	Desert	Dry	17
Picaho	Pinal	Desert	Dry	18
San Rafael Valley	Santa Cruz	Desert	Dry	19
Kingman	Mohave	Desert	Dry	20
\.


--
-- Data for Name: physicaldescription; Type: TABLE DATA; Schema: public; Owner: Me
--

COPY public.physicaldescription (speciesid, size, color, weight, ispoisonous, isvenomous, lifespan) FROM stdin;
3	Medium	Grey	65	f	f	10
4	Large	Yellow	115	f	f	13
5	Small	Brown	30	f	f	13
6	Small	Brown	1	f	f	15
16	Small	Brown	2.5	f	t	8
12	Small	Brown	0.048	f	f	12
7	Small	Blue	1	f	f	1
8	Large	Black	22	f	f	50
9	Small	Brown	1	f	f	1
10	Medium	Blue	2	f	f	30
11	Large	Brown	120	f	f	11
13	Small	Grey	\N	f	f	\N
14	Medium	Grey	\N	f	f	\N
15	Small	Brown	1	f	f	\N
19	Medium	Brown	15	f	f	50
20	Small	Green	1	f	f	18
21	Small	Yellow	1	f	f	4
22	Small	Orange	1	f	f	3
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: Me
--

COPY public.species (class, family, speciesid, speciesname, regionid) FROM stdin;
mammal	dog	3	Mexican Wolf	2
mammal	cat	4	Jaguar	2
mammal	cat	5	Ocelot	2
bird	owl	6	Mexican Spotted Owl	2
fish	fish	7	Desert Pupfish	13
bird	vulture	8	California Condor	7
mammal	rodent	9	New Mexico Meadow Jumping Mouse	16
fish	fish	10	Bonytail chub	17
mammal	ungulate	11	Sonoran Pronghorn	15
mammal	bat	12	Lesser Long-Nosed Bat	18
amphibian	salamander	13	Sonora Tiger Salamander	19
reptiles	snake	14	Narrow-headed Gartersnake	4
bird	rail	15	Yuma Clapper rail	17
reptile	snake	16	New Mexican Ridge-Nosed Rattlesnake	15
mammal	weasel	17	Black Footed Ferret	14
mammal	dog	18	Black Footed Prairie Dog	14
reptile	tortoise	19	Desert Tortoise	20
amphibian	frog	20	Chiricahua Leopard Frog	4
fish	fish	21	Apache Trout	4
fish	fish	22	Beautiful Shiner	4
\.


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: Me
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (regionid);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: Me
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (speciesid);


--
-- Name: eater eater_predatorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Me
--

ALTER TABLE ONLY public.eater
    ADD CONSTRAINT eater_predatorid_fkey FOREIGN KEY (predatorid) REFERENCES public.species(speciesid) ON DELETE CASCADE;


--
-- Name: eater eater_preyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Me
--

ALTER TABLE ONLY public.eater
    ADD CONSTRAINT eater_preyid_fkey FOREIGN KEY (preyid) REFERENCES public.species(speciesid) ON DELETE CASCADE;


--
-- Name: endangeredlevel endangeredlevel_speciesid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Me
--

ALTER TABLE ONLY public.endangeredlevel
    ADD CONSTRAINT endangeredlevel_speciesid_fkey FOREIGN KEY (speciesid) REFERENCES public.species(speciesid) ON DELETE CASCADE;


--
-- Name: physicaldescription physicaldescription_speciesid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Me
--

ALTER TABLE ONLY public.physicaldescription
    ADD CONSTRAINT physicaldescription_speciesid_fkey FOREIGN KEY (speciesid) REFERENCES public.species(speciesid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

