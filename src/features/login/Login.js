import { useDispatch } from "react-redux";
import {
  loginUser,
  USER_AUTH_TYPE,
} from "../../store/authentication/authenticationSlice";
// Login page.
function Login() {
  const dispatch = useDispatch();

  function onPressLogin() {
    dispatch(
      loginUser({
        username: "someUsername",
        password: "somePassword",
        userType: USER_AUTH_TYPE.teacher,
      })
    );
  }

  return (
    <>
      <h1>Login page</h1>
      <button onClick={onPressLogin}>Login</button>
    </>
  );
}

export default Login;
