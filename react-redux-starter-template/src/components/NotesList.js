import React, { useEffect } from "react";
import "./NotesList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNoteAction,
  fetchNoteAction,
} from "../redux/actions/notesAction";

const NotesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNoteAction());
  }, []);

  //get the data from store
  const notes = useSelector((storeData) => {
    return storeData.notes;
  });

  return (
    <div>
      <h1>Notes List</h1>
      {notes.map((note) => (
        <div key={note.id} className="item-container">
          <div className="item-content">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => dispatch(deleteNoteAction(note.id))}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
