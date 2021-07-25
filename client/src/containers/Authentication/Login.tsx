import React from 'react';
import { useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
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
import { RootState } from '../../state/reducers/index';
import { UserState } from '../../state/reducers/userReducer';

const useStyles = makeStyles({
	btn: {
		fontSize: 20,
		backgroundColor: 'white',
		marginLeft: 25,
	},
});

export const Login: FC = () => {
	const classes = useStyles();
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(null);

	const dispatch = useDispatch();
	const errorMessage = useSelector<RootState, UserState['error']>(
		state => state.user.error
	);

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
	}

	const signUp = () => {
		dispatch(signUpRequestActionCreator());
		fetch('http://localhost:3000/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
			credentials: 'include',
		})
			.then(response => response.json())
			.then(data => {
				dispatch(setUserActionCreator(email));
				dispatch(signUpSuccessActionCreator());
			})
			.catch(error => {
				dispatch(signUpFailActionCreator(error));
			});
	};

	const login = () => {
		dispatch(loginRequestActionCreator());
		fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
			credentials: 'include',
		})
			.then(response => {
				if (response.status != 200) {
					throw Error();
				}
				return response.json();
			})
			.then(data => {
				dispatch(setUserActionCreator(email));
				dispatch(loginSuccessActionCreator());
			})
			.catch(error => {
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
							onChange={e => setEmail(e.target.value)}
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
							onChange={e => setPassword(e.target.value)}
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
