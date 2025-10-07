export const addToCart = (product, selectedSize, quantity) => {
  if (!selectedSize) {
    alert("Please select a size before adding to cart.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(
    (item) => item._id === product._id && item.size === selectedSize
  );

  if (existingItem) {
    // Already exists → update quantity
    existingItem.quantity += quantity;
  } else {
    // Add new product
    cart.push({
      _id: product._id,
      title: product.title,
      image: product.image,
      price: product.isDiscounted ? product.discountedPrice : product.price,
      originalPrice: product.price,
      quantity,
      size: selectedSize,
      category: product.category,
    });

    alert("Item added to cart!");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart contents after adding:", cart);
};

export const removeFromCart = (productId, size) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(
    (item) => item._id === productId && item.size === size
  );

  if (existingItem) {
    if (existingItem.quantity > 1) {
      // Decrement quantity
      existingItem.quantity -= 1;
    } else {
      // Remove item completely
      const updatedCart = cart.filter(
        (item) => !(item._id === productId && item.size === size)
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
