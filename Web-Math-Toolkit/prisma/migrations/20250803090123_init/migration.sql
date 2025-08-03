-- CreateTable
CREATE TABLE "public"."Calculation" (
    "id" SERIAL NOT NULL,
    "operation" TEXT NOT NULL,
    "num1" DOUBLE PRECISION NOT NULL,
    "num2" DOUBLE PRECISION,
    "result" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);
