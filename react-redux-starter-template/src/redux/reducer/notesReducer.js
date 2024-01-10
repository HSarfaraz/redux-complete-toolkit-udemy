import {
  ADD_NOTE,
  DELETE_NOTE,
  FETCH_NOTES,
} from "../actions/notesActionTypes";

//InitialState
const initialState = {
  notes: [],
};

//create notes reducer
const notesReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case ADD_NOTE:
      if (action.payload && action.payload.title) {
        const newNote = {
          id: Math.random(),
          title: action.payload.title,
          content: action.payload.content,
        };
        const updatedNotes = [...state.notes, newNote];
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        return {
          notes: [...state.notes, newNote],
        };
      }
      return state;

    //fetch notes
    case FETCH_NOTES:
      return {
        //get the dat from local storage
        notes: JSON.parse(localStorage.getItem("notes"))
          ? JSON.parse(localStorage.getItem("notes"))
          : [],
      };

    //delete notes
    case DELETE_NOTE:
      const filteredNotes = state.notes.filter(
        (note) => note.id !== action.payload
      );
      //Receive to localStorage
      localStorage.setItem("notes", JSON.stringify(filteredNotes));
      return {
        ...state,
        notes: filteredNotes,
      };

    default:
      return state;
  }
};

export default notesReducer;
