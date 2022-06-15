import {useState} from 'react';

import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName:'',
  email:'',
  password:'',
  confirmPassword:''
}



const SignUpForm = ()=>{

  
  const [formFields,setFormFields] = useState(defaultFormFields);
  const {displayName,email,password,confirmPassword} = formFields;
  

  const resetFormFields = ()=>{
    setFormFields(defaultFormFields);
  }
  const onChangeHandler = (event)=>{
  const {name,value} = event.target;

    setFormFields({...formFields,[name]:value})
  }
  const handleSubmit = async (event)=>{
    event.preventDefault();
  
  try{
    const {user} = await createAuthUserWithEmailAndPassword(email,password);
  
    await createUserDocumentFromAuth(user,{displayName});
    resetFormFields();

  }catch(error){
    if(error.code === 'auth/email-already-in-use')
    {
      alert('email already in use try with another email')
      return
    }
    console.log('creation user encountered error',error);
  }
    
  }
  return(
    <div className='sign-up-container'>
      <h2>Do you have an account?</h2>
      <span>Sign Up with Email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Name' required type="text" name='displayName' value={displayName} onChange={onChangeHandler}/>
        <FormInput label='Email' required type="email" name='email' value={email} onChange={onChangeHandler}/>
        <FormInput label='Password' required type="password" name='password' value={password} onChange={onChangeHandler}/>
        <FormInput label='Confirm Password' required type="password" name='confirmPassword' value={confirmPassword} onChange={onChangeHandler}/>
        <Button type='submit'>Sign Up</Button>       
      </form>
    </div>
  );
}

export default SignUpForm;