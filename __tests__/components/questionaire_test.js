import React from "react";
import { mount } from "enzyme";

import { Questionaire } from "../../components/questionaire";
import questionsFixture from "../fixtures/questions";
import optionsFixture from "../fixtures/options";
import configureStore from "redux-mock-store";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Questionaire", () => {
  let props, mockStore, reduxState;

  beforeEach(() => {
    props = {};
    mockStore = configureStore();
    reduxState = {
      questions: questionsFixture,
      multiple_choice_options: optionsFixture,
      questionsSelected: "questions",
      data: {}
    };
    props.reduxState = reduxState;
    props.store = mockStore(reduxState);
  });

  it("renders", async () => {
    mount(<Questionaire {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<Questionaire {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
