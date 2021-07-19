import React from "react";
import { useState, FC } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
// import GuestLogIn from "./guestlogin.jsx";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  setUserActionCreator,
  loginRequestActionCreator,
  loginSuccessActionCreator,
  loginFailActionCreator,
  signUpRequestActionCreator,
  signUpSuccessActionCreator,
  signUpFailActionCreator,
} from "../../state/actions/userActions";

// import dotenv from 'dotenv';
// dotenv.config();

const useStyles = makeStyles({
  btn: {
    fontSize: 20,
    // display: flex,
    // align-items: center
    // justifyContent: 'left',
    backgroundColor: "white",
    // margin: auto,
    // padding:10
    marginLeft: 25,
  },
});

export const Login: FC = () => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  // form validation; email and password need to be > one char
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
  }

  const signUp = () => {
    // fetch request to the server on the 'signup' route, method is post
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
        console.log('email is ', email);
        dispatch(setUserActionCreator(email));
        dispatch(signUpSuccessActionCreator());
        console.log("new user signed up: ", data);
        // props.updateUser(data.userId);
        // history.push("/home"); // mention where to go
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
        console.log( 'email is ', email);
        dispatch(setUserActionCreator(email));
        dispatch(loginSuccessActionCreator());
        console.log("login", data);
        // props.updateUser(data.userId);
        // history.push(`/home`); // mention where to go
      })
      .catch((error) => {
        dispatch(loginFailActionCreator(error));
        console.error("Error:", error);
      });
  };
  // const logout = () => {
  //     props.updateUser(null);
  //     fetch("/logout", {
  //         method: "POST",
  //         credentials: "include",
  //     });
  //     history.push("/login");
  // };
  return (
    <div>
      <form className="loginPage">
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
            />
          </div>
        </Box>
        <div>
          <div>
            <Button
              className={classes.btn}
              onClick={() => {
                if (validateForm()) {
                  if (isLogin) {
                    return login();
                  }
                  return signUp();
                }
                return;
              }}
            >
              {isLogin ? "Log in" : "Sign up"}
            </Button>
          </div>
          <div>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {" "}
              <u>
                {isLogin ? "Create an account" : "Already have an account?"}
              </u>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
