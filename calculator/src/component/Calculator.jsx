import { Component } from 'react';
import './Calculator.css';
import { calculator } from '../domain/calculator';
import { CALCULATOR, ERROR_MESSAGE, LOCAL_STORAGE_KEY } from '../constant';
export default class Calculator extends Component {
  constructor() {
    super();

    const {
      prevNumber = 0,
      nextNumber = null,
      operator = '',
    } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? {};

    this.state = {
      prevNumber: Number(prevNumber),
      nextNumber: nextNumber && Number(nextNumber),
      operator: operator,
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.confirmExit);
    window.addEventListener('unload', this.saveResult);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.confirmExit);
    window.removeEventListener('unload', this.saveResult);
  }

  confirmExit = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  saveResult = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state));
  };

  changeNumber = (e) => {
    if (!Number.isFinite(this.state.prevNumber)) {
      this.initialize();
    }

    this.setState({
      nextNumber: this.state.nextNumber * CALCULATOR.UNIT + Number(e.target.textContent),
    });
  };

  calculate = (e) => {
    if (!Number.isFinite(this.state.prevNumber)) return;

    if (
      this.state.nextNumber === null ||
      this.state.operator === CALCULATOR.OPERATORS.EQUAL
    ) {
      this.setState({ operator: e.target.textContent });
      return;
    }

    if (this.state.operator === '') {
      this.setState({
        prevNumber: this.state.nextNumber,
        nextNumber: null,
        operator: e.target.textContent,
      });
      return;
    }

    this.setState({
      prevNumber: calculator[this.state.operator](
        this.state.prevNumber,
        this.state.nextNumber
      ),
      nextNumber: null,
      operator: e.target.textContent,
    });
  };

  initialize = () => {
    this.setState({
      prevNumber: 0,
      nextNumber: null,
      operator: '',
    });
  };

  render() {
    const result =
      this.state.nextNumber === null ? this.state.prevNumber : this.state.nextNumber;
    return (
      <div className="calculator">
        <h1 id="total">
          {Number.isFinite(this.state.prevNumber) ? result : ERROR_MESSAGE.INFINITY_ERROR}
        </h1>
        <div className="digits flex">
          {new Array(CALCULATOR.MAX_NUMBER + 1).fill().map((_, idx) => (
            <button
              className="digit"
              key={CALCULATOR.MAX_NUMBER - idx}
              onClick={this.changeNumber}
            >
              {CALCULATOR.MAX_NUMBER - idx}
            </button>
          ))}
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={this.initialize}>
            AC
          </button>
        </div>
        <div className="operations subgrid">
          {[...Object.values(CALCULATOR.OPERATORS)].map((operator, idx) => (
            <button key={idx} className="operation" onClick={this.calculate}>
              {operator}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
