import { SimpleGrid } from "@chakra-ui/react";
import React, { memo, useCallback, useContext } from "react";
import CardTodoComponent from "../card-todo/card-todo.component";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../context/todo";
import instance from "../../utils/axios.instance";
import { useToast } from '@chakra-ui/react'

function CardList({todos}) {
  const navigate = useNavigate();
  const toast = useToast();
  const { dispatch } = useContext(TodoContext);

  const editTodoHandler = useCallback((id) => {
    // goto edit page with todo id
    navigate("/todo/edit", { state: {_id: id} });
  }, []);

  const deleteTodoHandler = useCallback(async (id, name) => {
    try{
      await instance({
        url: `/todo/delete/${id}`,
        method: 'delete',
      })
      dispatch({type: "DELETE_TODO", payload: id})
      toast({
        title: `Deleted!`,
        description: `Deleted Todo by name ${name}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch(err) {
      toast({
        title: `Unsuccessful!`,
        description: `Todo by name ${name} was not deleted.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    
    }
    // goto edit page with todo id
  }, []);

  return (
    <SimpleGrid
      columns={3}
      minChildWidth={"280px"}
      spacing={10}
      mt={"100px"}
    >
      {todos &&
        todos?.length !== 0 &&
        todos?.map(({ name, description, _id }) => (
          <CardTodoComponent
            key={_id}
            name={name}
            description={description}
            _id={_id}
            editHandler={editTodoHandler}
            deleteHandler={deleteTodoHandler}
          />
        ))}
    </SimpleGrid>
  );
}

export default memo(CardList);
