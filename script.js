// ===== CANVAS PARTICLES =====
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<160;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*1.2,
vy:(Math.random()-0.5)*1.2,
size:Math.random()*2+0.5
});
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#00ffd5";

particles.forEach(p=>{
p.x+=p.vx;
p.y+=p.vy;

if(p.x<0||p.x>canvas.width) p.vx*=-1;
if(p.y<0||p.y>canvas.height) p.vy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fill();
});

// CONNECTING LINES (FOLLOW EFFECT)
for(let i=0;i<particles.length;i++){
for(let j=i+1;j<particles.length;j++){
let dx=particles[i].x-particles[j].x;
let dy=particles[i].y-particles[j].y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){
ctx.strokeStyle="rgba(0,255,213,0.15)";
ctx.beginPath();
ctx.moveTo(particles[i].x,particles[i].y);
ctx.lineTo(particles[j].x,particles[j].y);
ctx.stroke();
}
}
}

requestAnimationFrame(draw);
}
draw();

window.addEventListener("resize",()=>{
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
});

// ===== GLOW CURSOR 144hz =====
const cursor=document.getElementById("cursor");

let mouseX=0,mouseY=0;
let posX=0,posY=0;

document.addEventListener("mousemove",(e)=>{
mouseX=e.clientX;
mouseY=e.clientY;
});

function animateCursor(){
posX+=(mouseX-posX)*0.18;
posY+=(mouseY-posY)*0.18;

cursor.style.left=posX+"px";
cursor.style.top=posY+"px";

requestAnimationFrame(animateCursor);
}
animateCursor();

// ===== BUTTON TILT =====
window.onload = function(){

const btn = document.getElementById("enterBtn");

if(!btn) return; // prevents error if button missing

document.addEventListener("mousemove", (e) => {

const rect = btn.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

if(x > 0 && x < rect.width && y > 0 && y < rect.height){

const centerX = rect.width/2;
const centerY = rect.height/2;

const rotateX = -(y - centerY)/10;
const rotateY = (x - centerX)/10;

btn.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

}else{
btn.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
}

});

};

// ENTER BUTTON -> SHOW LOGIN
const enterBtn=document.getElementById("enterBtn");
const loginBox=document.getElementById("loginBox");
const home=document.getElementById("home");

enterBtn.onclick=()=>{
home.style.opacity="0";
home.style.pointerEvents="none";

setTimeout(()=>{
loginBox.classList.add("show");
},300);
};

// 3D TILT BUTTON FOLLOW CURSOR
const btn = document.getElementById("enterBtn");

document.addEventListener("mousemove", (e) => {

const rect = btn.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

if(x > 0 && x < rect.width && y > 0 && y < rect.height){

const centerX = rect.width/2;
const centerY = rect.height/2;

const rotateX = -(y - centerY)/10;
const rotateY = (x - centerX)/10;

btn.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

}else{
btn.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
}

});

function startGoogle(){
    // smooth glow loading
    document.body.style.opacity="0.7";

    setTimeout(()=>{
        // go to real google login route
        window.location.href = "https://matrix-kinoto.vercel.app/auth/google";
    },800);
}

