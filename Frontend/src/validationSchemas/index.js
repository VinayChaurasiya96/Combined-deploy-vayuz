import * as Yup from 'yup'

export const signupSchema = Yup.object({
    username: Yup.string().min(2).max(25).required("please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).max(18).required("Please enter your password"),
    level: Yup.string().required("please select level")
});