import React from 'react';
import HomepageView from '../views/homepageView';

/**
 * The presenter for creating the home page.
 * @returns {HomepageView} The home page of the website that includes a text about the application.
 */
function Homepage() {
    return React.createElement(
        React.Fragment,
        {},
        React.createElement(HomepageView, {})
    );
}

export default Homepage;