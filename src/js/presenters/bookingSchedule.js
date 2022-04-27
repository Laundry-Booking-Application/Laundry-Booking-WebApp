import React from 'react';
import useModelProp from '../useModelProp';
import privileges from '../privilegeEnum';
import BookingScheduleAdministratorView from '../views/bookingScheduleAdministratorView';
import BookingScheduleResidentView from '../views/bookingScheduleResidentView';
import UnauthorizedAccessView from '../views/unauthorizedAccessView';
import WaitingDataView from '../views/waitingDataView';

function BookingSchedule({userModel, bookingModel}) {
    const [week, setWeek] = React.useState('0');
    let loginStatus = useModelProp(userModel, 'loginStatus');
    let userPrivilege = useModelProp(userModel, 'privilege');
    let bookingSchedule = useModelProp(bookingModel, 'bookingSchedule');

    React.useEffect(
        function () {
            if (loginStatus) {
                if (userPrivilege === privileges.Administrator) {
                    bookingModel.getAdministratorBookingSchedule(week);
                }
                if (userPrivilege === privileges.Standard) {
                    bookingModel.getResidentBookingSchedule(week);
                }
            }
        },
        [loginStatus, week]
    );
    
    if (bookingSchedule === null) {
        return React.createElement(WaitingDataView, {});
    }

    if (loginStatus) {
        if (userPrivilege === privileges.Administrator) {
            return React.createElement(BookingScheduleAdministratorView, {
                setWeek: (week) => setWeek(week),
                bookingSchedule: bookingSchedule
            });
        }

        return React.createElement(BookingScheduleResidentView, {
            setWeek: (week) => setWeek(week),
            bookingSchedule: bookingSchedule
        });
    }

    return React.createElement(UnauthorizedAccessView, {});
}

export default BookingSchedule;