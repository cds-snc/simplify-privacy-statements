import React from 'react';
import { mount } from "enzyme";

import Index from "../../pages/index"

describe("Index", () => {
  it("renders", async () => {
    mount(<Index  />);
  });
})
