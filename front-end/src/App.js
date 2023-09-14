import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home.page";
import ToDo from "./pages/ToDo.page";
import EditTodo from "./pages/EditToDo.page";
import CreateTodo from "./pages/CreateTodo.page";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/todo/edit/" element={<EditTodo />} />
          <Route path="/todo/create" element={<CreateTodo />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
