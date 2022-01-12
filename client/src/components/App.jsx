import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
function App() {
  const [notes, setNotes]=useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000").then((response) => {
      setNotes(response.data);
        });
  }, []);



  function addNote(note){
    setNotes((preNote)=>{
    return [...preNote, note]
      })
    }

   function handleDelete(id1){
     const delURL = "http://localhost:5000/delete/".concat(id1)
     axios.delete(delURL)
     .then((response)=>{
       console.log(response.status);
     })
   }
   function deleteNote(id){
       setNotes(preNotes=>{
         return preNotes.filter((note,index)=>{
           return index !== id
         })
       })
       }

   return(
    <div>
      <Header />
      <CreateArea add={addNote}/>
         {notes.map((note,index)=>{
          return <Note
          id1={note._id}
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          deleteDB={handleDelete}
          />
         })}



      <Footer />

    </div>
   );

  }
export default App;
