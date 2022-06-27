import * as yup from "yup";

export const passwordSchema = yup.object().shape({
    password: yup.string().required('Please Enter your password')
        .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Must contain 8 characters, at least one letter and one number"
        ),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords does not match'),
});

export const loginSchema = yup.object().shape({
    email: yup.string().email().required('Please enter your email address'),
    password: yup.string().required('Please enter your password'),
});

export const donorCreateSchema = yup.object().shape({
    firstName: yup.string().min(3).required('Please enter a first name'),
    email: yup.string().email().required('Please enter an email address'),
});

export const shopperCreateSchema = yup.object().shape({
    firstName: yup.string().min(3).required('Please enter a first name'),
    email: yup.string().email().required('Please enter an email address'),
    clothingSize: yup.array().required('Please enter your clothing size'),
    shoeSize: yup.array().required('Please enter your shoe size'),
    currentStatus: yup.string().required('Please enter your current status'),
    deliveryAddress: yup.object()
    .shape({
        firstLine: yup.string().required('Please enter the first line of your address'),
        city: yup.string().required('Please enter a city'),
        postcode: yup.string().required('Please enter a postcode')
    })
});

export const adminSchema = yup.object().shape({
    firstName: yup.string().min(3).required('Please enter a first name'),
    email: yup.string().email().required('Please enter an email address'),
});

export const newThread = yup.object().shape({
    subject: yup.string().required('Please enter a message subject'),
    message: yup.string().required('Please type your message'),
    recipient: yup.string().required('Please select a recipient')
});

export const newThreadUser = yup.object().shape({
    subject: yup.string().required('Please enter a message subject'),
    message: yup.string().required('Please type your message')
});

export const newMessage = yup.object().shape({
    message: yup.string().required('Please type your message')
});

export const shopSettingsSchema = yup.object().shape({
    shopItemLimit: yup.number().required('Please set a limit'),
    trustedDonorLimit: yup.number().required('Please set a limit'),
});

export const locationCreateSchema = yup.object().shape({
    name: yup.string().min(3).required('Please give your location a name'),
    firstLine: yup.string().min(3).required('Please enter the first line of the address'),
    postcode: yup.string().min(3).required('Please enter a postcode')
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

export const itemCreateschema = yup.object().shape({
    name: yup.string().required('Please enter a name'),
    category:  yup.string().required('Please enter a category'),
    subCategory:  yup.string().required('Please enter a sub-category'),
    photos: yup.array().min(2, 'Please upload a front and back image') 
});

