import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Button from "@govuk-react/button";
import Input from "@govuk-react/input";
import JsxParser from "react-jsx-parser";
import PropTypes from "prop-types";

export class Agreement extends Component {
  render() {
    const template = `
    <h1>This is a test</h1>
    <p>Name: {name}</p>
    <Input/>
    `;
    return (
      <div>
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <h1>This is an agreement</h1>
        <JsxParser
          bindings={{
            name: "Steve"
          }}
          components={{ Input }}
          jsx={template}
        />
        <div>researcher_name: {this.props.reduxState["researcher_name"]}</div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState,
    template: reduxState.template
  };
};

Agreement.propTypes = {
  reduxState: PropTypes.object,
  template: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Agreement);
