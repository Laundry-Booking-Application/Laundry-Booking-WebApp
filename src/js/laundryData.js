import BASE_URL from "./apiConfig";

/**
 * Responsible for the api calls that will happen in the website. Ranging from creating the 
 * proper request to receiving the response.
 */
const LaundryData = {
    /**
     * Performs HTTP API calls using the Fetch API.
     * The base url for the API calls is specified in the apiConfig.js file.
     * @param {string} urlPath The url path that is specific to the requested service.
     * @param {Request} requestContent The request content to be sent to the remote server. 
     * @returns {Response} The response received from the remote server.
     * @throws {Exception} If an error occurs.
     */
    apiCall(urlPath, requestContent) {
        const fetchData = fetch(BASE_URL + urlPath, requestContent)
            .then((response) => { return response; })
            .catch((error) => { throw error; });
        return fetchData;
    },

    /**
     * Attempts to login a user using the provided login credentials.
     * @param {string} username The username of the account.
     * @param {string} password The password of the account.
     * @returns {Response} The response received from the login endpoint.
     */
    loginUser(username, password) {
        return this.apiCall(
            'user/login'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                }),
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Registers a new resident account.
     * This endpoint is only accessible by administrators.
     * @param {string} firstName The first name of the new user.
     * @param {string} lastName The last name of the new user.
     * @param {string} personNumber The swedish personal number of the new user.
     * @param {string} email The email of the new user.
     * @param {string} username the username for the new account.
     * @param {string} password The password for the new account.
     * @returns {Response} The response received from the register resident endpoint.
     */
    registerResident(firstName, lastName, personNumber, email, username, password) {
        return this.apiCall(
            'user/registerResident'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "firstname": firstName,
                    "lastname": lastName,
                    "personalNumber": personNumber,
                    "email": email,
                    "username": username,
                    "password": password
                }),
            })
            .then((response) => {
                return response;
            });
    },


    /**
     * Checks whether a user is already logged in or not.
     * @returns The response received from the login check endpoint.
     */
    checkLogin() {
        return this.apiCall(
            'user/checkLogin'
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Logs out the currently logged in user.
     * @returns {Response} The response received from the logout endpoint.
     */
    logoutUser() {
        return this.apiCall(
            'user/logout'
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        ).then((response) => {
            return response;
        });
    },



    /**
     * Lists the registered resident accounts.
     * This endpoint is only accessible by administrators.
     * @returns {Response} The response received from the list users endpoint.
     */
    listUsers() {
        return this.apiCall(
            'user/listUsers'
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * Attempts to delete a user account.
     * This endpoint is only accessible by administrators.
     * @param {string} username The username of the account.
     * @returns {Response} The response received from the delete user endpoint.
     */
    deleteUser(username) {
        return this.apiCall(
            'user/deleteUser'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username
                }),
            }
        ).then((response) => {
            return response;
        });
    },


    /**
     * Temporarily locks a laundry pass.
     * @param {int} roomNumber The number related to the chosen room.
     * @param {string} date The date of the laundry pass.
     * @param {string} passRange The time frame that the pass has.
     * @returns {Response} The response received from the lock pass endpoint.
     */
    lockPass(roomNumber, date, passRange) {
        return this.apiCall(
            'booking/lockPass'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "roomNumber": roomNumber,
                    "date": date,
                    "passRange": passRange
                }),
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Unlocks the temporarily locked laundry pass.
     * @returns {Response} The response received from the unlock pass endpoint.
     */
    unlockPass() {
        return this.apiCall(
            'booking/unlockPass'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Books the chosen laundry pass.
     * @param {int} roomNumber The number related to the chosen room.
     * @param {string} date The date of the laundry pass.
     * @param {string} passRange The time frame that the pass has.
     * @returns {Response} The response received from the book pass endpoint.
     */
    bookPass(roomNumber, date, passRange) {
        return this.apiCall(
            'booking/bookPass'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "roomNumber": roomNumber,
                    "date": date,
                    "passRange": passRange
                }),
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Gets the active laundry pass for the currently logged in user
     * @returns {Response} The response received from the get booked pass endpoint.
     */
    getBookedPass() {
        return this.apiCall(
            'booking/getBookedPass'
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Cancels a booked laundry pass.
     * @param {int} roomNumber The number related to the chosen room.
     * @param {string} date The date of the laundry pass.
     * @param {string} passRange The time frame that the pass has.
     * @returns {Response} The response received from the cancel booked pass endpoint.
     */
    cancelBookedPass(roomNumber, date, passRange) {
        return this.apiCall(
            'booking/cancelBookedPass'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "roomNumber": roomNumber,
                    "date": date,
                    "passRange": passRange
                }),
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Fetches the laundry passes' schedule for the specified week.
     * @param {string} week The requested week to get the laundry passes' schedule for.
     *                      Accepted values are -1, 0 and 1 for previous, current and next week respectively.
     * @returns {Response} The response received from the get resident passes endpoint.
     */
    getResidentPasses(week) {
        return this.apiCall(
            'booking/getResidentPasses?' + new URLSearchParams({
                "week": week
            })
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * Fetches the passes' schedule for the specified week including the usernames related to the bookings.
     * This endpoint is only accessible by administrators.
     * @param {string} week The requested week to get the laundry passes' schedule for.
     *                      This parameter is relative to the current week, e.g. -2 is two weeks before the current week.
     * @returns {Response} The response received from the get passes endpoint.
     */
    getPasses(week) {
        return this.apiCall(
            'booking/getPasses?' + new URLSearchParams({
                "week": week
            })
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        )
            .then((response) => {
                return response;
            });
    },
};

export default LaundryData;
