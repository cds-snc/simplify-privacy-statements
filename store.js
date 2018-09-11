import { createStore } from "redux";
import airtableConstants from "./utils/airtable_constants";

const initialState = {
  researcher_name: "",
  researcher_phone: "",
  researcher_email: "",
  session_goal: "",
  product_goal: "",
  session_activity: "",
  session_duration: "",
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
      return Object.assign({}, state, newState);
    case "SAVE_INPUT_DATA":
      newState = {};
      const input_keys = [
        "researcher_name",
        "researcher_phone",
        "researcher_email",
        "session_goal",
        "product_goal",
        "session_activity",
        "session_duration",
        "errors"
      ];
      input_keys.forEach(key => {
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
