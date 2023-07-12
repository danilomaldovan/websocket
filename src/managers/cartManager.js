let carts = [];

function getCartById(id) {
  return carts.find((cart) => cart.id === id);
}

function addCart(cart) {
  carts.push(cart);
}

export default { getCartById, addCart }