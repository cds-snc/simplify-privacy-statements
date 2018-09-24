import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Index } from "../../pages/index";
import questionsFixture from "../fixtures/questions";
import optionsFixture from "../fixtures/options";
import templateFixture from "../fixtures/template";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Index", () => {
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
    props = {
      reduxState: reduxState,
      store: mockStore(reduxState),
      saveTemplateSelected: jest.fn()
    };
  });

  it("renders", async () => {
    mount(<Index {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<Index {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
