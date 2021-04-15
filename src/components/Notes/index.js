import firebase from 'firebase';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const Notes = (props) => {
  const { user, notes, setNotes } = props;

  const updateNotes = (event) => {
    setNotes(event.target.value);
    firebase.database().ref('notes/' + user.uid).set(event.target.value)
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