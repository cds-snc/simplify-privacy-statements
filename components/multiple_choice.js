import React, { Component } from "react";
import Radio from "@govuk-react/radio";
import MultiChoice from "@govuk-react/multi-choice";
import PropTypes from "prop-types";
import { css } from "react-emotion";

const style = css`
  margin-top: 10px;
`;

export class MultipleChoice extends Component {
  render() {
    const { options, name, label, hint, className } = this.props;

    const jsx_array = options.map((option, key) => {
      return (
        <Radio
          name={name}
          key={key}
          className={key === 0 ? style : null}
          disabled={option.disabled == "true" ? "disabled" : null}
        >
          {option.display_text}
        </Radio>
      );
    });

    return (
      <MultiChoice label={label} hint={hint} className={className}>
        {jsx_array}
      </MultiChoice>
    );
  }
}

MultipleChoice.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  className: PropTypes.string
};

export default MultipleChoice;
