import React, { Component } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

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

//const getStudentsUrl = "http://localhost:8700/class/list";
//const getDetailUrl = "http://localhost:8700/fees/getdetail";

const getStudentsUrl = "https://edumanageapp.herokuapp.com/class/list";
const getDetailUrl = "https://edumanageapp.herokuapp.com/fees/getdetail";

class FeeStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      std: "",
      name: "",
      students: [],
      studentstat: null,
    };
  }

  handleStd = async (e) => {
    this.setState({ std: e.target.value });
    console.log(e.target.value);
    let url = `${getStudentsUrl}?std=${e.target.value}`;
    console.log(url);

    try {
      const { data } = await axios(url);
      console.log(data);
      await this.setState({ students: data });
      console.log(this.state.students);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  handleName = async (e) => {
    this.setState({ name: e.target.value });
    console.log(`${this.state.std}`);
    console.log(e.target.value);
    let url = `${getDetailUrl}?std=${this.state.std}&name=${e.target.value}`;
    console.log(url);

    try {
      const { data } = await axios(url);
      console.log(data);
      await this.setState({ studentstat: data });
      console.log(this.state.studentstat);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  render() {
    let studentItems = this.state.students.map((student) => (
      <option key={student._id}>{student.name}</option>
    ));

    return (
      <div style={{marginBottom: "12rem"}}>
        <div
          style={{
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Grid container>
            <Grid item xs={3}>
              <Box marginTop={2}>
                <h2 style={{marginLeft:"28px"}}>Fees Status </h2>
              </Box>
            </Grid>
          </Grid>

          <form>
            <Grid container>
              <Grid item xs={6} padding={2} direction="column">

                <Box style={{marginLeft:"28px"}}>
                  <FormControl>
                    <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
                    <NativeSelect
                      onChange={this.handleStd}
                      value={this.state.std}
                      input={<BootstrapInput />}
                    >
                      <option aria-label="None" value="0">
                        Select Class
                      </option>
                      <option value="first">First</option>
                      <option value="second">Second</option>
                      <option value="third">Third</option>
                      <option value="fourth">Fourth</option>
                      <option value="fifth">Fifth</option>
                    </NativeSelect>
                  </FormControl>

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
                        Select Student
                      </option>
                      {studentItems}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={5}>
                {this.state.studentstat ? (
                  <div
                    style={{
                      marginTop: "3rem",
                      border: "2px solid brown",
                      padding: "1rem",
                      borderRadius: "8px",
                      backgroundColor: "lightblue",
                      marginBottom: "-10rem"
                    }}
                  >
                    <table class="table">
                      <tbody>
                        <tr>
                          <td style={{ paddingRight: "1rem" }}>Name</td>
                          <td style={{ paddingRight: "1rem" }}>: </td>
                          <td style={{ paddingRight: "1rem" }}>
                            {this.state.studentstat.name}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "1rem" }}>Class</td>
                          <td style={{ paddingRight: "1rem" }}>: </td>
                          <td style={{ paddingRight: "1rem" }}>
                            {this.state.studentstat.std}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "1rem" }}>Fees Amount</td>
                          <td style={{ paddingRight: "1rem" }}>: </td>
                          <td style={{ paddingRight: "1rem" }}>
                            ₹{this.state.studentstat.feesamt}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "1rem" }}>Fees Paid</td>
                          <td style={{ paddingRight: "1rem" }}>: </td>
                          <td style={{ paddingRight: "1rem" }}>
                            {this.state.studentstat.feespaid ? "Yes" : "No"}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "1rem" }}>Payment Mode</td>
                          <td style={{ paddingRight: "1rem" }}>: </td>
                          <td style={{ paddingRight: "1rem" }}>
                            {this.state.studentstat.paymentmode}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: "1rem" }}>Payment Date</td>
                          <td style={{ paddingRight: "1rem" }}>: </td>
                          <td style={{ paddingRight: "1rem" }}>
                            {this.state.studentstat.paymentdate}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <> </>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}
export default FeeStatus;
