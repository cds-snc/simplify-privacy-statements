import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SelectInput } from "@govuk-react/select";
import LabelText from "@govuk-react/label-text";

var airtableConstants = require("../utils/airtable_constants");
var templateList = airtableConstants.tableNames.filter(
  tn => tn.toLowerCase().indexOf("template") !== -1
);

export class TemplateDropdown extends Component {
  selectOnChange = event => {
    this.props.saveTemplateSelected({ templateSelected: event.target.value });
  };

  render() {
    return (
      <div className={this.props.className}>
        <label htmlFor="select template">
          <LabelText>Template:&nbsp;</LabelText>
        </label>

        <SelectInput id="select template" onChange={this.selectOnChange}>
          {templateList.map(tn => {
            return (
              <option key={tn} value={tn}>
                {tn}
              </option>
            );
          })}
        </SelectInput>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveTemplateSelected: x => {
      dispatch({ type: "SAVE_TEMPLATE_SELECTED", data: x });
    }
  };
};

TemplateDropdown.propTypes = {
  reduxState: PropTypes.object,
  saveTemplateSelected: PropTypes.func,
  className: PropTypes.string,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateDropdown);
