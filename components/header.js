import React, { Component } from "react";
import { css } from "react-emotion";

// Top taken from https://benfrain.com/independent-scrolling-panels-body-scroll-using-just-css/

const Top = css`
  align-items: center;
  justify-content: left;
  position: relative;
  z-index: 10;
  padding: 24px;
  background-color: #000;
`;

const H1 = css`
  font-size: 2em;
  color: #f8e71c;
  margin: 0px;
`;

const Paragraph = css`
  color: #fff;
  margin: 10px 0px 0px 0px;
`;

class Header extends Component {
  render() {
    return (
      <div className={Top}>
        <h1 className={H1}>Privacy and Consent Form Generator</h1>
        <p className={Paragraph}>
          Tell us about the research you wish to conduct and this application
          will generate a Privacy Statement form for you to give to your
          participants and collect their consent. <br />
          Please read through all the conditions as you select your research
          requirements.
        </p>
      </div>
    );
  }
}

export default Header;
