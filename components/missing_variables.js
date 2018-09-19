import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { css } from "react-emotion";

const root = css`
  border-style: solid;
  border-color: red;
  border-radius: 5px;
  padding-left: 20px;
  padding-right: 20px;
`;

export class MissingVariables extends Component {
  missingTemplateVariables = reduxState => {
    const template = reduxState[reduxState.templateSelected];
    let allVariables = [];
    const variableRegex = /{\S*}/g;
    template.forEach((row, index) => {
      const text = row.display_text;
      const matches = text.match(variableRegex);
      if (matches) {
        allVariables = allVariables.concat(
          matches.map(m => {
            return { variable: m.replace(/}|{/g, ""), rowIndex: index };
          })
        );
      }
    });

    let missing_variables = allVariables.filter(
      v => reduxState[v.variable] === undefined
    );

    let valuesSeen = {};
    missing_variables = missing_variables.filter(v => {
      const hash = `${v.rowIndex} - ${v.variable}`;
      if (valuesSeen[hash] === undefined) {
        valuesSeen[hash] = hash;
        return true;
      } else {
        return false;
      }
    });
    return missing_variables.sort((a, b) => a.rowIndex - b.rowIndex);
  };

  render() {
    const { reduxState } = this.props;
    const missingTemplateVariables = this.missingTemplateVariables(reduxState);

    if (missingTemplateVariables.length > 0) {
      return (
        <div className={root}>
          <h2>Variables in Template but missing from Questions</h2>
          <ul>
            {missingTemplateVariables.map(v => {
              return (
                <li key={v.variable}>
                  template row {v.rowIndex + 1}: {v.variable}
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

MissingVariables.propTypes = {
  reduxState: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(MissingVariables);
