import './App.css';
import TaskItem from './components/TaskItem';

const App = () => {
  return (
    <div className="App">
      <header><h1>Workmate</h1></header>
      {["Sample"].map((task,i) => <TaskItem key={i} title={task} />)}
    </div>
  );
}

export default App;
