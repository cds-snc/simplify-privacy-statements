import React, { Component } from "react";
import { connect } from "react-redux";
import JsxParser from "react-jsx-parser";
import PropTypes from "prop-types";
import MarkdownIt from "markdown-it";
import VariableColouring from "./variable_colouring";
import LabelText from "@govuk-react/label-text";
import { SelectInput } from "@govuk-react/select";
var airtableConstants = require("../utils/airtable_constants");

export class Agreement extends Component {
  templateList = airtableConstants.tableNames.filter(
    tn => tn.toLowerCase().indexOf("template") !== -1
  );

  state = {
    templateName: this.templateList[0]
  };

  nameForId = (sheet, id) => {
    let row = sheet.filter(r => r.id === id)[0];
    if (row) {
      return row.variable_name;
    }
    return null;
  };

  displayTextForId = (sheet, id) => {
    let row = sheet.filter(r => r.id === id)[0];
    if (row) {
      return row.display_text;
    }
    return null;
  };

  evaluateRowConditions = (row, variables, options, userValues) => {
    const { logic_type, variable_1, test, variable_2 } = row;

    if (logic_type === "none" || logic_type == "always_include") {
      return true;
    }
    if (variable_1 === undefined || variable_2 === undefined) {
      return false;
    }

    let returnValue = false;
    const v1Name = this.nameForId(variables, variable_1[0]);
    const v1Value = userValues[v1Name];
    const v2Values = variable_2.map(v => this.displayTextForId(options, v));

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
          this.evaluateRowConditions(
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
