import firebase from '../../firebase.js';
import './style.css';

const TaskItem = (props) => {
  const { user, taskId, taskTitle, selected, onClick } = props;

  const removeTask = (taskId) => {
    if (window.confirm("Are you sure you want to task this record? This cannot be reverted.")) {
      const taskRef = firebase.database().ref(`/tasks/${user.uid}/${taskId}`);
      taskRef.remove();
    }
  }

  return (
    <div id={`task-item-${taskId}`} className={`task-item ${selected ? "selected" : ""}`} onClick={() => onClick(taskId)}>
      <p>{taskTitle}</p>
      <button >
        <i className="fas fa-trash-alt" onClick={() => removeTask(taskId)} alt="delete"></i>
      </button>
    </div>
  );
}

export default TaskItem;