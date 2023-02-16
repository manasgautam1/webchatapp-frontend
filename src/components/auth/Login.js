import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack , Button, useToast} from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    const toast = useToast();
    
    const SubmitHandler = async () => { 
        setLoading(true);
        if (!email || !password) {
           toast({
                title: 'Please fill all the fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return; 
        }
        try {
            const config = {
                headers : {
                    "Content-type" : "application/json"
                }
            }
            const { data } = await axios.post("http://localhost:5000/api/user/login",
                { email, password},
                config
            );
            toast({
                title: 'Login Successfull',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false);
            navigate('/chats');
        }
        catch (error) {
            toast({
                title: 'Error Occurred',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
        }
    }
  return (
    <VStack spacing='5px'>
        <FormControl id='email' isRequired >
            <FormLabel>Email</FormLabel>
            <Input value={email} placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} />
        </FormControl>

        <FormControl id='password' isRequired >
            <FormLabel>Password</FormLabel>
            <InputGroup >
                <Input value={password} type={show ? 'text' : 'password'} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement width='4.5rem'>
                    <Button h="1.75rem" size='sm' onClick={()=>{setShow(!show)}}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <Button colorScheme='blue' width='100%' style={{marginTop: 15}} onClick={SubmitHandler}>
            Login
          </Button>
          
          <Button variant='solid' colorScheme='red' width='100%' onClick={() => {
              setEmail('guest@example.com');
              setPassword('123456');
          }} isLoading={loading} >
            Get Guest User Credentials
          </Button>
    </VStack>
  )
}

export default Login