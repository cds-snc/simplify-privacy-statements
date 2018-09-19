import React from "react";
import { mount } from "enzyme";
import Header from "../../components/header";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Header", () => {
  it("renders", async () => {
    mount(<Header />);
  });

  it("passes axe tests", async () => {
    let html = mount(<Header />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});