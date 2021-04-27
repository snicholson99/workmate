import firebase from '../../firebase.js';
import './style.css';

const TaskItem = (props) => {
  const { user, taskId, taskTitle, selected, setSelectedTaskId, isComplete } = props;

  const updateIsComplete = (value) => {
    firebase.database().ref('tasks/' + user.uid).child(taskId).update({ completed: value });
  }

  const removeTask = (taskId) => {
    if (window.confirm("Are you sure you want to task this record? This cannot be reverted.")) {
      setSelectedTaskId(null);
      firebase.database().ref(`/tasks/${user.uid}/${taskId}`).remove();
    }
  }

  return (
    <div id={`task-item-${taskId}`} className={`task-item ${selected ? "selected" : ""} ${isComplete ? "complete" : ""}`} onClick={() => setSelectedTaskId(taskId)}>
      <p>{taskTitle}</p>
      <div className="task-item-button-container">
        <button className="task-item-complete-button" onClick={() => updateIsComplete(!isComplete)}>
          <i className="fas fa-check"></i>
        </button>
        <button className="task-item-delete-button" onClick={() => removeTask(taskId)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default TaskItem;