import React from "react";
import { mount } from "enzyme";

import { Agreement } from "../../pages/agreement";

describe("Agreement", () => {
  let props;

  beforeEach(() => {
    props = {
      reduxState: { template_1: [{ logic_type: "none", display_text: "" }] }
    };
  });

  it("renders", async () => {
    mount(<Agreement {...props} />);
  });
});
