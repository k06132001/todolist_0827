import { useState, useEffect } from "react";
import { useAuth } from "./components/Context";
import { useNavigate } from "react-router-dom";
import "./TodoList.css";

function InputItem(props) {
  const { newInput, setNewInput, add } = props;
  return (
    <div className="inputBox">
      <input
        type="text"
        placeholder="請輸入待辦事項"
        value={newInput}
        onChange={(e) => setNewInput(e.target.value)}
      />
      <button href="#" onClick={add}>
        <i className="fa fa-plus"></i>
      </button>
    </div>
  );
}
function TodoItem(props) {
  const { todoId, finished, text, doFinish, removeItem } = props;
  return (
    <li key={todoId}>
      <label className="todoList_label">
        <input
          className="todoList_input"
          checked={finished ? "checked" : ""}
          name={todoId}
          type="checkbox"
          onChange={doFinish}
        />
        <span>{text}</span>
      </label>
      <button href="#">
        <i
          className="fa fa-times"
          data-todoid={todoId}
          onClick={removeItem}
        ></i>
      </button>
    </li>
  );
}
function TodoList() {
  const [user] = useState(localStorage.getItem("nickname"));
  const { token } = useAuth();
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const status = [
    {
      id: 0,
      name: "全部",
    },
    {
      id: 1,
      name: "待完成",
    },
    {
      id: 2,
      name: "已完成",
    },
  ];
  const [todoListItems, setTodoListItems] = useState([
    {
      todoId: 1,
      text: "打開眼睛",
      finished: false,
    },
    {
      todoId: 2,
      text: "把冰箱發霉的檸檬拿去丟",
      finished: true,
    },
  ]);
  const [currentStatus, setCurrentStatus] = useState(0);
  const currentTodoListItems = () => {
    if (currentStatus === 0) return todoListItems;
    else if (currentStatus === 1)
      return todoListItems.filter((item) => !item.finished);
    else return todoListItems.filter((item) => item.finished);
  };
  const [newInput, setNewInput] = useState("");
  const getId = () => {
    return Math.max(...todoListItems.map((item) => item.todoId)) + 1;
  };
  const add = () => {
    if (newInput === "") return;
    setTodoListItems([
      ...todoListItems,
      {
        todoId: getId(),
        text: newInput,
        finished: false,
      },
    ]);
    setNewInput("");
  };
  const doFinish = (e) => {
    const { name, checked } = e.target;
    setTodoListItems(
      todoListItems.map((item) =>
        item.todoId === Number(name) ? { ...item, finished: checked } : item
      )
    );
  };
  const removeItem = (e) => {
    let id = e.target.getAttribute("data-todoid");
    setTodoListItems(todoListItems.filter((item) => item.todoId != id));
  };
  const removeFinished = () => {
    setTodoListItems(todoListItems.filter((item) => !item.finished));
  };
  // const setUserData = (data) =>
  //   localStorage.setItem("user", JSON.stringify(data));
  // const getUserData = () => {
  //   let data = JSON.parse(localStorage.getItem("user"));
  //   if (data && data.date == dayjs().format("YYYY-MM-DD")) {
  //     return data;
  //   } else {
  //     clearUserData();
  //     return null;
  //   }
  // };
  // const getAuthToken = () => getUserData().authorization;
  const clearUserData = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>{user}的待辦</span>
            </a>
          </li>
          <li>
            <button className="todoButtom" onClick={clearUserData}>
              登出
            </button>
          </li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <InputItem newInput={newInput} setNewInput={setNewInput} add={add} />
          {todoListItems.length > 0 ? (
            <div className="todoList_list">
              <ul className="todoList_tab">
                {status.map((item) => {
                  return (
                    <li>
                      <buttom
                        href="#"
                        className={currentStatus === item.id ? "active" : ""}
                        onClick={(e) => setCurrentStatus(item.id)}
                      >
                        {item.name}
                      </buttom>
                    </li>
                  );
                })}
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  {currentTodoListItems().map((item) => {
                    return (
                      <TodoItem
                        key={item.todoId}
                        todoId={item.todoId}
                        finished={item.finished}
                        text={item.text}
                        doFinish={doFinish}
                        removeItem={removeItem}
                      />
                    );
                  })}
                </ul>
                <div className="todoList_statistics">
                  <p>
                    {todoListItems.filter((item) => !item.finished).length}
                    個待完成項目
                  </p>
                  <a onClick={removeFinished}>清除已完成項目</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="todoEmpty">
              <p>目前尚無待辦事項</p>
              <img src="https://firebasestorage.googleapis.com/v0/b/weijielin-90965.appspot.com/o/HexSchool%2FReact-Todo%2Fempty.svg?alt=media&token=72f69e70-4e22-42f9-af2e-a139bcfd1d19" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
