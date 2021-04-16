import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';

const Notes = (props) => {
  const { user, notes, setNotes } = props;

  const updateNotes = (event) => {
    setNotes(event.target.value);
    firebase.database().ref('notes/' + user.uid).set(event.target.value)
  }

  return (
    <TextField
      name="notes"
      value={notes}
      onChange={e => updateNotes(e)}
      label="Notes"
      variant="outlined"
      multiline
    />
  );
}

export default Notes;