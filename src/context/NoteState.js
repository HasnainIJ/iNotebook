import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";
// Creating state arrow function

const NoteState = (props) => {

const Host = "http://localhost:5000";
const notesInitial= [] ;
const [notes, setNotes] = useState(notesInitial);

 
// Get all Notes Function
const getNote = async() => {  
  //Api Call
  const response = await fetch(`${Host}/api/notes/fetchallnotes`, {
    method: 'Get', 
    headers: {
      'Content-Type': 'application/json' ,
      "auth-token": localStorage.getItem("token")
    
    },
   body: JSON.stringify() 
  });
   const json = await response.json()
    setNotes(json)
    };
  


// Add a Note Function
const addNote = async(title, description, tag ) => {  
//Api Call
const response = await fetch(`${Host}/api/notes/addnotes`, {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json' ,
    "auth-token":  localStorage.getItem("token")

  },
 body: JSON.stringify({title,description,tag}) 
});

       const note = await response.json();
       console.log(note)
       setNotes(notes.concat(note));
       
  };


//edit a note

const editnote=async(id , title ,  description , tag)=>{

//Api Call

const response = await fetch(`${Host}/api/notes/updatenote/${id}`, {
  method: 'PUT',
  
  headers: {
    'Content-Type': 'application/json' ,
    "auth-token":  localStorage.getItem("token")

  },
  
 body: JSON.stringify({title,description,tag}) 
});
console.log(+id);
const json = await response.json()
   

let newNotes = JSON.parse(JSON.stringify(notes))
for (let index = 0; index < newNotes.length; index++) {
  const element = newNotes[index];
  if(element._id===id){
  newNotes[index].title=title;
  newNotes[index].description=description;
  newNotes[index].tag=tag;
  break;  
}
  
}
console.log(+id);
setNotes(newNotes);
}





  //Delete a note

  const deleteNote = async(id) => {
    const response = await fetch(`${Host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      
      headers: {
        'Content-Type': 'application/json' ,
        "auth-token": localStorage.getItem("token")
  
      },
    });
    console.log("Deleting note with" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });const json = await response.json() 
    console.log(json);
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote , getNote , editnote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
