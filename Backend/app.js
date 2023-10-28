require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const Joi = require("joi");
const cors = require("cors");
const util = require("util");

const app = express();
const port = 3000;

const noteSchema = Joi.object({
  title: Joi.string().max(50).required(),
  body: Joi.string().required(),
  archived: Joi.boolean().required(),
});

app.use(bodyParser.json());
app.use(cors());


async function getNoteById(noteId) {
  try {
    const query = util.promisify(db.query).bind(db);
    const queryResult = await query('SELECT * FROM notes WHERE id = ?', [noteId]);
    
    if (queryResult[0].length === 0) {
      throw new Error('Note not found')
    }

    const note = queryResult[0];
    return note;
  } catch (error) {
    throw error;
  }
}

app.get("/api/notes", (req, res, next) => {
  try {
    db.promise()
      .query("SELECT * FROM notes")
      .then(([rows]) => {
        res.json(rows);
      })
      .catch((error) => {
        res.status(500).json({ error: "Gagal mengambil catatan" });
      });
  } catch (err) {
    next(err);
  }
});

app.post("/api/notes", (req, res, next) => {
  try {
    const { title, body, archived } = req.body;
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    const { error } = noteSchema.validate({ title, body, archived });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    db.promise()
      .query(
        "INSERT INTO notes (title, body, archived, createdAt) VALUES (?, ?, ?, ?)",
        [title, body, archived, createdAt]
      )
      .then(() => {
        res.status(201).json("Catatan berhasil ditambahkan");
      })
      .catch((error) => {
        res.status(500).json({ error: "Gagal menyimpan catatan" });
      });
  } catch (err) {
    next(err);
  }
});

app.put("/api/notes/:id/archived", async (req, res, next) => {
  try {
    const id = req.params.id;
    const note = await getNoteById(id);

    db.promise()
      .query("UPDATE notes SET archived = ? WHERE id = ?", [note.archived === 0 ? 1 : 0, id])
      .then(() => {
        res.status(200).json("Catatan berhasil diperbarui");
      })
      .catch((error) => {
        res.status(500).json({ error: "Gagal memperbarui catatan" });
      });
  } catch (err) {
    next(err);
  }
});

app.delete("/api/notes/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    db.promise()
      .query("DELETE FROM notes WHERE id = ?", id)
      .then(() => {
        res.status(200).json("Catatan berhasil dihapus");
      })
      .catch((error) => {
        res.status(500).json({ error: "Gagal menghapus catatan" });
      });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.log(err);

  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
