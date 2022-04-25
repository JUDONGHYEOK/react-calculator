import PropTypes from 'prop-types';

function DigitButton({ onClick, children }) {
  return (
    <button className="digit" onClick={onClick}>
      {children}
    </button>
  );
}

DigitButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.number,
};

export default DigitButton;
