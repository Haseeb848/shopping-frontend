import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  createdByCustomerId: number;
  createdByRole: string;
}

const ViewProductComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const response = await fetch('http://localhost:3000/product', {
      method: 'GET',
      // headers: {
      //   'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      // },
    });

    const data = await response.json();

    if (Array.isArray(data)) {
      setProducts(data);
    }
  };

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              alt={product.name}
              height="180"
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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ViewProductComponent;
