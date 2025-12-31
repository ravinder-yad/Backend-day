// import/export

// Function definition
let addToCart = () => {
  return "add to cart";
};

// Iterate over some array (assuming 'l' is an array)
let l = [1, 2, ];  // Just an example array
l.forEach((value, index) => {
  console.log(addToCart());
});

// Export the function
module.exports = addToCart;
console.log("Server running...");

