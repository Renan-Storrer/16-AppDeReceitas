import PropTypes from 'prop-types';
import CreateContext from './CreateContext';

function LoginProvider({ children }) {
  return (
    <CreateContext.Provider>
      {children}
    </CreateContext.Provider>
  );
}

export default LoginProvider;

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
