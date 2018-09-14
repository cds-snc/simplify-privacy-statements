import React from "react";
import { mount } from "enzyme";

import { Questionaire } from "../../components/questionaire";
import questionsFixture from "../fixtures/questions";
import optionsFixture from "../fixtures/options";
import configureStore from "redux-mock-store";

describe("Questionaire", () => {
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

  it("renders", async () => {
    mount(<Questionaire {...props} />);
  });
});
