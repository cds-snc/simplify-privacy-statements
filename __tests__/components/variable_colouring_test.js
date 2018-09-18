import React from "react";
import { mount } from "enzyme";
import { VariableColouring } from "../../components/variable_colouring";

describe("VariableColouring", () => {
  let props;

  beforeEach(() => {
    props = {
      variableSelected: "researcher_name",
      variable: "researcher_name",
      variableValue: "none"
    };
  });

  it("renders if variable selected", async () => {
    mount(<VariableColouring {...props} />);
  });

  it("renders if variable not selected", async () => {
    props.variable = "something_else";
    mount(<VariableColouring {...props} />);
  });
});
