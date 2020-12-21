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
    this.deleteTask = this.deleteTask.bind(this);
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
        console.log(data);
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

    // Updates the requirements from the server side
    fetch("/api/todos/" + identity, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: identity,
        text: e.target.value,
        complete: this.state.complete
      })
    }).then(() => {
      fetch("/api/todos/")
        .then(response => response.json())
        .then(data => {
          this.setState({
            tasks: data
          });
        })
        .catch(e => console.error(e));
    });

    // // Updating the data from the browser side not directly influenced by the server / fetch
    // const tasksIndex = this.state.tasks.findIndex(t => t.id === identity);

    // const changedTask = { ...this.state.tasks[tasksIndex] }; //points to the copy of the task that you are wanting to change
    // changedTask.text = e.target.value;

    // const changedTasks = [...this.state.tasks]; //create a copy of the task lists that is unchanged
    // changedTasks[tasksIndex] = changedTask; //change happens here

    // this.setState({
    //   tasks: changedTasks
    // });
    // console.log(this.state.tasks);
  }

  deleteTask(e, i) {
    // delete task from database
    // upon success, update tasks
    // upon failure, show error message
    console.log(i);
    fetch("/api/todos/" + i, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      fetch("/api/todos/")
        .then(response => response.json())
        .then(data => {
          this.setState({
            tasks: data
          });
        })
        .catch(e => console.error(e));
    });
  }

  render() {
    return (
      <div>
        <header>
          <img src="https://www.logolynx.com/images/logolynx/2b/2b696958d35a839820ee22886375cf9f.jpeg"></img>
          Just Do It. To Do List.
        </header>

        <div className="container center_div_form">
          <form className="row g-3">
            <div className="col-auto">
              <h3>Add Task</h3>
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                onChange={e => this.updateInput(e)}
              />
            </div>
            <div class="col-auto">
              <button
                className="btn btn-warning"
                onClick={e => this.addTask(e)}
              >
                +
              </button>
            </div>
          </form>
        </div>

        <div className="container center_div_tasknumber">
          <div className="badge rounded-pill bg-light text-dark">
            Number of Tasks Left :
            <span className="badge rounded-pill bg-warning text-dark">
              {this.state.tasks.length}
            </span>
          </div>
        </div>

        <div className="container center_div_tasklist">
          <div>
            {this.state.tasks.map(k => {
              return (
                <div className="input-group input-group-sm mb-3" key={k.id}>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon1"
                    value={k.text}
                    //better to use defaultValue={k.text}
                    id={k.id}
                    onChange={e => this.updateTask(e, k.id)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn-close btn-close-white"
                      aria-label="Close"
                      onClick={e => this.deleteTask(e, k.id)}
                    ></button>
                  </div>
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
