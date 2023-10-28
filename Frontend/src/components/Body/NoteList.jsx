import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onUpdateArchiveStatus }) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          onDelete={onDelete}
          onUpdateArchiveStatus={onUpdateArchiveStatus}
          {...note}
        />
      ))}
    </div>
  );
}

export default NoteList;
