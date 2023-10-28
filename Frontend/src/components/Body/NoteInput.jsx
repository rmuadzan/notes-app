	import React from "react";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      maxLength: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value.slice(0, this.state.maxLength),
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <div className="note-input">
        <h2>Buat Catatan</h2>
        <form onSubmit={this.onSubmitEventHandler}>
          <p className="note-input__title__char-limit">Sisa karakter: {this.state.maxLength - this.state.title.length}</p>
          <input
            name="title"
            type="text"
            placeholder="Judul"
            className="note-input__title"
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
          />
          <input
            name="body"
            type="textarea"
            placeholder="Isi"
            className="note-input__body"
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
          />
          <button type="submit">Tambah</button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
