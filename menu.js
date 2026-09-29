const cardsContainer = document.querySelector(".menu__cards");
const categoryButtons = document.querySelectorAll(".menu__btn[data-category]");

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
  const selectedProducts = products.filter(
    (product) => product.category === category,
  );
  const cards = selectedProducts.map((product, index) =>
    createCard(product, index),
  );
  cardsContainer.replaceChildren(...cards);

  categoryButtons.forEach((button) => {
    button.classList.toggle(
      "menu__btn_active",
      button.dataset.category === category,
    );
  });
}

let allProducts = [];

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderCategory(allProducts, button.dataset.category);
  });
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
