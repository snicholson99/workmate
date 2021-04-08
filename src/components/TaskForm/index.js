import { useState } from "react";
import firebase from 'firebase';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    }
    tasksRef.push(task);
    setTaskTitle('');
  }

  return (
    <form className="task-form" onSubmit={createTask}>
      <Box display="flex" flexDirection="row" padding="20px" width="100%" justifyContent="center">
        <TextField
          name="taskTitle"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          label="Task Title"
          variant="outlined"
          />
        <Button type="submit" color="primary">Submit</Button>
      </Box>
    </form>
  );
}

export default TaskForm;