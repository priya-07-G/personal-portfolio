// ---------- Mobile menu toggle ----------
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Close the menu after clicking a link (on phones)
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

// ---------- Typing effect ----------
const roles = ["Cyber Security Student", "Aspiring Ethical Hacker", "Web Developer", "Problem Solver"];
const typingEl = document.getElementById("typing");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      return setTimeout(type, 1500);
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// ---------- Scroll reveal ----------
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// ---------- Back-to-top button ----------
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 400);
});

// ---------- Contact form validation ----------
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setMessage(text, ok = false) {
  formMsg.textContent = text;
  formMsg.className = ok ? "msg-ok" : "msg-error";
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg").value.trim();

  if (name.length < 2) return setMessage("Please enter your name.");
  if (!emailPattern.test(email)) return setMessage("Please enter a valid email address.");
  if (msg.length < 10) return setMessage("Message should be at least 10 characters.");

  setMessage(`Thanks, ${name}! Your message has been sent.`, true);
  contactForm.reset();
});