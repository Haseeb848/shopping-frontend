import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { Cart } from "../types";
import { handleRemoveFromCart } from "./CartOperations";
// import DeleteIcon from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartComponent = () => {
  const [cartProducts, setCartProducts] = useState<Cart | null>(null);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCartProducts = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Accept: "application/json",
      };
      const response = await axios.get("http://localhost:3000/cart", {
        headers,
      });

      if (response.status === 401) {
        alert("Please sign in again!");
        return;
      }

      setCartProducts(response.data);
      console.log(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        alert("Please sign in again!");
      } else {
        console.error(axiosError);
      }
    }
  };
  async function handleIncreaseQuantity(
    productId: number,
    productName: string
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Accept: "application/json",
      };

      const body = {
        productId,
        productName,
        quantity: 1, // Increase quantity by 1
      };

      // Wait for the server to respond
      const response = await axios.patch(
        "http://localhost:3000/cart/add-product-quantity-by-name",
        body,
        {
          headers,
        }
      );

      // Check if the response was successful
      if (response.status === 200) {
        // Wait for the cart products to be fetched
        await fetchCartProducts();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDecreaseQuantity = async (
    productId: number,
    quantity: number
  ) => {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json",
    };

    const body = {
      productId,
      quantity,
    };

    try {
      const response = await axios.patch(
        `http://localhost:3000/cart/remove-product-quantity`,
        body,
        { headers }
      );
      if (response.status === 200) {
        fetchCartProducts(); // Update your cart after changing the quantity
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!cartProducts) {
    return <div>Loading...</div>;
  }
  const totalPrice = cartProducts.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  console.log("Rendering with data", cartProducts);
  return (
    <Grid container spacing={3}>
      {cartProducts.items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.product.id}>
          <Card>
            <CardMedia
              component="img"
              alt={item.product.name}
              height="180"
              image={item.product.image}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {item.product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ${item.product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created By ID: {item.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Product ID: {item.productId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                createdByCustomerId ID: {cartProducts.customerId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total item price: ${item.product.price * item.quantity}
              </Typography>

              <IconButton
                onClick={() =>
                  handleRemoveFromCart(
                    item.product.id,
                    item.product.name,
                    cartProducts,
                    setCartProducts
                  )
                }
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDecreaseQuantity(item.product.id, 1)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                onClick=
                {() =>
                  handleIncreaseQuantity(item.product.id, item.product.name)
                }>
                <AddIcon sx={{variant: "contained"}}/>
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Typography
        variant="h5"
        component="div"
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
        }}
      >
        Total Price: ${totalPrice}
      </Typography>
    </Grid>
  );
};

export default CartComponent;
