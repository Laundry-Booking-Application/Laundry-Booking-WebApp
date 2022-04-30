import React from 'react';
import useModelProp from '../useModelProp';
import privileges from '../privilegeEnum';
import BookingScheduleAdministratorView from '../views/bookingScheduleAdministratorView';
import BookingScheduleResidentView from '../views/bookingScheduleResidentView';
import UnauthorizedAccessView from '../views/unauthorizedAccessView';
import WaitingDataView from '../views/waitingDataView';
import {toast} from 'react-toastify';

/**
 * The presenter for creating the laundry pass booking schedule form.
 * @param {Object} {userModel, bookingModel, children}
 *                 userModel The object that contains data about user information and authentication.
 *                 bookingModel The booking model that contains the necessary functionalities for booking laundry passes.
 *                 children The children components to be rendered as part of the booking schedule component.
 * @return {WaitingDataView | BookingScheduleAdministratorView | BookingScheduleResidentView | UnauthorizedAccessView}
 *         The proper component depending on the privilege of the logged-in user and the availability of the data.
 */
function BookingSchedule({userModel, bookingModel, children}) {
    const [week, setWeek] = React.useState('0');
    const [date, setDate] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [range, setRange] = React.useState('');
    const [username, setUsername] = React.useState('');
    const loginStatus = useModelProp(userModel, 'loginStatus');
    const userPrivilege = useModelProp(userModel, 'privilege');
    const bookingSchedule = useModelProp(bookingModel, 'bookingSchedule');
    const weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [previousWeek, currentWeek, nextWeek] = [-1, 0, 1];
    const [bookSlotComponent, cancelSlotComponent] = children;
    const bookedSlot = useModelProp(bookingModel, 'bookedSlot');
    const cancellationResult = useModelProp(bookingModel, 'adminCancelResult');

    React.useEffect(
        function() {
            if (loginStatus) {
                if (userPrivilege === privileges.Administrator) {
                    bookingModel.getAdministratorBookingSchedule(week);
                }
                if (userPrivilege === privileges.Standard) {
                    bookingModel.getResidentBookingSchedule(week);
                }
            }
        },
        [loginStatus, userPrivilege, week, bookingModel],
    );

    React.useEffect(() => {
        bookingModel.emptySelectedBooking();
        bookingModel.selectBooking(date, room, range, username);
    }, [date, room, range, username]);


    React.useEffect(() => {
        bookingModel.emptySelectedBooking();
        setWeek(0);
        setDate('');
        setRoom('');
        setRange('');
        setUsername('');
    }, [bookedSlot, cancellationResult]);

    React.useEffect(() => {
        if (bookedSlot) {
            const message = `New booking has been registered. Booking info: Date: ${bookedSlot[0]}, Room: ${bookedSlot[1]}, Range: ${bookedSlot[2]}.`;
            toast.success(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: 'colored',
            });
            bookingModel.emptyBookingSlot();
        }

        if (cancellationResult !== null) {
            if (cancellationResult === true) {
                const cancellationMessage = `The laundry pass has been successfully cancelled!`;
                toast.success(cancellationMessage, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored',
                });
                bookingModel.emptyAdminCancellationResult();
            } else {
                const cancellationMessage = `An error has occurred while cancelling the laundry pass!`;
                toast.error(cancellationMessage, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored',
                });
                bookingModel.emptyAdminCancellationResult();
            }
        }
    }, [bookedSlot, cancellationResult]);

    if (loginStatus) {
        if (bookingSchedule === null) {
            return React.createElement(WaitingDataView, {});
        }

        if (userPrivilege === privileges.Administrator) {
            return React.createElement(BookingScheduleAdministratorView, {
                weekDays: combineArrays(weekDayNames, bookingSchedule.weekDates),
                setWeek: (week) => setWeek(week),
                previousWeek: previousWeek,
                currentWeek: currentWeek,
                nextWeek: nextWeek,
                bookingSchedule: bookingSchedule,
                setDate: setDate,
                setRoom: setRoom,
                setRange: setRange,
                setUsername: setUsername,
                showInfo: () => bookingModel.setShowInfo(true),
                cancelSlotComponent: cancelSlotComponent,
            });
        }

        return React.createElement(BookingScheduleResidentView, {
            weekDays: combineArrays(weekDayNames, bookingSchedule.weekDates),
            setWeek: (week) => setWeek(week),
            previousWeek: previousWeek,
            currentWeek: currentWeek,
            nextWeek: nextWeek,
            bookingSchedule: bookingSchedule,
            setDate: setDate,
            setRoom: setRoom,
            setRange: setRange,
            applyLock: (passRoom, passDate, passRange) => bookingModel.lockPass(passRoom, passDate, passRange),
            showInfo: () => bookingModel.setShowInfo(true),
            bookSlotComponent: bookSlotComponent,
        });
    }

    return React.createElement(UnauthorizedAccessView, {});
}

// eslint-disable-next-line require-jsdoc
function combineArrays(array1, array2) {
    const combined = [];

    for (let i = 0; i < array1.length; i++) {
        combined[i] = array1[i] + ' ' + array2[i];
    }

    return combined;
}

export default BookingSchedule;
