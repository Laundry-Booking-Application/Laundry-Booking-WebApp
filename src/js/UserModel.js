import LaundryData from './laundryData';

/**
 * Responsible for handling all the information about the user credentials.
 */
class UserModel {
    /**
     * Create an instance of the user handler.
     */
    constructor() {
        this.subscribers = [];
        this.loginStatus = false;
        this.username = null;
        this.registeredUsername = null;
        this.privilege = null;
        this.errorData = null;
        this.usersList = null;
        this.deletionResult = null;
        this.checkLogin();
    }

    /**
   * Login the user into the website with their entered account credentials.
   * @param {string} username The entered username by the user.
   * @param {string} password The entered password by the user.
   */
    loginUser(username, password) {
        LaundryData.loginUser(username, password)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.emptyUserModelData();
                        const userLoggedIn = true;
                        const currentUsername = data.success.username;
                        const currentPrivilege = data.success.privilegeID;
                        this.populateUserModelData(userLoggedIn, currentUsername, currentPrivilege);
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyUserModelData();
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyUserModelData();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Registers a new resident account.
     * @param {string} firstName The first name of the new user.
     * @param {string} lastName The last name of the new user.
     * @param {string} personNumber The swedish personal number of the new user.
     * @param {string} email The email of the new user.
     * @param {string} username the username for the new account.
     * @param {string} password The password for the new account.
     */
    registerResident(firstName, lastName, personNumber, email, username, password) {
        LaundryData.registerResident(firstName, lastName, personNumber, email, username, password)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.clearRegisteredUsername();
                        const residentUsername = data.success.username;
                        this.updateRegisteredUsername(residentUsername);
                        this.listUsers();
                    });
                } else {
                    result.json().then((data) => {
                        this.clearRegisteredUsername();
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyUserModelData();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
   * log out the user from the website.
   */
    logoutUser() {
        LaundryData.logoutUser().then((result) => {
            if (result.ok) {
                result.json().then((data) => {
                    this.emptyUserModelData();
                });
            } else {
                result.json().then((data) => {
                    this.emptyUserModelData();
                    this.handleErrorMessages(result.status, data.error);
                });
            }
        })
            .catch((error) => {
                this.emptyUserModelData();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
   * Check if the user have already logged in before and have a valid cookie without logging out.
   */
    checkLogin() {
        LaundryData.checkLogin()
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.emptyUserModelData();
                        const userLoginStatus = true;
                        const currentUsername = data.success.username;
                        const currentPrivilege = data.success.privilegeID;
                        this.populateUserModelData(userLoginStatus, currentUsername, currentPrivilege);
                    });
                } else {
                    this.emptyUserModelData();
                }
            })
            .catch((error) => {
                this.emptyUserModelData();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Lists all the registered resident user accounts.
     */
    listUsers() {
        LaundryData.listUsers()
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.emptyUsersList();
                        this.populateUsersList(data.success);
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyUsersList();
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyUserModelData();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Deletes all information about the specified user and removes the user account from the system.
     * @param {string} username The username of the user account that is to be removed from the system.
     */
    deleteUser(username) {
        LaundryData.deleteUser(username)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.clearDeletionResult();
                        this.updateDeletionResult(data.success);
                        this.listUsers();
                    });
                } else {
                    result.json().then((data) => {
                        this.clearDeletionResult();
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyUserModelData();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Updates the deletionResult property with the account deletion result.
     * @param {Object} deletionData The account deletion data.
     */
    updateDeletionResult(deletionData) {
        this.deletionResult = deletionData.result;
        this.notifyObservers();
    }

    /**
     * Clears the deletionResult property.
     */
    clearDeletionResult() {
        this.deletionResult = null;
        this.notifyObservers();
    }

    /**
     * Populates the usersList property with the users account list information.
     * @param {Object} usersListData The users account data.
     */
    populateUsersList(usersListData) {
        this.usersList = usersListData.personInfo;
        this.notifyObservers();
    }

    /**
     * Clears the usersList property.
     */
    emptyUsersList() {
        this.usersList = null;
        this.notifyObservers();
    }

    /**
     * Updates the registeredUsername property with the username of the newly registered resident account.
     * @param {string} username The username for the newly registered resident account.
     */
    updateRegisteredUsername(username) {
        this.registeredUsername = username;
        this.notifyObservers();
    }

    /**
     * Clears the registeredUsername property.
     */
    clearRegisteredUsername() {
        this.registeredUsername = null;
        this.notifyObservers();
    }

    /**
       * Set the user information in their proper place.
       * @param {boolean} loginStatus The status to indicate if the user is logged in or not.
       * @param {string} username The username for the logged in user.
       * @param {number} privilege The privilege that the logged in user has.
       */
    populateUserModelData(loginStatus, username, privilege) {
        this.loginStatus = loginStatus;
        this.username = username;
        this.privilege = privilege;
        this.notifyObservers();
    }

    /**
   * Reset all the information about the logged in user.
   */
    emptyUserModelData() {
        this.loginStatus = false;
        this.username = null;
        this.registeredUsername = null;
        this.privilege = null;
        this.errorData = null;
        this.usersList = null;
        this.deletionResult = null;
        this.notifyObservers();
    }

    /**
     * Adds an observer to the class.
     * @param {function} callback The operation that will be called when the observer is notified.
     */
    addObserver(callback) {
        this.subscribers = this.subscribers.concat(callback);
    }

    /**
     * Removes the observer from the class.
     * @param {Observer} obs The observer
     */
    removeObserver(obs) {
        this.subscribers = this.subscribers.filter((o) => {
            return o !== obs;
        });
    }

    /**
     * Notifies the observers after any changes.
     */
    notifyObservers() {
        this.subscribers.forEach((callback) => {
            try {
                callback();
            } catch (err) {
                console.error('Callback error: ', err, callback);
            }
        });
    }

    /**
    * Handle the errors that the website encounters.
    * @param {number} status The status code related to the error.
    * @param {string | {msg, param}} error The error that happened.
    */
    handleErrorMessages(status, error) {
        if (typeof error === 'string') {
            this.reportError(status, error);
            return;
        }

        let message = '';

        error.errors.forEach((err) => {
            message = err.msg + ' for ' + err.param;
            this.reportError(status, message);
        });
    }

    /**
    * Notify the observers for the error encountered during some operation and pass on the error information.
    * @param {number} code The status code related to the error.
    * @param {string} message The message explanting the error.
    */
    reportError(code, message) {
        this.errorData = {code: code, message: message};
        this.notifyObservers();
    }

    /**
    * Reset the info about the error that was recently encountered.
    */
    emptyErrorData() {
        this.errorData = null;
        this.notifyObservers();
    }
}

export default UserModel;
