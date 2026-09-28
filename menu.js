fetch("./products.json")
  .then((response) => response.json())
  .then((products) => {
    const coffee = products.filter((product) => product.category === "coffee");
    console.log(coffee);
  })
  .catch((error) => console.error("Не удалось загрузить меню:", error));
