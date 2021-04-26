import { useState } from "react";
import firebase from 'firebase';

import './style.css';

const TaskForm = (props) => {
  const { user } = props;
  const [taskTitle, setTaskTitle] = useState('');

  const createTask = (e) => {
    e.preventDefault();
    if (taskTitle.length < 1) {
      return window.alert("Task Title field cannot be empty.");
    }
    const tasksRef = firebase.database().ref('tasks/' + user.uid);
    const task = {
      title: taskTitle,
      notes: "",
    }
    tasksRef.push(task);
    setTaskTitle('');
  }

  return (
    <form id="task-form" onSubmit={createTask}>
      <input
        name="taskTitle"
        value={taskTitle}
        placeholder="Task Name"
        onChange={e => setTaskTitle(e.target.value)}
      />
      <button type="submit" color="primary">Create Task</button>
    </form>
  );
}

export default TaskForm;