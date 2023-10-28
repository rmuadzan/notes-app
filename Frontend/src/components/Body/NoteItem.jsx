import React from "react";
import NoteItemAction from "./NoteItemAction";
import NoteItemContent from "./NoteItemContent";

function NoteItem({
  id,
  title,
  createdAt,
  body,
  archived,
  onDelete,
  onUpdateArchiveStatus,
}) {
  return (
    <div className="note-item">
      <NoteItemContent title={title} createdAt={createdAt} body={body} />
      <NoteItemAction
        id={id}
        archived={archived}
        onDelete={onDelete}
        onUpdateArchiveStatus={onUpdateArchiveStatus}
      />
    </div>
  );
}

export default NoteItem;
