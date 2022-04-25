import PropTypes from 'prop-types';

function OperationButton({ onClick, children }) {
  return (
    <button className="operation" onClick={onClick}>
      {children}
    </button>
  );
}
OperationButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default OperationButton;
