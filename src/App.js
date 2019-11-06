import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Todos from './components/todoComponents/Todos';
import AddTodos from './components/todoComponents/AddTodos';
import Header from './components/layout/header';
import About from './components/pages/About';

import './App.css';
import Axios from 'axios';


class App extends Component {
  state = {
    todos : []
  }

  componentDidMount(){
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({
      todos: res.data
    }))
  }

  // toggle Complete

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  deleteItem = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }))
  }

  addTodos = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false}).then(res =>(this.setState({todos: [...this.state.todos, res.data]})))
   
  }

  render() {
    return (
      <Router>
      <div className="App">
        <div className="container">
        <Header/>
          <Route exact path="/" render={props =>(
            <React.Fragment>
              <Todos todos={this.state.todos} markComplete={this.markComplete} deleteItem={this.deleteItem}/>
              <AddTodos addTodos={this.addTodos} />
            </React.Fragment>
          )}/> 
          <Route path='/about' component={About} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
