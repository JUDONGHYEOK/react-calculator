import './Calculator.css';
import { CALCULATOR, ERROR_MESSAGE, LOCAL_STORAGE_KEY } from '../constant';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCalculator } from '../hooks/useCalculator';
import DigitButton from './DigitButton';
import ModifierButton from './ModifierButton';
import OperationButton from './OperationButton';

export default function Calculator() {
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
          <DigitButton
            key={CALCULATOR.MAX_NUMBER - idx}
            onClick={(e) =>
              dispatch({ type: 'CHANGE_NUMBER', payload: e.target.textContent })
            }
          >
            {CALCULATOR.MAX_NUMBER - idx}
          </DigitButton>
        ))}
      </div>
      <div className="modifiers subgrid">
        <ModifierButton
          onClick={() => {
            dispatch({ type: 'INITIALIZE' });
          }}
        >
          AC
        </ModifierButton>
      </div>
      <div className="operations subgrid">
        {Object.values(CALCULATOR.OPERATORS).map((operator, idx) => (
          <OperationButton
            key={idx}
            onClick={(e) => {
              dispatch({ type: 'CALCULATE', payload: e.target.textContent });
            }}
          >
            {operator}
          </OperationButton>
        ))}
      </div>
    </div>
  );
}
