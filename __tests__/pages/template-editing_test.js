import React from "react";
import { mount } from "enzyme";

import { TemplateEditing } from "../../pages/template-editing";
import questionsFixture from "../fixtures/questions";
import optionsFixture from "../fixtures/options";
import configureStore from "redux-mock-store";
import templateFixture from "../fixtures/template";

describe("TemplateEditing", () => {
  let props, mockStore, reduxState;

  beforeEach(() => {
    props = {};
    mockStore = configureStore();
    reduxState = {
      questions: questionsFixture,
      multiple_choice_options: optionsFixture,
      template: templateFixture
    };
    props.reduxState = reduxState;
    props.store = mockStore(reduxState);
  });

  it("renders", async () => {
    mount(<TemplateEditing {...props} />);
  });
});
