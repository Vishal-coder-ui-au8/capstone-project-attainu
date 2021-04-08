import React from "react";
import {Switch, Route} from "react-router-dom"

import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Admission from './pages/Admission'
import Fees from './pages/Fees'
import HumanResources from './pages/HumanResources'
import Timetable from './pages/Timetable'
import ResponsiveDrawer from "./pages/NavBar";



class App extends React.Component { 
  
  
  render() {  
        
    return (
      <div>
        
          
          <Switch>
            <Route exact path= "/" component={RegisterPage} />
            <Route exact path= "/navbar" component={ResponsiveDrawer} />
            <Route exact path= "/login" component={LoginPage} />       
            <Route exact path= "/home" component={HomePage} />
            <Route exact path= "/admission" component={Admission} />
            <Route exact path= "/fees" component={Fees} />
            <Route exact path= "/hr" component={HumanResources} />
            <Route exact path= "/timetable" component={Timetable} />

          </Switch>
          
      </div>
    );
  }

}

export default App;
