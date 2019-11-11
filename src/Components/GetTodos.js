import React from "react";
import { Query } from "react-apollo";
import { getIncompleteTodos } from "../GraphQueries/queries";
import MarkTodo from "./MarkTodo";
import DeleteTodo from "./DeleteTodos";
import AddTodos from "./AddTodos";
import '../App.css'
import {
  Row,
  Col,
  Table
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const GetTodos = () => (
  <Query query={getIncompleteTodos}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <h2>
            Loading...{" "}
            <FontAwesomeIcon icon={faSpinner} style={{ color: "blue" }} spin />
          </h2>
        );
      if (error) return `Error. Check console logs`;
      if (data.todos.length === 0)
        return (
          <div>
            <h3>Be Productive 💪🏻</h3>
            <AddTodos />
          </div>
        );
      let count = 0;
      return (
        <div className="container">
            <Row>
              <Col sm={12}>
                <Table bordered hover>
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Tasks</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {data.todos.map(todo => (
                    <tr>
                      <td>{(count += 1)}</td>
                      <td>{todo.todo_text}</td>
                      <td>
                        <span className="mark-todo"><MarkTodo todo_id={todo.todo_id} /></span>
                        <DeleteTodo todo_id={todo.todo_id} />
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
                <AddTodos/>
              </Col>
            </Row>

        </div>
      );
    }}
  </Query>
);

export default GetTodos;