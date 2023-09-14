import React, { useCallback, useState } from 'react'
import {
    FormControl,
    Heading, Button, useToast,
  } from '@chakra-ui/react'
import FormInput from '../form-input/form-input.component';
import instance from '../../utils/axios.instance';

const INITIAL_STATE = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
}

function SignUp() {
    const [formFields, setFormFields] = useState(INITIAL_STATE)
    const {username, password, confirmPassword, email} = formFields;
    const toast = useToast();

    const onChangeHandler = useCallback((event) => {
        const value = event.target.value;
        const name = event.target.name;
        setFormFields({...formFields, [name]: value})
    }, [formFields])

    const onSubmitHandler = () => {
        instance({
          method: "post",
          url: "/auth/register",
          data: { ...formFields },
        }).then(response => toast({
          title: "User Created!",
          description: `User: ${response.data} created successfully.`,
          status: "success",
          duration: 2000,
          isClosable: true,
        }))
    }

    const disable = (password !== confirmPassword || username.length < 3 || password.length < 6 || !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i))
  return (
    <FormControl width={{base: '90%', md: "90%", lg:'35%'}} mt={{base: '40px', md: '40px', lg: '0px'}} isInvalid={``}>
        <Heading size={"lg"}>Sign Up</Heading>
        <FormInput labelName='Username' type='text' name="username" value={username} onChangeHandler={onChangeHandler} required />
        <FormInput labelName='Password' type='password' name="password" value={password} onChangeHandler={onChangeHandler} required />
        <FormInput labelName='Confirm Password' type='password' name="confirmPassword" value={confirmPassword} onChangeHandler={onChangeHandler} required />
        <FormInput labelName='Email' type='email' name="email" value={email} onChangeHandler={onChangeHandler} required />
        <Button isDisabled={disable} colorScheme='teal' size='md' mt={'20px'} onClick={onSubmitHandler}>
        Sign Up
        </Button>
    </FormControl>

    // <div className='sign-in-container'>
    //   <h2>Sign Up</h2>
    //   <form onSubmit={onSubmitHandler}>
    //   <input name="username" type='text' placeholder='Username' required onChange={changeHandler}/>
    //   <input name="email" type='email' placeholder='Email' required onChange={changeHandler}/>
    //   <input name="password" type='password' placeholder='Password' required onChange={changeHandler}/>
    //   <input name="confirmPassword" type='password' placeholder='Confirm Password' required onChange={changeHandler}/>
    //   <input type='submit' placeholder='Sign Up' />
    //   </form>
    //   </div>
  )
}

export default SignUp;