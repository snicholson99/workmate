import firebase from '../../firebase.js';
import './style.css';

const TaskItem = (props) => {
  const { user, taskId, taskTitle, selected, onSelect, isComplete } = props;

  const updateIsComplete = (value) => {
    firebase.database().ref('tasks/' + user.uid).child(taskId).update({ completed: value });
  }

  const removeTask = (taskId) => {
    if (window.confirm("Are you sure you want to task this record? This cannot be reverted.")) {
      const taskRef = firebase.database().ref(`/tasks/${user.uid}/${taskId}`);
      taskRef.remove();
    }
  }

  return (
    <div id={`task-item-${taskId}`} className={`task-item ${selected ? "selected" : ""} ${isComplete ? "complete" : ""}`} onClick={() => onSelect(taskId)}>
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