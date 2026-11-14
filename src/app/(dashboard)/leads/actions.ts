"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { assertAdmin } from "@/lib/admin";
import { isLeadStatus, type LeadStatus } from "@/lib/leads/leads";

const PATH = "/leads";

export async function setLeadStatus(id: string, status: LeadStatus) {
  await assertAdmin();
  if (!isLeadStatus(status)) throw new Error("Invalid status.");
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ status, status_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function toggleLeadStar(id: string, starred: boolean) {
  await assertAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ starred })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function setLeadNotes(id: string, notes: string) {
  await assertAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ notes })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export type CreateLeadResult = { ok: true } | { ok: false; error: string };

export async function createLead(formData: FormData): Promise<CreateLeadResult> {
  await assertAdmin();
  const game = String(formData.get("game") ?? "").trim();
  if (!game) return { ok: false, error: "Give the game a name first." };

  const link = String(formData.get("link") ?? "").trim();
  if (link && !/^https?:\/\//i.test(link)) {
    return { ok: false, error: "Links need to start with http:// or https://" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("leads").insert({
    game,
    stage: String(formData.get("stage") ?? "").trim() || null,
    link: link || null,
    contact: String(formData.get("contact") ?? "").trim() || null,
    fit: String(formData.get("fit") ?? "").trim() || null,
    source: "Added by you",
    status: "new",
    starred: false,
    notes: "",
  });
  if (error) return { ok: false, error: "Couldn't add it. Try again in a moment." };

  revalidatePath(PATH);
  return { ok: true };
}
