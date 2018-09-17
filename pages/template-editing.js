import React, { Component } from "react";
import { css, cx } from "react-emotion";
import PropTypes from "prop-types";
import Link from "next/link";
import Button from "@govuk-react/button";
import Layout from "../components/layout";
import Questionaire from "../components/questionaire";
import Agreement from "../components/agreement";

// Scrolling boxes styling taken from https://benfrain.com/independent-scrolling-panels-body-scroll-using-just-css/

const Container = css`
  display: flex;
  overflow: hidden;
  height: 100vh;
  position: relative;
  width: 100%;
  backface-visibility: hidden;
  will-change: overflow;
`;
const LeftRight = css`
  overflow: auto;
  height: auto;
  padding: 0.5rem;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
`;
const Left = css`
  width: 50%;
`;
const Right = css`
  flex: 1;
`;
const button = css`
  display: inline;
  margin-right: 10px;
  margin-top: 10px;
`;

export class TemplateEditing extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Link href="/">
            <Button className={button}>Home</Button>
          </Link>
          <Link href="/validation">
            <Button className={button}>Missing Variables</Button>
          </Link>
          <Link href="/refresh">
            <Button className={button}>Refresh Airtable</Button>
          </Link>
        </div>

        <div className={Container}>
          <div className={cx(LeftRight, Left)}>
            <h2>Questionaire</h2>
            <Questionaire store={this.props.store} />
          </div>

          <div className={cx(LeftRight, Right)}>
            <h2>Agreement</h2>
            <Agreement showSection store={this.props.store} />
          </div>
        </div>
      </Layout>
    );
  }
}

TemplateEditing.propTypes = {
  store: PropTypes.object
};

export default TemplateEditing;
