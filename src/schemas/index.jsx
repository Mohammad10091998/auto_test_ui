import * as yup from 'yup';

export const signUpSchema = yup.object({
    name: yup.string()
        .matches(/^[a-zA-Z ]+$/, 'name must contain only alphabetic characters')
        .min(3)
        .max(25)
        .required("please enter valid name"),
    email: yup.string()
        .email()
        .required('please enter a valid email'),
    password: yup.string()
        .min(6)
        .max(8)
        .required('password is required')
});

export const loginSchema = yup.object({
    email: yup.string()
        .email()
        .required('please enter a valid email'),
    password: yup.string()
        .min(6)
        .max(8)
        .required('password is required')
})

export const passwordLessSchema = yup.object({
    email: yup.string()
        .email()
        .required('please enter a valid email'),
})