import React from "react";
import { mount } from "enzyme";
import { MultipleChoice } from "../../components/multiple_choice";
import optionsFixture from "../fixtures/options";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("MultiChoice", () => {
  let props;

  beforeEach(() => {
    props = {
      options: optionsFixture,
      name: "asdf",
      label: "asdf",
      hint: "asdf",
      reduxState: { data: { asdf: "rec0aV8zfp1HE5iF3" } },
      saveInputData: jest.fn(),
      saveVariableSelected: jest.fn()
    };
  });

  it("renders", async () => {
    mount(<MultipleChoice {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<MultipleChoice {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("saves clicked value to redux", async () => {
    mount(<MultipleChoice {...props} />)
      .find("input")
      .first()
      .simulate("click");
    expect(props.saveInputData).toBeCalledWith({
      [props.name]: props.options[0].display_text
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
    props.reduxState.data["asdf"] = props.options[1].display_text;

    expect(
      mount(<MultipleChoice {...props} />)
        .find("input")
        .at(1)
        .prop("checked")
    ).toEqual(true);
  });
});
