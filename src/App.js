import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  useEffect(() => {
    if (user && user.uid) {
      const tasksRef = firebase.database().ref('tasks/' + user.uid);
      const notesRef = firebase.database().ref('notes/' + user.uid);

      tasksRef.on('value', (snapshot) => {
        let tasks = snapshot.val();
        let newState = [];
        for (let task in tasks) {
          newState.push({
            id: task,
            title: tasks[task].title
          });
        }
        setTasks(newState);
      });
      notesRef.on('value', (snapshot) => {
        let notes = snapshot.val();
        if (!!!notes) {
          notes = "";
        }
        setNotes(notes);
      });
    }
  }, [user]);

  const login = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      setUser(user)
    });
  }

  const logout = () => {
    auth.signOut().then(() => setUser(null));
  }

  return (
    <div className="App">
      <Header user={user} logout={logout} />
      {user ? (
        <Box display="flex" width="100%">
          <Box id="section-one" className="section">
            <TaskForm user={user} />
            <Box id="task-list" display="flex" flexDirection="column" padding="30px 20px">
              {tasks.map(task => (
                <TaskItem key={task.id} user={user} taskId={task.id} taskTitle={task.title} />
                ))}
            </Box>
          </Box>
          <Box id="section-two" className="section">
            <Notes notes={notes} setNotes={setNotes} user={user} />
          </Box>
        </Box>
      ) : (
        <Button onClick={login} color="primary">Login</Button>
      )}
    </div>
  );
}

export default App;
