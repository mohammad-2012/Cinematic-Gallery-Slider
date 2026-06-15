const track = document.querySelector(".slider-track");
const images = document.querySelectorAll(".slider-img");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const indicatorsContainer = document.getElementById("indicators");
const counterEl = document.getElementById("slide-counter");
const titleEl = document.getElementById("slide-title");

let current = 0;
const total = images.length;
let autoPlayInterval;

const titles = ["Mountain", "City", "Nature"];

function buildIndicators() {
  indicatorsContainer.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.classList.add("indicator-dot");
    if (i === 0) dot.classList.add("active");
    dot.dataset.index = i;
    dot.addEventListener("click", function () {
      clearInterval(autoPlayInterval);
      goTo(parseInt(this.dataset.index));
    });
    indicatorsContainer.appendChild(dot);
  }
}
buildIndicators();

function goTo(index) {
  current = index;
  updateSlider();
  startAutoPlay();
}

function updateSlider() {
  track.style.transform = `translateX(-${current * 100}%)`;

  document.querySelectorAll(".indicator-dot").forEach((dot, i) => {
    if (i === current) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  counterEl.textContent = `${current + 1} / ${total}`;
  titleEl.textContent = titles[current] || "Untitled";
}

function nextSlide() {
  current = (current + 1) % total;
  updateSlider();
}

function prevSlide() {
  current = (current - 1 + total) % total;
  updateSlider();
}

function startAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
  autoPlayInterval = setInterval(nextSlide, 5000);
}

prevBtn.addEventListener("click", function () {
  clearInterval(autoPlayInterval);
  prevSlide();
  startAutoPlay();
});

nextBtn.addEventListener("click", function () {
  clearInterval(autoPlayInterval);
  nextSlide();
  startAutoPlay();
});

updateSlider();
startAutoPlay();

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    clearInterval(autoPlayInterval);
    nextSlide();
    startAutoPlay();
    e.preventDefault();
  } else if (e.key === "ArrowLeft") {
    clearInterval(autoPlayInterval);
    prevSlide();
    startAutoPlay();
    e.preventDefault();
  }
});
