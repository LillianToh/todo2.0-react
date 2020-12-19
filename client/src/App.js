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
        console.log(json);
        this.setState({
          tasks: json
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addTask(e) {
    e.preventDefault();
    //console.log(this.state.input, this.state.complete, "where we start");
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
  }

  updateTask(e, identity) {
    // update this.state.task.push(whateveryougetinjson)
    // update task from database
    // upon success, update tasks
    // upon failure, show error message

    // fetch("/todos/:todo_id", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     id: identity,
    //     text: e.target.value,
    //     complete: this.state.complete
    //   })
    // })
    // .then(res => res.json())
    // .then(json => {
    //   this.setState({
    //     tasks: json
    //   });
    // })
    // .catch(error => {
    //   console.log(error);
    // });

    const tasksIndex = this.state.tasks.findIndex(t => t.id === identity);

    const changedTask = { ...this.state.tasks[tasksIndex] }; //points to the copy of the task that you are wanting to change
    changedTask.text = e.target.value;

    const changedTasks = [...this.state.tasks]; //create a copy of the task lists that is unchanged
    changedTasks[tasksIndex] = changedTask; //change happens here

    this.setState({
      tasks: changedTasks
    });
    console.log(this.state.tasks);
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

        {/* <ol>
          {this.state.tasks.map(k => {
            return (
              <li key={k.id} onChange={e => this.updateTask(e)}>
                {k.text}
              </li>
            );
          })
          }
        </ol> */}

        <div>
          <div>
            {this.state.tasks.map(k => {
              return (
                <div key={k.id}>
                  <input
                    type="text"
                    value={k.text}
                    id={k.id}
                    onChange={e => this.updateTask(e, k.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
