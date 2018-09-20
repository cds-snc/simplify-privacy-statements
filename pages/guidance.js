import React, { Component } from "react";
import { css } from "react-emotion";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import Agreement from "../components/agreement";
import Header from "../components/header";
import Button from "@govuk-react/button";
import htmlDocx from "html-docx-js/dist/html-docx";
import Link from "next/link";
import CdsLogo from "../components/logo";

const body = css`
  padding: 2rem;
`;
const hidden = css`
  display: none;
`;
const button = css`
  display: inline;
  margin: 20px;
  margin-left: 0;
`;

export class Guidance extends Component {
  getBlobUrl = (elementId, anchorId) => {
    if (window) {
      var content = document.getElementById(elementId).innerHTML;
      var myBlob = htmlDocx.asBlob(content);
      var blobURL = window.URL.createObjectURL(myBlob);
      var a = document.getElementById(anchorId);
      a.href = blobURL;
      a.download = elementId + "_" + Date.now().toString() + ".docx";
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

            <div id="guidance">
              <Agreement showGuidance store={this.props.store} />
            </div>

            <div>
              <Button
                className={button}
                onClick={() =>
                  this.getBlobUrl("guidance", "guidance_download_anchor")
                }
              >
                Download Guidance
              </Button>
              <a id="guidance_download_anchor" style={{ display: "none" }}>
                Download Guidance
              </a>

              <Button
                className={button}
                onClick={() =>
                  this.getBlobUrl("agreement", "agreement_download_anchor")
                }
              >
                Download Agreement
              </Button>
              <a id="agreement_download_anchor" style={{ display: "none" }}>
                Download Agreement
              </a>
            </div>
          </div>
          <div id="agreement" className={hidden}>
            <CdsLogo />
            <Agreement store={this.props.store} />
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
