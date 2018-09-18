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
      hint: "asdf",
      reduxState: { asdf: "rec0aV8zfp1HE5iF3" },
      saveInputData: jest.fn(),
      saveVariableSelected: jest.fn()
    };
  });

  it("renders", async () => {
    mount(<MultipleChoice {...props} />);
  });

  it("saves clicked value to redux", async () => {
    mount(<MultipleChoice {...props} />)
      .find("input")
      .first()
      .simulate("click");
    expect(props.saveInputData).toBeCalledWith({
      [props.name]: props.options[0].variable_name
    });
  });

  it("saves clicked variable to redux", async () => {
    mount(<MultipleChoice {...props} />)
      .find("input")
      .first()
      .simulate("click");
    expect(props.saveVariableSelected).toBeCalledWith({
      variableSelected: props.name
    });
  });

  it("option is selected if it is in redux", async () => {
    props.reduxState["asdf"] = props.options[1].variable_name;

    expect(
      mount(<MultipleChoice {...props} />)
        .find("input")
        .at(1)
        .prop("checked")
    ).toEqual(true);
  });
});
