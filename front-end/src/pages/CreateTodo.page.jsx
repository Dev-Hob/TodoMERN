import { Box, Flex, Heading, Spacer, useToast } from "@chakra-ui/react";
import Navbar from "../components/navbar/navbar.component";
import { useCallback, useState } from "react";
import TodoForm from "../components/todo-form/todo-form.component";
import instance from "../utils/axios.instance";

const INITIAL_STATE_FIELDS = {
  name: "",
  description: "",
};

const CreateTodo = () => {
  const [formFields, setFormFields] = useState(INITIAL_STATE_FIELDS);
  const { name, description } = formFields;
  const toast = useToast();

  const handleInputChange = useCallback(
    (event) => {
      const { name: input_name, value } = event.target;
      setFormFields({ ...formFields, [input_name]: value });
    },
    [formFields]
  );

  const createTodoHandler = useCallback(async () => {
    try {
      await instance({
        url: "/todo/create",
        method: "post",
        data: { ...formFields },
      });
      toast({
        title: "Created!",
        description: `Todo ${name} created successfully.`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setFormFields(INITIAL_STATE_FIELDS);
    } catch (error) {
      toast({
        title: "Failed!",
        description: `Todo ${name} failed to create.`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [formFields]);

  return (
    <Flex flexDirection={"column"} m={{base: "10px", md: '100px'}} mt={"20px"} spacing="100px">
      <Navbar />
      <Spacer />
      <Heading size="lg" margin={"auto"} mt={"50px"}>
        Create Todo
      </Heading>
      <Box>
        <TodoForm
          name={name}
          submitBtnName="Create"
          description={description}
          inputHandler={handleInputChange}
          buttonHandler={createTodoHandler}
        />
      </Box>
    </Flex>
  );
};

export default CreateTodo;
