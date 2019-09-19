import React, { Component } from "react";
import { css } from "react-emotion";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import Agreement from "../components/agreement";
import Header from "../components/header";
import Button from "../components/button";
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
const introText = css`
  font-weight: bold;
  margin-bottom: 40px;
`;
let postData = (url = "", html = "") => {
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify({ html: html }) // body data type must match "Content-Type" header
  }).then(response => {
    // console.log(response.body)
    response.blob().then(function(myBlob) {
      var blobURL = window.URL.createObjectURL(myBlob);
      var a = document.getElementById("agreement_download_anchor");
      a.href = blobURL;
      a.download = "agreement_" + Date.now().toString() + ".docx";
      // a.download = "agreement_" + Date.now().toString() + ".md";
      a.click();
    });
  });
};

class Guidance extends Component {
  getBlobUrl = (elementId, anchorId) => {
    if (window && !this.props.test) {
      var content = document.getElementById(elementId).innerHTML;
      postData("/converter", content);

      var myBlob = htmlDocx.asBlob(content);
      var blobURL = window.URL.createObjectURL(myBlob);
      var a = document.getElementById(anchorId);
      // a.href = blobURL;
      // a.download = elementId + "_" + Date.now().toString() + ".docx";
      // a.click();
    }
    return null;
  };

  componentDidMount() {
    this.getBlobUrl("agreement", "agreement_download_anchor");
  }

  render() {
    return (
      <React.Fragment>
        <Header
          text="Your files are downloading now."
          store={this.props.store}
        />
        <Layout>
          <div className={body}>
            <p className={introText}>
              Please read through the following criteria on how to conduct the
              research based on the requirements you provided in the previous
              step. If you cannot comply with the criteria, you may go back and
              change the requirements to fit your needs.
            </p>

            <h2>Guidance</h2>

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
              <a id="agreement_download_anchor" style={{ display: "none" }}>
                Download Agreement
              </a>
              <a href="/static/agreement.docx">agreement.docx</a>
              <Link href="/">
                <Button secondary={true}>Back</Button>
              </Link>
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

Guidance.defaultProps = {
  test: false
};

Guidance.propTypes = {
  store: PropTypes.object,
  test: PropTypes.bool
};

export default Guidance;
