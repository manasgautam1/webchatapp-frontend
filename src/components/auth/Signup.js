import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack , Button, useToast} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    
    const toast = useToast();

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: 'Please select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "MyChatApp");
            data.append('cloud_name', "manasgautam1");
            fetch("https://api.cloudinary.com/v1_1/manasgautam1/image/upload", {
                method: 'post',
                body: data,    
            })
                .then(res => res.json())
                .then(data => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                })
        }
        else {
            toast({
                title: 'Please select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return;
        }
    }
    const SubmitHandler = async () => { 
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
           toast({
                title: 'Passwords do not match!',
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
            const { data } = await axios.post("http://localhost:5000/api/user",
                { name, email, password, pic },
                config
            );
            toast({
                title: 'Registration Successfull',
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
                title: 'Error Occurred ',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
        }
    }

    return <VStack spacing='5px'>
        <FormControl id='first-name-signup' isRequired>
            <FormLabel>Name</FormLabel>  
            <Input value={name} placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} />
        </FormControl>

        <FormControl id='email-signup' isRequired >
            <FormLabel>Email</FormLabel>
            <Input value={email} placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} />
        </FormControl>

        <FormControl id='password-signup' isRequired >
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

        <FormControl id='confirm-password-signup' isRequired >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup >
                <Input value={confirmPassword} type={show ? 'text' : 'password'} placeholder='Enter your password again' onChange={(e) => setConfirmPassword(e.target.value)} />
                <InputRightElement width='4.5rem'>
                    <Button h="1.75rem" size='sm' onClick={()=>{setShow(!show)}}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='pic' >
            <FormLabel>Upload you picture</FormLabel>
            <Input type='file' accept='image/*' p={1.5} onChange={(e)=>postDetails(e.target.files[0])} />
        </FormControl>

        <Button colorScheme='blue' width='100%' style={{marginTop: 15}} onClick={SubmitHandler} isLoading={loading}>
            Sign up
        </Button>
    </VStack>
}

export default Signup