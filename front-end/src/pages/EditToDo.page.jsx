import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar.component";
import useFetch from "../hooks/useFetch.hook";
import instance from "../utils/axios.instance";
import TodoForm from "../components/todo-form/todo-form.component";

export default function EditTodo() {
  const { state } = useLocation();
  const { _id } = state;
  const navigate = useNavigate();
  const toast = useToast();
  const { data, loading} = useFetch(`/todo/${_id}`, "get");
  const [formFields, setFormFields] = useState({ name: "", description: "" });
  const { name, description } = formFields;

  useEffect(() => {
    if (data && data?.todo) {
      setFormFields({
        name: data.todo.name,
        description: data.todo.description,
      });
    }
  }, [data]);

  const updateTodoHandler = useCallback(async () => {
    try {
      await instance({
        url: "/todo/update",
        method: "patch",
        data: { _id, ...formFields },
      });
      toast({
        title: "Update!",
        description: `Todo ${name} updated successfully.`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/todo");
      }, 1000);
    } catch (error) {
      toast({
        title: "Update Failed!",
        description: `Todo ${name} failed to update.`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [_id, formFields]);

  const handleInputChange = useCallback((event) => {
    const { name: input_name , value } = event.target;
    setFormFields( prevState => ({ ...prevState, [input_name]: value }));
  }, [formFields]);

  return (
    <Flex flexDirection={"column"} m={{base:'2%', md: "150px"}} mt={{base:"20px", md: '20px'}} spacing='100px'>
      <Navbar />
      <Spacer />
      <Heading size='lg' margin={'auto'} mt={'50px'}>Edit Todo {name}</Heading>
      <Box>
      {loading && <Spinner size={"xl"} color="red" />}
      {data && data?.todo ? (
      <TodoForm name={name} submitBtnName='Update' description={description} inputHandler= {handleInputChange} buttonHandler = {updateTodoHandler} />
        ) : null}
      </Box>
    </Flex>
  );
}
