import React from 'react';
import useModelProp from '../useModelProp';
import NavigationOptionsAdministratorView from '../views/navigationOptionsAdministratorView';
import NavigationOptionsResidentView from '../views/navigationOptionsResidentView';
import privileges from '../privilegeEnum';

function NavigationOptions({userModel, bookingScheduleHref}) {
    let userPrivilege = useModelProp(userModel, 'privilege');

    if (userPrivilege === privileges.Administrator) {
        return React.createElement(NavigationOptionsAdministratorView, {
            bookingScheduleHref: bookingScheduleHref
        });
    }

    return React.createElement(NavigationOptionsResidentView, {
        bookingScheduleHref: bookingScheduleHref
    });
}

export default NavigationOptions;