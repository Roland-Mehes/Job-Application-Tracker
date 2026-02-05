CREATE TABLE "kanban_job" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" text NOT NULL,
	"title" text NOT NULL,
	"company" text,
	"description" text,
	"salary" text,
	"interview_date" timestamp,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "board" CASCADE;--> statement-breakpoint
DROP TABLE "column" CASCADE;--> statement-breakpoint
DROP TABLE "job" CASCADE;--> statement-breakpoint
ALTER TABLE "kanban_job" ADD CONSTRAINT "kanban_job_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "kanban_job_user_idx" ON "kanban_job" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "kanban_job_user_status_order_idx" ON "kanban_job" USING btree ("user_id","status","order");