const productModal = document.querySelector("#product-modal");
const productModalImage = productModal.querySelector("[data-modal-image]");
const productModalDetails = productModal.querySelector(".product-modal__details");
const productModalCloseButtons = productModal.querySelectorAll("[data-modal-close]");

let currentProduct = null;
let selectedSize = "s";
let selectedAdditives = new Set();
let modalOpener = null;

function makeOptionButton(label, selected, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "product-modal__option";
  button.textContent = label;
  button.setAttribute("aria-pressed", String(selected));
  button.classList.toggle("product-modal__option_selected", selected);
  button.addEventListener("click", onClick);
  return button;
}

function updateModalPrice() {
  const basePrice = Number(currentProduct.price);
  const sizePrice = Number(currentProduct.sizes[selectedSize]["add-price"]);
  const additivesPrice = currentProduct.additives
    .filter((additive) => selectedAdditives.has(additive.name))
    .reduce((total, additive) => total + Number(additive["add-price"]), 0);
  const total = basePrice + sizePrice + additivesPrice;
  productModalDetails.querySelector("[data-modal-total]").textContent =
    `$${total.toFixed(2)}`;
}

function renderProductDetails(product) {
  productModalDetails.replaceChildren();

  const title = document.createElement("h2");
  title.className = "heading-3 product-modal__title";
  title.textContent = product.name;

  const description = document.createElement("p");
  description.className = "font-medium text-description";
  description.textContent = product.description;

  const sizeLabel = document.createElement("p");
  sizeLabel.className = "font-medium product-modal__section-title";
  sizeLabel.textContent = "Size";

  const sizeOptions = document.createElement("div");
  sizeOptions.className = "product-modal__options";
  Object.entries(product.sizes).forEach(([sizeKey, size]) => {
    const button = makeOptionButton(size.size, sizeKey === selectedSize, () => {
      selectedSize = sizeKey;
      renderProductDetails(currentProduct);
    });
    sizeOptions.append(button);
  });

  const additivesLabel = document.createElement("p");
  additivesLabel.className = "font-medium product-modal__section-title";
  additivesLabel.textContent = "Additives";

  const additiveOptions = document.createElement("div");
  additiveOptions.className = "product-modal__options";
  product.additives.forEach((additive) => {
    const isSelected = selectedAdditives.has(additive.name);
    const button = makeOptionButton(additive.name, isSelected, () => {
      if (selectedAdditives.has(additive.name)) {
        selectedAdditives.delete(additive.name);
      } else {
        selectedAdditives.add(additive.name);
      }
      renderProductDetails(currentProduct);
    });
    additiveOptions.append(button);
  });

  const totalRow = document.createElement("div");
  totalRow.className = "product-modal__total font-medium";
  const totalLabel = document.createElement("span");
  totalLabel.textContent = "Total:";
  const totalPrice = document.createElement("span");
  totalPrice.className = "heading-3";
  totalPrice.dataset.modalTotal = "";
  totalRow.append(totalLabel, totalPrice);

  productModalDetails.append(
    title,
    description,
    sizeLabel,
    sizeOptions,
    additivesLabel,
    additiveOptions,
    totalRow,
  );
  updateModalPrice();
}

function openProductModal(product, imageSrc) {
  currentProduct = product;
  selectedSize = Object.keys(product.sizes)[0];
  selectedAdditives = new Set();
  modalOpener = document.activeElement;

  productModalImage.src = imageSrc;
  productModalImage.alt = product.name;
  renderProductDetails(product);
  productModal.hidden = false;
  productModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  productModal.querySelector("[data-modal-close]").focus();
}

function closeProductModal() {
  if (productModal.hidden) return;

  productModal.hidden = true;
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalOpener?.focus();
  modalOpener = null;
}

productModalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeProductModal);
});

productModal.addEventListener("click", (event) => {
  if (event.target === productModal) closeProductModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProductModal();
});

window.CoffeeHouseModal = {
  open: openProductModal,
  close: closeProductModal,
};
