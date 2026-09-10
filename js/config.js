// CHỈ điền 2 giá trị public của project Supabase.
// Không đưa service_role key vào GitHub Pages.
const SUPABASE_URL = "https://slryfjxvcnjrfhobgqze.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_z1AJNNfbfSS7IN5s_bEJPw_jo6LaaZs";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
