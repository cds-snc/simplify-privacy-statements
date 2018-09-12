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

  it("has a correct cleanTemplates function", async () => {
    const instance = mount(<Agreement {...props} />).instance();

    let actual = instance.cleanTemplate(`test
    test2
    <ul>
    <li> stuff </li>
    </ul>
    test3`);
    expect(actual).toEqual(`test<br/>
    test2<br/>
    <ul>
    <li> stuff </li>
    </ul>
    test3`);
  });
});
