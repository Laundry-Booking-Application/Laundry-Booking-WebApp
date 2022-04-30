import React from 'react';
import RegisterResidentView from '../views/registerResidentView';

/**
 * The presenter that is responsible upon creating the register new resident account form (Modal).
 * @param {UserModel} userModel The user model that contains the necessary function to register a new resident account.
 * @return {RegisterResidentView} RegisterResidentView The view that contains the register new resident account form (Modal).
 */
function RegisterResident({userModel}) {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [personNumber, setPersonNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showRegister, setShowRegister] = React.useState(false);

    return React.createElement(RegisterResidentView, {
        setFirstName: (firstName) => setFirstName(firstName),
        setLastName: (lastName) => setLastName(lastName),
        setPersonNumber: (personNumber) => setPersonNumber(personNumber),
        setEmail: (email) => setEmail(email),
        setUsername: (username) => setUsername(username),
        setPassword: (password) => setPassword(password),
        handleRegister: () => userModel.registerResident(firstName, lastName, personNumber, email, username, password),
        show: showRegister,
        handleShow: () => setShowRegister(true),
        handleClose: () => setShowRegister(false),
    });
}

export default RegisterResident;
