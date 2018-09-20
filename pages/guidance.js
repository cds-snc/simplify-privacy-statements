import React, { Component } from "react";
import { css } from "react-emotion";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import Agreement from "../components/agreement";
import Header from "../components/header";
import Button from "@govuk-react/button";
import htmlDocx from "html-docx-js/dist/html-docx";
import Link from "next/link";

const body = css`
  padding: 2rem;
`;

export class Guidance extends Component {
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
      <React.Fragment>
        <Header />
        <Layout>
          <div className={body}>
            <Link href="/">
              <Button>Back</Button>
            </Link>

            <h2>Guidance - Please Read!</h2>

            <div id="agreement">
              <Agreement showGuidance store={this.props.store} />
            </div>
            <Button onClick={this.getBlobUrl}>Download Word Doc</Button>
            <a id="hidden_download_anchor" style={{ display: "none" }}>
              Download Word Doc
            </a>
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}

Guidance.propTypes = {
  store: PropTypes.object
};

export default Guidance;
