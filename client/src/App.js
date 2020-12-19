import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tasks: []
    };
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
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
        //this.updateTask(newTaskFromDatabase)
        console.log(json);
        this.updateTask(json);
      })
      .catch(error => {
        // upon failure, show error message
        // console.error("Failed to update tasks", error.text());
      });
  }

  addTask(i) {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: this.state.input })
      // .then(res => res.json())
      // body: JSON.stringify({ text: this.state.input, complete: 0 })
    });
    // Continue fetch request here
    this.setState({
      tasks: i
    });
  }

  updateTask(i) {
    //update this.state.task.push(whateveryougetinjson)
    // update task from database
    // upon success, update tasks
    // upon failure, show error message
    this.setState({
      tasks: i
    });
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
          <button onClick={e => this.addTask(e)}>Submit</button>
        </div>

        <div>Number of Tasks Now: {this.state.tasks.length}</div>

        <ol>
          {this.state.tasks.map(k => {
            return (
              <li key={k.toString()} onClick={e => this.updateTask(e)}>
                {k.text}
              </li>
            );
          })}
        </ol>
        {/* <div>All Tasks: {allTasks.map((e) => <div>{e.text}</div>);}</div> */}
        {/* <div>{this.state.tasks}</div> iterate the id and print out text*/}
      </div>
    );
  }
}

export default App;
