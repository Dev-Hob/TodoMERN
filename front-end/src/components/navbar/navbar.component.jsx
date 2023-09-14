import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const {user , dispatch: authDispatch} = useContext(AuthContext)
    const navigate = useNavigate()
    const signInClick = () => {
        navigate("/");
      };
    
      const logOutHandler = () => {
        authDispatch("LOGOUT_USER");
        navigate("/")
      };
      
      const createTodoHandler = () => {
        navigate("/todo/create");
      };

    return (
        <Box>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box>
          <Link to={'/todo'}>
          <Heading size="md">{user?.username ? `${user.username}'s`: null} TODO</Heading>
          </Link>
          </Box>
          <Spacer />
          {!user ? (
            <ButtonGroup gap="2">
              <Button colorScheme="teal" size={"md"} onClick={signInClick}>
                Log In | Sign Up
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <Button colorScheme={"teal"} onClick={createTodoHandler}>
                Create ToDo
              </Button>
              <Button
                colorScheme={"gray"}
                color={"red.500"}
                onClick={logOutHandler}
              >
                Log Out
              </Button>
            </ButtonGroup>
          )}
        </Flex>
      </Box>
    )
}

export default Navbar