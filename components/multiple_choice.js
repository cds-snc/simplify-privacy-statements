import React, { Component } from "react";
import Radio from "@govuk-react/radio";
import MultiChoice from "@govuk-react/multi-choice";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { connect } from "react-redux";

const style = css`
  margin-top: 10px;
`;

export class MultipleChoice extends Component {
  render() {
    const { options, name, label, hint, className, reduxState } = this.props;

    const jsx_array = options.map((option, key) => {
      return (
        <Radio
          name={name}
          key={key}
          className={key === 0 ? style : null}
          disabled={option.disabled == "true" ? "disabled" : null}
          onClick={() => {
            this.props.saveInputData({ [name]: option.variable_name });
          }}
          checked={option.variable_name === reduxState[name] ? true : null}
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

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveInputData: x => {
      dispatch({ type: "SAVE_INPUT_DATA", data: x });
    }
  };
};

MultipleChoice.propTypes = {
  reduxState: PropTypes.object,
  saveInputData: PropTypes.func,
  options: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  className: PropTypes.string,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleChoice);
