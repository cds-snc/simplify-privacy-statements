import React, { Component } from "react";
import { css, cx } from "react-emotion";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import Questionaire from "../components/questionaire";
import Agreement from "../components/agreement";
import Header from "../components/header";
import Button from "@govuk-react/button";
import htmlDocx from "html-docx-js/dist/html-docx";
import CdsLogo from "../components/logo";

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
  getBlobUrl = () => {
    if (window) {
      var content = document.getElementById("agreement").innerHTML;
      var myBlob = htmlDocx.asBlob(content);
      var blobURL = window.URL.createObjectURL(myBlob);
      var a = document.getElementById("hidden_download_anchor");
      a.href = blobURL;
      a.download = "agreement_" + Date.now().toString() + ".docx";
      a.click();
    }
    return null;
  };

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
            <div id="agreement">
              <CdsLogo />
              <h2>Agreement</h2>
              <Agreement store={this.props.store} />
            </div>
            <Button onClick={this.getBlobUrl}>Download Word Doc</Button>
            <a id="hidden_download_anchor" style={{ display: "none" }} />
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
