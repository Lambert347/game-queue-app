
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--Create Database called "game_db"
CREATE TABLE "user" (
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
	"is_hidden" BOOLEAN DEFAULT FALSE,
	"order_number" INTEGER, 
	FOREIGN KEY (game_id) REFERENCES games(id)
);



CREATE TABLE "genres_id" (
	"id" SERIAL PRIMARY KEY,
	"game_id" INTEGER NOT NULL,
	"genres_id" INTEGER NOT NULL,
	FOREIGN KEY (game_id) REFERENCES games(id),
	FOREIGN KEY (genres_id) REFERENCES genres(id)
);

CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
	"genre_name" VARCHAR (100) NOT NULL
);

CREATE TABLE "games" (
	"id" SERIAL PRIMARY KEY,
	"game_title" VARCHAR (150) NOT NULL,
	"play_time" VARCHAR (50) NOT NULL,
	"developer" VARCHAR (120) NOT NULL,
	"description" TEXT,
	"publisher" VARCHAR (120) NOT NULL,
	"image_url" VARCHAR (1000),
	"platform" VARCHAR (100),
	"creator_id" INTEGER
);
