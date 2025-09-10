-- CreateTable
CREATE TABLE "public"."PasswordToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "pin" TEXT,
    "accepted" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "acceptBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PasswordToken" ADD CONSTRAINT "PasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
