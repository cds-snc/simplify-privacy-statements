import React from "react";
import { mount } from "enzyme";
import templateFixture from "../fixtures/template";
import { BadTemplateRows } from "../../components/bad_template_rows";
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
    props.reduxState.template[0].display_text = "* ---"; // causes error
  });

  it("renders", async () => {
    mount(<BadTemplateRows {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<BadTemplateRows {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  describe("function isRowBad", () => {
    it("works if row is bad", () => {
      const instance = mount(<BadTemplateRows {...props} />).instance();
      expect(instance.isRowBad(props.reduxState.template[0])).toEqual(true);
    });

    it("works if row is not bad", () => {
      const instance = mount(<BadTemplateRows {...props} />).instance();
      expect(instance.isRowBad(props.reduxState.template[1])).toEqual(false);
    });
  });
});
