// ===== MATRIX =====
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const letters = "01アイウエオカキクケコサシスセソ";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }, () => Math.random() * -100);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.globalAlpha = Math.random() * 0.5 + 0.3;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        ctx.globalAlpha = 1;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener("resize", () => {
    resizeCanvas();
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -100);
});

// ===== TYPING =====
const typingText = [
    "> SYSTEM BOOTING...",
    "> LOADING MODULES...",
    "> VERIFYING ACCESS...",
    "> ACCESS GRANTED ✔",
    "> WELCOME TO MY PORTFOLIO."
];

const typingElement = document.getElementById("typingText");
let lineIndex = 0;
let charIndex = 0;
let fullText = typingText.join("\n");
let displayText = "";

function typeCharacter() {
    if (charIndex < fullText.length) {
        displayText += fullText.charAt(charIndex);
        typingElement.textContent = displayText;
        charIndex++;
        const delay = fullText.charAt(charIndex - 1) === "\n" ? 400 : 55;
        setTimeout(typeCharacter, delay);
    }
}

typeCharacter();

// ===== LOADER & ENTER =====
const btn = document.getElementById("enterBtn");
const overlay = document.getElementById("overlay");
const box = document.querySelector(".box");
const loader = document.getElementById("loader");
const mainContent = document.querySelector(".main-content");

// Lock scroll on start
document.documentElement.classList.add("locked");

// After 11s: hide loader, show button
setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease";
    setTimeout(() => { loader.style.display = "none"; }, 500);
    btn.style.display = "inline-block";
}, 11000);

// Enter button click
btn.addEventListener("click", () => {
    box.classList.add("box-exit");

    setTimeout(() => {
        overlay.classList.add("fade-out");
        document.documentElement.classList.remove("locked");
        document.body.classList.add("start");

        if (mainContent) {
            mainContent.style.display = "block";
        }
    }, 700);
});

// ===== NAVBAR =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
    });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0,0,0,0.95)";
    } else {
        navbar.style.background = "rgba(0,0,0,0.85)";
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            // Auto-play videos in view
            const video = entry.target.querySelector("video");
            if (video) {
                video.play().catch(() => {});
            }
        } else {
            entry.target.classList.remove("show");
            const video = entry.target.querySelector("video");
            if (video) {
                video.pause();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll(".section").forEach(section => {
    section.classList.add("hidden");
    scrollObserver.observe(section);
});

// Observe project fadein-left / fadein-right separately
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
            // Play video inside if any
            const video = entry.target.querySelector("video");
            if (video) video.play().catch(() => {});
        } else {
            entry.target.style.opacity = "";
            entry.target.style.transform = "";
            const video = entry.target.querySelector("video");
            if (video) video.pause();
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

document.querySelectorAll(".fadein-left, .fadein-right").forEach(el => {
    fadeObserver.observe(el);
});

// Observe about cards with stagger
const infoCards = document.querySelectorAll(".info-cards .card");
infoCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
    scrollObserver.observe(card);
});

// ===== CERTIFICATE SECTION =====
const viewBtn = document.getElementById("viewBtn");
const certList = document.getElementById("certList");

viewBtn.addEventListener("click", () => {
    certList.classList.toggle("active");
    viewBtn.textContent = certList.classList.contains("active")
        ? "▲ Hide Certificates"
        : "View All Certificates";
});

// ===== CERTIFICATE SLIDER TOUCH =====
const sliderTrack = document.querySelector(".slider-track");
if (sliderTrack) {
    sliderTrack.addEventListener("touchstart", () => {
        sliderTrack.style.animationPlayState = "paused";
    }, { passive: true });

    sliderTrack.addEventListener("touchend", () => {
        sliderTrack.style.animationPlayState = "running";
    }, { passive: true });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            if (entry.isIntersecting) {
                document.querySelectorAll(".nav-links a").forEach(a => {
                    a.style.color = "rgba(0,255,0,0.7)";
                    a.style.fontWeight = "normal";
                    a.style.textShadow = "none";
                });
                link.style.color = "#00ff00";
                link.style.fontWeight = "bold";
                link.style.textShadow = "0 0 8px rgba(0, 255, 0, 0.4)";
            }
        }
    });
}, { threshold: 0.15, rootMargin: "-20% 0px -50% 0px" });

sections.forEach(section => navObserver.observe(section));

// ===== LANGUAGE SKILLS ANIMATION =====
const langBars = document.querySelectorAll(".lang-bar-fill");

const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute("data-width");
            entry.target.style.width = width;
        } else {
            entry.target.style.width = "0";
        }
    });
}, { threshold: 0.5 });

langBars.forEach(bar => langObserver.observe(bar));

// ===== CONTACT FORM AJAX SUBMISSION =====
const contactForm = document.querySelector(".contact-form");
const submitBtn = document.querySelector(".submit-btn");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Basic Validation
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        
        if (!name || !email || !message) {
            alert("Please fill out all required fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i>&nbsp; SENDING...";
        submitBtn.style.pointerEvents = "none";

        try {
            const response = await fetch("https://formsubmit.co/ajax/aaryannale0612@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _honey: contactForm.querySelector('input[name="_honey"]').value,
                    _captcha: "false",
                    _template: "box"
                })
            });

            if (response.ok) {
                submitBtn.innerHTML = "<i class='bx bx-check'></i>&nbsp; SENT SUCCESSFULLY";
                submitBtn.style.color = "#00ff00";
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.pointerEvents = "auto";
                    submitBtn.style.color = "";
                }, 4000);
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            submitBtn.innerHTML = "<i class='bx bx-x'></i>&nbsp; ERROR SENDING";
            submitBtn.style.color = "#ff4444";
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.pointerEvents = "auto";
                submitBtn.style.color = "";
            }, 4000);
        }
    });
}