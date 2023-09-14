import { Box, Flex, Heading, Spacer, Spinner } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import useFetch from "../hooks/useFetch.hook";
import Navbar from "../components/navbar/navbar.component";
import CardList from "../components/card-list/card-list.component";
import { TodoContext } from "../context/todo";

export default function ToDo() {
  const { user } = useContext(AuthContext);
  const { todos, dispatch } = useContext(TodoContext);
  const { data, loading } = useFetch("/todo/", "get");

  useEffect( () => {
    function setToDo(){
      if(data?.todos?.length > 0 ) {
      dispatch({type: "SET_TODOS", payload: data.todos})
      }
    }
    setToDo();
  }, [data, dispatch])

  return (
    <Flex flexDirection={"column"} m={{base: '4%', md:"15%"}} mt={{base: "20px", md: '20px'}}>
      <Navbar />
      <Spacer />
      <Box>
        {!user && (
          <Heading mt={"100px"}>Sign In/Sign Up To Use ToDo App</Heading>
        )}
        {loading && (
          <Spinner
            color="red.500"
            mt={"100px"}
            size="xl"
            textAlign={"center"}
          />
        )}
        <CardList todos = {todos} />
      </Box>
    </Flex>
  );
}
