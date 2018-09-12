import { createStore } from "redux";
import airtableConstants from "./utils/airtable_constants";

const initialState = {
  errors: ""
};

airtableConstants.tableNames.forEach(tableName => {
  initialState[tableName] = [];
});

// REDUCERS
export const reducer = (state = initialState, action) => {
  let benefits;
  let newState;

  switch (action.type) {
    case "LOAD_DATA":
      newState = {
        timestamp: action.data.timestamp || state.timestamp
      };
      airtableConstants.tableNames.forEach(tableName => {
        newState[tableName] = action.data[tableName] || state[tableName];
      });
      newState["errors"] = action.data["errors"] || state["errors"];

      // set default values for questions
      action.data.questions.map(question => {
        newState[question.variable_name] = `[${question.variable_name}]`;
      });

      return Object.assign({}, state, newState);
    case "SAVE_INPUT_DATA":
      newState = {};
      const question_variable_names = state.questions.map(q => q.variable_name);
      question_variable_names.forEach(key => {
        if (!state[key]) {
          state[key] = "";
        }
        newState[key] = action.data[key] || state[key];
      });
      newState["errors"] = action.data["errors"] || state["errors"];
      return Object.assign({}, state, newState);
    default:
      return state;
  }
};

export const initStore = (state = initialState) => {
  return createStore(reducer, state);
};
