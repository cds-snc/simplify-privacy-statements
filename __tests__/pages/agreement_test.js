import React from "react";
import { mount } from "enzyme";

import { Agreement } from "../../pages/agreement";
import optionsFixture from "../fixtures/options";
import questionsFixture from "../fixtures/questions";

describe("Agreement", () => {
  let props;

  beforeEach(() => {
    props = {
      reduxState: { template_2: [{ logic_type: "none", display_text: "" }] }
    };
  });

  it("renders", async () => {
    mount(<Agreement {...props} />);
  });

  describe("function nameForId", () => {
    it("works", async () => {
      const instance = mount(<Agreement {...props} />).instance();
      expect(instance.nameForId(questionsFixture, "q-confidentiality")).toEqual(
        "confidentiality"
      );
      expect(instance.nameForId(questionsFixture, "bad id")).toEqual(null);
    });
  });

  describe("function evaluateRowConditions", () => {
    let row, userValues;

    it("returns false if a variable is undefined", () => {
      const instance = mount(<Agreement {...props} />).instance();
      row = { logic_type: "if" };
      expect(
        instance.evaluateRowConditions(row, questionsFixture, optionsFixture, {
          variable_1: ["0"]
        })
      ).toEqual(false);

      expect(
        instance.evaluateRowConditions(row, questionsFixture, optionsFixture, {
          variable_2: ["0"]
        })
      ).toEqual(false);
    });

    it("works for case none", async () => {
      const instance = mount(<Agreement {...props} />).instance();
      row = { logic_type: "none" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          {}
        )
      ).toEqual(true);
    });

    it("works for case if-equals", async () => {
      const instance = mount(<Agreement {...props} />).instance();
      row = {
        logic_type: "if",
        test: "equals",
        variable_1: ["q-confidentiality"],
        variable_2: ["o-anonymous"]
      };

      userValues = { confidentiality: "anonymous" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(true);

      userValues = { confidentiality: "confidential" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(false);

      userValues = { confidentiality: "anonymous" };
      row.variable_2 = ["o-anonymous", "o-anonymized"];
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(false);
    });

    it("works for case if-does_not_equals", async () => {
      const instance = mount(<Agreement {...props} />).instance();
      row = {
        logic_type: "if",
        test: "does_not_equal",
        variable_1: ["q-confidentiality"],
        variable_2: ["o-anonymous"]
      };

      userValues = { confidentiality: "anonymous" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(false);

      userValues = { confidentiality: "confidential" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(true);
    });

    it("works for case if-in_list", async () => {
      const instance = mount(<Agreement {...props} />).instance();
      row = {
        logic_type: "if",
        test: "in_list",
        variable_1: ["q-confidentiality"],
        variable_2: ["o-anonymous", "o-anonymized"]
      };

      userValues = { confidentiality: "anonymous" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(true);

      userValues = { confidentiality: "anonymized" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(true);

      userValues = { confidentiality: "confidential" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(false);
    });
  });
});
