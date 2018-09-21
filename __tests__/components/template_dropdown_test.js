import React from "react";
import { mount } from "enzyme";
import { TemplateDropdown } from "../../components/template_dropdown";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("TemplateDropdown", () => {
  let props;

  beforeEach(() => {
    props = {
      reduxState: { templateList: ["template1", "template2"] },
      saveTemplateSelected: jest.fn()
    };
  });

  it("renders", async () => {
    mount(<TemplateDropdown {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<TemplateDropdown {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
