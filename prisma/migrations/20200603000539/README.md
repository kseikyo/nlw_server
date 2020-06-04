# Migration `20200603000539`

This migration has been generated at 6/3/2020, 12:05:39 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Items" (
"id" SERIAL,"image" text  NOT NULL ,"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Points" (
"city" text  NOT NULL ,"email" text  NOT NULL ,"id" SERIAL,"image" text  NOT NULL ,"latitude" Decimal(65,30)  NOT NULL ,"longitude" Decimal(65,30)  NOT NULL ,"name" text  NOT NULL ,"uf" text  NOT NULL ,"whatsapp" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."_ItemsToPoints" (
"A" integer  NOT NULL ,"B" integer  NOT NULL )

CREATE UNIQUE INDEX "Items.title" ON "public"."Items"("title")

CREATE UNIQUE INDEX "_ItemsToPoints_AB_unique" ON "public"."_ItemsToPoints"("A","B")

CREATE  INDEX "_ItemsToPoints_B_index" ON "public"."_ItemsToPoints"("B")

ALTER TABLE "public"."_ItemsToPoints" ADD FOREIGN KEY ("A")REFERENCES "public"."Items"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_ItemsToPoints" ADD FOREIGN KEY ("B")REFERENCES "public"."Points"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200603000539
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,28 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+model Items {
+  id          Int           @default(autoincrement()) @id
+  image       String
+  title       String        @unique
+  points      Points[]      @relation(references: [id])
+}
+
+model Points {
+  city        String
+  email       String
+  id          Int           @default(autoincrement()) @id
+  image       String
+  latitude    Float
+  longitude   Float
+  name        String
+  uf          String
+  whatsapp    String
+  items       Items[]       @relation(references: [id])
+}
```


