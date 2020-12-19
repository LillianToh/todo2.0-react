import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tasks: [],
      complete: 0
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

  addTask(e) {
    e.preventDefault();
    console.log(this.state.input, this.state.complete, "where we start");
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.input,
        complete: this.state.complete
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.insertId);
        const newTask = [
          {
            id: data.insertId,
            text: this.state.input,
            complete: this.state.complete
          }
        ];

        this.setState({
          // currently tasks is an array [] full of tasks from before unless this is the first task.
          // your new item that you are adding, should be an object like other objects that are already in tasks.
          // { id: idfromdb, text : taskString, complete : 0or1} .. check the constructor.
          // your new item should have the same format.

          tasks: [...this.state.tasks, ...newTask]
        });
        console.log(this.state.tasks);
      })
      .catch(error => {
        console.log(error);
      });
    //  Continue fetch request here
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
              <li key={k.id} onChange={e => this.updateTask(e)}>
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
