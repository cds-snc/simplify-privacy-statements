import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Button from "@govuk-react/button";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import Layout from "../components/layout";

const button = css`
  display: inline;
  margin-right: 10px;
  margin-top: 10px;
`;

export class Validation extends Component {
  missingTemplateVariables = (template, reduxState) => {
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
    const template = reduxState.template;

    const missingTemplateVariables = this.missingTemplateVariables(
      template,
      reduxState
    );

    return (
      <Layout>
        <div>
          <Link href="/">
            <Button className={button}>Home</Button>
          </Link>
          <Link href="/agreement">
            <Button className={button}>Agreement</Button>
          </Link>
        </div>
        <h1>Variables in template but missing from redux</h1>
        <ul>
          {missingTemplateVariables.map(v => {
            return (
              <li key={v.variable}>
                row {v.rowIndex + 1}: {v.variable}
              </li>
            );
          })}
        </ul>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

Validation.propTypes = {
  reduxState: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Validation);
