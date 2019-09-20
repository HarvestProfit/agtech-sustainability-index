import _ from 'lodash';
import React, { Component } from 'react';
import { Container } from 'reactstrap';

import NumericInput from './NumericInput';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grossProfit: '100000',
      productEmployees: '5',
      totalEmpoyees: '10',
      capitalRaised: '100000',
      monthsOfRunway: '12',
    };
  }

  setCapitalRaised = (event) => this.setState({ capitalRaised: event.target.value })

  setGrossProfit = (event) => this.setState({ grossProfit: event.target.value })

  setMonthsOfRunway = (event) => this.setState({ monthsOfRunway: event.target.value })

  setProductEmployees = (event) => this.setState({ productEmployees: event.target.value })

  setTotalEmployees = (event) => this.setState({ totalEmpoyees: event.target.value })

  render() {
    const {
      grossProfit,
      productEmployees,
      totalEmpoyees,
      capitalRaised,
      monthsOfRunway,
    } = this.state;

    let index = 0;
    let problem = false;

    // (Grossprofit/employee + ((employees working on product/total employees) x 100,000) + (gross profit/capital raised x 100,000) + (if months of runway < 12 ? -1,000,000,000 : 0)) / 3
    try {
      const profitPerEmployee = _.toNumber(grossProfit) / _.toNumber(totalEmpoyees);
      const workingEmployeeRatio = _.toNumber(productEmployees) / _.toNumber(totalEmpoyees);
      const employeeValue = profitPerEmployee + (workingEmployeeRatio * 100000);

      const profitToCapital = (_.toNumber(grossProfit) / _.toNumber(capitalRaised)) * 100000;
      const runningOutOfMoney = _.toNumber(monthsOfRunway) < 12 ? -1000000000 : 0;

      const indexValue = (employeeValue + profitToCapital + runningOutOfMoney)
      index = indexValue.toFixed(0);
      if (!_.isFinite(indexValue)) {
        problem = true;
      }
    } catch {
      problem = true;
    }


    return (
      <Container className="my-5">
        <div className="text-center">
          <div className="mb-5">
            <h1 className="lead">AgTech Sustainability Index</h1>
            {problem ? (
              <h1>N/A</h1>
            ) : (
              <h1>{numberWithCommas(index)}</h1>
            )}
          </div>
        </div>
        <NumericInput id="gross_profit" name="Gross Profit" value={grossProfit} onChange={this.setGrossProfit} />
        <NumericInput id="product_employees" name="Product Employees" value={productEmployees} onChange={this.setProductEmployees} />
        <NumericInput id="total_empoyees" name="Total Employees" value={totalEmpoyees} onChange={this.setTotalEmployees} />
        <NumericInput id="capital_raised" name="Capital Raised" value={capitalRaised} onChange={this.setCapitalRaised} />
        <NumericInput id="months_of_runway" name="Months of Runway" value={monthsOfRunway} onChange={this.setMonthsOfRunway} />
      </Container>
    );
  }

}

export default Calculator;
