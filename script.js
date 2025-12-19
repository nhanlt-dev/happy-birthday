/* ===== CONFIG ===== */
const PASSWORD = "19122003";
const hearts = ["💖", "💗", "💘", "❤️", "💞"];

/* ===== UNLOCK ===== */
function unlock() {
  const input = document.getElementById("password");
  if (input.value === PASSWORD) {
    document.getElementById("lock").classList.remove("active");
    document.getElementById("app").classList.add("active");
    document.getElementById("music").play();
    observeTimeline();
    autoVideo();
    startHearts();
  } else {
    input.style.animation = "shake .3s";
    setTimeout(() => (input.style.animation = ""), 300);
    document.getElementById("error").innerText = "Sai rồi nè 😢";
  }
}

/* ===== TIMELINE ===== */
function observeTimeline() {
  const items = document.querySelectorAll(".moment");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      });
    },
    { threshold: 0.3 }
  );
  items.forEach((i) => io.observe(i));
}

/* ===== VIDEO AUTO PLAY ===== */
function autoVideo() {
  document.querySelectorAll("video").forEach((v) => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.isIntersecting ? v.play() : v.pause();
        });
      },
      { threshold: 0.6 }
    );
    io.observe(v);
  });
}

/* ===== CARD ===== */
function flipCard() {
  document.querySelector(".card").classList.toggle("flip");
}

/* ===== SURPRISE ===== */
function surprise(e) {
  e.stopPropagation();
  for (let i = 0; i < 25; i++) {
    createHeart();
  }
}

/* ===== IMAGE VIEWER ===== */
function openImg(el) {
  document.getElementById("viewer").style.display = "flex";
  document.getElementById("viewerImg").src = el.src;
}
function closeViewer() {
  document.getElementById("viewer").style.display = "none";
}

/* ===== FLOATING HEARTS ===== */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.fontSize = 16 + Math.random() * 24 + "px";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 4 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

function startHearts() {
  setInterval(createHeart, 400);
}

/* ===== SHAKE ===== */
const style = document.createElement("style");
style.innerHTML = `
@keyframes shake{
  0%{transform:translateX(0)}
  25%{transform:translateX(-5px)}
  50%{transform:translateX(5px)}
  75%{transform:translateX(-5px)}
  100%{transform:translateX(0)}
}`;
document.head.appendChild(style);
