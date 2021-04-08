import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {
  Home,
  School,
  CreditCard,
  Group,
  AccessTime,
} from "@material-ui/icons";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import "../styles/NavBar.scss";
const drawerWidth = 228;

const styles = (theme) => ({
  root: {
    // display: 'flex'
  },
  // drawer
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // upper bar
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#353C48",
    color: "White",
  },
  // toggle button
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "white",
  },
  home: {
    marginLeft: theme.spacing(123),
    color: "white",
  },
  logout: {
    color: "white",
    marginLeft: "1034px",
    border: "1px solid white",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  // edit drawer styles
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#353C48",
  },

  content: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
});

class ResponsiveDrawer extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
  };
  handleLogout = (e) => {
    sessionStorage.removeItem("ltk");
    sessionStorage.removeItem("user");
    this.props.history.push("/login");
  };
  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[
            "Home",
            "TimeTable",
            "Admission",
            "Fees",
            "HR",
          ].map((text, index) => (
            <NavLink
              to={`/${text.toLocaleLowerCase()}`}
              activeClassName="navActive"
              className="navItemLink"
              key={index}
            >
              <ListItem button key={text}>
                <ListItemIcon>
                  {text === "Home" ? (
                    <Home />
                  ) : text === "TimeTable" ? (
                    <AccessTime />
                  ) : text === "Admission" ? (
                    <School />
                  ) : text === "Fees" ? (
                    <CreditCard />
                  ) : text === "HR" ? (
                    <Group />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    );
    //detect whether code is running in a typical browser environmen(DOM) window object does not exist in node.js
    //const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap>
              <span className="specialColor">E</span>du
              <span className="specialColor">M</span>anage
            </Typography>

            <Button onClick={this.handleLogout} className={classes.logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);

// const NavBar = () => {
//   return (
//     <div className = "NavBar">

//       <Link to="/home">Home</Link>
//       <Link to="/login">Login</Link>
//       <Link to="/register">Register</Link>
//       <Link to="/communication">Communication</Link>
//       <Link to="/admission">Admission</Link>
//       <Link to="/fees">Fees</Link>
//       <Link to="/hr">Human Resources</Link>
//       <Link to="/timetable">Timetable</Link>

//     </div>
//   );
// };

// export default NavBar;
