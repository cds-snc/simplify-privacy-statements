import React from "react";
import { mount } from "enzyme";

import { Agreement } from "../../components/agreement";
import optionsFixture from "../fixtures/options";
import questionsFixture from "../fixtures/questions";
import templateFixture from "../fixtures/template";
var airtableConstants = require("../../utils/airtable_constants");
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Agreement", () => {
  let props;
  const templateList = airtableConstants.tableNames.filter(
    tn => tn.toLowerCase().indexOf("template") !== -1
  );

  beforeEach(() => {
    props = {
      reduxState: {
        [templateList[0]]: templateFixture,
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
});
