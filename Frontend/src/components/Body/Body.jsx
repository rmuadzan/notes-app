import React from "react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";

function Body({ notes, addNote, onDelete, onUpdateArchiveStatus }) {
  const activeNotes = notes.filter((note) => note.archived === 0);
  const archivedNotes = notes.filter((note) => note.archived === 1);
  return (
    <div className="note-app__body">
      <NoteInput notes={notes} addNote={addNote} />
      <div className="notes-box">
        <div className="note-active">
          <h2>Catatan Aktif</h2>
          {activeNotes.length === 0 ? (
            <p className="notes-list__empty-message">Tidak Ada Catatan</p>
          ) : (
            <NoteList
              notes={activeNotes}
              onDelete={onDelete}
              onUpdateArchiveStatus={onUpdateArchiveStatus}
            />
          )}
        </div>
        <div className="note-archived">
          <h2>Arsip</h2>
          {archivedNotes.length === 0 ? (
            <p className="notes-list__empty-message">Tidak Ada Catatan</p>
          ) : (
            <NoteList
              notes={archivedNotes}
              onDelete={onDelete}
              onUpdateArchiveStatus={onUpdateArchiveStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Body;
