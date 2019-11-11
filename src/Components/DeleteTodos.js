import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { deleteTodo, getIncompleteTodos, getAllTodos } from "../GraphQueries/queries";
import { Button } from "react-bootstrap";

class DeleteTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Mutation
        mutation={deleteTodo}
        variables={this.props}
        refetchQueries={[
          { query: getIncompleteTodos },
          { query: getAllTodos }
        ]}
      >
        {(delete_todos, { data }) => (
          <Button
            variant="outline-danger"
            onClick={e => {
              e.preventDefault();
              delete_todos();
            }}
          >
            Delete
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteTodo;