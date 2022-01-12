//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
mongoose.connect("mongodb://localhost:27017/keeperDB");

app.use(bodyParser.json());
app.use(cors());

const noteSchema = new mongoose.Schema({
  title: String,
   content: String,
   created:{
     type: Date,
     default: Date.now()
   }
});
const Note = mongoose.model("Note", noteSchema);

app.get("/", function(req,res){
  Note.find({}, function(err , foundNotes){
      if(!err){
          res.send(foundNotes);
      }else{
        res.send(err);
      };
    });
});
app.post("/",function(req,res){

  const newNote = new Note ({
  title: req.body.title,
  content: req.body.content
});
newNote.save(function(err){
    if(!err){
      res.json(newNote);
    }else{
      res.send(err);
    }
  });

});

app.delete("/delete/:id1", function(req,res){
  const id = {_id: req.params.id1}
  Note.deleteOne(
  {_id: id},
  function(err){
    if(!err){
      res.send("Deleted");
    }else{
      res.send(err);
}
});
});
app.listen(5000, function() {
  console.log("Server started on port 5000");
});
