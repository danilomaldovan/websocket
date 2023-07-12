let products = [];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addProduct(product) {
  products.push(product);
}

function updateProduct(id, updatedProduct) {
  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    return products[index];
  }

  return null;
}

function deleteProduct(id) {
  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    const product = products[index];
    products.splice(index, 1);
    return product;
  }

  return null;
}

export default { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };