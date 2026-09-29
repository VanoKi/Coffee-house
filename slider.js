const SliderCard = document.querySelector(".slider_card");
const sliderImage = SliderCard.querySelector("img");
const sliderTitle = SliderCard.querySelector("h3");
const sliderDescription = SliderCard.querySelector(".slider-description");
const sliderPrice = SliderCard.querySelector(".slider-price");

const slides = [
  {
    image: "assets/slider/coffee-slider-1.png",
    title: "S’mores Frappuccino",
    description:
      "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
  },
  {
    image: "assets/slider/coffee-slider-2.png",
    title: "Caramel Macchiato",
    description:
      "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
  },
  {
    image: "assets/slider/coffee-slider-3.png",
    title: "Ice coffee",
    description:
      "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
  },
];

const dots = document.querySelectorAll(".control");

function showSlide(index, direction = 1) {
  const slide = slides[index];
  sliderImage.src = slide.image;
  sliderImage.alt = slide.title;
  sliderTitle.textContent = slide.title;
  sliderDescription.textContent = slide.description;
  sliderPrice.textContent = slide.price;
  sliderCard.classList.remove("slider_card_enter-next", "slider_card_enter-prev");
  // Restart the entrance animation even when the same direction is used twice.
  void sliderCard.offsetWidth;
  sliderCard.classList.add(
    direction > 0 ? "slider_card_enter-next" : "slider_card_enter-prev",
  );
  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle("control_active", isActive);
    dot.setAttribute("aria-current", String(isActive));
  });
}

let currentSlide = 0;

const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");

function moveSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  showSlide(currentSlide, direction);
}

nextButton.addEventListener("click", () => {
  moveSlide(1);
});

prevButton.addEventListener("click", () => {
  moveSlide(-1);
});

dots.forEach((dot, dotIndex) => {
  dot.addEventListener("click", () => {
    const direction = dotIndex >= currentSlide ? 1 : -1;
    currentSlide = dotIndex;
    showSlide(currentSlide, direction);
  });
});

showSlide(currentSlide);
