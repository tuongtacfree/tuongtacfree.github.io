const msg=document.getElementById("msg");
function show(t,error=false){msg.textContent=t;msg.className="msg "+(error?"error":"ok")}
const lf=document.getElementById("loginForm");
if(lf)lf.addEventListener("submit",async e=>{e.preventDefault();const {error}=await sb.auth.signInWithPassword({email:email.value,password:password.value});if(error)return show(error.message,true);location.href="dashboard.html"});
const rf=document.getElementById("registerForm");
if(rf)rf.addEventListener("submit",async e=>{e.preventDefault();const {data,error}=await sb.auth.signUp({email:email.value,password:password.value,options:{data:{username:username.value.trim()}}});if(error)return show(error.message,true);show("Đăng ký thành công. Kiểm tra email nếu Supabase yêu cầu xác nhận.");});