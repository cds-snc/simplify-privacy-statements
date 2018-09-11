import React, { Component } from "react";
import Input from "@govuk-react/input";
import JsxParser from "react-jsx-parser";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Agreement extends Component {
  render() {
    const template = `
    <h1>This is a test</h1>
    <p>Name: {name}</p>
    <Input/>
    `;

    return (
      <JsxParser
        bindings={{
          name: "Steve"
        }}
        components={{ Input }}
        jsx={template}
      />
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    template: reduxState.template
  };
};

Agreement.propTypes = {
  template: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Agreement);
