import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { SelectInput } from "@govuk-react/select";
import LabelText from "@govuk-react/label-text";

const inline = css`
  display: inline;
`;
export default class Dropdown extends Component {
  componentDidMount() {
    if (!this.props.selected) {
      this.props.saveSelected(this.props.options[0]);
    }
  }

  selectOnChange = event => {
    this.props.saveSelected(event.target.value);
  };

  render() {
    return (
      <div className={this.props.className}>
        <label htmlFor={"select" + this.props.label}>
          <LabelText className={inline}>{this.props.label + ": "}</LabelText>
        </label>

        <SelectInput
          id={"select" + this.props.label}
          onChange={this.selectOnChange}
          value={this.props.selected}
        >
          {this.props.options.map(option => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </SelectInput>
      </div>
    );
  }
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.string,
  saveSelected: PropTypes.func.isRequired,
  className: PropTypes.string,
  store: PropTypes.object
};
