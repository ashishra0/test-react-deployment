import gql from 'graphql-tag';

const getAllTodos = gql`
    query {
        todos(order_by: [{todo_mark: asc,todo_id: desc}]){
            todo_id
            todo_text
            todo_mark
            todo_user
        }
    }`;

const getIncompleteTodos = gql`
    query {
        todos(
            where: {todo_mark: {_eq:false}}
        ){
            todo_id
            todo_text
            todo_mark
            todo_user
        }
    }
`;

const getCompleteTodos = gql`
    query {
        todos(
            where: {todo_mark: {_eq:true}}
        ){
            todo_id
            todo_text
            todo_mark
            todo_user
        }
    }`;

const addTodo = gql`
    mutation($todo_text: String!) {
        insert_todos(objects: [{todo_text: $todo_text}]){
            affected_rows
        }
    }
`;

const markTodo = gql`
    mutation($todo_id: Int!) {
        update_todos(
            where: {todo_id: {_eq: $todo_id}}
            _set: {todo_mark: true}
        ){
            affected_rows
        }
    }
`;

const deleteTodo = gql`
    mutation($todo_id: Int!) {
        delete_todos(
            where: {todo_id: {_eq:$todo_id}}
        ){
            affected_rows
        }
    }
`;

export {
    getAllTodos,
  getIncompleteTodos,
  getCompleteTodos,
  markTodo,
  addTodo,
  deleteTodo
}