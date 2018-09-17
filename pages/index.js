import React, { Component } from "react";
import { css, cx } from "react-emotion";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import Questionaire from "../components/questionaire";
import Agreement from "../components/agreement";
import Header from "../components/header";

const Container = css`
  display: flex;
  overflow: hidden;
  height: 100vh;
  margin-top: -100px;
  padding-top: 100px;
  position: relative;
  width: 100%;
  top: 0px;
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

export class Index extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <div className={Container}>
          <div className={cx(LeftRight, Left)}>
            <h2>Questionaire</h2>
            <Questionaire store={this.props.store} />
          </div>

          <div className={cx(LeftRight, Right)}>
            <h2>Agreement</h2>
            <Agreement store={this.props.store} />
          </div>
        </div>
      </Layout>
    );
  }
}

Index.propTypes = {
  store: PropTypes.object
};

export default Index;
