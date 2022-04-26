/**
 * Responsible for handling all the information about the user credentials.
 */
class UserModel {
    /**
     * Create an instance of the user handler.
     */
    constructor() {
        this.subscribers = [];
        this.loginStatus = null;
        this.username = null;
        this.privilege = null;
        this.errorData = null;
    }

    /**
   * Login the user into the website with their entered account credentials.
   * @param {string} username The entered username by the user.
   * @param {string} password The entered password by the user.
   */
    loginUser(username, password) {
        this.populateUserModelData(true, username, 1);
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
   * log out the user from the website. 
   */
    logoutUser() {
        this.emptyUserModelData();
        this.loginStatus = false;
    }

    /**
   * Reset the information about the logged in user.
   */
    emptyUserModelData() {
        this.loginStatus = null;
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