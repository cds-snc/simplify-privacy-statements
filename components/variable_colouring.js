import React, { Component } from "react";
import { css } from "react-emotion";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";

export class VariableColouring extends Component {
  variableStatus = (variableSelected, variable, variableValue) => {
    if (variable === variableSelected) {
      return "selected";
    } else if (variableValue === `${variable}`) {
      return "not filled in";
    } else {
      return "filled in";
    }
  };

  render() {
    const { variableSelected, variable, variableValue } = this.props;
    let style;

    switch (this.variableStatus(variableSelected, variable, variableValue)) {
      case "selected":
        style = css`
          color: ${globalTheme.colour.black};
        `;
        break;
      case "not filled in":
        style = css`
          color: ${globalTheme.colour.tornadoRed};
        `;
        break;
      case "filled in":
        style = css`
          color: ${globalTheme.colour.black};
        `;
    }
    return <span className={style}>{this.props.variableValue}</span>;
  }
}

VariableColouring.propTypes = {
  variableSelected: PropTypes.string.isRequired,
  variable: PropTypes.string.isRequired,
  variableValue: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default VariableColouring;
