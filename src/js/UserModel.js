import LaundryData from "./laundryData";

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
                        let userLoggedIn = true;
                        let currentUsername = data.success.username;
                        let currentPrivilege = data.success.privilegeID;
                        this.populateUserModelData(userLoggedIn, currentUsername, currentPrivilege);
                    });
                } else {
                    result.json().then((data) => {
                        // this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                //   if (error instanceof TypeError) {
                //     this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                //   } else {
                //     this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                //   }
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
                        let residentUsername = data.success.username;
                        this.updateRegisteredUsername(residentUsername);
                    });
                } else {
                    result.json().then((data) => {
                        this.clearRegisteredUsername();
                        // this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                //   if (error instanceof TypeError) {
                //     this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                //   } else {
                //     this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                //   }
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
            }
        })
            .catch((error) => {
                // if (error instanceof TypeError) {
                //     this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                // } else {
                //     this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                // }
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
                        let userLoginStatus = true;
                        let currentUsername = data.success.username;
                        let currentPrivilege = data.success.privilegeID;
                        this.populateUserModelData(userLoginStatus, currentUsername, currentPrivilege);
                    });
                }
                else {
                    this.emptyUserModelData();
                }
            })
            .catch((error) => {
                //if (error instanceof TypeError) {
                //    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                //}
            });
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
     * Updates the registeredUsername field with the username of the newly registered resident account.
     * @param {*} username The username for the newly registered resident account.
     */
    updateRegisteredUsername(username) {
        this.registeredUsername = username;
        this.notifyObservers();
    }

    /**
     * Clears the registeredUsername field.
     */
    clearRegisteredUsername() {
        this.registeredUsername = null;
        this.notifyObservers();
    }

    /**
   * Reset the information about the logged in user.
   */
    emptyUserModelData() {
        this.loginStatus = false;
        this.username = null;
        this.privilege = null;
        this.errorData = null;
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
        this.subscribers = this.subscribers.filter(o => { return o !== obs; });
    }

    /**
     * Notifies the observers after any changes.
     */
    notifyObservers() {
        this.subscribers.forEach(callback => {
            try {
                callback();
            }
            catch (err) {
                console.error("Callback error: ", err, callback);
            }
        });
    }
}

export default UserModel;