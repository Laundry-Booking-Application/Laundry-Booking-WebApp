import React from 'react';
import useModelProp from '../useModelProp';
import NavigationOptionsAdministratorView from '../views/navigationOptionsAdministratorView';
import NavigationOptionsResidentView from '../views/navigationOptionsResidentView';
import privileges from '../privilegeEnum';
import { toast } from 'react-toastify';

function NavigationOptions({ userModel, bookingModel, bookingScheduleHref, children }) {
    const userPrivilege = useModelProp(userModel, 'privilege');
    const registeredUsernameData = useModelProp(userModel, 'registeredUsername');
    const cancellationResult = useModelProp(bookingModel, 'cancellationResult');
    const [registerResidentComponent, showBookedPassComponent] = children;

    if (registeredUsernameData) {
        let registerMessage = `New resident account has been registered with the username: ${registeredUsernameData}`;
        toast.success(registerMessage, {
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

    if (cancellationResult !== null) {
        if (cancellationResult === true) {
            let cancellationMessage = `Your laundry pass has been successfully cancelled!`;
            toast.success(cancellationMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            });
            bookingModel.emptyCancellationResult();
        }
        else {
            let cancellationMessage = `An error has occurred while cancelling your laundry pass!`;
            toast.error(cancellationMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            });
            bookingModel.emptyCancellationResult();
        }
    }

    if (userPrivilege === privileges.Administrator) {
        return React.createElement(NavigationOptionsAdministratorView, {
            bookingScheduleHref: bookingScheduleHref,
            registerResidentComponent: registerResidentComponent
        });
    }

    return React.createElement(NavigationOptionsResidentView, {
        bookingScheduleHref: bookingScheduleHref,
        showBookedPassComponent: showBookedPassComponent
    });
}

export default NavigationOptions;