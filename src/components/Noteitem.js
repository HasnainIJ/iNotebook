import React from "react";
import NoteContext from "../context/NoteContext";
import { useContext } from "react";
const Noteitem = (props) => {
  const { Note , updateNote } = props;

  const context = useContext(NoteContext);

  const { deleteNote } = context;


  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <h4>{Note.title}</h4>
          <p className="card-text">
            {Note.description}
          </p>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(Note)}}></i>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(Note._id) ; props.showAlert(" Deleted Successfully" , "success");}}  ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
