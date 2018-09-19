import React from "react";
import { mount } from "enzyme";
import templateFixture from "../fixtures/template";
import { MissingVariables } from "../../components/missing_variables";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("MissingVariables", () => {
  let props;

  beforeEach(() => {
    props = {
      // missing researcher_name
      reduxState: {
        template: templateFixture,
        researcher_email: "email",
        researcher_phone: "phone",
        templateSelected: "template"
      }
    };
  });

  it("renders", async () => {
    mount(<MissingVariables {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<MissingVariables {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  describe("function missingTemplateVariables", () => {
    it("works if none missing", () => {
      props.reduxState.researcher_name = "name";
      const reduxState = props.reduxState;
      const instance = mount(<MissingVariables {...props} />).instance();
      expect(instance.missingTemplateVariables(reduxState)).toEqual([]);
    });

    it("works if variable missing", () => {
      const reduxState = props.reduxState;
      delete reduxState.researcher_name;
      const instance = mount(<MissingVariables {...props} />).instance();
      expect(instance.missingTemplateVariables(reduxState)).toEqual([
        {
          rowIndex: 1,
          variable: "researcher_name"
        }
      ]);
    });
  });
});
