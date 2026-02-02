CREATE TABLE "analysis" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"score" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
