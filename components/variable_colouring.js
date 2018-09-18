import React, { Component } from "react";
import { css } from "react-emotion";
import PropTypes from "prop-types";

export class VariableColouring extends Component {
  render() {
    return (
      <span
        className={
          this.props.variable === this.props.variableSelected
            ? css`
                background-color: yellow;
              `
            : {}
        }
      >
        {this.props.variableValue}
      </span>
    );
  }
}

VariableColouring.propTypes = {
  variableSelected: PropTypes.string.isRequired,
  variable: PropTypes.string.isRequired,
  variableValue: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default VariableColouring;
