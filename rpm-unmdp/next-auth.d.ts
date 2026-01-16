import NextAuth, { DefaultSession } from "next-auth";
import { StudentStatus } from "./src/generated/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      isAdmin: boolean;
      studentStatus: StudentStatus | null;
    } & DefaultSession["user"];
  }

  interface User {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    studentStatus: StudentStatus | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    studentStatus: StudentStatus | null;
  }
}