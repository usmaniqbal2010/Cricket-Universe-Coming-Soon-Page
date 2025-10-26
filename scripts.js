/* ==============================================
   Cricket Universe - scripts.js
   Author: Usman x ChatGPT
   Version: 1.0
   ============================================== */

/* ======= DARK/LIGHT MODE FIXED ======= */
const toggleButton = document.getElementById("mode-toggle");
const body = document.body;

// Set default theme if not found
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}

const setTheme = (theme) => {
  if (theme === "dark") {
    body.classList.add("dark");
    toggleButton.textContent = "☀️";
  } else {
    body.classList.remove("dark");
    toggleButton.textContent = "🌙";
  }
};

// Load theme on startup
setTheme(localStorage.getItem("theme"));

// Toggle theme on click
toggleButton.addEventListener("click", () => {
  const currentTheme = body.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  setTheme(newTheme);
});


/* ======= 2. MOBILE NAVIGATION (HAMBURGER MENU) ======= */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
  navToggle.setAttribute("aria-expanded", !expanded);
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("open");
});

// Close menu on link click (mobile)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.setAttribute("aria-expanded", false);
    navToggle.classList.remove("open");
  });
});


/* ======= 3. AUTO YEAR UPDATE IN FOOTER ======= */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();


/* ======= 4. SCROLL ANIMATION (FADE-IN ELEMENTS) ======= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});


/* ======= 5. SMOOTH SCROLL FOR INTERNAL LINKS ======= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});


/* ======= 6. FORM PLACEHOLDER (COMING SOON) ======= */
const notifyForm = document.getElementById("notify-form");
if (notifyForm) {
  notifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email-input");
    if (emailInput && emailInput.value.trim() !== "") {
      alert("✅ Thank you! We'll notify you when the website launches.");
      emailInput.value = "";
    } else {
      alert("⚠️ Please enter a valid email address.");
    }
  });
}


/* ======= 7. OPTIONAL IMAGE LIGHTBOX (FOR GALLERY) ======= */
document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.85)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.cursor = "zoom-out";
    overlay.style.zIndex = "2000";

    const imgClone = document.createElement("img");
    imgClone.src = img.src;
    imgClone.style.maxWidth = "90%";
    imgClone.style.maxHeight = "90%";
    imgClone.style.borderRadius = "12px";
    imgClone.style.boxShadow = "0 0 25px rgba(0,0,0,0.5)";
    overlay.appendChild(imgClone);

    overlay.addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  });
});


/* ======= 8. SCROLL TO TOP BUTTON (OPTIONAL EXTRA) ======= */
const scrollBtn = document.createElement("button");
scrollBtn.textContent = "↑";
scrollBtn.id = "scrollTopBtn";
scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "25px";
scrollBtn.style.right = "25px";
scrollBtn.style.padding = "10px 15px";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.background = "var(--green)";
scrollBtn.style.color = "#fff";
scrollBtn.style.border = "none";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
scrollBtn.style.zIndex = "1500";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) scrollBtn.style.display = "block";
  else scrollBtn.style.display = "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
