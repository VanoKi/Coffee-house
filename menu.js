const cardsContainer = document.querySelector(".menu__cards");

function createCard(product, index) {
  const card = document.createElement("div");
  card.className = "menu__card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "menu__card_image-wrap";

  const image = document.createElement("img");
  image.src = `assets/menu_cards/coffee/${index + 1}.png`;
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

function renderCoffee(products) {
  const coffee = products.filter((product) => product.category === "coffee");
  const cards = coffee.map((product, index) => createCard(product, index));
  cardsContainer.replaceChildren(...cards);
}

fetch("./products.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(renderCoffee)
  .catch((error) => console.error("Не удалось загрузить меню:", error));
