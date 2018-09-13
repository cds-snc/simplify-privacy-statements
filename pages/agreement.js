import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Button from "@govuk-react/button";
import JsxParser from "react-jsx-parser";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import MarkdownIt from "markdown-it";

const button = css`
  display: inline;
  margin: 10px;
`;

export class Agreement extends Component {
  nameForId = (sheet, id) => {
    let row = sheet.filter(r => r.id === id)[0];
    if (row) {
      return row.variable_name;
    }
    return null;
  };

  evaluateRowConditions = (row, variables, options, userValues) => {
    const { logic_type, variable_1, test, variable_2 } = row;

    if (logic_type === "none") {
      return true;
    }
    if (variable_1 === undefined || variable_2 === undefined) {
      return false;
    }

    let returnValue = false;
    const v1Name = this.nameForId(variables, variable_1[0]);
    const v1Value = userValues[v1Name];
    const v2Values = variable_2.map(v => this.nameForId(options, v));

    if (logic_type === "if" && test === "in_list") {
      v2Values.forEach(v2 => {
        if (v1Value === v2) {
          returnValue = true;
        }
      });
    }

    if (row.logic_type === "if" && test === "equals") {
      if (v2Values.length === 1 && v1Value === v2Values[0]) {
        returnValue = true;
      }
    }

    if (row.logic_type === "if" && test === "does_not_equal") {
      if (v2Values.length === 1 && v1Value !== v2Values[0]) {
        returnValue = true;
      }
    }
    return returnValue;
  };

  render() {
    const { reduxState } = this.props;

    let md = new MarkdownIt({ breaks: true });

    const jsx_array = reduxState.template.map((row, key) => {
      if (
        this.evaluateRowConditions(
          row,
          reduxState.questions,
          reduxState.multiple_choice_options,
          reduxState
        )
      ) {
        return (
          <JsxParser
            bindings={reduxState}
            components={{}}
            jsx={md.render(row.display_text).replace(/<br>/g, "<br/>")}
            key={key}
          />
        );
      }
    });

    return (
      <div>
        <div>
          <Link href="/">
            <Button className={button}>Home</Button>
          </Link>
          <Link href="/validation">
            <Button className={button}>Validation</Button>
          </Link>
        </div>
        <h1>Agreement</h1>
        {jsx_array}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

Agreement.propTypes = {
  reduxState: PropTypes.object
};

export default connect(mapStateToProps)(Agreement);
