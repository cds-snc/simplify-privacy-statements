import React from "react";
import { mount } from "enzyme";

import { Index } from "../../pages/index";

describe("Index", () => {
  let props;
  beforeEach(() => {
    props = {
      reduxState: {}
    };
  });

  it("renders", async () => {
    mount(<Index {...props} />);
  });
});
