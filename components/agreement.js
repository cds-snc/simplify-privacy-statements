import React, { Component } from "react";
import { connect } from "react-redux";
import JsxParser from "react-jsx-parser";
import PropTypes from "prop-types";
import MarkdownIt from "markdown-it";
import VariableColouring from "./variable_colouring";
import LabelText from "@govuk-react/label-text";
import { SelectInput } from "@govuk-react/select";
import evaluateRowConditions from "../utils/evaluate_row";

var airtableConstants = require("../utils/airtable_constants");

export class Agreement extends Component {
  templateList = airtableConstants.tableNames.filter(
    tn => tn.toLowerCase().indexOf("template") !== -1
  );

  state = {
    templateName: this.templateList[0]
  };

  colouringFunction = (match, p1) => {
    const variableSelected = this.props.reduxState.variableSelected;
    const variableValue = this.props.reduxState[p1];
    return `<VariableColouring variableSelected='${variableSelected}' variable='${p1}' variableValue='${variableValue}'/>`;
  };

  selectOnChange = event => {
    this.setState({ templateName: event.target.value });
  };

  render() {
    const { reduxState } = this.props;
    let finalTemplate;

    if (reduxState[this.state.templateName]) {
      finalTemplate = reduxState[this.state.templateName]
        .filter(row =>
          evaluateRowConditions(
            row,
            reduxState.questions,
            reduxState.multiple_choice_options,
            reduxState
          )
        )
        .map(
          row =>
            this.props.showSection && row.section_name !== undefined
              ? `**[${row.section_name}]**\n ${row.display_text}`
              : row.display_text
        )
        .map(s => s.replace(/^\*\s/, "\n* "))
        .join("");
    } else {
      finalTemplate = "";
    }

    let md = new MarkdownIt({ breaks: true });

    let jsxString = md
      .render(finalTemplate)
      .replace(/<br>/g, "<br/>")
      .replace(/\{(\S+)\}/g, this.colouringFunction);
    return (
      <div>
        <label htmlFor="select template">
          <LabelText>
            Template:&nbsp;
            <SelectInput id="select template" onChange={this.selectOnChange}>
              {this.templateList.map(tn => {
                return (
                  <option key={tn} value={tn}>
                    {tn}
                  </option>
                );
              })}
            </SelectInput>
          </LabelText>
        </label>

        <JsxParser
          bindings={reduxState}
          components={{ VariableColouring }}
          jsx={jsxString}
        />
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
  reduxState: PropTypes.object,
  showSection: PropTypes.bool
};

export default connect(mapStateToProps)(Agreement);
