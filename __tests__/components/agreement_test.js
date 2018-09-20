import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Agreement } from "../../components/agreement";
import optionsFixture from "../fixtures/options";
import questionsFixture from "../fixtures/questions";
import templateFixture from "../fixtures/template";
var airtableConstants = require("../../utils/airtable_constants");
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Agreement", () => {
  let props, mockStore, reduxState;

  const templateList = airtableConstants.tableNames.filter(
    tn => tn.toLowerCase().indexOf("template") !== -1
  );

  beforeEach(() => {
    props = {};
    mockStore = configureStore();
    reduxState = {
      [templateList[0]]: templateFixture,
      questions: questionsFixture,
      multiple_choice_options: optionsFixture,
      templateSelected: templateList[0]
    };
    props.reduxState = reduxState;
    props.store = mockStore(reduxState);
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
    expect(mount(<Agreement editingMode {...props} />).text()).toContain(
      "section1"
    );
  });
  it("shows the guidance appropriately", async () => {
    expect(mount(<Agreement {...props} />).text()).not.toContain("section_1");
    expect(mount(<Agreement showGuidance {...props} />).text()).toContain(
      "guidance1"
    );
  });
});
