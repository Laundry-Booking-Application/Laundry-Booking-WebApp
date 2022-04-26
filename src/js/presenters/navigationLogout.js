import React from 'react';
import useModelProp from '../useModelProp';
import NavigationLogoutView from '../views/navigationLogoutView'

/**
 * The presenter for logging out process and routes the user for the homepage.
 * @param {UserModel} userModel The object includes data about user information.
 * @param {string} goToHomePageHref The hash value for the homepage.
 * @returns {NavigationLogoutView} An element to logout the user.
 *                                 The element function changes depending on the login status.
 */
function NavigationLogout({userModel, goToHomePageHref}) {
    const modelUsername = useModelProp(userModel, 'username');

    return React.createElement(NavigationLogoutView, {
        username: modelUsername,
        handleLogout: () => userModel.logoutUser(),
        navHomePageHref: goToHomePageHref
    });
}

export default NavigationLogout;