import { useReducer } from 'react';
import { CALCULATOR, LOCAL_STORAGE_KEY } from '../constant';
import { calculator } from '../domain/calculator';

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_NUMBER':
      if (!Number.isFinite(state.prevNumber) || state.operator === '=') {
        return { prevNumber: 0, nextNumber: Number(action.payload), operator: '' };
      }
      return {
        ...state,
        nextNumber: state.nextNumber * CALCULATOR.UNIT + Number(action.payload),
      };
    case 'CALCULATE':
      if (!Number.isFinite(state.prevNumber)) return state;

      if (state.nextNumber === null || state.operator === CALCULATOR.OPERATORS.EQUAL) {
        return { ...state, operator: action.payload };
      }

      if (state.operator === '') {
        return {
          prevNumber: state.nextNumber,
          nextNumber: null,
          operator: action.payload,
        };
      }
      return {
        prevNumber: calculator[state.operator](state.prevNumber, state.nextNumber),
        nextNumber: null,
        operator: action.payload,
      };

    case 'INITIALIZE':
      return {
        prevNumber: 0,
        nextNumber: null,
        operator: '',
      };
    default:
      return state;
  }
}

export const useCalculator = () => {
  const storedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? {};

  const [statement, dispatch] = useReducer(reducer, {
    prevNumber: Number(storedState.prevNumber) ?? 0,
    nextNumber: Number(storedState.nextNumber) || null,
    operator: storedState.operator ?? '',
  });

  return [statement, dispatch];
};
