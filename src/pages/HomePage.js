import React from 'react'
import { Container, Box, Text, Tabs, Tab, TabPanels, TabPanel, TabList } from '@chakra-ui/react'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'

const HomePage = () => {
  return (
    <Container maxW='xl' centerContent={true} >
      <Box d="flex" justifyContent="center" p={3} bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
        <Text fontSize="4xl" fontFamily="Work sans" >MyChat App</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded'>
          <TabList mg="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage