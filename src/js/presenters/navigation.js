import React from 'react';
import useModelProp from '../useModelProp';
import NavigationView from '../views/navigationView';
import {toast} from 'react-toastify';

/**
 * The presenter for creating the navigation bar in the website. 
 * The navigation has multiple buttons that get changed depending on the login status.
 * The navigation will be responsible to show error messages for encountered general errors.
 * @param {UserModel} userModel The object includes data about user information.
 * @param {string} homepageHref The hash value for the homepage.
 * @param {Component} children The components that are going to be rendered.
 * @returns {NavigationView} An element with the navigation components depending on the login status.
 */
function Navigation({userModel, bookingModel, homepageHref, children}) {
    const loginStatus = useModelProp(userModel, 'loginStatus');
    const [navigationLoginComponent, navigationLogoutComponent, navigationOptionsComponent] = children;
    const errorDataUser = useModelProp(userModel, 'errorData');
    const errorDataBooking = useModelProp(bookingModel, 'errorData');
    const [toggleState, setToggleState] = React.useState(false);
    
    
    if (errorDataUser) {
        toast.error(errorDataUser.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
        userModel.emptyErrorData();
    }

    if (errorDataBooking) {
        toast.error(errorDataBooking.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
        bookingModel.emptyErrorData();
    }

    if (loginStatus) {
        return React.createElement(NavigationView, {
            component: [navigationOptionsComponent, navigationLogoutComponent],
            toggleState: toggleState,
            setToggleState: () => setToggleState(!toggleState),
            handleClose: () => setToggleState(false),
            homepageHref: homepageHref
        });
    }

    return React.createElement(NavigationView, {
        component: navigationLoginComponent,
        toggleState: toggleState,
        setToggleState: () => setToggleState(!toggleState),
        handleClose: () => setToggleState(false),
        homepageHref: homepageHref
    });
}

export default Navigation;