import React from 'react';

/**
 * Listen to the hash changes to show a specific page with its components.
 * @param {String} hash The url tag that refers to a specific page to show.
 * @param {React Component} children The components that are related to the page.
 * @returns The page with its components. 
 */
function ViewManager({ hash, children }) {
  const [, setRoute] = React.useState(window.location.hash);
  React.useEffect(function () {
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