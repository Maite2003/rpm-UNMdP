import { StudentStatus } from "@/generated/prisma/client";

const WRITABLE_STATUSES: StudentStatus[] = [
  StudentStatus.VERIFIED,
];

export function canUserReview(status: StudentStatus | null): boolean {
  if (!status) return false;
  return WRITABLE_STATUSES.includes(status);
}