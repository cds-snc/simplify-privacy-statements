import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SelectInput } from "@govuk-react/select";
import LabelText from "@govuk-react/label-text";

export class TemplateDropdown extends Component {
  componentDidMount() {
    if (!this.props.reduxState.templateSelected) {
      this.props.saveTemplateSelected({
        templateSelected: this.props.reduxState.templateList[0]
      });
    }
  }

  selectOnChange = event => {
    this.props.saveTemplateSelected({ templateSelected: event.target.value });
  };

  render() {
    const templateList = this.props.reduxState.templateList;

    return (
      <div className={this.props.className}>
        <label htmlFor="select template">
          <LabelText>Template:&nbsp;</LabelText>
        </label>

        <SelectInput id="select template" onChange={this.selectOnChange}>
          {templateList.map(tn => {
            return (
              <option
                key={tn}
                value={tn}
                selected={tn === this.props.reduxState.templateSelected}
              >
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
