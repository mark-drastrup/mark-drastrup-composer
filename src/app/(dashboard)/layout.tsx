import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin";

// Private admin tooling: never statically cached, always auth-checked per request.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();
  return <>{children}</>;
}
