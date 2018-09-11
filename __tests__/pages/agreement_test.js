import React from "react";
import { mount } from "enzyme";

import { Agreement } from "../../pages/agreement";

describe("Agreement", () => {
  let props;

  beforeEach(() => {
    props = {
      template: [],
      reduxState: {}
    };
  });

  it("renders", async () => {
    mount(<Agreement {...props} />);
  });
});