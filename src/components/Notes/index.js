import { useState } from 'react';
import firebase from 'firebase';

import './style.css';

const Notes = (props) => {
  const { user, notes, setNotes, selectedTaskId } = props;
  const [nothingToCopy, setNothingToCopy] = useState(false);
  const [isShowingCopiedText, setIsShowingCopiedText] = useState(false);

  const updateNotes = (event) => {
    setNotes(event.target.value);
    firebase.database().ref('tasks/' + user.uid).child(selectedTaskId).update({ notes: event.target.value });
  }

  const copyToClipboard = () => {
    if (notes.length < 1) {
      setNothingToCopy(true);
      setTimeout(() => {
        setNothingToCopy(false);
      }, 4000);
    } else {
      navigator.clipboard.writeText(notes);
      setIsShowingCopiedText(true);
      setTimeout(() => {
        setIsShowingCopiedText(false);
      }, 4000);
    }
  }

  return (
    <>
      <textarea
        id="notes"
        name="notes"
        value={notes}
        onChange={e => updateNotes(e)}
        placeholder="Enter notes here"
      />
      <div className="notes-copy-flex-container">
        <div className="notes-copy-inner-container" onClick={copyToClipboard}>
          <i className="notes-copy-icon fas fa-clipboard"></i>
          <p className="notes-copy-label">Copy to Clipboard</p>
        </div>
        {isShowingCopiedText && (
          <>
            {notes.length > 25 ? (
              <p className="notes-copied-text">Copied "<span>{notes.substring(0, 24) + "..."}</span>" to clipboard</p>
            ) :
            (
              <p className="notes-copied-text">Copied "<span>{notes}</span>" to clipboard</p>
            )}
          </>
        )}
        {nothingToCopy && <p className="notes-copied-text">There is nothing to copy!</p>}
      </div>
    </>
  );
}

export default Notes;