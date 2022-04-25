import './Calculator.css';
import { CALCULATOR, ERROR_MESSAGE, LOCAL_STORAGE_KEY } from '../constant';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCalculator } from '../hooks/useCalculator';

export default function CalculatorByFunction() {
  const [statement, dispatch] = useCalculator();

  useLocalStorage(LOCAL_STORAGE_KEY, JSON.stringify(statement));

  const { prevNumber, nextNumber } = statement;
  const result = nextNumber === null ? prevNumber : nextNumber;

  return (
    <div className="calculator">
      <h1 id="total">
        {Number.isFinite(prevNumber) ? result : ERROR_MESSAGE.INFINITY_ERROR}
      </h1>
      <div className="digits flex">
        {new Array(CALCULATOR.MAX_NUMBER + 1).fill().map((_, idx) => (
          <button
            className="digit"
            key={CALCULATOR.MAX_NUMBER - idx}
            onClick={(e) => {
              dispatch({ type: 'CHANGE_NUMBER', payload: e.target.textContent });
            }}
          >
            {CALCULATOR.MAX_NUMBER - idx}
          </button>
        ))}
      </div>
      <div className="modifiers subgrid">
        <button
          className="modifier"
          onClick={() => {
            dispatch({ type: 'INITIALIZE' });
          }}
        >
          AC
        </button>
      </div>
      <div className="operations subgrid">
        {Object.values(CALCULATOR.OPERATORS).map((operator, idx) => (
          <button
            key={idx}
            className="operation"
            onClick={(e) => {
              dispatch({ type: 'CALCULATE', payload: e.target.textContent });
              console.log(statement);
            }}
          >
            {operator}
          </button>
        ))}
      </div>
    </div>
  );
}
