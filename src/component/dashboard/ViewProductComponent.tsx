import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import MenuAppBar from "./Navbar";
import CartComponent from "../cart/CartComponent";
import { useDispatch } from "react-redux";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  createdByCustomerId: number;
  createdByRole: string;
}


const ViewProductComponent = () => {
  // const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  // const fetchProduct = async () => {
  //   const response = await fetch('http://localhost:3000/product', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  //     },
  //   });
  //    if (response.status === 401) {
  //   alert('Please sign in again!');
  //   return;
  // }

  //   const data = await response.json();

  //   if (Array.isArray(data)) {
  //     setProducts(data);
  //   }

  // };

   const fetchProduct = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Accept: "application/json",
      };
      const response = await axios.get("http://localhost:3000/product", {
        headers,
      });

      if (response.status === 401) {
        alert("Please sign in again!");
        return;
      }

      const data = response.data;

      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        alert("Please sign in again!");
      } else {
        console.error(axiosError);
        // Handle other errors as you see fit
      }
    }
  };
  const handleAddToCart = async (productName: string, quantity: number) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please sign in first!");
      navigate("/sign-in");
      return;
    }

    // Make a POST request to the server to add the product to the cart
    const response = await fetch(
      "http://localhost:3000/cart/add-product-by-name",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productName: productName, quantity: quantity }),
      }
    );

    if (response.ok) {
      // dispatch({ type: "INCREMENT_CART_COUNT" });
      alert("Product added to cart!");
    } else {
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div>
      {/* // <Box sx={{ display: "flex" }}> */}
      <MenuAppBar /> {MenuAppBar}
      <div>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} sx={{mt: 5}}>
              <Card sx={{ maxWidth: 450 }}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="194"
                  image={product.image}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Added By: {product.createdByRole},
                    {/* Role: {product.createdByRole} */}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product.name, 1)}
                  >
                    Add to cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      {/* // </Box> */}
    </div>
  );

};

export default ViewProductComponent;
