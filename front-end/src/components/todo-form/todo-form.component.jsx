import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { memo } from "react";

function TodoForm({
  name,
  description,
  inputHandler,
  buttonHandler,
  submitBtnName,
}) {
  return (
    <FormControl mt={'40px'}>
      <Flex margin={'auto'} flexDirection={'column'} width={{base:'90%', md: '90%', lg: '70%'}} height={'30vh'} justifyContent={'space-evenly'} >
        <Box>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={name} onChange={inputHandler} />
        </Box>
        <Box>
          <FormLabel>description</FormLabel>
          <Textarea
            type="text"
            name="description"
            value={description}
            onChange={inputHandler}
          />
        </Box>
        <Box>
          <Button colorScheme="teal" onClick={buttonHandler}>
            {submitBtnName}
          </Button>
        </Box>
      </Flex>
    </FormControl>
  );
}

export default memo(TodoForm);
