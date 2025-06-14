const counterEl = document.getElementById("counter");
const preloader = document.querySelector(".preloader");
const mainContent = document.querySelector(".main-content");
const marqueeTrack = document.querySelector(".marquee-track");
const items = gsap.utils.toArray(".marquee-text");

// Preloader Counter Animation
let count = 1;
const interval = setInterval(() => {
  counterEl.textContent = `${count}%`;
  count++;
  if (count > 100) {
    clearInterval(interval);

    gsap.to(preloader, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        preloader.classList.add("hidden");
        mainContent.classList.remove("hidden");
        mainContent.classList.add("visible");

        // Start marquee after preloader finishes
        startMarquee();
      }
    });
  }
}, 20);

// Marquee Animation
function startMarquee() {
  gsap.to(items, {
    xPercent: -100,
    repeat: -1,
    ease: "linear",
    duration: 20,
    modifiers: {
      xPercent: gsap.utils.wrap(-100, 0)
    }
  });

  // Pause on hover
  marqueeTrack.addEventListener("mouseenter", () => gsap.globalTimeline.pause());
  marqueeTrack.addEventListener("mouseleave", () => gsap.globalTimeline.resume());
}


