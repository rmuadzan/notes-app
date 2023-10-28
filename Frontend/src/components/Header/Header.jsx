import React from "react";
import HeaderTitle from "./HeaderTitle";
import HeaderSearch from "./HeaderSearch";

function Header({ onSearch }) {
  return (
    <div className="note-app__header">
      <HeaderTitle />
      <HeaderSearch onSearch={onSearch} />
    </div>
  );
}

export default Header;
