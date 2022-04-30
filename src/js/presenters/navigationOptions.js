import React from 'react';
import useModelProp from '../useModelProp';
import NavigationOptionsAdministratorView from '../views/navigationOptionsAdministratorView';
import NavigationOptionsResidentView from '../views/navigationOptionsResidentView';
import privileges from '../privilegeEnum';
import {toast} from 'react-toastify';

/**
 * The presenter for creating the navigation options dropdown menu.
 * @param {Object} {userModel, bookingModel, bookingScheduleHref, children}
 *                 userModel The object that contains data about user information and authentication.
 *                 bookingModel The booking model that contains the necessary functionalities for booking laundry passes.
 *                 bookingScheduleHref Contains a string reference to the booking schedule page hash.
 *                 children The children components to be rendered as part of the navigation options component.
 * @return {NavigationOptionsAdministratorView | NavigationOptionsResidentView}
 *         The proper component depending on the privilege of the logged-in user.
 */
function NavigationOptions({userModel, bookingModel, bookingScheduleHref, children}) {
    const userPrivilege = useModelProp(userModel, 'privilege');
    const registeredUsernameData = useModelProp(userModel, 'registeredUsername');
    const cancellationResult = useModelProp(bookingModel, 'cancellationResult');
    const [registerResidentComponent, showBookedPassComponent] = children;

    React.useEffect(() => {
        if (registeredUsernameData) {
            const registerMessage = `New resident account has been registered with the username: ${registeredUsernameData}`;
            toast.success(registerMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: 'colored',
            });
            userModel.clearRegisteredUsername();
        }

        if (cancellationResult !== null) {
            if (cancellationResult === true) {
                bookingModel.emptyCancellationResult();
                const cancellationMessage = `Your laundry pass has been successfully cancelled!`;
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
            } else {
                bookingModel.emptyCancellationResult();
                const cancellationMessage = `An error has occurred while cancelling your laundry pass!`;
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
            }
        }
    }, [registeredUsernameData, cancellationResult]);

    if (userPrivilege === privileges.Administrator) {
        return React.createElement(NavigationOptionsAdministratorView, {
            bookingScheduleHref: bookingScheduleHref,
            registerResidentComponent: registerResidentComponent,
        });
    }

    return React.createElement(NavigationOptionsResidentView, {
        bookingScheduleHref: bookingScheduleHref,
        showBookedPassComponent: showBookedPassComponent,
    });
}

export default NavigationOptions;
