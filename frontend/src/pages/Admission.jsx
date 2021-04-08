import React, { Component } from "react";
import ResponsiveDrawer from "./NavBar";
import Formitem from "../components/FormItem";
import salert from "sweetalert2";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { CircularProgress } from "@material-ui/core";

import Button from "@material-ui/core/Button";

const uploadUrl = "https://edumanageapp.herokuapp.com/admission/upload";
const getUrl = "https://edumanageapp.herokuapp.com/admission/list";
const deleteUrl = "https://edumanageapp.herokuapp.com/admission/delete";

class Admission extends Component {
  constructor() {
    super();
    this.state = {
      forms: [],
      isLoading: false,
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  uploadInput = {};

  async componentDidMount() {
    try {
      const response = await fetch(getUrl);
      const forms = await response.json();
      await this.setState({ forms: forms.forms });
    } catch (err) {
      console.error(err.message);
    }
  } // componentdidmount

  //handle admission form upload
  handleUpload(event) {
    event.preventDefault();
    console.log("Reached handleUpload");
    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    console.log("data", data);
    this.setState({ isLoading: true });
    fetch(uploadUrl, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        console.log("reached then");

        response
          .json()
          .then((output) => {
            console.log("success", output.success);
            if (output.success) {
              salert.fire("", "Form uploaded", "success");
              let form = output.data;
              console.log(form);
              this.setState({ forms: [...this.state.forms, form] });
              this.setState({ isLoading: false });
            } else {
              salert.fire("", "Form could not be uploaded", "error");
              this.setState({ isLoading: false });
            }
          })
          .catch((e) => {
            this.setState({ isLoading: false });
            console.log("Error while resolving response of upload pdf", e);
          });
      })
      .catch((e) => {
        this.setState({ isLoading: false });
        console.log("Error while uploading", e);
        //throw e;
      });
  } //handleUpload

  //handle deletion of admission form
  handleDelete(name) {
    console.log("Reached handleDelete", name);

    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => {
        console.log("reached then");

        response
          .json()
          .then((output) => {
            console.log("success", output.success);
            if (output.success) {
              salert.fire("", "Form deleted", "success");
              this.setState((previousState) => {
                return {
                  forms: previousState.forms.filter((f) => f.name !== name),
                };
              });
            } else salert.fire("", "Form could not be deleted", "error");
          })
          .catch((e) => {
            console.log("Error while resolving response of delete form", e);
          });
      })
      .catch((e) => {
        console.log("reached catch");
        console.log("Error while deleting", e);
      });
  } //handleFormDelete

  render() {
    const { user } = this.props;
    const { forms } = this.state;

    if (user) {
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

          <div style={{ width: "70%" }}>
            <Grid container direction="row" justify="center">
              <Grid item xs={3}>
                <Box marginTop={10}>
                  <h2>
                    <i> Admission </i>
                  </h2>
                </Box>
              </Grid>
            </Grid>

            <div
              style={{
                width: "100%",
                borderRadius: "0.25rem",
              }}
            >
              {forms ? (
                <div>
                  <Grid container>
                    <Grid
                      item
                      xs={7}
                      style={{
                        height: "80vh",
                        border: "2px solid brown",
                      }}
                    >
                      <Box marginTop={10}>
                        <h2 style={{marginLeft: "250px"}}>
                          <i> View Forms </i>
                        </h2>
                      </Box>

                      <Box padding={2} marginTop={2}>
                        <table style={{marginLeft: "100px"}}>
                          <tbody>
                            {this.state.forms.map((form) => (
                              <Formitem
                                key={form._id}
                                currentForm={form}
                                handleDelete={this.handleDelete}
                              />
                            ))}
                          </tbody>
                        </table>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      style={{
                        height: "80vh",
                        border: "2px solid brown",
                      }}
                    >
                      <Box marginTop={10}>
                        <h2 style={{marginLeft: "170px"}}>
                          <i> Upload </i>
                        </h2>
                      </Box>
                      <Box marginTop={4} padding={2}>
                        <form>
                          <div style={{marginLeft:"120px", marginTop:"50px"}}>
                            <input
                              ref={(ref) => {
                                this.uploadInput = ref;
                              }}
                              type="file"
                              id="insertfile"
                            ></input>
                          </div>
                          <br />
                          <div>
                            <Button
                              style={{marginLeft:"150px", marginTop:"10px"}}
                              variant="contained"
                              size="small"
                              color="primary"
                              onClick={this.handleUpload}
                              startIcon={<CloudUploadIcon />}
                            >
                              {this.state.isLoading ? (
                                <CircularProgress color="default" />
                              ) : (
                                <>Upload</>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <div className="container1">
                  <h1> Loading Admisson Forms </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      ); //return
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

export default connect(mapStateToProps)(Admission);
