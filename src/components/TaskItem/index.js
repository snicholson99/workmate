const TaskItem = (props) => {
  const { title } = props;
  return (
    <div className="task-item">
      <p>{title}</p>
    </div>
  );
}

export default TaskItem;