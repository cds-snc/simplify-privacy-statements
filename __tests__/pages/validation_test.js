import React from "react";
import { mount } from "enzyme";

import { Validation } from "../../pages/validation";

describe("Validation", () => {
  let props;

  beforeEach(() => {
    props = {
      template: [{ template: "" }],
      reduxState: {}
    };
  });

  it("renders", async () => {
    mount(<Validation {...props} />);
  });

  it("has a correct missingVariables function", async () => {
    const instance = mount(<Validation {...props} />).instance();
    const actual = instance.missingVariables("{a} b a {b} {b} {a} c d {c}", {
      a: "",
      c: ""
    });
    expect(actual).toEqual(["b"]);
  });
});
