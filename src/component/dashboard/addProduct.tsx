import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface AddProductProps {}

const AddProductComponent: React.FC<AddProductProps> = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    const response = await fetch('http://localhost:3000/product', {
      method: 'POST',
      body: formData,
      headers: {


        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,

      },
    });

    const data = await response.json();

    if (data.success) {
      alert('Product added successfully!');
    } else {
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Price"
         type="number"
        fullWidth
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </form>
  );
};

export default AddProductComponent;
