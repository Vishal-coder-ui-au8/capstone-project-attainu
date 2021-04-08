import React, { Component } from "react";
import salert from "sweetalert2";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";

import "../styles/Authentication.css";

//const regurl = "http://localhost:8700/user/register";
const regurl = "https://edumanageapp.herokuapp.com/user/register";

class RegisterPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    isLoading: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
    const { password } = this.state;
    if (password.length < 6) {
      salert.fire("", "Passworld must be atleast 6 digits long!", "warning");
    } else {
      this.setState({ isLoading: true });
      console.log(JSON.stringify(this.state));
      fetch(regurl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((res) => res.json())
        .then((output) => {
          console.log(output.success);
          if (output.success) {
            salert.fire("", "User successfully Registered. Login", "success");
            this.props.history.push("/login");
          } else if (output.message === "User already exists") {
            salert.fire("", "User already exists. Login", "warning");
            this.props.history.push("/login");
          }
          this.setState({ isLoading: false });
        })
        .catch((err) => {
          //console.log(err);
          this.setState({
            name: "",
            email: "",
            password: "",
            isLoading: false,
          });
          alert.fire("", err.message, "err");
        });
    }
  };

  render() {
    return (
      <div className="App">
        <form className="form" Validate onSubmit={this.handleSubmit}>
          <Container
            component="main"
            maxWidth="xs"
            style={{ background: "#FCF8E8" }}
          >
            <Typography variant="h4" noWrap>
              <span className="specialColor">
                <b>E</b>
              </span>
              <b>du</b>
              <span className="specialColor">
                <b>M</b>
              </span>
              <b>anage</b>
            </Typography>
            <br />
            <br />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  type="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Enter Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  onChange={this.handleChange}
                  value={this.state.email}
                  type="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.password}
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              value="Register"
              className="submit"
            >
              {this.state.isLoading ? (
                <CircularProgress color="default" />
              ) : (
                <>Register</>
              )}
            </Button>
            <br />
            <br />
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Container>
        </form>
      </div>
    );
  }
}

export default RegisterPage;
