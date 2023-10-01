import * as React from 'react';
import { useFormikContext } from 'formik';

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

export const withAutoSave = (Component) => (props) => {
  const { isEnabled, notify, wait = 1000, ...rest } = props;

  const formik = useFormikContext();

  console.log({ formik });

  const { errors, submitForm, values } = formik;

  const handleSave = React.useCallback(
    () => submitForm().then(() => notify()),
    [notify, submitForm]
  );

  const debouncedSubmit = React.useMemo(
    () => debounce(handleSave, wait),
    [handleSave, wait]
  );

  React.useEffect(() => {
    !isEnabled || Object.keys(errors)[0] || debouncedSubmit();
  }, [debouncedSubmit, errors, isEnabled, values]);

  return <Component {...rest} />;
};
