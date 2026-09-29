const cardsContainer = document.querySelector(".menu__cards");
const categoryButtons = document.querySelectorAll(".menu__btn[data-category]");
const showMoreButton = document.querySelector(".refresh_btn");
const mobileCardsQuery = window.matchMedia("(max-width: 768px)");
const cardsPerPage = 4;
let selectedProducts = [];
let isExpanded = false;

const imagePaths = {
  coffee: { folder: "coffee", prefix: "" },
  tea: { folder: "tea", prefix: "tea-" },
  dessert: { folder: "desert", prefix: "dessert-" },
};

function createCard(product, index) {
  const card = document.createElement("div");
  card.className = "menu__card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "menu__card_image-wrap";

  const image = document.createElement("img");
  const imagePath = imagePaths[product.category];
  image.src = `assets/menu_cards/${imagePath.folder}/` +
    `${imagePath.prefix}${index + 1}.png`;
  image.alt = product.name;
  imageWrap.append(image);

  const descriptionWrap = document.createElement("div");
  descriptionWrap.className = "menu__card_description";

  const textWrap = document.createElement("div");
  textWrap.className = "menu__card_text";

  const title = document.createElement("h2");
  title.className = "heading-3 menu__card_title";
  title.textContent = product.name;

  const description = document.createElement("p");
  description.className = "font-medium text-description menu__card_summary";
  description.textContent = product.description;

  const price = document.createElement("p");
  price.className = "heading-3";
  price.textContent = `$${product.price}`;

  textWrap.append(title, description);
  descriptionWrap.append(textWrap, price);
  card.append(imageWrap, descriptionWrap);

  return card;
}

function renderCategory(products, category) {
  selectedProducts = products.filter(
    (product) => product.category === category,
  );
  isExpanded = false;
  renderCards();

  categoryButtons.forEach((button) => {
    button.classList.toggle(
      "menu__btn_active",
      button.dataset.category === category,
    );
  });
}

function renderCards() {
  const shouldLimitCards = mobileCardsQuery.matches && !isExpanded;
  const cards = selectedProducts.map((product, index) => {
    const card = createCard(product, index);
    card.hidden = shouldLimitCards && index >= cardsPerPage;
    return card;
  });
  cardsContainer.replaceChildren(...cards);

  const hasHiddenCards = mobileCardsQuery.matches &&
    !isExpanded &&
    selectedProducts.length > cardsPerPage;
  showMoreButton.hidden = !hasHiddenCards;
}

let allProducts = [];

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderCategory(allProducts, button.dataset.category);
  });
});

showMoreButton.addEventListener("click", () => {
  isExpanded = true;
  renderCards();
});

mobileCardsQuery.addEventListener("change", () => {
  isExpanded = false;
  renderCards();
});

fetch("./products.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((products) => {
    allProducts = products;
    renderCategory(allProducts, "coffee");
  })
  .catch((error) => console.error("Не удалось загрузить меню:", error));
