import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {RemoveScrollBar} from 'react-remove-scroll-bar';
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

import ResponsiveDrawer from "./NavBar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
    },
  },
}))(InputBase);

//const staffUrl = "http://localhost:8700/staff/paydetail";

const staffUrl = "https://edumanageapp.herokuapp.com/staff/paydetail";

class HumanResources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      name: "",
      staffs: [],
      staff: null,
    };
  }

  handleCategory = async (e) => {
    this.setState({ category: e.target.value });
    console.log(e.target.value);
    let url = `${staffUrl}?category=${e.target.value}`;
    console.log(url);

    try {
      const { data } = await axios(url);
      console.log(data);
      await this.setState({ staffs: data });
      console.log(this.state.staffs);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  handleName = async (e) => {
    this.setState({ staff: e.target.value });
    console.log(e.target.value);
    let url = `${staffUrl}?category=${this.state.category}&name=${e.target.value}`;
    console.log(url);

    try {
      const { data } = await axios(url);
      console.log(data);
      await this.setState({ staff: data[0] });
      console.log("Staff", `${this.state.staff}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  render() {
    const { user } = this.props;

    if (user) {
      let staffs = this.state.staffs;
      let staffItems = staffs.map((staff) => (
        <option key={staff._id}>{staff.name}</option>
      ));

      return (
        <div
          style={{
            background: "#FCF8E8",
            display: "flex",
            direction: "row",
            justifyContent: "center",
            minHeight: "120vh",
            width: "100%"
          }}
        >
          <ResponsiveDrawer history={this.props.history} />
          <RemoveScrollBar />
          <div style={{ width: "70%" }}>
            <Grid container direction="row" justify="center">
              <Grid item xs={3}>
                <Box marginTop={10}>
                  <h2>
                    {" "}
                    <i> Human Resources </i>{" "}
                  </h2>
                </Box>
              </Grid>
            </Grid>

            <div
              style={{
                width: "100%",
                border: "2px solid brown",
                borderRadius: "0.25rem",
                marginBottom: "1rem",
                minHeight: "80vh",
              }}
            >
              <form className="hrform">
                <Grid container direction="row" justify="center">
                  <Grid item xs={9}>
                    <Box marginTop={10}>
                      <h2>
                        {" "}
                        <i> Select Staff to view payroll details </i>{" "}
                      </h2>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2} direction="row" justify="center">
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel htmlFor="demo-customized-select-native">
                        {" "}
                      </InputLabel>
                      <NativeSelect
                        onChange={this.handleCategory}
                        input={<BootstrapInput />}
                      >
                        <option aria-label="None" value="0">
                          Select Category
                        </option>
                        <option value="Teaching">Teaching</option>
                        <option value="NonTeaching">NonTeaching</option>
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel htmlFor="demo-customized-select-native">
                        {" "}
                      </InputLabel>
                      <NativeSelect
                        style={{ marginLeft: "20px" }}
                        value={this.state.name}
                        onChange={this.handleName}
                        input={<BootstrapInput />}
                      >
                        <option aria-label="None" value="">
                          Select Staff
                        </option>
                        {staffItems}
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                </Grid>

                {this.state.staff ? (
                  <Grid container direction="row" justify="center" border={1}>
                    <Grid container direction="row" justify="center">
                      <Grid item xs={9}>
                        <Box marginTop={4}>
                          <p style={{ fontSize: "1.2rem" }}>
                            {" "}
                            <i> Staff Details: </i>{" "}
                          </p>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={9}>
                      <Box
                        margin={2}
                        padding={2}
                        style={{
                          border: "2px solid brown",
                          borderRadius: "8px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          backgroundColor: "lightblue",
                        }}
                      >
                        <div style={{ marginTop: "0.5rem", fontSize: "24px" }}>
                          <table class="table">
                            <tbody>
                              <tr>
                                <td style={{ paddingRight: "5rem" }}>
                                  Employee Id
                                </td>
                                <td style={{ paddingRight: "3.5rem" }}>: </td>
                                <td style={{ paddingRight: "1rem" }}>
                                  {this.state.staff.empid}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingRight: "1rem" }}>Name</td>
                                <td style={{ paddingRight: "1rem" }}>: </td>
                                <td style={{ paddingRight: "1rem" }}>
                                  {this.state.staff.name}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingRight: "1rem" }}>
                                  Department
                                </td>
                                <td style={{ paddingRight: "1rem" }}>: </td>
                                <td style={{ paddingRight: "1rem" }}>
                                  {this.state.staff.category}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingRight: "1rem" }}>
                                  Basic Salary
                                </td>
                                <td style={{ paddingRight: "1rem" }}>: </td>
                                <td style={{ paddingRight: "1rem" }}>
                                  ₹{this.state.staff.basicsalary}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingRight: "1rem" }}>Bonus</td>
                                <td style={{ paddingRight: "1rem" }}>: </td>
                                <td style={{ paddingRight: "1rem" }}>
                                  ₹{this.state.staff.bonus}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingRight: "1rem" }}>
                                  Deductions
                                </td>
                                <td style={{ paddingRight: "1rem" }}>: </td>
                                <td style={{ paddingRight: "1rem" }}>
                                  ₹{this.state.staff.deductions}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                ) : (
                  <> </>
                )}
              </form>
            </div>
          </div>
        </div>
      );
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

export default connect(mapStateToProps)(HumanResources);
