import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName})

        } catch(e) {
            if(e.code === 'auth/email-already-in-use'){
                alert('Email already in use');
            }else {
                console.log(e.message);
            }
        }
    
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
        resetFormFields();
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>

            <form onSubmit={handleSubmit}>
            <FormInput
                label='Display Name'
                 type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                
                <FormInput label='Email'
                type="email" required onChange={handleChange} name="email" value={email} />
                
                <FormInput label='password'
                type="password" required onChange={handleChange} name="password" value={password}/>
                <FormInput label='Confirm password'
                type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button type="submit">
                    SIGN UP
                </Button>
            </form>
        </div>
    )

}
export default SignUpForm;