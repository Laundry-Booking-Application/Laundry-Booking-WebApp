import React from 'react';
import useModelProp from '../useModelProp';
import NavigationOptionsAdministratorView from '../views/navigationOptionsAdministratorView';
import NavigationOptionsResidentView from '../views/navigationOptionsResidentView';
import privileges from '../privilegeEnum';
import {toast} from 'react-toastify';

function NavigationOptions({userModel, bookingScheduleHref, children}) {
    let userPrivilege = useModelProp(userModel, 'privilege');
    let registeredUsernameData = useModelProp(userModel, 'registeredUsername');
    const registerResidentComponent = children;

    if (registeredUsernameData) {
        let message = `New resident account has been registered with the username: ${registeredUsernameData}`;
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored"
        });
        userModel.clearRegisteredUsername();
    }

    if (userPrivilege === privileges.Administrator) {
        return React.createElement(NavigationOptionsAdministratorView, {
            bookingScheduleHref: bookingScheduleHref,
            registerResidentComponent : registerResidentComponent
        });
    }

    return React.createElement(NavigationOptionsResidentView, {
        bookingScheduleHref: bookingScheduleHref
    });
}

export default NavigationOptions;