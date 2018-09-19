import questionsFixture from "../fixtures/questions";
import optionsFixture from "../fixtures/options";
import configureStore from "redux-mock-store";
import {
  evaluateRowConditions,
  nameForId,
  displayTextForId
} from "../../utils/evaluate_row";

describe("evaluateRow", () => {
  let props, mockStore, reduxState;

  beforeEach(() => {
    props = {};
    mockStore = configureStore();
    reduxState = {
      questions: questionsFixture,
      multiple_choice_options: optionsFixture
    };
    props.reduxState = reduxState;
    props.store = mockStore(reduxState);
  });

  describe("function nameForId", () => {
    it("works", async () => {
      expect(nameForId(questionsFixture, "q-confidentiality")).toEqual(
        "confidentiality"
      );
      expect(nameForId(questionsFixture, "bad id")).toEqual(null);
    });
  });

  describe("function displayTextForId", () => {
    it("works", async () => {
      expect(displayTextForId(optionsFixture, "o-anonymous")).toEqual(
        "Anonymous"
      );
      expect(displayTextForId(optionsFixture, "bad id")).toEqual(null);
    });
  });

  describe("function evaluateRowConditions", () => {
    let row, userValues;

    it("returns false if a variable is undefined", () => {
      row = { logic_type: "if" };
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, {
          variable_1: ["0"]
        })
      ).toEqual(false);

      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, {
          variable_2: ["0"]
        })
      ).toEqual(false);
    });

    it("works for case always_include", async () => {
      row = { logic_type: "always_include" };
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, {})
      ).toEqual(true);
    });

    it("works for case if-equals", async () => {
      row = {
        logic_type: "if",
        test: "equals",
        variable_1: ["q-confidentiality"],
        variable_2: ["o-anonymous"]
      };

      userValues = { confidentiality: "Anonymous" };
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, userValues)
      ).toEqual(true);

      userValues = { confidentiality: "Confidential" };
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, userValues)
      ).toEqual(false);

      userValues = { confidentiality: "Anonymous" };
      row.variable_2 = ["o-anonymous", "o-anonymized"];
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, userValues)
      ).toEqual(false);
    });

    it("works for case if-does_not_equals", async () => {
      row = {
        logic_type: "if",
        test: "does_not_equal",
        variable_1: ["q-confidentiality"],
        variable_2: ["o-anonymous"]
      };

      userValues = { confidentiality: "Anonymous" };
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, userValues)
      ).toEqual(false);

      userValues = { confidentiality: "Confidential" };
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, userValues)
      ).toEqual(true);
    });

    it("works for case if-in_list", async () => {
      row = {
        logic_type: "if",
        test: "in_list",
        variable_1: ["q-confidentiality"],
        variable_2: ["o-anonymous", "o-anonymized"]
      };

      userValues = { confidentiality: "Anonymous" };
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, userValues)
      ).toEqual(true);

      userValues = { confidentiality: "Anonymized" };
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, userValues)
      ).toEqual(true);

      userValues = { confidentiality: "Confidential" };
      expect(
        evaluateRowConditions(row, questionsFixture, optionsFixture, userValues)
      ).toEqual(false);
    });
  });
});
