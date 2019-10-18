import MathJax from 'react-mathjax-preview'
import _ from 'lodash';
import React, { Component } from 'react';
import { Container } from 'reactstrap';

import NumericInput from './NumericInput';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// eslint-disable-next-line no-useless-escape
const formula = String.raw`$$\text{AgTech Sustainability Index™️} = \frac{\frac{\text{Gross Profit}}{\text{Total Employees}} + \frac{\text{Product Employees} \cdot 100,000}{\text{Total Employees}} + \frac{\text{Gross Profit} \cdot 100,000}{\text{Capital Raised}} + \text{Oh Snap Factor}}{3}$$`;
const ohSnapFactorForumla = String.raw`$$\text{Oh Snap Factor} = \text{If Months of Runway is less than 12 then } \color{red}{{-1000000000}} \text{ else }\color{red}{0}$$`;

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: null,
      grossProfit: '100000',
      productEmployees: '5',
      totalEmpoyees: '10',
      capitalRaised: '100000',
      monthsOfRunway: '12',
    };
  }

  // componentDidMount() {
  //   require('mathjax').init({
  //     loader: { load: ['input/tex', 'output/svg'] },
  //     tex: {
	// 			inlineMath: [["$", "$"], ["\\(", "\\)"]],
	// 			packages: ['base', 'ams'],
	// 		},
  //   }).then((math) => {
  //     const svg = math.tex2svg('\\frac{1}{x^2-1}');
  //     this.setState({ svg });
  //   }).catch((err) => console.log(err.message));
  // }

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
      <Container className="mb-5">
        <div className="text-center my-5 overflow-auto">
          <MathJax math={formula} />
          <MathJax math={ohSnapFactorForumla} />
        </div>
        <div className="text-center">
          <div className="my-5">
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
