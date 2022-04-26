import React from 'react';
import NavigationLoginView from '../views/navigationLoginView';

/**
 * The presenter for creating the login form that allows to enter an account login information.
 * The form lets the user enter the username and password.
 * @param {UserModel} userModel The object includes data about user information.
 * @returns {NavigationLoginView} An element with the login form to enter the login information.
 *                                The element function changes depending on the login status. 
 */
function NavigationLogin({userModel}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showLogin, setShowLogin] = React.useState(false);

    return React.createElement(NavigationLoginView, {
        setUsername: (username) => setUsername(username),
        setPassword: (password) => setPassword(password),
        handleLogin: () => userModel.loginUser(username, password),
        show: showLogin,
        handleShow: () => setShowLogin(true),
        handleClose: () => setShowLogin(false)
    });
}

export default NavigationLogin;