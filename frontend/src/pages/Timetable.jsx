import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

import NativeSelect from "@material-ui/core/NativeSelect";

import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import "../styles/Timetable.scss";
import "../styles/Ttableitem.scss";

import ResponsiveDrawer from "./NavBar";
import Ttableitem from "../components/Ttableitem";

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

//const ttableUrl1 = "http://localhost:8700/ttable/list?std=first";
//const ttableUrl2 = "http://localhost:8700/ttable/list";

const ttableUrl1 = "https://edumanageapp.herokuapp.com/ttable/list?std=first";
const ttableUrl2 = "https://edumanageapp.herokuapp.com/ttable/list";

class Timetable extends Component {
  constructor() {
    super();
    this.state = {
      ttables: null,
      ttablesMon: null,
      ttablesTue: null,
      ttablesWed: null,
      ttablesThurs: null,
      ttablesFri: null,
      std: "",
    };
  }

  //Holy grail for async fetch
  async componentDidMount() {
    try {
      const response = await fetch(ttableUrl1);
      const ttables = await response.json();
      console.log(this.state.ttables);
      await this.setState({ ttables: ttables });

      if (this.state.ttables) {
        console.log(this.state.ttables);
        this.setState({
          ttablesMon: this.state.ttables.filter((ttable) => {
            return ttable.day === "Mon";
          }),
        });

        console.log("Mon", this.state.ttablesMon);

        this.setState({
          ttablesTue: this.state.ttables.filter((ttable) => {
            return ttable.day === "Tue";
          }),
        });

        console.log("Tue", this.state.ttablesTue);

        this.setState({
          ttablesWed: this.state.ttables.filter((ttable) => {
            return ttable.day === "Wed";
          }),
        });

        console.log("Wed", this.state.ttablesWed);

        this.setState({
          ttablesThurs: this.state.ttables.filter((ttable) => {
            return ttable.day === "Thurs";
          }),
        });

        console.log("Thurs", this.state.ttablesThurs);

        this.setState({
          ttablesFri: this.state.ttables.filter((ttable) => {
            return ttable.day === "Fri";
          }),
        });

        console.log("Fri", this.state.ttablesFri);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  handleStd = async (e) => {
    this.setState({ std: e.target.value });
    console.log(e.target.value);
    let url = `${ttableUrl2}?std=${e.target.value}`;
    console.log(url);

    try {
      const { data } = await axios(url);
      console.log(data);
      this.setState({ ttables: data });

      if (this.state.ttables) {
        console.log(this.state.ttables);
        this.setState({
          ttablesMon: this.state.ttables.filter((ttable) => {
            return ttable.day === "Mon";
          }),
        });

        console.log("Mon", this.state.ttablesMon);

        this.setState({
          ttablesTue: this.state.ttables.filter((ttable) => {
            return ttable.day === "Tue";
          }),
        });

        console.log("Tue", this.state.ttablesTue);

        this.setState({
          ttablesWed: this.state.ttables.filter((ttable) => {
            return ttable.day === "Wed";
          }),
        });

        console.log("Wed", this.state.ttablesWed);

        this.setState({
          ttablesThurs: this.state.ttables.filter((ttable) => {
            return ttable.day === "Thurs";
          }),
        });

        console.log("Thurs", this.state.ttablesThurs);

        this.setState({
          ttablesFri: this.state.ttables.filter((ttable) => {
            return ttable.day === "Fri";
          }),
        });

        console.log("Fri", this.state.ttablesFri);
      }

      //console.log(this.state.students)
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  render() {
    const { user } = this.props;

    if (user) {
      if (
        this.state.ttablesMon &&
        this.state.ttablesTue &&
        this.state.ttablesWed &&
        this.state.ttablesThurs &&
        this.state.ttablesFri
      ) {
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

            <div className="outercontainer" style={{ width: "80%" }}>
              <div className="header">
                <h3 style={{marginTop: "40px", marginRight: "10px"}}>
                  <strong> Timetable for class</strong>{" "}
                </h3>
                <h3 style={{marginTop: "40px", marginRight: "20px"}}> : </h3>
                <div className="dropdown">
                  <NativeSelect
                    style={{marginTop: "40px", marginRight: "100px"}}
                    onChange={this.handleStd}
                    name="stdlist"
                    input={<BootstrapInput />}
                  >
                    <option aria-label="None" value="0">
                      Select Class
                    </option>
                    <option value="first">One</option>
                    <option value="second">Two</option>
                    <option value="third">Three</option>
                    <option value="fourth">Four</option>
                    <option value="fifth">Five</option>
                  </NativeSelect>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  border: "2px solid brown",
                  borderRadius: "0.25rem",
                  marginBottom: "1rem",
                  marginTop: "40px"
                }}
              >
                <div className="container1">
                  <div className="container3">
                    <div className="weekdays">
                      <div className="day">MON</div>
                      <div className="day">TUE</div>
                      <div className="day">WED</div>
                      <div className="day">THURS</div>
                      <div className="day">FRI</div>
                    </div>
                    <div className="container4">
                      <div className="day">
                        <div className="timetable">
                          {this.state.ttablesMon.map((ttable) => (
                            <Ttableitem
                              key={ttable._id}
                              currentTable={ttable}
                            />
                          ))}
                        </div>

                        <div className="timetable">
                          {this.state.ttablesTue.map((ttable) => (
                            <Ttableitem
                              onclick={(e) => console.log("clicked")}
                              key={ttable._id}
                              currentTable={ttable}
                            />
                          ))}
                        </div>

                        <div className="timetable">
                          {this.state.ttablesWed.map((ttable) => (
                            <Ttableitem
                              key={ttable._id}
                              currentTable={ttable}
                            />
                          ))}
                        </div>

                        <div className="timetable">
                          {this.state.ttablesThurs.map((ttable) => (
                            <Ttableitem
                              key={ttable._id}
                              currentTable={ttable}
                            />
                          ))}
                        </div>

                        <div className="timetable">
                          {this.state.ttablesFri.map((ttable) => (
                            <Ttableitem
                              key={ttable._id}
                              currentTable={ttable}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
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

            <div className="outerload" style={{ width: "80%" }}>
              <CircularProgress style={{ padding: "0.5rem" }} />
              <CircularProgress style={{ padding: "0.5rem" }} />
              <CircularProgress style={{ padding: "0.5rem" }} />
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

export default connect(mapStateToProps)(Timetable);
