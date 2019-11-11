import React, { Component } from 'react';
import { markTodo, getIncompleteTodos, getAllTodos } from '../GraphQueries/queries';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';

class MarkTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  marktodo_completed(update_todos) {
    update_todos({ variables: this.props, refetchQueries: [{ query: getIncompleteTodos }, { query: getAllTodos }] })
  }

  render() {
    return (
      <Mutation mutation={markTodo}>
        {(update_todos, { data }) => (
          <Button variant="outline-success" onClick={e => {
            e.preventDefault();
            this.marktodo_completed(update_todos);
          }} >Done️</Button>
        )}
      </Mutation>
    );
  }
}

export default MarkTodo;