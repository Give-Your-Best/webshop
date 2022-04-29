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
    email: yup.string().email().required(),
    password: yup.string().required('Please enter your password'),
});

export const donorCreateSchema = yup.object().shape({
    firstName: yup.string().min(3).required(),
    email: yup.string().email().required(),
    type: yup.string().min(3).required('Select a type'),
    password: yup.string().required('Please Enter your password')
});

export const shopperCreateSchema = yup.object().shape({
    firstName: yup.string().min(3).required(),
    email: yup.string().email().required(),
    clothingSize: yup.array().required(),
    shoeSize: yup.array().required(),
    currentStatus: yup.string().required(),
    referredBy: yup.string().required(),
    shoppingFor: yup.number().required(),
    deliveryAddress: yup.object()
    .shape({
        firstLine: yup.string(),
        city: yup.string(),
        postcode: yup.string()
    })
});

export const adminSchema = yup.object().shape({
    email: yup.string().email().required(),
    assignedRole: yup.string().required(),
});

export const shopSettingsSchema = yup.object().shape({
    shopItemLimit: yup.number().required(),
    trustedDonorLimit: yup.number().required(),
});

export const locationCreateSchema = yup.object().shape({
    name: yup.string().min(3).required(),
    firstLine: yup.string().min(3).required(),
    postcode: yup.string().min(3).required()
});

export const updatePasswordSchema = yup.object().shape({
    oldPassword: yup.string().required('Please enter your current password'),
    newPassword: yup.string().required('Please enter a new password')
        .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
        ),
    passwordConfirm: yup.string().oneOf([yup.ref('newPassword')], 'Passwords does not match'),
});

