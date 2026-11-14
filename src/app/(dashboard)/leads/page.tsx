import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { LeadsBoard } from "@/components/LeadsBoard/LeadsBoard";
import type { Lead } from "@/lib/leads/leads";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Indie RPG Leads",
  robots: { index: false, follow: false },
};

// Access is gated by the (dashboard) layout's requireAdmin(); this fetch uses
// the service-role client, which bypasses RLS by design.
export default async function LeadsPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("found", { ascending: false, nullsFirst: false })
    .order("starred", { ascending: false })
    .order("game", { ascending: true });

  return <LeadsBoard initialLeads={(data ?? []) as Lead[]} loadError={!!error} />;
}
