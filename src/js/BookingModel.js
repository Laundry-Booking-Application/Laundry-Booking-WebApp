import LaundryData from './laundryData';

/**
 * Responsible for handling all the information about the bookings.
 */
class BookingModel {
    /**
     * Create an instance of the booking handler.
     */
    constructor() {
        this.subscribers = [];
        this.bookingSchedule = null;
        this.selectedRoomNum = null;
        this.selectedDate = null;
        this.selectedRange = null;
        this.selectedUsername = null;
        this.bookedSlot = null;
        this.showInfo = null;
        this.bookedPassDate = null;
        this.bookedPassRoomNumber = null;
        this.bookedPassRange = null;
        this.cancellationResult = null;
        this.adminCancelResult = null;
        this.errorData = null;
    }

    /**
     * Get the booking schedule that is intended for the administrators.
     * @param {string} week The requested week to get the laundry passes's schedule.
     *                      This parameter is relative to the current week, e.g. -2 is two weeks before the current week.
     */
    getAdministratorBookingSchedule(week) {
        LaundryData.getPasses(week)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.emptyBookingSchedule();
                        this.populateBookingSchedule(data.success);
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyBookingSchedule();
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyBookingModel();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Get the booking schedule that is intended for the residents.
     * @param {string} week The requested week to get the laundry passes's schedule.
     *                      Accepted values are -1, 0 and 1 for previous, current and next week respectively.
     */
    getResidentBookingSchedule(week) {
        LaundryData.getResidentPasses(week)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.emptyBookingSchedule();
                        this.populateBookingSchedule(data.success);
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyBookingSchedule();
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyBookingModel();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Book the chosen slot by the user.
     * @param {string} roomNum The room number for the laundry slot.
     * @param {string} date The date of the laundry slot.
     * @param {string} range The range of the laundry slot.
     */
    bookChosenSlot(roomNum, date, range) {
        LaundryData.bookPass(roomNum, date, range)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.emptyBookingSlot();
                        this.emptySelectedBooking();
                        this.populateBookingSlot(data.success.date, data.success.roomNumber, data.success.passRange);
                        this.getResidentBookingSchedule(0);
                        this.getBookedPass();
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyBookingSlot();
                        this.emptySelectedBooking();
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyBookingModel();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
        return;
    }

    /**
     * Gets information about the booked laundry pass of the currently logged-in user.
     */
    getBookedPass() {
        LaundryData.getBookedPass()
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.emptyBookedPassData();
                        this.populateBookedPassData(data.success);
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyBookedPassData();
                        // this.handleErrorMessages(result.status, data.error); Not needed.
                    });
                }
            })
            .catch((error) => {
                this.emptyBookingModel();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Cancels a booked laundry pass.
     * @param {int} roomNumber The laundry room number.
     * @param {string} date The date that the active laundry pass is booked on.
     * @param {string} passRange The time frame that the pass has.
     */
    cancelBookedPass(roomNumber, date, passRange) {
        LaundryData.cancelBookedPass(roomNumber, date, passRange)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.emptyCancellationResult();
                        this.updateCancellationResult(data.success);
                        this.getBookedPass();
                        this.getResidentBookingSchedule(0);
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyCancellationResult();
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyBookingModel();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Cancels any booked laundry pass and used only by an administrator.
     * @param {int} roomNumber The laundry room number.
     * @param {string} date The date that the active laundry pass is booked on.
     * @param {string} passRange The time frame that the pass has.
     */
    cancelBookedPassAsAdmin(roomNumber, date, passRange) {
        LaundryData.cancelBookedPass(roomNumber, date, passRange)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.emptyAdminCancellationResult();
                        this.setAdminCancellationResult(data.success);
                        this.getAdministratorBookingSchedule(0);
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyAdminCancellationResult();
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyBookingModel();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Temporarily locks a specific laundry pass slot.
     * @param {int} roomNumber The number related to the chosen room.
     * @param {string} date The date of the laundry pass.
     * @param {string} passRange The time frame that the pass has.
     */
    lockPass(roomNumber, date, passRange) {
        LaundryData.lockPass(roomNumber, date, passRange)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        // If locked successfully, do nothing!
                    });
                } else {
                    result.json().then((data) => {
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyBookingModel();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Unlocks the temporarily locked laundry pass slot that the user had locked.
     */
    unlockPass() {
        LaundryData.unlockPass()
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        // If unlocked successfully, do nothing!
                    });
                } else {
                    result.json().then((data) => {
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                this.emptyBookingModel();
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Empty the whole model from data.
     */
    emptyBookingModel() {
        this.subscribers = [];
        this.bookingSchedule = null;
        this.selectedRoomNum = null;
        this.selectedDate = null;
        this.selectedRange = null;
        this.selectedUsername = null;
        this.bookedSlot = null;
        this.showInfo = null;
        this.bookedPassDate = null;
        this.bookedPassRoomNumber = null;
        this.bookedPassRange = null;
        this.cancellationResult = null;
        this.adminCancelResult = null;
        this.errorData = null;
        this.notifyObservers();
    }

    /**
     * Updates the booking cancellation result property using the data contained in the cancellationData.
     * @param {Object} cancellationData The object containing the booking cancellation data.
     */
    updateCancellationResult(cancellationData) {
        this.cancellationResult = cancellationData.result;
        this.notifyObservers();
    }

    /**
     * Resets the data contained in the cancellation result property.
     */
    emptyCancellationResult() {
        this.cancellationResult = null;
        this.notifyObservers();
    }

    /**
     * Updates the admin booking cancellation result property using the data contained in the adminCancelResult.
     * @param {Object} adminCancelResult The object containing the booking cancellation data.
     */
    setAdminCancellationResult(adminCancelResult) {
        this.adminCancelResult = adminCancelResult.result;
        this.notifyObservers();
    }

    /**
     * Resets the data contained in the admin cancellation result property.
     */
    emptyAdminCancellationResult() {
        this.adminCancelResult = null;
        this.notifyObservers();
    }

    /**
     * Populates the booked pass properties using the data contained in the bookedPassData.
     * @param {Object} bookedPassData The object containing the booked pass properties.
     */
    populateBookedPassData(bookedPassData) {
        this.bookedPassDate = bookedPassData.date;
        this.bookedPassRoomNumber = bookedPassData.roomNumber;
        this.bookedPassRange = bookedPassData.passRange;
        this.notifyObservers();
    }

    /**
     * Resets the data contained in the booked pass properties.
     */
    emptyBookedPassData() {
        this.bookedPassDate = null;
        this.bookedPassRoomNumber = null;
        this.bookedPassRange = null;
        this.notifyObservers();
    }

    /**
     * Set the week schedule information in the property bookingSchedule.
     * @param {Object} bookingSchedule The week schedule filled with the information about the laundry slots.
     */
    populateBookingSchedule(bookingSchedule) {
        this.bookingSchedule = bookingSchedule;
        this.notifyObservers();
    }

    /**
   * Reset the schedule information.
   */
    emptyBookingSchedule() {
        this.bookingSchedule = null;
        this.notifyObservers();
    }

    /**
     * Set the recent booking information in the property bookedSlot.
     * @param {string} date The number related to the booked room.
     * @param {int} roomNum The date of the booked laundry pass.
     * @param {string} range The time frame that the booked pass has.
     */
    populateBookingSlot(date, roomNum, range) {
        this.bookedSlot = [date, roomNum, range];
        this.notifyObservers();
    }

    /**
     * Reset the information about the recent booking.
     */
    emptyBookingSlot() {
        this.bookedSlot = null;
        this.notifyObservers();
    }

    /**
     * The selected laundry slot that the user gets the time to decide on booking.
     * @param {string} date The number related to the booked room.
     * @param {int} roomNum The date of the booked laundry pass.
     * @param {string} range The time frame that the booked pass has.
     * @param {string} username The owner of the booked laundry slot.
     */
    selectBooking(date, roomNum, range, username) {
        this.selectedDate = date;
        this.selectedRoomNum = roomNum;
        this.selectedRange = range;
        this.selectedUsername = username;
        this.notifyObservers();
    }

    /**
     * Reset all the information about the laundry user selection .
     */
    emptySelectedBooking() {
        this.selectedRoomNum = null;
        this.selectedDate = null;
        this.selectedRange = null;
        this.selectedUsername = null;
        this.notifyObservers();
    }

    /**
     * The value that decided if the form for booking a laundry slot is shown or not.
     * @param {boolean} status The status to whether show the form or not.
     */
    setShowInfo(status) {
        this.showInfo = status;
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
            this.emptyErrorData();
            this.reportError(status, error);
            return;
        }

        let message = '';

        error.errors.forEach((err) => {
            this.emptyErrorData();
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

export default BookingModel;
