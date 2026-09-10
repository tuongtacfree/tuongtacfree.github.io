// CHỈ điền 2 giá trị public của project Supabase.
// Không đưa service_role key vào GitHub Pages.
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);