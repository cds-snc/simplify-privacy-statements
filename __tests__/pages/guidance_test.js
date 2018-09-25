import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import Guidance from "../../pages/guidance";
import questionsFixture from "../fixtures/questions";
import optionsFixture from "../fixtures/options";
import templateFixture from "../fixtures/template";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Guidance", () => {
  let props, mockStore, reduxState;

  beforeEach(() => {
    props = {
      test: true
    };
    mockStore = configureStore();
    reduxState = {
      questions: questionsFixture,
      multiple_choice_options: optionsFixture,
      template: templateFixture,
      templateSelected: "template",
      allQuestions: questionsFixture.map(q => q.variable_name),
      questionsSelected: "questions"
    };
    props.reduxState = reduxState;
    props.store = mockStore(reduxState);
  });

  it("renders", async () => {
    mount(<Guidance {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<Guidance {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
