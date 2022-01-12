import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import axios from "axios";
function CreateArea(props) {
   const [note, setNote]=useState({
       title:"",
       content:""
   });

   const [isExpanded, setExpanded] = useState(false);

function handleChange(event){
    const {name, value}= event.target;

    setNote(preVal=>{

            return{
          ...preVal,[name]:value
        };
    });

}



    function submitNote(event){
      props.add(note);
      event.preventDefault();
     setNote({title:"", content:""});
    axios.post("http://localhost:5000",
    {title:note.title,
     content: note.content}).then((response)=>{
      console.log(response.status);
  console.log(response.data);
    })
};





    function showCreateArea(){
     setExpanded(true);
    }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? <input onChange={handleChange} name="title" placeholder="Title" value={note.title}/>: null}

        <textarea onClick={showCreateArea} onChange={handleChange}
        name="content" placeholder="Take a note..." rows= {isExpanded ? "3" : "1" } value={note.content}
         />
         <Zoom in={isExpanded ? true : false}>
        <Fab onClick={submitNote}>
        <AddIcon />
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
