import React, { Component } from "react";
import salert from "sweetalert2";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";

import { connect } from "react-redux";
import { setUser } from "../redux/actions/userActions";

import "../styles/Authentication.css";

//const logurl = "http://localhost:8700/user/login";
const logurl = "https://edumanageapp.herokuapp.com/user/login";

class LoginPage extends Component {
  state = {
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
    this.setState({ isLoading: true });
    fetch(logurl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("ltk", data.token);
        sessionStorage.setItem("user", data.user);
        this.props.setUser(data.user);
        if (data.auth) {
          this.setState({ isLoading: false });
          this.props.history.push("/home");
        }
        //alert("Not a valid user")
        else {
          salert.fire(" ", "Invalid Login. Please try again", "warning");
          this.setState({ isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        //alert("User unable to log in. Please try later")
        this.setState({
          email: "",
          password: "",
          isLoading: false,
        });
        salert.fire(
          " ",
          "Our servers may be down. Please try after some time",
          "warning"
        );
      });
  };

  render() {
    return (
      <div className="App">
        <form className="form" onSubmit={this.handleSubmit}>
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
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
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
              className="submit"
            >
              {this.state.isLoading ? (
                <CircularProgress color="default" />
              ) : (
                <>Login</>
              )}
            </Button>
            <br />
            <br />

            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Container>
        </form>
      </div>
    );
  }
}

export default connect(null, { setUser })(LoginPage);
