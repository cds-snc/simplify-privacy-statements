import React from "react";
import { mount } from "enzyme";
import { MultipleChoice } from "../../components/multiple_choice";
import optionsFixture from "../fixtures/options";

describe("MultiChoice", () => {
  let props;

  beforeEach(() => {
    props = {
      options: optionsFixture,
      name: "asdf",
      label: "asdf",
      hint: "asdf"
    };
  });

  it("renders", async () => {
    mount(<MultipleChoice {...props} />);
  });
});
