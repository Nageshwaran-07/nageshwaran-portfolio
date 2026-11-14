// MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

// CLOSE MOBILE MENU AFTER SELECTING A LINK
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");
    });
});

// PROJECT CATEGORY FILTER
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        projectCards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow = selectedCategory === "all" || selectedCategory === category;
            card.classList.toggle("hide", !shouldShow);
        });
    });
});

// AUTOMATIC FOOTER YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// SCROLL REVEAL
const revealElements = document.querySelectorAll(
    ".section-heading, .project-card, .skill-box, .experience-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("visible"));
}

document.querySelectorAll(".video-project").forEach(card => {

    card.addEventListener("click", function () {

        const videoPath = this.getAttribute("data-video");

        const popup = document.createElement("div");
        popup.className = "video-popup";

        const video = document.createElement("video");
        video.src = videoPath;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;

        const close = document.createElement("button");
        close.className = "close-video";
        close.innerHTML = "&times;";

        close.onclick = () => popup.remove();

        popup.appendChild(close);
        popup.appendChild(video);
        document.body.appendChild(popup);

        popup.onclick = function (event) {
            if (event.target === popup) {
                popup.remove();
            }
        };
    });

});
