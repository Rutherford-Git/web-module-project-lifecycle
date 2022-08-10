import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      todos: [],
      todoNameInput: '',
    }
  }
  fetchAllTodos = () =>{
    axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state, todos: res.data.data
      })
    })
    .catch(err =>{
      debugger
    })
  }

  componentDidMount() {
   this.fetchAllTodos()
  }
  onTodoInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value})
  }

  postNewTodo = () =>{
   
  }

  handleClear = () => {
    this.setState({
      ...this.state.todos.filter(todo => {
        return (todo.completed === false)
      })
    })
  }

  handleAdd = (red) => {

    const newTodo = {
      name: red,
      id: Date.now(),
      completed: false
    };

    this.setState({
      ...this.state,
      todos: [...this.state.todos, newTodo]
    })
  }
  

  handleToggle = (clickedId) => {
     
    this.setState({
      ...this.state,
      todos: this.todos.map(todo => {
        if (todo.id === clickedId){
          return {
            ...this.state.todo,
            completed: !todo.completed
          }
        }else{
          return todo
        }
      })
  })
  }
  render() {
    const { todos } = this.state;
    return (
      <div>
       <h1>Todolist</h1> 
       <TodoList handleToggle={this.handleToggle} todos={todos}/>
       <Form handleAdd={this.handleAdd}/>
       <button onClick={this.handleClear}>Clear</button>
      </div>
    )
  }
}

