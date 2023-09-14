import { Stack, Heading, Flex, Box, Spacer } from "@chakra-ui/react";
import SignIn from "../components/sign-in/sign-in.component";
import SignUp from "../components/sign-up/sign-up.component";

export default function Home() {
  return (
    <Stack m={{base: '2px', md: '150px'}} mt={{base:'30px', md: '30px'}}>
      
      <Heading>Log In / Sign Up</Heading>
      <Flex flexDirection="row" m={{base:'10px', md:'40px'}} mt={'50px'} wrap='wrap' width={'100%'} spacing='200px'>
        <SignIn />
        <Spacer/>
        <SignUp />
      </Flex>
    </Stack>
    
  );
}
