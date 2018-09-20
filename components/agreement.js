import React, { Component } from "react";
import { connect } from "react-redux";
import JsxParser from "react-jsx-parser";
import PropTypes from "prop-types";
import MarkdownIt from "markdown-it";
import VariableColouring from "./variable_colouring";
import MissingVariables from "./missing_variables";
import BadTemplateRows from "./bad_template_rows";
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

    let template = reduxState[reduxState.templateSelected];
    if (!template) {
      return null;
    }

    template.forEach(row => {
      row.textToDisplay = this.props.showGuidance
        ? row.Guidance
        : row.display_text;
      row.textToDisplay = row.textToDisplay ? row.textToDisplay : "";
    });

    if (template) {
      finalTemplate = reduxState[reduxState.templateSelected]
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
            this.props.editingMode && row.section_name !== undefined
              ? `**[${row.section_name}]**\n ${row.textToDisplay}`
              : row.textToDisplay
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
        {this.props.editingMode ? (
          <React.Fragment>
            <MissingVariables store={this.props.store} />
            <BadTemplateRows store={this.props.store} />
          </React.Fragment>
        ) : null}
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
  editingMode: PropTypes.bool,
  showGuidance: PropTypes.bool,
  store: PropTypes.object
};

export default connect(mapStateToProps)(Agreement);
