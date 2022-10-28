import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import {
  loginUser,
  USER_AUTH_TYPE,
} from "../../store/authentication/authenticationSlice";
import { authenticationStatusSelector } from "../../store/authentication/authenticationSelectors";
import { getScore } from "../rewards/rewardResultSlice";

const theme = createTheme();

function Login() {
  const authStatus = useSelector(authenticationStatusSelector);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isTeacherLogin, setIsTeacherLogin] = useState(true);
  const dispatch = useDispatch();

  /**
   * Conditional login based on student or teacher
   * @param {*} username 
   * @param {*} password 
   */
  async function onPressLogin(username, password) {
    console.log(isTeacherLogin);
    const result = await dispatch(
      loginUser({
        username,
        ...(isTeacherLogin && { password: password }),
        userType: isTeacherLogin
          ? USER_AUTH_TYPE.teacher
          : USER_AUTH_TYPE.student,
      })
    ).unwrap();
    setIsLoading(false);
    if (result) {
      if(!isTeacherLogin){
        dispatch(getScore({studentID:username}))
      }
      navigate("/home");
    } else {
      setHasError(true);
    }
  }

  const handleSubmit = (event) => {
    setIsLoading(true);
    setHasError(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    onPressLogin(data.get("email"), data.get("password"));
  };

  useEffect(() => {
    if (authStatus !== USER_AUTH_TYPE.none) {
      navigate("/home");
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <Chip
            style={{ marginRight: "10px" }}
            label="Student Login"
            color="primary"
            variant={!isTeacherLogin ? "filled" : "outlined"}
            onClick={() => setIsTeacherLogin(false)}
          />
          <Chip
            label="Teacher Login"
            color="primary"
            variant={isTeacherLogin ? "filled" : "outlined"}
            onClick={() => setIsTeacherLogin(true)}
          />
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {isTeacherLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              )}
            </>
            {hasError && (
              <Typography
                display="flex"
                justifyContent="center"
                color="red"
                component="h6"
                variant="h6"
              >
                Invalid Credentials
              </Typography>
            )}
            {!isLoading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              {isLoading && <CircularProgress />}
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
