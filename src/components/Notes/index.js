// import { useState } from "react";
import firebase from 'firebase';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const Notes = (props) => {
  const { user, notes, setNotes } = props;

  const updateNotes = (event) => {
    event.preventDefault();
    setNotes(event.target.notesValue);
    const notesRef = firebase.database().ref('notes/' + user.uid);
    console.log(notesRef.child(user.uid))
    notesRef.child(user.uid).set({ notes: event.target.notesValue }).then().catch();
    // notesRef.push({notes: ""});
  }

  return (
    <Box display="flex" flexDirection="row" padding="20px" width="100%" justifyContent="center">
      <TextField
        name="notes"
        value={notes}
        onChange={e => updateNotes(e)}
        label="Notes"
        variant="outlined"
        multiline
        rows={4}
      />
    </Box>
  );
}

export default Notes;