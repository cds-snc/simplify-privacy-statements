import { applyMiddleware, compose, createStore } from "redux";

const initialState = {
  variableSelected: "none",
  editingMode: "researcher",
  templateList: [],
  questionsList: [],
  errors: ""
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  let data, newState;

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
      newState.data = {};
      action.data.questionsList.forEach(qlist => {
        action.data[qlist].forEach(question => {
          newState.data[question.variable_name] = question.variable_name;
          newState.allQuestions.add(question);
        });
      });
      newState.allQuestions = Array.from(newState.allQuestions);

      if (action.data.savedSet) {
        newState.data = JSON.parse(action.data.savedSet.fields.data);
        newState.templateSelected = action.data.savedSet.fields.template;
      }

      return Object.assign({}, state, newState);
    case "SAVE_INPUT_DATA":
      data = {};
      Object.keys(action.data).forEach(key => {
        data[key] = action.data[key];
      });
      state.data = Object.assign({}, state.data, data);

      newState = {};
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
  return createStore(
    reducer,
    state,
    compose(
      applyMiddleware(),
      typeof window === "object" &&
      typeof window.devToolsExtension !== "undefined"
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
};
