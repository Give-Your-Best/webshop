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

export const AutoSave = ({ delay = 2000 }) => {
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
    initRef.current || Object.keys(errors)[0] || debouncedSubmit();
  }, [debouncedSubmit, errors, values]);

  React.useEffect(() => {
    initRef.current = false;
  }, []);

  return null;
};
