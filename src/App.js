import Register from "./Register";
import Login from "./Login";
import { useState } from "react";
import TodoList from "./TodoList";
import { AuthContext } from "./components/Context";
import { HashRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  return (
    <div>
      <AuthContext.Provider value={{ token, setToken }}>
        <HashRouter>
          {/* <AuthContext.Provider value={{ token, setToken }}> */}
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todolist" element={<TodoList />} />
          </Routes>
          {/* </AuthContext.Provider> */}
        </HashRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
