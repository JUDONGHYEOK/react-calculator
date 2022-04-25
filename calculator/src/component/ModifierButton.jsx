import PropTypes from 'prop-types';

function ModifierButton({ onClick, children }) {
  return (
    <button className="modifier" onClick={onClick}>
      {children}
    </button>
  );
}

ModifierButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};
export default ModifierButton;
