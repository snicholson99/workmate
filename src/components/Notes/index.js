import { useState } from "react";
import firebase from 'firebase';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

const Notes = (props) => {
  const { user, notes, setNotes } = props;

  const updateNotes = (event) => {
    event.preventDefault();
    setNotes(event.target.notesValue);
    const notesRef = firebase.database().ref('notes/' + user.uid);
    const note = {
      value: notes,
    }
    notesRef.push(note);
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