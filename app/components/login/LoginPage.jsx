import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login';
import loginActions from './actions';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  const user = bindActionCreators(loginActions, dispatch);
  return {
    onLogin: user.login
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
