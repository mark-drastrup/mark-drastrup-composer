import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

// Comma-separated allowlist of admin emails, e.g. ADMIN_EMAILS="a@b.com,c@d.com".
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

async function getAdminState() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin =
    !!user?.email && adminEmails().includes(user.email.toLowerCase());
  return { user, isAdmin };
}

// For pages/layouts: unauthenticated → /login, signed-in-but-not-admin → 404
// (a 404 doesn't reveal that the page exists).
export async function requireAdmin() {
  const { user, isAdmin } = await getAdminState();
  if (!user) redirect("/login");
  if (!isAdmin) notFound();
  return user;
}

// For server actions: throw. Actions are independently callable endpoints, so
// they must re-verify admin — the layout gate does not protect them.
export async function assertAdmin() {
  const { isAdmin } = await getAdminState();
  if (!isAdmin) throw new Error("Not authorized.");
}
