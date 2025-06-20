-- CreateTable
CREATE TABLE "theme" (
    "id" SERIAL NOT NULL,
    "json" TEXT NOT NULL,
    "state" INTEGER NOT NULL,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("id")
);
