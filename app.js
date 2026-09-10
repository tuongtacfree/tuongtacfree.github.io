async function init(){const {data:{user}}=await sb.auth.getUser();if(!user){location.href="index.html";return}
const {data:p,error}=await sb.from("profiles").select("username,balance,role,status").eq("id",user.id).single();if(error){alert(error.message);return}
if(p.status!=="active"){await sb.auth.signOut();alert("Tài khoản đang bị khóa.");location.href="index.html";return}
const n=p.username||user.email.split("@")[0];document.querySelector("#name").textContent=n;document.querySelector("#sideName").textContent=n;document.querySelector("#sideEmail").textContent=user.email;
document.querySelector("#avatar").textContent=n.slice(0,2).toUpperCase();document.querySelector("#balance").textContent=p.balance;document.querySelector("#balance2").textContent=p.balance;
if(p.role==="admin")document.querySelector("#adminLink").innerHTML='<a href="admin.html">⚡ <span>Quản trị</span></a>';
const {count}=await sb.from("tool_usage").select("*",{count:"exact",head:true}).eq("user_id",user.id);document.querySelector("#usage").textContent=count||0;
const {count:tc}=await sb.from("transactions").select("*",{count:"exact",head:true}).eq("user_id",user.id).eq("type","reward");document.querySelector("#tasks").textContent=tc||0;
const {data:acts}=await sb.from("transactions").select("amount,type,description,created_at").eq("user_id",user.id).order("created_at",{ascending:false}).limit(6);
document.querySelector("#activity").innerHTML=acts?.length?acts.map(x=>`<div class="activity"><b>${x.description||x.type}</b><span>${x.amount>0?"+":""}${x.amount} xu</span><small>${new Date(x.created_at).toLocaleString("vi-VN")}</small></div>`).join(""):"Chưa có hoạt động.";
}
document.querySelector("#logout").onclick=async()=>{await sb.auth.signOut();location.href="index.html"};
document.querySelector("#deposit").onclick=()=>alert("Trang nạp xu có thể nối cổng thanh toán sau khi cấu hình.");
document.querySelectorAll(".tool-btn").forEach(b=>b.onclick=()=>alert("Tool '"+b.dataset.tool+"' đã được nối điểm vào. Phần API/tool thật sẽ đặt ở Edge Function."));
init();