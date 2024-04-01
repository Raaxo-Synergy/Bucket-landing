import gsap from 'gsap';
import Typewriter from 'typewriter-effect/dist/core';

import ScrollTrigger from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const yearContainer = document.getElementById("year");
const hero = document.querySelector('#hero');
const heroImg = hero.querySelector("img");

const scrollInLeft = document.querySelectorAll("[data-animate='scroll-in-left']");
const scrollInRight = document.querySelectorAll(
  "[data-animate='scroll-in-right']"
);

const media = window.matchMedia("(min-width: 768px)");
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector("#menu");
let state = false;

// Autoupdate copyright year.
yearContainer.innerHTML = new Date().getFullYear();

// Animations
// --- hero heading typewriter animation

new Typewriter("#heading", {
  strings: document.getElementById("heading").innerHTML,
  autoStart: true,
  cursor: '_'
});

// --- hero image

gsap.from(heroImg, {
  scrollTrigger: hero,
  ease: 'sine.in',
  x: "100px"
})

scrollInLeft.forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      scrub: i * 0.5,
    },
    ease: CustomEase.create(
      "custom",
      "M0,0 C0,0 0.515,0.732 0.713,0.956 0.763,0.987 0.812,0.916 0.812,0.916 0.812,0.916 0.869,0.957 0.921,0.947 0.953,0.974 1,0.9 1,0.9"
    ),
    x: "-100px",
  });
})

scrollInRight.forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      scrub: i * .5,
    },
    ease: CustomEase.create(
      "custom",
      "M0,0 C0,0 0.515,0.732 0.713,0.956 0.763,0.987 0.812,0.916 0.812,0.916 0.812,0.916 0.869,0.957 0.921,0.947 0.953,0.974 1,0.9 1,0.9"
    ),
    x: "100px",
  });
});

gsap.from("#waitlist", {
  scrollTrigger: {
    trigger: "#join-waitlist",
    scrub: 0.4,
  },
  ease: CustomEase.create(
    "custom",
    "M0,0 C0,0 0.515,0.732 0.713,0.956 0.763,0.987 0.812,0.916 0.812,0.916 0.812,0.916 0.869,0.957 0.921,0.947 0.953,0.974 1,0.9 1,0.9"
  ),
  y: '100px',
  autoAlpha: .8,
  scaleX: .7
});

// Hamburger

function animateHamburger() {
  if (state) {
    gsap.to(menu, {
      display: "none",
      opacity: 0,
      ease: "sine.out",
      duration: 0.3,
    });

    hamburger.classList.remove("hamburger--active");
  } else {
    gsap.to(menu, {
      opacity: 1,
      display: "flex",
      flexDirection: "column",
      ease: "sine.in",
      position: "fixed",
      top: "75px",
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 99,
      alignItems: "center",
      backgroundColor: "#2FBE5F",
      padding: "50px 0 0",
    });
    gsap.to("ul", {
      opacity: 1,
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: "75px",
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 99,
      alignItems: "center",
      backgroundColor: "#2FBE5F",
      padding: "50px 0 0",
    });

    hamburger.classList.add("hamburger--active");
  }
  state = !state;
}
hamburger.addEventListener("click", () => {
  if (!media.matches) {
    animateHamburger();
  }
});

window.addEventListener("resize", () => {
  if (media.matches) {
    location.reload();
  }
});