import React, { Component } from "react";
import { Query } from "react-apollo";
import { getAllTodos } from "../GraphQueries/queries";
import MarkTodo from "./MarkTodo";
import DeleteTodo from "./DeleteTodos";
import {
  Badge,
  Container,
  Row,
  Col, Table
} from "react-bootstrap";
import { client } from "./Home";
import { ApolloProvider } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class GetAllTodos extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      isAuthenticated() && (
        <ApolloProvider client={client}>
          <div className="container">
            <h2 style={{ textAlign: "center" }}>All Todos</h2>
            <h3 style={{ textAlign: "center" }}>

            </h3>
            <Container>
              <Row>
                <Col sm={12}>
                  <Query query={getAllTodos}>
                    {({ loading, error, data }) => {
                      if (loading)
                        return (
                          <h2>
                            Loading...{" "}
                            <FontAwesomeIcon
                              icon={faSpinner}
                              style={{ color: "blue" }}
                              spin
                            />
                          </h2>
                        );
                      if (error) return `Error fetching todos.`;
                      let count = 0;
                      return (
                        <div>
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
                                <td>{todo.todo_text}<Badge>{todo.todo_mark && (`✅`)}</Badge></td>
                                <td>
                                  { !todo.todo_mark &&
                                  (<span className="mark-todo"><MarkTodo todo_id={todo.todo_id} /></span>)
                                  }
                                  <DeleteTodo todo_id={todo.todo_id} />
                                </td>
                              </tr>
                            ))}
                            </tbody>
                          </Table>
                        </div>
                      );
                    }}
                  </Query>
                </Col>
              </Row>
            </Container>
          </div>
        </ApolloProvider>
      )
    );
  }
}

export default GetAllTodos;