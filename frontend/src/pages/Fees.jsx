import React, { Component } from "react";
import ResponsiveDrawer from "./NavBar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import salert from "sweetalert2";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import FeeStatus from "../components/FeeStatus";

const defaultersUrl = "https://edumanageapp.herokuapp.com/fees/defaulters";
const editDefaultersUrl = `https://edumanageapp.herokuapp.com/fees/editdefaulter/`;

class Fees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feesamt: 0,
      feespaid: false,
      paymentmode: "",
      paymentdate: null,
      firstreminder: false,
      secondreminder: false,
      feesamtchgd: false,
      feespaidchgd: false,
      paymentmodechgd: false,
      paymentdatechgd: false,
      firstreminderchgd: false,
      secondreminderchgd: false,
      defaulters: [],
    };

    this.handleChangeFeesamt = this.handleChangeFeesamt.bind(this);
    this.handleChangeFeespaid = this.handleChangeFeespaid.bind(this);
    this.handleChangePaymentmode = this.handleChangePaymentmode.bind(this);
    this.handleChangePaymentmode = this.handleChangePaymentmode.bind(this);
    this.handleChangeFirstReminder = this.handleChangeFirstReminder.bind(this);
    this.handleChangeSecondReminder = this.handleChangeSecondReminder.bind(
      this
    );
    this.handleEdit = this.handleEdit.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch(defaultersUrl);
      const defaulters = await response.json();
      await this.setState({ defaulters: defaulters });
      console.log("DidMount", defaulters);
    } catch (err) {
      console.error(err.message);
    }
  } // componentdidmount

  handleChangeFeesamt = (e) => {
    this.setState({ feesamt: e.target.value });
    this.setState({ feesamtchgd: true });
  };

  handleChangePaymentmode = (e) => {
    this.setState({ paymentmode: e.target.value });
    this.setState({ paymentmodechgd: true });
  };

  handleChangePaymentdate = (e) => {
    this.setState({ paymentdate: e.target.value });
    this.setState({ paymentdatechgd: true });
  };

  handleChangeFeespaid = (e) => {
    if (e.target.value === "Yes") this.setState({ feespaid: true });
    else this.setState({ feespaid: false });

    this.setState({ feespaidchgd: true });
  };

  handleChangeFirstReminder = (e) => {
    if (e.target.value === "Yes") this.setState({ firstreminder: true });
    else this.setState({ firstreminder: false });

    this.setState({ firstreminderchgd: true });
  };

  handleChangeSecondReminder = (e) => {
    if (e.target.value === "Yes") this.setState({ secondreminder: true });
    else this.setState({ secondreminder: false });
    this.setState({ secondreminderchgd: true });
  };

  handleEdit = (e, id, index) => {
    e.preventDefault();
    console.log(e, id, index);
    console.log(this.state.defaulters);

    e.preventDefault();

    let query = {};
    if (this.state.feesamtchgd) query.feesamt = this.state.feesamt;
    if (this.state.feespaidchgd) query.feespaid = this.state.feespaid;
    if (this.state.paymentmodechgd) query.paymentmode = this.state.paymentmode;
    if (this.state.paymentdatechgd) query.paymentdate = this.state.paymentdate;
    if (this.state.firstreminderchgd)
      query.firstreminder = this.state.firstreminder;
    if (this.state.secondreminderchgd)
      query.secondreminder = this.state.secondreminder;

    console.log("query", query);
    console.log(this.state.firstreminderchgd);

    axios
      .put(editDefaultersUrl + id, query)

      .then((res) => {
        console.log("success", res.data);
        if (res.data.success && this.state.feespaid) {
          console.log(
            "entered success and feespaid entered ",
            this.state.defaulters
          );
          this.setState({ feesamt: 0 });
          this.setState({ feespaid: false });
          this.setState({ paymentmode: "" });
          this.setState({ paymentDate: null });
          this.setState((previousState) => {
            return {
              defaulters: previousState.defaulters.filter((d) => d._id !== id),
            };
          });
          console.log(
            "entered success and feespaid leaving ",
            this.state.defaulters
          );
          console.log("entered success and feespaid leaving ", this.state);
          salert.fire("", "Data uploaded", "success");
        } else if (res.data.success) {
          console.log("entered success only", this.state.defaulters);
          salert.fire("", "Data uploaded", "success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSend = (e) => {
    console.log("Reached Send");
    this.props.history.push("/communication");
  };

  render() {
    const { user } = this.props;

    if (user) {
      if (this.state.defaulters) {
        //console.log("1", this.state.defaulters);
        var defaulters = this.state.defaulters.map((defaulter, index) => (
          <tr>
            <div >
              <input
                style={{ textAlign:"center", fontSize:"16px", width: "5.8rem", height: "2rem" }}
                type="text"
                disabled="true"
                placeholder={defaulter.std}
              />
              <input
                style={{
                  textAlign:"center",
                  fontSize:"16px",
                  width: "10.8rem",
                  height: "2rem",
                }}
                type="text"
                disabled="true"
                placeholder={defaulter.name}
              />
              <input
                style={{
                  textAlign:"center",
                  fontSize:"16px",
                  width: "7.8rem",
                  height: "2rem",
                }}
                type="text"
                name="feesamt"
                placeholder={defaulter.feesamt}
                onChange={this.handleChangeFeesamt}
              />
              <input
                style={{
                  textAlign:"center",
                  fontSize:"16px",
                  width: "6rem",
                  height: "2rem",
                }}
                type="text"
                name="feespaid"
                placeholder={defaulter.feespaid ? "Yes" : "No"}
                onChange={this.handleChangeFeespaid}
              />
              <input
                style={{
                  textAlign:"center",
                  fontSize:"16px",
                  width: "9rem",
                  height: "2rem",
                }}
                type="text"
                name="paymentmode"
                placeholder={defaulter.paymentmode}
                onChange={this.handleChangePaymentmode}
              />
              <input
                style={{
                  textAlign:"center",
                  fontSize:"16px",
                  width: "9rem",
                  height: "2rem",
                }}
                type="date"
                name="paymentdate"
                placeholder={Date(defaulter.paymentdate)}
                onChange={this.handleChangePaymentdate}
              />

              <button
                onClick={(e) => this.handleEdit(e, defaulter._id, index)}
                style={{
                  width: "3rem",
                  height: "2rem",
                }}
              >
                Save
              </button>
            </div>
          </tr>
        ));
        //console.log("2", defaulters);
      }

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

          <div style={{ width: "75%" }}>
            <Grid container direction="row" justify="center">
              <Grid item xs={2}>
                <Box marginTop={10}>
                  <h2>
                    <i style={{fontSize: "26px"}}> Fees </i>
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
              }}
            >
              <div style={{ padding: "1rem" }}>
                <Grid container>
                  <Grid item xs={3} padding={1}>
                    <Box marginTop={2}>
                      <h2 style={{marginLeft: "28px"}}>List of Defaulters</h2><br />
                    </Box>
                  </Grid>
                </Grid>
                {this.state.defaulters ? (
                  <div style={{ padding: "0.5rem", marginLeft:"20px" }}>
                    <input
                      type="text"
                      disabled="true"
                      placeholder="Class"
                      style={{
                        textAlign:"center",
                        fontSize: "17px",
                        width: "5.8rem",
                        height: "2.5rem",
                        backgroundColor: "lightblue",
                      }}
                    />
                    <input
                      type="text"
                      disabled="true"
                      placeholder="Name"
                      style={{
                        textAlign:"center",
                        fontSize: "17px",
                        width: "10.8rem",
                        height: "2.5rem",
                        backgroundColor: "lightblue",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Amount"
                      style={{
                        textAlign:"center",
                        fontSize: "17px",
                        width: "7.8rem",
                        height: "2.5rem",
                        backgroundColor: "lightblue",
                      }}
                      disabled="true"
                    />
                    <input
                      type="text"
                      placeholder="Fees Paid"
                      style={{
                        textAlign:"center",
                        fontSize: "17px",
                        width: "6rem",
                        height: "2.5rem",
                        backgroundColor: "lightblue",
                      }}
                      disabled="true"
                    />
                    <input
                      type="text"
                      placeholder="Payment Mode"
                      style={{
                        textAlign:"center",
                        fontSize: "17px",
                        width: "9rem",
                        height: "2.5rem",
                        backgroundColor: "lightblue",
                      }}
                      disabled="true"
                    />
                    <input
                      type="text"
                      placeholder="Payment Date"
                      style={{
                        textAlign:"center",
                        fontSize: "17px",
                        width: "9rem",
                        height: "2.5rem",
                        backgroundColor: "lightblue",
                      }}
                      disabled="true"
                    />

                    {defaulters ? defaulters : "Loading defaulters "}
                  </div>
                ) : (
                  <> No Defaulters </>
                )}
              </div>
              <br></br>
              <br></br> <br></br>
              <FeeStatus />
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

export default connect(mapStateToProps)(Fees);
