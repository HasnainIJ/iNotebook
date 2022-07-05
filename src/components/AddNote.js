import React, { useState } from "react";
import NoteContext from "../context/NoteContext";
import { useContext } from "react";

const AddNote = (props) => {
  const context = useContext(NoteContext);

  const { addNote } = context;

  const [note, setNote] = useState({
    title: " ",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: " ", description: "", tag: "",
    });
    props.showAlert(" Added Successfully", "success");
   
   
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    
  };

  return (
    <div className="container my-3">
      <h1> Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="description"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Tag" className="form-label">
            Tag
          </label>
          <input
            type="tag"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}  >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
