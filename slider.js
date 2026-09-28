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

function showSlide(index) {
  const slide = slides[index];
  sliderImage.src = slide.image;
  sliderTitle.textContent = slide.title;
  sliderDescription.textContent = slide.description;
  sliderPrice.textContent = slide.price;
}

showSlide(0);

let currentSlide = 0;

const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");

nextButton.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

prevButton.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

showSlide(currentSlide);