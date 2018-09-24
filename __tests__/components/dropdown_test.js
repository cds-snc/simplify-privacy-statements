import React from "react";
import { mount } from "enzyme";
import Dropdown from "../../components/dropdown";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Dropdown", () => {
  let props;

  beforeEach(() => {
    props = {
      label: "label",
      options: ["option1", "option2"],
      selected: "option1",
      saveSelected: jest.fn()
    };
  });

  it("renders", async () => {
    mount(<Dropdown {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<Dropdown {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  describe("function selectOnChange", () => {
    it("calls saveSelected appropriately", () => {
      const instance = mount(<Dropdown {...props} />).instance();
      instance.selectOnChange({ target: { value: "option2" } });
      expect(props.saveSelected).toBeCalledWith("option2");
    });
  });

  describe("function componentDidMount", () => {
    it("calls saveSelected appropriately", () => {
      props.selected = undefined;
      const instance = mount(<Dropdown {...props} />).instance();
      instance.componentDidMount();
      expect(props.saveSelected).toBeCalledWith("option1");
    });
  });
});
