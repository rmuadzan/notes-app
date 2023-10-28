import React from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const BASE_URL = "http://localhost:3000";
const SwalReact = withReactContent(Swal);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      filter: "",
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onUpdateNoteArchivedStatusHandler =
      this.onUpdateNoteArchivedStatusHandler.bind(this);
    this.onSearchNotesHandler = this.onSearchNotesHandler.bind(this);
    this.filteredNotes = this.filteredNotes.bind(this);
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    fetch(`${BASE_URL}/api/notes`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  onAddNoteHandler = ({ title, body }) => {
    fetch(`${BASE_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, archived: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.reloadData();
      })
      .catch((error) => {
        console.error("Error adding a note: ", error);
      });
  };

  onDeleteNoteHandler(id) {
    SwalReact.fire({
      title: "Yakin menghapus produk ini?",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Ya",
      denyButtonText: "Tidak",
    }).then((result) => {
      if (result.value) {
        fetch(`${BASE_URL}/api/notes/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              this.setState((prevState) => ({
                notes: prevState.notes.filter((note) => note.id !== id),
              }));
              SwalReact.fire("Sukses!", "Catatan berhasil dihapus", "success");
            } else {
              console.error("Gagal menghapus catatan:", response.status);
            }
          })
          .catch((error) => {
            SwalReact.fire({
              icon: "error",
              title: "Gagal menghapus catatan",
              text: error,
            });
          });
      }
    });
  }

  onUpdateNoteArchivedStatusHandler(id) {
    fetch(`${BASE_URL}/api/notes/${id}/archived`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        this.reloadData();
      })
      .catch((error) => {
        console.error("Kesalahan dalam pembaruan status catatan:", error);
      });
  }

  onSearchNotesHandler(keyword) {
    this.setState({ filter: keyword });
  }

  filteredNotes() {
    return this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  }

  render() {
    return (
      <div>
        <Header onSearch={this.onSearchNotesHandler} />
        <Body
          notes={this.filteredNotes()}
          addNote={this.onAddNoteHandler}
          onDelete={this.onDeleteNoteHandler}
          onUpdateArchiveStatus={this.onUpdateNoteArchivedStatusHandler}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
