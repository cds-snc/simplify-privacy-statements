import React from "react";
import { mount } from "enzyme";

import { Index } from "../../pages/index";
import questionsFixture from "../fixtures/questions";
import optionsFixture from "../fixtures/options";

describe("Index", () => {
  let props;
  beforeEach(() => {
    props = {
      reduxState: {
        questions: questionsFixture,
        multiple_choice_options: optionsFixture
      }
    };
  });

  it("renders", async () => {
    mount(<Index {...props} />);
  });
});
