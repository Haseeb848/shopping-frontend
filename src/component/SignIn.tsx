import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:3000/auth/signin", {
      email: email,
      password: password,
    });

    const data = response.data;

    if (data.access_token) {
      sessionStorage.setItem("token", data.access_token);
      alert("Sign in successful!");
      navigate("/dashboard");
    } else {
      alert("Sign in failed. Please check your credentials.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid sx={{ display: "flex" }}>
        <Grid item>
          <Paper style={{ padding: "1rem", marginTop: "1rem" }}>
            <Typography variant="h4" align="center">
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
