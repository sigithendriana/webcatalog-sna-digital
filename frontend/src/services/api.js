import { supabase } from "../lib/supabase";

/**
 * GET ALL TEMPLATES (UNTUK KATALOG)
 * Mengambil semua data dari tabel 'templates'
 */
export async function getTemplates() {
  const { data, error } = await supabase
    .from("invitation_templates")
    .select("*")
    .order("id", { ascending: false }); // Mengurutkan dari yang terbaru

  if (error) {
    throw new Error("Gagal mengambil data template: " + error.message);
  }

  return data;
}

/**
 * GET TEMPLATE BY SLUG (UNTUK PREVIEW)
 */
export async function getTemplateBySlug(slug) {
  const { data, error } = await supabase
    .from("invitation_templates")
    .select("*")
    .eq("slug", slug) // Mencari berdasarkan slug
    .single(); // Karena slug unik, kita ambil satu data saja

  if (error || !data) {
    throw new Error("Template tidak ditemukan");
  }

  return data;
}

/**
 * POST TEMPLATE BARU
 * Di Supabase, proteksi dilakukan via RLS (Row Level Security) 
 * atau menggunakan service_role key, tapi untuk demo ini kita gunakan standar.
 */
export async function createTemplate(templateData) {
  const { data, error } = await supabase
    .from("templates")
    .insert([templateData])
    .select();

  if (error) {
    throw new Error("Gagal menyimpan data ke Supabase: " + error.message);
  }

  return data;
}