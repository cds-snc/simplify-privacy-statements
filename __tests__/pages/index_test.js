import React from "react";
import { mount } from "enzyme";

import { Index } from "../../pages/index";
import questionsFixture from "../fixtures/questions";

describe("Index", () => {
  let props;
  beforeEach(() => {
    props = {
      reduxState: { questions: questionsFixture }
    };
  });

  it("renders", async () => {
    mount(<Index {...props} />);
  });
});
