



const counterEl = document.getElementById("counter");
const dotsEl = document.getElementById("dots");
const preloader = document.querySelector(".preloader");
const mainContent = document.querySelector(".main-content");
const marqueeTrack = document.querySelector(".marquee-track");
const items = gsap.utils.toArray(".marquee-text");
const hamburger = document.getElementById("hamburger");
const overlayMenu = document.getElementById("overlayMenu");
const menuLinks = gsap.utils.toArray(".menu-items a");
let menuOpen = false;
hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;

  if (menuOpen) {
    // Animate hamburger to X
    gsap.to(hamburger.children[0], { rotate: 45, y: 6, background: "#fff" });
    gsap.to(hamburger.children[1], { opacity: 0 });
    gsap.to(hamburger.children[2], { rotate: -45, y: -6, background: "#fff" });

    // Slide in overlay
    gsap.to(overlayMenu, {
      y: 0,
      duration: 0.8,
      ease: "power4.out",
      onStart: () => overlayMenu.classList.add("active")
    });

    // Reveal menu items
    gsap.to(menuLinks, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.2,
      ease: "power3.out"
    });

  } else {
    // Animate X back to hamburger
    gsap.to(hamburger.children[0], { rotate: 0, y: 0 });
    gsap.to(hamburger.children[1], { opacity: 1 });
    gsap.to(hamburger.children[2], { rotate: 0, y: 0 });

    // Hide menu items
    gsap.to(menuLinks, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: -0.05
    });

    // Slide out overlay
    gsap.to(overlayMenu, {
      y: "-100%",
      duration: 0.8,
      ease: "power4.in",
      onComplete: () => overlayMenu.classList.remove("active")
    });
  }
});


let count = 1;
let delay = 40;
let dotState = 0;

function updateCounter() {
  if (count > 100) return;
  const percentStr = `${count}%`;
  counterEl.innerHTML = '';

  [...percentStr].forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    counterEl.appendChild(span);

    gsap.fromTo(span, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      delay: index * 0.02,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
    // Animate dots cycle: ., .., ...
    dotState = (dotState + 1) % 3;
    dotsEl.textContent = '.'.repeat(dotState + 1);

  if (count < 100) {
    // Increase delay toward the end for drama
    if (count > 80) delay += 5;
    if (count > 95) delay += 10;
    count++;
    setTimeout(updateCounter, delay);
  } else {
    // Counter is exactly 100, trigger transition
    endPreloader();
  }
}

function endPreloader() {
  // Hide preloader and reveal main content with upward scroll
  gsap.to(preloader, {
    yPercent: -100,
    duration: 1.2,
    ease: 'power4.inOut',
    onComplete: () => {
      preloader.style.display = 'none';
      document.body.style.overflow = 'auto'; // enable scroll again
        // ✅ Reveal hamburger now
      const hamburger = document.querySelector(".hamburger");
      hamburger.style.visibility = "visible";
      hamburger.style.pointerEvents = "auto";
      mainContent.classList.remove("hidden");
      mainContent.classList.add("visible");
    }
  });
}


function startMarquee() {
  // Duplicate all marquee text nodes for a seamless loop
  const originalText = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML += originalText;

  const totalWidth = marqueeTrack.scrollWidth / 2;

  // Animate the scroll
  const marqueeTween = gsap.to(marqueeTrack, {
    x: `-=${totalWidth}`,
    duration: 40,
    ease: "linear",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
    }
  });

  // Pause/resume marquee on hover
  marqueeTrack.addEventListener("mouseenter", () => marqueeTween.pause());
  marqueeTrack.addEventListener("mouseleave", () => marqueeTween.resume());
}

// Start everything
updateCounter();
startMarquee();

const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});




// Initialize ScrollSmoother
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

ScrollSmoother.create({
  smooth: 2,
  effects: true,
  smoothTouch: 0.1,
  normalizeScroll: true
});

ScrollTrigger.create({
  trigger: ".sticky-footer",
  pin: true,
  start: "bottom bottom",
  end: "+=100%"
});



