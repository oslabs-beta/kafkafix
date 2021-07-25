import React from "react";
import { useState, FC, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserActionCreator,
  setErrorActionCreator,
  loginRequestActionCreator,
  loginSuccessActionCreator,
  loginFailActionCreator,
  signUpRequestActionCreator,
  signUpSuccessActionCreator,
  signUpFailActionCreator,
} from "../../state/actions/userActions";
// import {
//   OauthLoginRequestActionCreator,
//   OauthLoginSuccessActionCreator,
//   OauthLoginFailActionCreator,
//   OauthSetErrorActionCreator
// } from "../../state/actions/oauthActions";
import { overallState } from "../../state/reducers/index";
import { UserState } from "../../state/reducers/userReducer";




const useStyles = makeStyles({
  btn: {
    fontSize: 20,
    color: "white",
    backgroundColor: "black",
    marginLeft: 25,
  },
  loginPage: {
    textAlign: 'center',
    color: "black",
  }
});

export const Login: FC = () => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);
  const dispatch = useDispatch();
  const errorMessage = useSelector<overallState, UserState["error"]>(
    (state) => state.user.error
  );


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
  }

  const signUp = () => {
    dispatch(signUpRequestActionCreator());
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("email is ", email);
        dispatch(setUserActionCreator(email));
        dispatch(signUpSuccessActionCreator());
        console.log("new user signed up: ", data);
    
      })
      .catch((error) => {
        dispatch(signUpFailActionCreator(error));
        console.error("Error:", error);
      });
  };

  const login = () => {
    dispatch(loginRequestActionCreator());
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((response) => {
        if (response.status != 200) {
          throw Error();
        }
        return response.json();
      })
      .then((data) => {
        console.log("email is ", email);
        dispatch(setUserActionCreator(email));
        dispatch(loginSuccessActionCreator());
        console.log("login", data);
      })
      .catch((error) => {
        dispatch(loginFailActionCreator(error));
        console.error("Error:", error);
      });
  };
  // const oauthLogin = () => {
  //   dispatch(OauthLoginRequestActionCreator());
  //   fetch('/oauth-callback', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (response.status != 200) {
  //         throw Error();
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("email is ", email);
  //       dispatch(OauthLoginSuccessActionCreator());
  //       console.log("login", data);
  //     })
  //     .catch((error) => {
  //       dispatch(OauthLoginFailActionCreator(error));
  //       console.error("Error:", error);
  //     });
  // };
  
  const handleSubmitButton = () => {
    if (validateForm()) {
      if (isLogin) login();
      else signUp();
    } else {
      dispatch(
        setErrorActionCreator("Cannot leave email/password fields empty")
      );
    }
  };

  const handleChangePage = () => {
    const emailField: HTMLInputElement | null =
      document.querySelector("#emailField");
    const passwordField: HTMLInputElement | null =
      document.querySelector("#passwordField");
    if (emailField) {
      console.log(emailField);
      console.log(emailField.value);
      emailField.value = "";
    }
    if (passwordField) {
      passwordField.value = "";
    }
    dispatch(setErrorActionCreator(""));
    setIsLogin(!isLogin);
  };
  
  const handleGithubLogin = () => {

  } 

  return (
    <div>
      
      <form className={classes.loginPage}>
        <h1>{isLogin ? "Log in" : "Sign up"}</h1>
        <Box m={2}>
          <div>
            <TextField
              
              onSubmit={handleSubmit}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="email"
              variant="outlined"
              id="emailField"
            />
          </div>
        </Box>
        <Box m={2}>
          <div>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="password"
              variant="outlined"
              id="passwordField"
            />
          </div>
        </Box>
        <div>
          <p>
            <Button className={classes.btn} onClick={handleSubmitButton}>
              {isLogin ? "Log in" : "Sign up"}
            </Button>
            {/* <Button className={classes.btn} onClick={handleGithubLogin}> */}
            {/* {isLogin &&  <Button>Login With Github <Button/>}
            </Button> */}
            
          </p>
          {isLogin &&  <Button className={classes.btn} onClick={handleGithubLogin}>Login With Github </Button>}
          <div>
            <p style={{ color: "red" }}>
              {/* {" "} */}
              {errorMessage}
            </p>
            <u
              style={{ cursor: "pointer" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create an account" : "Already have an account?"}
            </u>
          </div>
        </div>
        </form>
        
    </div>
  );
};
