import React from "react";

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
    };

    this.onKeywordChangeEventHandler =
      this.onKeywordChangeEventHandler.bind(this);
  }

  onKeywordChangeEventHandler(event) {
    this.setState(
      {
        keyword: event.target.value,
      },
      () => {
        return this.props.onSearch(this.state.keyword);
      }
    );
  }

  render() {
    return (
      <div className="note-app__header__search">
        <input
          type="text"
          placeholder="Cari catatan ..."
          value={this.state.keyword}
          onChange={this.onKeywordChangeEventHandler}
        />
      </div>
    );
  }
}

export default HeaderSearch;
