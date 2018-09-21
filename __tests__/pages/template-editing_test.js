import React from "react";
import { mount } from "enzyme";

import { TemplateEditing } from "../../pages/template-editing";
import questionsFixture from "../fixtures/questions";
import optionsFixture from "../fixtures/options";
import configureStore from "redux-mock-store";
import templateFixture from "../fixtures/template";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("TemplateEditing", () => {
  let props, mockStore, reduxState;

  beforeEach(() => {
    props = {};
    mockStore = configureStore();
    reduxState = {
      templateList: ["template", "template2"],
      questions: questionsFixture,
      multiple_choice_options: optionsFixture,
      template: templateFixture,
      templateSelected: "template"
    };
    props.reduxState = reduxState;
    props.store = mockStore(reduxState);
  });

  it("renders", async () => {
    mount(<TemplateEditing {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<TemplateEditing {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
