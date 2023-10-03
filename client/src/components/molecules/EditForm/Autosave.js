import * as React from 'react';
import { useFormikContext } from 'formik';
import { Notification } from '../../atoms';

const debounce = (func, wait) => {
  let timeout;

  return function (...args) {
    const context = this;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};

const notificationConfig = ['Success!', 'changes saved', 'success', 5];

export const AutoSave = ({ delay = 1500 }) => {
  const initRef = React.useRef(true);

  const { errors, submitForm, values } = useFormikContext();

  const handleSave = React.useCallback(() => {
    Notification(...notificationConfig);
    submitForm();
  }, [submitForm]);

  const debouncedSubmit = React.useMemo(
    () => debounce(handleSave, delay),
    [handleSave, delay]
  );

  React.useEffect(() => {
    // This is the initial render, or there are errors, or we can call submit
    initRef.current || Object.keys(errors)[0] || debouncedSubmit();
  }, [debouncedSubmit, errors, values]);

  React.useEffect(() => {
    // Update the ref on the first load
    initRef.current = false;
  }, []);

  return null;
};
