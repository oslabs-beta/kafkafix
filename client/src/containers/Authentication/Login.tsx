import React from 'react';
import { useState, FC, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
// import GuestLogIn from "./guestlogin.jsx";
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserActionCreator,
  setErrorActionCreator,
  loginRequestActionCreator,
  loginSuccessActionCreator,
  loginFailActionCreator,
  signUpRequestActionCreator,
  signUpSuccessActionCreator,
  signUpFailActionCreator,
} from '../../state/actions/userActions';
import { overallState } from '../../state/reducers/index';
import { UserState } from '../../state/reducers/userReducer';

// import dotenv from 'dotenv';
// dotenv.config();

const useStyles = makeStyles({
  btn: {
    fontSize: 20,
    // display: flex,
    // align-items: center
    // justifyContent: 'left',
    backgroundColor: 'white',
    // margin: auto,
    // padding:10
    marginLeft: 25,
  },
});

export const Login: FC = () => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null);
  // const history = useHistory();
  const dispatch = useDispatch();
  const errorMessage = useSelector<overallState, UserState['error']>(
    (state) => state.user.error
  );

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
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('email is ', email);
        dispatch(setUserActionCreator(email));
        dispatch(signUpSuccessActionCreator());
        console.log('new user signed up: ', data);
        // props.updateUser(data.userId);
        // history.push("/home"); // mention where to go
      })
      .catch((error) => {
        dispatch(signUpFailActionCreator(error));
        console.error('Error:', error);
      });
  };

  const login = () => {
    dispatch(loginRequestActionCreator());
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
      .then((response) => {
        if (response.status != 200) {
          throw Error();
        }
        return response.json();
      })
      .then((data) => {
        console.log('email is ', email);
        dispatch(setUserActionCreator(email));
        dispatch(loginSuccessActionCreator());
        console.log('login', data);
        // props.updateUser(data.userId);
        // history.push(`/home`); // mention where to go
      })
      .catch((error) => {
        dispatch(loginFailActionCreator(error));
        console.error('Error:', error);
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
  const handleSubmitButton = () => {
    if (validateForm()) {
      if (isLogin) login();
      else signUp();
    } else {
      dispatch(
        setErrorActionCreator('Cannot leave email/password fields empty')
      );
    }
  };

  const handleChangePage = () => {
    const emailField: HTMLInputElement | null =
      document.querySelector('#emailField');
    const passwordField: HTMLInputElement | null =
      document.querySelector('#passwordField');
    if (emailField) {
      console.log(emailField);
      console.log(emailField.value);
      emailField.value = '';
    }
    if (passwordField) {
      passwordField.value = '';
    }
    dispatch(setErrorActionCreator(''));
    setIsLogin(!isLogin);
  };

  const handleGithubLogin = () => {};

  return (
    <div>
      <form className='loginPage'>
        <h1>{isLogin ? 'Log in' : 'Sign up'}</h1>
        <Box m={2}>
          <div>
            <TextField
              onSubmit={handleSubmit}
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='email'
              variant='outlined'
              id='emailField'
            />
          </div>
        </Box>
        <Box m={2}>
          <div>
            <TextField
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label='password'
              variant='outlined'
              id='passwordField'
            />
          </div>
        </Box>
        <div>
          <p>
            <Button className={classes.btn} onClick={handleSubmitButton}>
              {isLogin ? 'Log in' : 'Sign up'}
            </Button>
            <Button className={classes.btn} onClick={handleGithubLogin}>
              {isLogin && 'Log in With Github'}
            </Button>
          </p>
          <div>
            <p style={{ color: 'red' }}>
              {/* {" "} */}
              {errorMessage}
            </p>
            <u
              style={{ cursor: 'pointer' }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Create an account' : 'Already have an account?'}
            </u>
          </div>
        </div>
      </form>
    </div>
  );
};
