CREATE TABLE "car_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"imageUrl" varchar NOT NULL,
	"carListingid" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "car_listing" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_title" varchar NOT NULL,
	"originalPrice" varchar,
	"sellingPrice" varchar NOT NULL,
	"category" varchar NOT NULL,
	"condition" varchar NOT NULL,
	"make" varchar NOT NULL,
	"model" varchar NOT NULL,
	"year" varchar NOT NULL,
	"driveType" varchar NOT NULL,
	"transmission" varchar NOT NULL,
	"fuelType" varchar NOT NULL,
	"mileage" varchar NOT NULL,
	"engineSize" varchar,
	"cylinder" varchar,
	"color" varchar NOT NULL,
	"door" varchar NOT NULL,
	"vi" varchar,
	"offerType" varchar,
	"listingDescription" varchar NOT NULL,
	"features" json,
	"createdBy" varchar,
	"postedOn" varchar
);
--> statement-breakpoint
ALTER TABLE "car_images" ADD CONSTRAINT "car_images_carListingid_car_listing_id_fk" FOREIGN KEY ("carListingid") REFERENCES "public"."car_listing"("id") ON DELETE no action ON UPDATE no action;