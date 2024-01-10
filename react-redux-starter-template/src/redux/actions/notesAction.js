//steps
//initialState
//create actions

import { ADD_NOTE, DELETE_NOTE, FETCH_NOTES } from "./notesActionTypes";

//Add note action creator
export const addNotesAction = (note) => {
  return {
    type: ADD_NOTE,
    payload: note,
  };
};

//Delete note action creator
export const deleteNoteAction = (id) => {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
};

//fetch notes action creator
export const fetchNoteAction = () => {
  return {
    type: FETCH_NOTES,
  };
};
//reducer
//configure the store
//dispatch the action
