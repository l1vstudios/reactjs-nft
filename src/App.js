import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navbar from './components/Navbar';
import Home from './components/Home';
import CardComponent from './components/CardComponent';
import Card3 from './components/Card3';
import Card2 from './components/Card2';
import Footer from './components/Footer';
import Login from './components/Login';
import Regis from './components/Regis';
import '@mdi/font/css/materialdesignicons.min.css';
import User_Cart from './components/User_Cart';
function App() {
  return (
    <Router>
      <div>
        
        <Switch>
       
          <Route path="/login" component={Login} />
          <Route path="/regis" component={Regis} />
          <Route path="/products" component={Card3} />
          <Route path="/cart" component={User_Cart} />
        </Switch>
       
      </div>
    </Router>
  );
}

export default App;
