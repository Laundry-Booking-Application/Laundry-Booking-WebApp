import LaundryData from "./laundryData";

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
        this.showInfo = false;
        this.bookedPassDate = null;
        this.bookedPassRoomNumber = null;
        this.bookedPassRange = null;
        this.cancellationResult = null;
        this.adminCancelResult = null;
        this.errorData = null;
    }

    /**
     * Get the booking schedule that is intended for the administrators.
     * @param {string} week The requested week to get the laundry passes' schedule for.
     *                      This parameter is relative to the current week, e.g. -2 is two weeks before the current week.
     */
    getAdministratorBookingSchedule(week) {
        LaundryData.getPasses(week)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.populateBookingSchedule(data.success);
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
     * Get the booking schedule that is intended for the residents.
     * @param {string} week The requested week to get the laundry passes' schedule for.
     *                      Accepted values are -1, 0 and 1 for previous, current and next week respectively.
     */
    getResidentBookingSchedule(week) {
        LaundryData.getResidentPasses(week)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.populateBookingSchedule(data.success);
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


    populateBookingSchedule(bookingSchedule) {
        this.bookingSchedule = bookingSchedule;
        this.notifyObservers();
    }

    /**
   * Reset the information about the logged in user.
   */
    emptyBookingScheduleModelData() {
        this.bookingSchedule = null;
        this.notifyObservers();
    }

    bookChosenSlot(roomNum, date, range) {
        LaundryData.bookPass(roomNum, date, range)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        const date = data.success.date;
                        const roomNum = data.success.roomNumber;
                        const range = data.success.passRange;
                        this.populateBookingSlot(date, roomNum, range);
                        this.emptySelectedBooking();
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
        return;
    }

    populateBookingSlot(date, roomNum, range) {
        this.bookedSlot = [date, roomNum, range];
        this.notifyObservers();
    }

    selectBooking(date, roomNum, range, username) {
        this.selectedDate = date;
        this.selectedRoomNum = roomNum;
        this.selectedRange = range;
        this.selectedUsername = username;
        this.notifyObservers();
    }

    emptySelectedBooking() {
        this.selectedRoomNum = null;
        this.selectedDate = null;
        this.selectedRange = null;
        this.selectedUsername = null;
        this.notifyObservers();
    }

    setShowInfo(status) {
        this.showInfo = status;
        this.notifyObservers();
    }

    clearBookedSlot() {
        this.bookedSlot = null;
        this.notifyObservers();
    }

    /**
     * Gets information about the booked laundry pass of the currently logged-in user.
     */
    getBookedPass() {
        LaundryData.getBookedPass()
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.populateBookedPassData(data.success);
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyBookedPassData();
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
                        this.updateCancellationResult(data.success);
                        this.getBookedPass();
                    });
                } else {
                    result.json().then((data) => {
                        this.emptyCancellationResult();
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
     * Cancels a booked laundry pass.
     * @param {int} roomNumber The laundry room number.
     * @param {string} date The date that the active laundry pass is booked on.
     * @param {string} passRange The time frame that the pass has.
     */
     cancelBookedPassAsAdmin(roomNumber, date, passRange) {
        LaundryData.cancelBookedPass(roomNumber, date, passRange)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        this.setAdminCancellationResult(data.success);
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
     * Updates the booking cancellation result property using the data contained in the cancellationData.
     * @param {Object} cancellationData The object containing the booking cancellation data.
     */
    updateCancellationResult(cancellationData)
    {
        this.cancellationResult = cancellationData.result;
        this.notifyObservers();
    }

    /**
     * Resets the data contained in the cancellation result property.
     */
    emptyCancellationResult()
    {
        this.cancellationResult = null;
        this.notifyObservers();
    }

    /**
     * Updates the booking cancellation result property using the data contained in the cancellationData.
     * @param {Object} cancellationData The object containing the booking cancellation data.
     */
    setAdminCancellationResult(adminCancelResult) {
        this.adminCancelResult = adminCancelResult.result;
        this.notifyObservers();
    }

    /**
     * Resets the data contained in the cancellation result property.
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


    populateBookingSchedule(bookingSchedule) {
        this.bookingSchedule = bookingSchedule;
        this.notifyObservers();
    }

    /**
   * Reset the information about the logged in user.
   */
    emptyBookingScheduleModelData() {
        this.bookingSchedule = null;
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

export default BookingModel;
