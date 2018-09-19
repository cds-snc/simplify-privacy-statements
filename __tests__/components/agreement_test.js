import React from "react";
import { mount } from "enzyme";

import { Agreement } from "../../components/agreement";
import optionsFixture from "../fixtures/options";
import questionsFixture from "../fixtures/questions";
import templateFixture from "../fixtures/template";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Agreement", () => {
  let props;

  beforeEach(() => {
    props = {
      reduxState: {
        template: templateFixture,
        questions: questionsFixture,
        multiple_choice_options: optionsFixture
      }
    };
  });

  it("renders", async () => {
    mount(<Agreement {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<Agreement {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the section name appropriately", async () => {
    expect(mount(<Agreement {...props} />).text()).not.toContain("section_1");
    expect(mount(<Agreement showSection {...props} />).text()).toContain(
      "section_1"
    );
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

  describe("function displayTextForId", () => {
    it("works", async () => {
      const instance = mount(<Agreement {...props} />).instance();
      expect(instance.displayTextForId(optionsFixture, "o-anonymous")).toEqual(
        "Anonymous"
      );
      expect(instance.displayTextForId(optionsFixture, "bad id")).toEqual(null);
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

      userValues = { confidentiality: "Anonymous" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(true);

      userValues = { confidentiality: "Confidential" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(false);

      userValues = { confidentiality: "Anonymous" };
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

      userValues = { confidentiality: "Anonymous" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(false);

      userValues = { confidentiality: "Confidential" };
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

      userValues = { confidentiality: "Anonymous" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(true);

      userValues = { confidentiality: "Anonymized" };
      expect(
        instance.evaluateRowConditions(
          row,
          questionsFixture,
          optionsFixture,
          userValues
        )
      ).toEqual(true);

      userValues = { confidentiality: "Confidential" };
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
