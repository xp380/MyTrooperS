import React, { useCallback, useContext, useEffect, useState } from "react";
import ListData from "./ListData/index";
import Search from "./Search/index";
import Todo from "./Form/index";
import { UserContext } from "../Context/UserContext";
import "./HomePage.css";
import axios from "axios";
import { Layout, Tabs } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Header, Content } = Layout;

const Welcome = () => {
  const [todoList, setTodoList] = useState([]);
  const [userContext, setUserContext] = useContext(UserContext);
  // Le useCallback va éviter de re déclarer au momemnt du renvoi du composant
  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          window.location.reload();
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:8081/todos");
      setTodoList(data);
    }
    fetchData();
  }, []);
  console.log("list", todoList);
  const addTodo = async (item) => {
    const { data } = await axios.post("http://localhost:8081/todos", item);
    setTodoList((oldList) => [...oldList, data]);
  };

  const removeTodo = async (id) => {
    await axios.delete(`http://localhost:8081/todos/${id}`);
    setTodoList((oldList) => oldList.filter((item) => item._id !== id));
  };

  const editTodo = async (id, item) => {
    await axios.put(`http://localhost:8081/todos/${id}`, item);
  };
  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((oldValues) => {
        return { ...oldValues, details: undefined, token: null };
      });
      window.localStorage.setItem("logout", Date.now());
    });
  };

  return userContext.details === null ? (
    "Error Loading User details"
  ) : !userContext.details ? (
    <p>Chargement...</p>
  ) : (
    <Layout>
      <Header className="head">
        <div>
          Welcome&nbsp;
          <strong>
            {userContext.details.firstName}
            {userContext.details.lastName && " " + userContext.details.lastName}
          </strong>
          !
        </div>
        <h3 className="title">
          TodoApp
          <br />
        </h3>
        <div className="buttonHomepageOverview">
          <button onClick={logoutHandler} className="buttonHomepage">
            <LogoutOutlined />
          </button>
        </div>
      </Header>
      <Content className="content">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Todo" key="1">
            <Todo addTodo={addTodo} />
          </TabPane>
          <TabPane tab="List" key="2">
            <ListData
              editTodoListProp={editTodo}
              removeTodoListProp={removeTodo}
              list={todoList}
            />
          </TabPane>
          <TabPane tab="Search" key="3">
            <Search />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default Welcome;
