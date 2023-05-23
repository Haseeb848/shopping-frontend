// cartOperations.ts

import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Cart, Product } from "../types";
import { useNavigate } from "react-router";

export async function handleRemoveFromCart(
  productId: number,
  productName: string,
  cart: Cart,
  setCartProducts: React.Dispatch<React.SetStateAction<Cart | null>>
) {
  // Check if product is in the cart
  const productInCart = cart.items.find(
    (item) => item.product.id === productId && item.product.name === productName
  );

  if (!productInCart) {
    alert("Product not found in cart.");
    return;
  }

  // Make a DELETE request to the server to remove the product from the cart
  const response = await axios.delete(
    `http://localhost:3000/cart/${productId}/${productName}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );

  if (response.status === 200) {
    // If the request is successful, remove the product from the cart in state
    const updatedCartItems = cart.items.filter(
      (item) =>
        item.product.id !== productId || item.product.name !== productName
    );

    const updatedCart = { ...cart, items: updatedCartItems }; // create a new cart object with the updated items array

    setCartProducts(updatedCart); // Update the state with the new cart object

    alert("Product removed from cart!");
  } else {
    alert("Failed to remove product from cart. Please try again.");
  }
}
