const express = require("express");
const router = express.Router();

const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
var fetchuser = require('../middleware/fetchuser');

// Route 1: fetch all notes

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 : Add  a new note using : POST:"api/notes/addnotes". Login required

router.post( 
  "/addnotes",
  fetchuser, 
  [
    body("title", "Enter a valid title ").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      console.log(req.body);

            // IF THERE ARE ERRORS RETURN BAD REQUEST
 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      }); 
  
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route:3 Update an existing note using : Put: "/api/notes/updatenote" . Login required

router.put('/updatenote/:id', fetchuser ,

async(req,res)=>{

  const{title, description ,tag}= req.body;

   //create a newnote Object 
   const  newNote ={};
   if(title){newNote.title= title};
   if(description){newNote.description= description};
   if(tag){newNote.tag= tag};


   // Find the note to update and update an existing note

   let note = await Notes.findById(req.params.id);

   if(!note){return res.status(401).send("404 not found")};

   if(note.user.toString() !== req.user.id){
    
    return res.status(404).send("Not authorized");}

   note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote},{new : true} )

   res.json({note});
   

   })

// Route:4 Delete an existing note using : Post: "/api/notes/deletenote" . Login required

router.delete('/deletenote/:id', fetchuser ,

async (req,res)=>{

const{title, description , tag}= req.body;


// Find  the note to delete an existing note

let note = await Notes.findById(req.params.id);

if(!note){return res.status(401).send("404 not found")};



// Allow deletion only if it is required id

if(note.user.toString()!==req.user.id){
 
 return res.status(404).send("Not authorized");}

note = await Notes.findByIdAndDelete(req.params.id )

res.json({"Sucess" : "Note has been deleted"});


}




)

































module.exports = router;
