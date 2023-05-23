import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Grid, Button, Typography, Box } from "@mui/material";
import { SignUpFormData } from "./types";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      alert(`Submitted, ${data?.statusCode}`);

      //  on sign in save token in session Storage
      // then in evry call where token is needed, extract tiken from session strorage and pass it into the headers
    } catch (e) {
      alert("An Error Occured");
    }

    // handle response here
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Typography variant="h4">Sign Up</Typography>
        <Grid item>
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
