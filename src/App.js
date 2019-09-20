import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import Calculator from './components/Calculator';

import whiteLogo from './assets/logo-white-100.png';

class App extends Component {

  render() {
    return (
      <div className="d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
        <header>
          <Navbar color="dark" dark>
            <NavbarBrand href="https://www.harvestprofit.com">
              <img className="img-fluid" alt="Harvest Profit" src={whiteLogo} height="30" width="30" />
            </NavbarBrand>
            <NavbarBrand href="/">
              AgTech<span className="d-none d-md-inline"> Sustainability Index</span>
            </NavbarBrand>
          </Navbar>
        </header>
        <Calculator />
        <footer>
          <Navbar color="light" light>
            <a href="https://www.harvestprofit.com">
              Made with <i className="fas fa-heart" /><span className="d-none d-sm-inline"> by Harvest Profit</span>
            </a>
            <NavbarBrand href="https://github.com/HarvestProfit/agtech-sustainability-index">
              Source Code
            </NavbarBrand>
          </Navbar>
        </footer>
      </div>
    );
  }

}

export default App;
