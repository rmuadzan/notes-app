import React from "react";
import ArchiveButton from "./NoteItemArchiveButton";
import DeleteButton from "./NoteItemDeleteButton";

function NoteItemAction({ id, archived, onDelete, onUpdateArchiveStatus }) {
  return (
    <div className="note-item__action">
      <DeleteButton id={id} onDelete={onDelete} />
      <ArchiveButton
        id={id}
        archived={archived}
        onUpdateArchiveStatus={onUpdateArchiveStatus}
      />
    </div>
  );
}

export default NoteItemAction;
