const startProcessing = () => {
  const products = [
    {
      name: "Laptop",
      category: "Electronics",
      price: 1000,
      quantity: 5,
      inStock: true,
    },
    {
      name: "Phone",
      category: "Electronics",
      price: 500,
      quantity: 0,
      inStock: false,
    },
    {
      name: "Shirt",
      category: "Apparel",
      price: 20,
      quantity: 100,
      inStock: true,
    },
    {
      name: "Jeans",
      category: "Apparel",
      price: 40,
      quantity: 50,
      inStock: true,
    },
    {
      name: "TV",
      category: "Electronics",
      price: 1500,
      quantity: 3,
      inStock: true,
    },
    {
      name: "Hat",
      category: "Apparel",
      price: 15,
      quantity: 200,
      inStock: true,
    },
  ];

  const discountCategory = document.querySelector('input[name="category"]:checked').value;
  let discountRate = Number(document.querySelector('input[name="discount"]').value);
  if (discountRate >= 100) {
    discountRate = 100;
  }
  if (discountRate >= 1) {
    discountRate = discountRate / 100;
  }
  console.log(processProducts(products, discountCategory, discountRate));
  const processedProducts = processProducts(products, discountCategory, discountRate);
  document.getElementById("data").innerHTML = "<tr><th>Name</th><th>Category</th><th>Discounted Total Value</th></tr>";
  processedProducts.map((product) => {
    if (product.category === discountCategory) {
      document.getElementById("data").innerHTML += `<tr id="discounted"><td>*${product.name}</td><td>${product.category}</td><td>$${Number(
        product.discountedTotalValue
      ).toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>`;
    } else {
      document.getElementById("data").innerHTML += `<tr><td>${product.name}</td><td>${product.category}</td><td>$${Number(
        product.discountedTotalValue
      ).toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>`;
    }
  });
};

const processProducts = (products, discountCategory, discountRate) => {
  const inStockProducts = products.filter((product) => product.inStock);
  const discountedProducts = [];
  for (let i = 0; i < inStockProducts.length; i++) {
    let discountedTotalValue = inStockProducts[i].price * inStockProducts[i].quantity;
    if (inStockProducts[i].category === discountCategory) {
      discountedTotalValue *= 1 - discountRate;
    }
    discountedProducts.push({
      name: inStockProducts[i]["name"],
      category: inStockProducts[i].category,
      discountedTotalValue: discountedTotalValue.toFixed(2),
    });
  }
  return discountedProducts;
};
