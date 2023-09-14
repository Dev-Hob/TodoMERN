import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { memo } from "react";

const CardTodo = ({ _id, name, description, editHandler, deleteHandler }) => {
  return (
    <Card align="left" maxWidth={'580px'}>
      <CardHeader>
        <Heading size="md">{name}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button colorScheme="teal" onClick={() => editHandler(_id)}>
            Edit
          </Button>
          <Button colorScheme="red" onClick={() => deleteHandler(_id, name)}>
            Done
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default memo(CardTodo);
