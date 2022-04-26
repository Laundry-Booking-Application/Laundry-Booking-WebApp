import React from 'react';

/**
 * Responsible to observe a specific attribute of a class.
 * @param {Class} model The class that is desired to be observed upon.
 * @param {string} prop The class property name that is desired to be observe upon.
 * @returns {any} The new value after any change.
 */
function useModelProp(model, prop) {
  const [propValue, setPropValue] = React.useState(model[prop]);
  React.useEffect(
    function () {
      const obs = () => setPropValue(model[prop]);
      model.addObserver(obs);
      return () => model.removeObserver(obs);
    },
    [model, prop]
  );
  return propValue;
}

export default useModelProp;