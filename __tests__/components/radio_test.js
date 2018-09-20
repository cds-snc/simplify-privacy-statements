import React from "react";
import { mount } from "enzyme";
import Radio from "../../components/radio";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Radio", () => {
  let props;

  beforeEach(() => {
    props = {
      helper: "helper text",
      children: "display text"
    };
  });

  it("renders", async () => {
    mount(<Radio {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<Radio {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
