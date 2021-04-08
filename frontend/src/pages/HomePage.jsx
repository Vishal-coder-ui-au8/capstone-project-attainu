import React, { Component } from "react";
import ResponsiveDrawer from "./NavBar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {RemoveScrollBar} from 'react-remove-scroll-bar';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    fetch("https://edumanageapp.herokuapp.com/user/detail ", {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ user: data });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  render() {
    const { user } = this.props;

    const principal = "Principal Extn:8767";
    const viceprincipal = "Vice-Principal Extn:8768";
    const ad = "Academic Director Extn:8769";

    if (user) {
      if (this.state.user) {
        return (
          <div
            style={{
              background: "#FCF8E8",
              display: "flex",
              direction: "row",
              justifyContent: "center",
              minHeight: "120vh",
            }}
          >
            <ResponsiveDrawer history={this.props.history} />
            <RemoveScrollBar />
            <div
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Box style={{ height: "23vh" }}></Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    style={{
                      height: "55vh",
                      backgroundColor: "lightblue",
                      borderRadius: "0.5rem",
                      border: "2px solid brown",
                      marginTop: "-28px"
                    }}
                  >
                    <Box padding={3} fontSize={25}>
                      <center><h2>Welcome, {this.state.user.name}</h2></center>
                      <Grid container direction="row" justifyContent="center">
                        <Grid item xs={5}>
                          <Box
                            style={{
                              height: "40vh",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={this.state.user.profileimg}
                              alt="Profile Pic"
                              width="200"
                              height="200"
                              style={{ borderRadius: "50%", overflow: false }}
                            ></img>
                          </Box>
                        </Grid>

                        <Grid item xs={7}>
                          <Box
                            style={{
                              height: "40vh",
                            }}
                          >
                            <div>
                              <table>
                                <tbody>
                                  
                                  <div style={{ marginTop: "6.5rem" }}>
                                    <td style={{ paddingRight: "1rem"}}>
                                      Email
                                    </td>
                                    <p style={{ marginLeft: "170px", marginTop:"-36px" }}>: </p>
                                    <p style={{ paddingLeft: "200px", marginTop:"-32px" }}>
                                      {this.state.user.email}
                                    </p>
                                  </div>
                                  <div style={{ marginTop: "0.5rem" }}>
                                    <td style={{ paddingRight: "1rem" }}>
                                      Designation
                                    </td>
                                    <p style={{ marginLeft: "170px", marginTop:"-36px" }}>: </p>
                                    <p style={{ paddingLeft: "200px", marginTop:"-32px" }}>
                                      {this.state.user.designation}
                                    </p>
                                  </div>
                                </tbody>
                              </table>
                            </div>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12}>
                  <Box
                    style={{
                      height: "3vh",
                      marginTop: "30px",
                      padding: "2rem",
                    }}
                  >
                    <i>
                      <strong> Administrative Members </strong>
                    </i>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    style={{
                      height: "6vh",
                      marginLeft: "10rem",
                    }}
                  >
                    <i>
                      {principal}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {viceprincipal}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {ad}
                    </i>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </div>
        );
      } else {
        return (
          <div className="pageborder">
            <ResponsiveDrawer history={this.props.history} />
            <div className="container1">
              <h1> Home</h1>
            </div>
          </div>
        );
      }  
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default connect(mapStateToProps)(HomePage);
