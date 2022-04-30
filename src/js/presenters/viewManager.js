import React from 'react';

/**
 * Listen to the hash changes to show a specific page with its components.
 * @param {Object} {hash, children} hash The url tag that refers to a specific page to show.
 *                                  children The components that are related to the page.
 * @return {Component} The page with its components.
 */
function ViewManager({hash, children}) {
    const [, setRoute] = React.useState(window.location.hash);
    React.useEffect(function() {
        // eslint-disable-next-line require-jsdoc
        function hashChangeListener() {
            setRoute({});
        }
        window.addEventListener('hashchange', hashChangeListener);

        return () =>
            window.removeEventListener('hashchange', hashChangeListener, false);
    }, []);
    return hash === window.location.hash ? children : false;
}

export default ViewManager;
