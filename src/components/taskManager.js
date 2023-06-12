import React, { useState } from "react";
import "./style.css";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  function addTask() {
    if (inputValue.length === 0) {
      return;
    }
    setTasks([
      ...tasks,
      { content: inputValue, isComplete: false, isEditing: false },
    ]);
    setInputValue("");
  }
  function deleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    setTasks([...tasks]);
  }
  function markCompleted(taskIndex) {
    tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete;
    setTasks([...tasks]);
  }
  function editTask(taskIndex) {
    tasks[taskIndex].isEditing = true;
    setTasks([...tasks]);
  }
  function updateValue(taskIndex, value) {
    tasks[taskIndex].content = value;
    setTasks([...tasks]);
  }
  function saveTask(taskIndex) {
    tasks[taskIndex].isEditing = false;
    setTasks([...tasks]);
  }
  return (
    <div className="task-manager">
      <div>
        <h1>Task Manager</h1>
      </div>
      <div className="tasks">
        <ul>
          {tasks
            .sort((a) => (a.isComplete ? 1 : -1))
            .map((task, index) => (
              <div key={index} className="task">
                <input
                  type="checkbox"
                  checked={task.isComplete}
                  onChange={() => markCompleted(index)}
                />
                {task.isEditing ? (
                  <input
                    value={task.content}
                    onChange={(event) => updateValue(index, event.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="content">
                    {task.isComplete ? <del>{task.content}</del> : task.content}
                  </span>
                )}
                {task.isEditing ? (
                  <button className="save" onClick={() => saveTask(index)}>
                    <i class="fa-solid fa-floppy-disk"></i>
                  </button>
                ) : (
                  <button className="edit" onClick={() => editTask(index)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                )}

                <button className="delete" onClick={() => deleteTask(index)}>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
        </ul>
      </div>
      <div className="add-task-container">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter Your Task"
        />
        <button onClick={addTask}>
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
}


export default TaskManager