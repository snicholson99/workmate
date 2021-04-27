import { useEffect, useState } from 'react';

import './App.css';
import firebase, { auth, provider } from './firebase.js';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import Notes from './components/Notes';

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  useEffect(() => {
    if (user && user.uid) {
      const tasksRef = firebase.database().ref('tasks/' + user.uid);
      tasksRef.on('value', (snapshot) => {
        let tasks = snapshot.val();
        let newState = [];
        for (let task in tasks) {
          newState.push({
            id: task,
            title: tasks[task].title,
            notes: tasks[task].notes ? tasks[task].notes : "",
            completed: tasks[task].completed ? tasks[task].completed : false,
          });
        }
        if (selectedTaskId) {
          const selectedTask = newState.find(({ id }) => id === selectedTaskId );
          if (selectedTask) { setNotes(selectedTask.notes); }
        }
        setTasks(newState.reverse());
      });
    }
  }, [user, selectedTaskId]);

  const login = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      setUser(user)
    });
  }

  const logout = () => {
    auth.signOut().then(() => setUser(null));
    setTasks([]);
    setNotes([]);
    setSelectedTaskId(null);
  }

  return (
    <div className="App">
      <Header user={user} logout={logout} />
      {user ? (
        <div className="page">
          <div id="section-one" className="section">
            <h2>Tasks</h2>
            <TaskForm user={user} />
            <div id="task-list">
              {tasks.map(task => (
                <TaskItem onSelect={() => setSelectedTaskId(task.id)} selected={selectedTaskId === task.id} isComplete={task.completed} key={task.id} user={user} taskId={task.id} taskTitle={task.title} />
              ))}
            </div>
          </div>
          <div id="section-two" className="section">
            <label htmlFor="notes"><h2>Notes</h2></label>
            {selectedTaskId ? (
              <>
                <span id="notes-close-icon" onClick={() => setSelectedTaskId("")}>✕</span>
                <Notes notes={notes} setNotes={setNotes} user={user} selectedTaskId={selectedTaskId} />
              </>
            ) : (
              <p>Select a task to view notes.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="page">
          <button onClick={login} color="primary">Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
