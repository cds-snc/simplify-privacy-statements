import React, { Component } from "react";
import { css } from "react-emotion";

// Top taken from https://benfrain.com/independent-scrolling-panels-body-scroll-using-just-css/

const Top = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  height: 100px;
  padding-top: 0px;
`;

class Header extends Component {
  render() {
    return (
      <div className={Top}>
        <h1>Generate a Simple Privacy Statement</h1>
      </div>
    );
  }
}

export default Header;
