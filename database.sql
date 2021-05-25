
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user_games" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL,
	"game_id" INTEGER NOT NULL,
	"is_complete" BOOLEAN DEFAULT FALSE,
	"note" TEXT,
	"is_hidden" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "games" (
	"id" SERIAL PRIMARY KEY,
	"game_title" VARCHAR (150) NOT NULL,
	"play_time" INTEGER NOT NULL,
	"developer" VARCHAR (120) NOT NULL,
	"description" TEXT,
	"publisher" VARCHAR (120) NOT NULL,
	"image_url" VARCHAR (1000),
	"creator_id" INTEGER NOT NULL
);

CREATE TABLE "genres_id" (
	"id" SERIAL PRIMARY KEY,
	"game_id" INTEGER NOT NULL,
	"genres_id" INTEGER NOT NULL
);

CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
	"genre_name" VARCHAR (100) NOT NULL
);
