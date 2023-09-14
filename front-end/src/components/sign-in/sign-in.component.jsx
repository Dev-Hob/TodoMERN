import {
  FormControl,
  Heading,
  Button,
  Spinner,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axios.instance";
import FormInput from "../form-input/form-input.component";

const INITIAL_STATE = {
  username: "",
  password: "",
};

function SignIn() {
  const [formFields, setFormFields] = useState(INITIAL_STATE);
  const { username, password } = formFields;
  const { loading, error, dispatch, defaultErrorHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(error);
  const onChangeHandler = useCallback(
    (e) => {
      if (error) defaultErrorHandler();
      const fieldName = e.target.name;
      const value = e.target.value;
      setFormFields({ ...formFields, [fieldName]: value });
    },
    [formFields]
  );

  const onSubmitHandler = async (e) => {
    dispatch({ type: "LOGIN_START" });
    instance({
      method: "post",
      url: "/auth/login",
      data: { ...formFields },
    })
      .then((response) => {
        const data = response.data.details;
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        navigate("/todo");
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;
        dispatch({ type: "LOGIN_FAILURE", payload: message || 'Error occured! While Signing in.' });
      });
  };

  const disable = username === "" || password === "";
  return (
    <>
      <FormControl width={{base: '90%',md: "90%", lg:'35%'}}  isInvalid={error}>
        <Heading size={"lg"}>Sign In</Heading>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <FormInput labelName='Username' type="text"
          name="username"
          value={username}
          onChange={onChangeHandler}
          required onChangeHandler={onChangeHandler} />
          <FormInput labelName='Password'  type="password"
          name="password"
          value={password}
          onChangeHandler={onChangeHandler}
          required />
        <Button
          isDisabled={disable}
          colorScheme="teal"
          size="md"
          mt={"20px"}
          onClick={onSubmitHandler}
        >
          {loading ? <Spinner size={"md"} /> : "Sign In"}
        </Button>
      </FormControl>
    </>
  );
}

export default SignIn;
