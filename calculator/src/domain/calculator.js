import { CALCULATOR } from '../constant';
export const calculator = {
  [CALCULATOR.OPERATORS.ADD]: function (a, b) {
    return a + b;
  },
  [CALCULATOR.OPERATORS.MINUS]: function (a, b) {
    return a - b;
  },
  [CALCULATOR.OPERATORS.MULTIPLY]: function (a, b) {
    return a * b;
  },
  [CALCULATOR.OPERATORS.DIVIDE]: function (a, b) {
    return a / b;
  },
};
