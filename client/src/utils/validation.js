import * as yup from "yup";

export const signupSchema = yup.object().shape({
    username: yup.string().min(3).required(),
    email: yup.string().email().required(),
    type: yup.string().min(3).required('Select a type'),
    password: yup.string().required('Please Enter your password')
        .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
        ),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords does not match'),
});

export const loginSchema = yup.object().shape({
    username: yup.string().min(3).required(),
    password: yup.string().required('Please enter your password'),
});

