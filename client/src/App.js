import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tasks: []
    };
  }

  updateInput(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value
    });
  }

  componentDidMount() {
    fetch("/api/todos")
      .then(res => res.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
      })
      .catch(error => {
        // upon failure, show error message
      });
  }

  addTask() {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: this.state.input })
    });
    // Continue fetch request here
  }

  updateTask(i) {
    // update task from database
    // upon success, update tasks
    // upon failure, show error message
  }

  deleteTask(i) {
    // delete task from database
    // upon success, update tasks
    // upon failure, show error message
  }

  render() {
    return (
      <div>
        <h1>To Do List</h1>
        <div>
          <label>
            New Task:
            <input onChange={e => this.updateInput(e)} />
          </label>
          <button onClick={e => this.addTask()}>Submit</button>
        </div>
        <div />
      </div>
    );
  }
}

export default App;
