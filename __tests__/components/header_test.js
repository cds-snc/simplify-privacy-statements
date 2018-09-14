import React from "react";
import { mount } from "enzyme";
import Header from "../../components/header";

describe("Header", () => {
  it("renders", async () => {
    mount(<Header />);
  });
});
