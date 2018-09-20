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

  describe("variableStatus function", () => {
    it("detects selected variable", async () => {
      const instance = mount(<VariableColouring {...props} />).instance();
      expect(instance.variableStatus("var a", "var a", "value")).toEqual(
        "selected"
      );
    });

    it("detects not filled in variable", async () => {
      const instance = mount(<VariableColouring {...props} />).instance();
      expect(instance.variableStatus("var b", "var a", "var a")).toEqual(
        "not filled in"
      );
    });

    it("detects filled in variable", async () => {
      const instance = mount(<VariableColouring {...props} />).instance();
      expect(instance.variableStatus("var v", "var a", "value")).toEqual(
        "filled in"
      );
    });
  });
});
