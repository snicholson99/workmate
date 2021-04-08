import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import firebase from '../../firebase.js';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  }
});

const TaskItem = (props) => {
  const { user, taskId, taskTitle } = props;
  const classes = useStyles();

  const removeTask = (taskId) => {
    if (window.confirm("Are you sure you want to task this record? This cannot be reverted.")) {
      const taskRef = firebase.database().ref(`/tasks/${user.uid}/${taskId}`);
      // const taskRef = firebase.database().ref(`/tasks/${taskId}`);
      taskRef.remove();
    }
  }

  return (
    <Card id={`task-item-${taskId}`} className={`${classes.root} task-item`}>
      <Box display="flex" alignItems="center" justifyContent="space-around" padding="20px">
        <Typography variant="body1">{taskTitle}</Typography>
        <Button onClick={() => removeTask(taskId)} color="primary">
          <DeleteIcon />
        </Button>
      </Box>
    </Card>
  );
}

export default TaskItem;