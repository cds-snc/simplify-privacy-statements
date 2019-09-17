import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { GeneratedForm } from "../../pages/generatedForm";
import questionsFixture from "../fixtures/questions";
import optionsFixture from "../fixtures/options";
import templateFixture from "../fixtures/template";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("GeneratedForm", () => {
  let props, mockStore, reduxState;

  beforeEach(() => {
    props = {};
    mockStore = configureStore();
    reduxState = {
      templateList: ["template", "template2"],
      questions: questionsFixture,
      multiple_choice_options: optionsFixture,
      template: templateFixture,
      templateSelected: "template",
      questionSelected: "questions",
      questionsList: ["questions", "questions2"],
      allQuestions: questionsFixture.map(q => q.variable_name),
      data: {}
    };
    props = {
      reduxState: reduxState,
      store: mockStore(reduxState),
      saveTemplateSelected: jest.fn(),
      saveQuestionsSelected: jest.fn()
    };
  });

  it("renders", async () => {
    mount(<GeneratedForm {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<GeneratedForm {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
