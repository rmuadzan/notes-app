import React from "react";

function ArchiveButton({ id, archived, onUpdateArchiveStatus }) {
  return (
    <button
      className="note-item__archive-button"
      onClick={() => onUpdateArchiveStatus(id)}
    >
      {archived ? "Pindahkan" : "Arsipkan"}
    </button>
  );
}

export default ArchiveButton;
