import { createStore } from "redux";

const initialState = {
  variableSelected: "none",
  editingMode: "researcher",
  templateList: [],
  questionsList: [],
  errors: ""
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case "LOAD_DATA":
      newState = {
        timestamp:
          action.data.timestamp !== undefined
            ? action.data.timestamp
            : state.timestamp
      };

      Object.keys(action.data).forEach(tableName => {
        newState[tableName] =
          action.data[tableName] !== undefined
            ? action.data[tableName]
            : state[tableName];
      });

      // create master list of questions and set default values for questions from all question lists
      newState.allQuestions = new Set();
      action.data.questionsList.forEach(qlist => {
        action.data[qlist].forEach(question => {
          newState[question.variable_name] = question.variable_name;
          newState.allQuestions.add(question.variable_name);
        });
      });
      newState.allQuestions = Array.from(newState.allQuestions);

      return Object.assign({}, state, newState);
    case "SAVE_INPUT_DATA":
      newState = {};
      Object.keys(action.data).forEach(key => {
        newState[key] = action.data[key];
      });
      newState["errors"] =
        action.data["errors"] !== undefined
          ? action.data["errors"] !== undefined
          : state["errors"];
      return Object.assign({}, state, newState);
    case "SAVE_VARIABLE_SELECTED":
      return Object.assign({}, state, {
        variableSelected: action.data.variableSelected
      });
    case "SAVE_TEMPLATE_SELECTED":
      return Object.assign({}, state, {
        templateSelected: action.data.templateSelected
      });
    case "SAVE_QUESTIONS_SELECTED":
      return Object.assign({}, state, {
        questionsSelected: action.data.questionsSelected
      });
    case "SAVE_EDITING_MODE":
      return Object.assign({}, state, {
        editingMode: action.data.editingMode
      });
    default:
      return state;
  }
};

export const initStore = (state = initialState) => {
  return createStore(reducer, state);
};
