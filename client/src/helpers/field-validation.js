import validator from 'validator';

export const required = value => {
    if (!value) {
      return (
        <div role="alert">
          This field is required!
        </div>
      );
    }
};

export const checkemail = value => {
    if (!validator.isEmail(value)) {
        return (
        <div role="alert">
            This is not a valid email.
        </div>
        );
    }
};

export const checkpassword = (value, props, components) => {
    if (value !== components['password'][0].value) { 
      return <span className="error">Passwords are not equal.</span>
    }
};